import { expect, test, type Page } from '@playwright/test'

const STORAGE_KEY = 'portfolio.language'
const ARABIC = /[؀-ۿ]/

const isMobile = (page: Page) => (page.viewportSize()?.width ?? 1280) < 900

async function switchLanguage(page: Page) {
  await page.getByTestId('language-switcher').click()
}

async function expectDocumentLanguage(page: Page, lang: 'en' | 'ar') {
  await expect(page.locator('html')).toHaveAttribute('lang', lang)
  await expect(page.locator('html')).toHaveAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr')
}

/**
 * Visible text nodes that contain no Arabic at all. In Arabic mode these
 * should only be inherently Latin values (tech names, emails, codes).
 */
async function visibleTextWithoutArabic(page: Page): Promise<string[]> {
  return page.evaluate(() => {
    const results: string[] = []
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)
    for (let node = walker.nextNode(); node; node = walker.nextNode()) {
      const text = node.textContent?.trim() ?? ''
      const parent = node.parentElement
      if (!text || !parent || !/[A-Za-z]/.test(text) || /[؀-ۿ]/.test(text)) continue
      if (parent.closest('script, style, [aria-hidden="true"]')) continue
      results.push(text)
    }
    // Placeholder and option text are user-facing too.
    document.querySelectorAll<HTMLInputElement>('[placeholder]').forEach((el) => {
      if (/[A-Za-z]/.test(el.placeholder) && !/[؀-ۿ]/.test(el.placeholder)) results.push(el.placeholder)
    })
    return results
  })
}

test.describe('language selection', () => {
  test('defaults to English for an English browser', async ({ page }) => {
    await page.goto('/')
    await expectDocumentLanguage(page, 'en')
    await expect(page.getByRole('heading', { level: 1 })).toContainText("Hello, I'm")
    await expect(page).toHaveTitle(/Software Engineer/)
  })

  test('switches to Arabic (RTL) and back to English (LTR)', async ({ page }) => {
    await page.goto('/')
    await switchLanguage(page)
    await expectDocumentLanguage(page, 'ar')
    await expect(page.getByRole('heading', { level: 1 })).toContainText('مرحبًا، أنا')
    await expect(page).toHaveTitle(/مهندس برمجيات/)
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', ARABIC)
    expect(await page.evaluate((key) => localStorage.getItem(key), STORAGE_KEY)).toBe('ar')

    await switchLanguage(page)
    await expectDocumentLanguage(page, 'en')
    await expect(page.getByRole('heading', { level: 1 })).toContainText("Hello, I'm")
    expect(await page.evaluate((key) => localStorage.getItem(key), STORAGE_KEY)).toBe('en')
  })

  test('remembers the chosen language after a reload', async ({ page }) => {
    await page.goto('/')
    await switchLanguage(page)
    await expectDocumentLanguage(page, 'ar')
    await page.reload()
    await expectDocumentLanguage(page, 'ar')
    await expect(page.getByRole('heading', { name: 'نماذج من أعمالي' })).toBeVisible()
  })

  test('applies the saved language before React renders', async ({ page }) => {
    await page.addInitScript((key) => localStorage.setItem(key, 'ar'), STORAGE_KEY)
    // Block the app bundle so only the inline script in index.html runs.
    await page.route('**/assets/*.js', (route) => route.abort())
    await page.goto('/')
    await expectDocumentLanguage(page, 'ar')
  })

  test('the switcher is keyboard operable and has an accessible name', async ({ page }) => {
    await page.goto('/')
    const switcher = page.getByRole('button', { name: 'Switch language to العربية' })
    await expect(switcher).toBeVisible()
    await switcher.focus()
    await page.keyboard.press('Enter')
    await expectDocumentLanguage(page, 'ar')
    const back = page.getByRole('button', { name: 'تغيير اللغة إلى English' })
    await expect(back).toBeFocused()
    await page.keyboard.press('Space')
    await expectDocumentLanguage(page, 'en')
  })
})

test.describe('Arabic browser default', () => {
  test.use({ locale: 'ar-SA' })

  test('uses Arabic when nothing is saved and the browser prefers Arabic', async ({ page }) => {
    await page.goto('/')
    await expectDocumentLanguage(page, 'ar')
  })
})

test.describe('translations', () => {
  test('Arabic mode has no untranslated English text', async ({ page }) => {
    await page.goto('/')
    await switchLanguage(page)
    await expectDocumentLanguage(page, 'ar')

    // Values that are Latin in both languages by nature.
    const allowed = new Set([
      'English', // the switcher label is written in its target language
      'Java',
      'C#',
      'Python',
      'PHP',
      'JavaScript',
      'React',
      'Angular',
      'React Native',
      'Spring Boot',
      'MySQL',
      'PostgreSQL',
      'HTML/CSS',
      'Bitbucket',
      'Jira',
      'TypeScript',
      'Vite',
      'npm',
      'CSS',
      'localStorage',
      'name@company.com',
      'mtmtaswh77@gmail.com',
      'www.linkedin.com/in/mahmoud-al-ahmadi-494526283',
    ])
    const leftovers = (await visibleTextWithoutArabic(page)).filter((text) => !allowed.has(text))
    expect(leftovers).toEqual([])
  })

  test('English mode has no Arabic text except the switcher label', async ({ page }) => {
    await page.goto('/')
    const arabicTexts = await page.evaluate(() => {
      const results: string[] = []
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)
      for (let node = walker.nextNode(); node; node = walker.nextNode()) {
        const text = node.textContent?.trim() ?? ''
        if (/[؀-ۿ]/.test(text)) results.push(text)
      }
      return results
    })
    expect(arabicTexts).toEqual(['العربية'])
  })

  test('formats dates and numbers for the active locale', async ({ page }) => {
    await page.goto('/')
    const period = page.locator('.timeline__period time').first()
    await expect(period).toContainText('February 2025 – January 2026')
    await switchLanguage(page)
    await expect(period).toContainText('فبراير')
    await expect(period).toContainText('٢٠٢٥')
    // The counter animates when it scrolls into view and ends on the real value.
    const stat = page.locator('.hero__stat dd').first()
    await stat.scrollIntoViewIfNeeded()
    await expect(stat.locator('[aria-hidden="true"]')).toHaveText('٤')
    await expect(stat.locator('.visually-hidden')).toHaveText('٤')
  })
})

test.describe('contact form', () => {
  test('shows translated validation errors and re-translates them on switch', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: 'Send message' }).click()
    await expect(page.getByRole('alert')).toHaveText('Please correct the highlighted fields.')
    await expect(page.getByText('Please enter your name.')).toBeVisible()
    await expect(page.getByLabel(/Full name/)).toBeFocused()
    await expect(page.getByLabel(/Full name/)).toHaveAttribute('aria-invalid', 'true')

    await switchLanguage(page)
    await expect(page.getByRole('alert')).toHaveText('يرجى تصحيح الحقول المحددة.')
    await expect(page.getByText('يرجى إدخال اسمك.')).toBeVisible()
    await expect(page.getByText('يرجى إدخال بريدك الإلكتروني.')).toBeVisible()
    await expect(page.getByText('يرجى اختيار نوع المشروع.')).toBeVisible()
  })

  test('keeps typed values when the language changes', async ({ page }) => {
    await page.goto('/')
    await page.getByLabel(/Full name/).fill('Sara Ahmed')
    await page.getByLabel(/Email address/).fill('sara@example.com')
    await page.getByLabel(/Project type/).selectOption('webApp')
    await page.getByLabel(/^Message/).fill('I need an Arabic and English CRM for my team.')

    await switchLanguage(page)
    await expectDocumentLanguage(page, 'ar')
    await expect(page.getByLabel(/الاسم الكامل/)).toHaveValue('Sara Ahmed')
    await expect(page.getByLabel(/البريد الإلكتروني/)).toHaveValue('sara@example.com')
    await expect(page.getByLabel(/نوع المشروع/)).toHaveValue('webApp')
    await expect(page.getByLabel(/نوع المشروع/).locator('option:checked')).toHaveText('تطبيق ويب أو لوحة تحكم')
    await expect(page.getByLabel(/^الرسالة/)).toHaveValue('I need an Arabic and English CRM for my team.')

    await switchLanguage(page)
    await expect(page.getByLabel(/Full name/)).toHaveValue('Sara Ahmed')
  })

  test('validates email format and message length in both languages', async ({ page }) => {
    await page.goto('/')
    await page.getByLabel(/Email address/).fill('not-an-email')
    await page.getByLabel(/^Message/).fill('Too short')
    await page.getByLabel(/^Message/).blur()
    await page.getByLabel(/Email address/).focus()
    await page.getByLabel(/Email address/).blur()
    await expect(page.getByText('Please enter a valid email address, like name@company.com.')).toBeVisible()
    await expect(page.getByText('Message must be at least 20 characters.')).toBeVisible()

    await switchLanguage(page)
    await expect(page.getByText('يرجى إدخال بريد إلكتروني صحيح، مثل name@company.com.')).toBeVisible()
    await expect(page.getByText('يجب ألا تقل الرسالة عن ٢٠ حرفًا.')).toBeVisible()
  })

  test('hands a valid message to the email app and confirms it', async ({ page }) => {
    await page.goto('/')
    await page.getByLabel(/Full name/).fill('Sara Ahmed')
    await page.getByLabel(/Email address/).fill('sara@example.com')
    await page.getByLabel(/Project type/).selectOption('website')
    await page.getByLabel(/^Message/).fill('I need a bilingual company website for my business.')
    await page.getByRole('button', { name: 'Send message' }).click()

    const toast = page.locator('.toast')
    await expect(toast).toContainText('Your email app should now open')
    // A visible notification is re-translated too.
    await switchLanguage(page)
    await expect(toast).toContainText('سيُفتح تطبيق البريد لديك الآن')
    await page.getByRole('button', { name: 'إغلاق', exact: true }).click()
    await expect(toast).toHaveCount(0)
  })
})

test.describe('skills and CV', () => {
  test('lists exactly the configured skills in both languages', async ({ page }) => {
    const expected = ['Java', 'C#', 'Python', 'PHP', 'JavaScript', 'React', 'Angular', 'React Native', 'HTML/CSS', 'Spring Boot', 'MySQL', 'PostgreSQL', 'Bitbucket', 'Jira']
    await page.goto('/')
    await expect(page.locator('#skills .tag')).toHaveText(expected)
    await switchLanguage(page)
    await expect(page.locator('#skills .tag')).toHaveText(expected)
  })

  test('offers the CV as a downloadable PDF in both languages', async ({ page }) => {
    await page.goto('/')
    const cv = page.locator('#cv')
    const link = cv.getByRole('link', { name: 'Download CV' })
    await expect(link).toHaveAttribute('href', './Mahmoud-Saeed-CV.pdf')
    await expect(link).toHaveAttribute('download')
    const response = await page.request.get('Mahmoud-Saeed-CV.pdf')
    expect(response.ok()).toBe(true)
    expect(response.headers()['content-type']).toContain('pdf')
    await switchLanguage(page)
    await expect(cv.getByRole('link', { name: 'تحميل السيرة الذاتية' })).toBeVisible()
  })
})

test.describe('motion', () => {
  test('runs smooth scrolling and the hero effects by default', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('html')).toHaveClass(/lenis/)
    await expect(page.locator('.hero__rays canvas')).toHaveCount(1)
    await expect(page.locator('.hero__cta canvas')).toHaveCount(1)
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Mahmoud Saeed')
  })

  test('respects prefers-reduced-motion', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/')
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Mahmoud Saeed')
    await expect(page.locator('html')).not.toHaveClass(/lenis/)
    await expect(page.locator('.hero__rays')).toHaveCount(0)
    // Content is shown straight away instead of fading in on scroll.
    await expect(page.locator('#contact .card').first()).toHaveCSS('opacity', '1')
    await expect(page.locator('.hero__stat dd [aria-hidden="true"]').first()).toHaveText('4')
  })
})

test.describe('layout', () => {
  for (const lang of ['en', 'ar'] as const) {
    test(`has no horizontal overflow in ${lang}`, async ({ page }) => {
      await page.addInitScript(([key, value]) => localStorage.setItem(key, value), [STORAGE_KEY, lang])
      await page.goto('/')
      await expectDocumentLanguage(page, lang)
      // Compare with the device width: on mobile, overflowing content widens
      // the layout viewport, so window.innerWidth would hide the problem.
      const width = page.viewportSize()?.width ?? 0
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth)
      expect(scrollWidth).toBeLessThanOrEqual(width)
    })
  }

  test('navigation starts on the correct side in each direction', async ({ page }) => {
    await page.goto('/')
    const brand = page.locator('.brand')
    const switcher = page.getByTestId('language-switcher')
    const brandLtr = await brand.boundingBox()
    const switcherLtr = await switcher.boundingBox()
    expect(brandLtr!.x).toBeLessThan(switcherLtr!.x)

    await switchLanguage(page)
    await expectDocumentLanguage(page, 'ar')
    const brandRtl = await brand.boundingBox()
    const switcherRtl = await page.getByTestId('language-switcher').boundingBox()
    expect(brandRtl!.x).toBeGreaterThan(switcherRtl!.x)
  })

  test('mobile menu opens, navigates and closes in both languages', async ({ page }) => {
    test.skip(!isMobile(page), 'mobile only')
    await page.goto('/')
    const menuButton = page.getByRole('button', { name: 'Open menu' })
    await expect(page.getByTestId('language-switcher')).toBeVisible()
    await menuButton.click()
    await expect(page.getByRole('button', { name: 'Close menu' })).toHaveAttribute('aria-expanded', 'true')
    await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Projects' }).click()
    await expect(page.getByRole('navigation', { name: 'Main navigation' })).toBeHidden()
    await expect(page).toHaveURL(/#projects$/)

    await switchLanguage(page)
    await page.getByRole('button', { name: 'فتح القائمة' }).click()
    const nav = page.getByRole('navigation', { name: 'التنقل الرئيسي' })
    await expect(nav.getByRole('link', { name: 'تواصل معي' })).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(nav).toBeHidden()
    await expect(page.getByRole('button', { name: 'فتح القائمة' })).toBeFocused()
  })

  test('forward arrows mirror in Arabic', async ({ page }) => {
    await page.goto('/')
    const arrow = page.locator('.hero__actions .icon--directional')
    await expect(arrow).toHaveCSS('transform', 'none')
    await switchLanguage(page)
    await expect(arrow).toHaveCSS('transform', 'matrix(-1, 0, 0, 1, 0, 0)')
  })
})
