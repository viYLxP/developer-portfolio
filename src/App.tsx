import 'lenis/dist/lenis.css'
import { useScrollReveal } from './animation/useScrollReveal'
import { prefersReducedMotion } from './animation/gsap'
import { useSmoothScroll } from './animation/useSmoothScroll'
import { Footer } from './components/layout/Footer'
import ClickSpark from './components/reactbits/ClickSpark'
import { Header } from './components/layout/Header'
import { About } from './components/sections/About'
import { Contact } from './components/sections/Contact'
import { Cv } from './components/sections/Cv'
import { Experience } from './components/sections/Experience'
import { Hero } from './components/sections/Hero'
import { Projects } from './components/sections/Projects'
import { Services } from './components/sections/Services'
import { Skills } from './components/sections/Skills'
import { ToastProvider } from './components/ui/ToastProvider'
import { LanguageProvider, useLanguage } from './i18n'

const REDUCED_MOTION = prefersReducedMotion()

function Page() {
  const { t, language } = useLanguage()
  useSmoothScroll()
  useScrollReveal(language)
  return (
    <>
      <a href="#main" className="skip-link">
        {t.a11y.skipToContent}
      </a>
      <div className="scroll-progress" aria-hidden="true" />
      {/* Small gold sparks wherever the visitor clicks. */}
      <ClickSpark
        sparkColor={['#e3b453', '#7ee8d1']}
        sparkCount={8}
        sparkRadius={18}
        duration={450}
        disabled={REDUCED_MOTION}
        // The default height: 100% would end the sticky header's containing block early.
        style={{ height: 'auto' }}
      >
        <Header />
        <main id="main" tabIndex={-1}>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Services />
          <Experience />
          <Cv />
          <Contact />
        </main>
        <Footer />
      </ClickSpark>
    </>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <ToastProvider>
        <Page />
      </ToastProvider>
    </LanguageProvider>
  )
}
