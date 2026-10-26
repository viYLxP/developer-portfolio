import type { Dictionary } from './en'

/**
 * Arabic dictionary. Typed as `Dictionary`, so it must contain every key
 * that exists in en.ts.
 */
const ar: Dictionary = {
  meta: {
    title: 'محمود سعيد · مهندس برمجيات',
    description:
      'معرض أعمال محمود سعيد، مهندس برمجيات يبني تطبيقات الويب والجوال باستخدام React وReact Native وAngular وJava وSpring Boot.',
  },
  a11y: {
    skipToContent: 'تخطَّ إلى المحتوى الرئيسي',
    mainNavigation: 'التنقل الرئيسي',
    footerNavigation: 'روابط التذييل',
    openMenu: 'فتح القائمة',
    closeMenu: 'إغلاق القائمة',
    switchLanguage: 'تغيير اللغة إلى {language}',
    opensInNewTab: '(يُفتح في علامة تبويب جديدة)',
    notifications: 'الإشعارات',
  },
  common: {
    placeholder: 'نص مؤقت',
    notConfigured: 'لم يُضبط بعد',
    dismiss: 'إغلاق',
  },
  profile: {
    name: 'محمود سعيد',
    initials: 'م',
    role: 'مهندس برمجيات',
    location: 'الرياض، المملكة العربية السعودية',
  },
  nav: {
    about: 'نبذة عني',
    skills: 'المهارات',
    projects: 'المشاريع',
    services: 'الخدمات',
    experience: 'الخبرات',
    cv: 'السيرة الذاتية',
    contact: 'تواصل معي',
  },
  hero: {
    greeting: 'مرحبًا، أنا',
    headline: 'أبني تطبيقات الويب والجوال، من الواجهة إلى قاعدة البيانات.',
    intro:
      'مهندس برمجيات لديه خبرة عملية في بناء تطبيقات مصرف الراجحي البنكية باستخدام React Native، وفي التطوير باستخدام Java وAngular وSpring Boot لدى NTG Clarity.',
    primaryCta: 'استعرض أعمالي',
    secondaryCta: 'تواصل معي',
    availability: 'متاح لفرص عمل جديدة',
    statsLabel: 'أبرز الأرقام',
    stats: {
      projects: 'مشاريع مميزة',
      languages: 'لغتان في كل مشروع',
      directions: 'اتجاها التخطيط: من اليمين ومن اليسار',
    },
  },
  about: {
    eyebrow: 'نبذة عني',
    title: 'كود نظيف، وواجهات واضحة، في الاتجاهين.',
    paragraphs: [
      'أنا مطوّر متكامل أعمل بلغات Java وC# وPython وPHP وJavaScript. أبني واجهات الويب والجوال باستخدام React وAngular وReact Native، وتطبيقات الخادم باستخدام Spring Boot، وأتعامل مع قواعد بيانات MySQL وPostgreSQL.',
      'حاصل على بكالوريوس التقنية الهندسية في هندسة البرمجيات (٢٠٢٤) ودبلوم هندسة البرمجيات (٢٠١٧). قبل انتقالي إلى التطوير عملت في الدعم الفني: تثبيت الأنظمة، وإصلاح أعطال الأجهزة والبرامج، وتدريب المستخدمين.',
    ],
    factsLabel: 'معلومات سريعة',
    facts: {
      location: 'الموقع',
      languages: 'اللغات',
      focus: 'مجال التركيز',
    },
    factValues: {
      languages: 'العربية، الإنجليزية',
      focus: 'تطبيقات الويب والجوال، من الواجهة إلى قاعدة البيانات',
    },
  },
  skills: {
    eyebrow: 'المهارات',
    title: 'التقنيات التي أعمل بها',
    subtitle: 'لغات البرمجة وأطر العمل وقواعد البيانات التي أبني بها تطبيقات الويب والجوال.',
    groups: [
      {
        title: 'لغات البرمجة',
        items: ['Java', 'C#', 'Python', 'PHP', 'JavaScript'],
      },
      {
        title: 'الواجهات وتطبيقات الجوال',
        items: ['React', 'Angular', 'React Native', 'HTML/CSS'],
      },
      {
        title: 'الواجهات الخلفية',
        items: ['Spring Boot'],
      },
      {
        title: 'قواعد البيانات',
        items: ['MySQL', 'PostgreSQL'],
      },
      {
        title: 'الأدوات',
        items: ['Bitbucket', 'Jira'],
      },
    ],
  },
  projects: {
    eyebrow: 'مشاريع مميزة',
    title: 'نماذج من أعمالي',
    subtitle: 'أربعة تطبيقات ثنائية اللغة، كل منها في مستودع مستقل.',
    liveDemo: 'عرض مباشر',
    sourceCode: 'الكود المصدري',
    linkNotConfigured: 'الرابط قريبًا',
    featuresLabel: 'أبرز المزايا',
    techLabel: 'التقنيات المستخدمة',
    items: {
      portfolio: {
        name: 'معرض أعمال المطوّر',
        category: 'موقع شخصي',
        summary: 'هذا الموقع: معرض أعمال ثنائي اللغة بالكامل، ينتقل فورًا بين العربية والإنجليزية ويتذكر اللغة المختارة.',
        features: ['نظام ترجمة قابل لإعادة الاستخدام', 'تخطيطات من اليمين ومن اليسار', 'نموذج تواصل سهل الوصول مع التحقق من البيانات'],
      },
      serviceCompany: {
        name: 'موقع شركة خدمات سعودية',
        category: 'موقع شركة',
        summary: 'موقع تعريفي لشركة خدمات سعودية يعرض الخدمات والأسئلة الشائعة ونموذج طلب عرض سعر.',
        features: ['نموذج طلب عرض سعر', 'روابط واتساب ووسائل التواصل', 'قائمة تنقل متجاوبة'],
      },
      clientflow: {
        name: 'ClientFlow لإدارة العملاء',
        category: 'تطبيق ويب',
        summary: 'نظام خفيف لإدارة علاقات العملاء يساعد الفرق الصغيرة على إدارة العملاء ومتابعة حالاتهم وتدوين الملاحظات.',
        features: ['إضافة العملاء وتعديلهم وحذفهم', 'البحث والتصفية حسب الحالة', 'ملاحظات لكل عميل'],
      },
      stockmate: {
        name: 'StockMate لإدارة المخزون',
        category: 'تطبيق ويب',
        summary: 'نظام لإدارة المخزون مع تنبيهات المخزون، وحساب قيمة المخزون، وسجل كامل لحركة الأصناف.',
        features: ['إدارة المنتجات', 'تنبيهات انخفاض المخزون', 'سجل حركة المخزون'],
      },
    },
  },
  services: {
    eyebrow: 'الخدمات',
    title: 'كيف أستطيع مساعدتك',
    subtitle: 'حلول برمجية عملية بالعربية أو الإنجليزية أو كلتيهما.',
    items: [
      {
        title: 'تطبيقات الويب',
        description: 'تطبيقات ويب بواجهات React أو Angular وخادم مبني باستخدام Spring Boot.',
      },
      {
        title: 'تطبيقات الجوال',
        description: 'تطبيقات لنظامي iOS وAndroid باستخدام React Native.',
      },
      {
        title: 'قواعد البيانات',
        description: 'تخزين بيانات التطبيقات وإدارتها باستخدام MySQL وPostgreSQL.',
      },
      {
        title: 'واجهات بالعربية والإنجليزية',
        description: 'تخطيطات من اليمين إلى اليسار ومن اليسار إلى اليمين تعمل بشكل صحيح في اللغتين.',
      },
    ],
  },
  experience: {
    eyebrow: 'الخبرات',
    title: 'الخبرات والتعليم',
    present: 'حتى الآن',
    groups: {
      work: 'الخبرات العملية',
      education: 'التعليم والشهادات',
    },
    items: {
      alRajhi: {
        role: 'مطوّر React Native',
        organization: 'مصرف الراجحي',
        description:
          'بنيت وطوّرت وحدات React Native لتطبيقات المصرف على iOS وAndroid، وأدرت المهام عبر Jira، واستخدمت Bitbucket لإدارة الإصدارات ومراجعة الكود.',
      },
      ntg: {
        role: 'مبرمج تطبيقات',
        organization: 'NTG Clarity Network، الرياض',
        description:
          'طوّرت مشروع متجر إلكتروني باستخدام Java وAngular وSpring Boot، وأضفت مزايا وأصلحت مشكلات في برنامج NTGApp، ودرّبت المتدربين الجدد على البرمجة.',
      },
      gulfInstitute: {
        role: 'دعم فني ومساعد إداري',
        organization: 'معهد الخليج للتدريب والتعليم، بريدة',
        description:
          'ثمانية أشهر. ثبّتت وهيّأت نظام Windows والبرامج الأساسية، وصنت أجهزة الشركة، وقدّمت دورات تدريبية في Microsoft Excel.',
      },
      khaleejInstitute: {
        role: 'دعم فني',
        organization: 'معهد الخليج للتدريب، الرياض',
        description:
          'ستة أشهر. ثبّتت وصنت نظام Windows والتطبيقات، وشخّصت أعطال الأجهزة والبرامج وأصلحتها، وساعدت المستخدمين في تثبيت Microsoft Office وTeams.',
      },
      reactNativeCourse: {
        role: 'دورة React Native - The Practical Guide',
        organization: 'منصة Udemy',
        description: 'دورة إلكترونية.',
      },
      javaCertificate: {
        role: 'شهادة Java Full Stack',
        organization: 'شركة NTG Clarity',
        description: 'برنامج تدريبي في تطوير Java المتكامل لمدة شهرين.',
      },
      bachelor: {
        role: 'بكالوريوس التقنية الهندسية في هندسة البرمجيات',
        organization: 'الكلية التقنية ببريدة',
        description: 'المؤسسة العامة للتدريب التقني والمهني.',
      },
      diploma: {
        role: 'دبلوم هندسة البرمجيات',
        organization: 'الكلية التقنية بينبع',
        description: 'المؤسسة العامة للتدريب التقني والمهني.',
      },
    },
  },
  cv: {
    eyebrow: 'السيرة الذاتية',
    title: 'سيرتي الذاتية',
    subtitle: 'ملخص من صفحة واحدة لخبراتي وتعليمي ومهاراتي.',
    fileLabel: 'ملف PDF',
    download: 'تحميل السيرة الذاتية',
    notConfigured: 'السيرة الذاتية قريبًا',
  },
  contact: {
    eyebrow: 'تواصل معي',
    title: 'لنعمل معًا',
    subtitle: 'أخبرني عن مشروعك وسأعود إليك في أقرب وقت ممكن.',
    channelsLabel: 'بيانات التواصل',
    channels: {
      email: 'البريد الإلكتروني',
      phone: 'الهاتف',
      linkedin: 'لينكدإن',
      github: 'جيت هب',
    },
    copyEmail: 'نسخ البريد',
    form: {
      title: 'أرسل رسالة',
      name: 'الاسم الكامل',
      namePlaceholder: 'مثال: سارة أحمد',
      email: 'البريد الإلكتروني',
      emailPlaceholder: 'name@company.com',
      projectType: 'نوع المشروع',
      projectTypePlaceholder: 'اختر نوع المشروع',
      projectTypes: {
        website: 'موقع شركة',
        webApp: 'تطبيق ويب أو لوحة تحكم',
        localization: 'تعريب عربي / إنجليزي',
        other: 'شيء آخر',
      },
      message: 'الرسالة',
      messagePlaceholder: 'بضعة أسطر عن أهدافك والجدول الزمني والميزانية',
      characterCount: 'عدد الأحرف: {count} من {max}',
      required: 'مطلوب',
      submit: 'إرسال الرسالة',
      submitting: 'جارٍ تجهيز الرسالة…',
      howItWorks: 'عند الإرسال سيُفتح تطبيق البريد لديك والرسالة جاهزة للإرسال. لا يحفظ هذا الموقع بياناتك.',
    },
    validation: {
      summary: 'يرجى تصحيح الحقول المحددة.',
      nameRequired: 'يرجى إدخال اسمك.',
      nameTooShort: 'الاسم قصير جدًا، يجب ألا يقل عن {min} من الأحرف.',
      emailRequired: 'يرجى إدخال بريدك الإلكتروني.',
      emailInvalid: 'يرجى إدخال بريد إلكتروني صحيح، مثل name@company.com.',
      projectTypeRequired: 'يرجى اختيار نوع المشروع.',
      messageRequired: 'يرجى كتابة رسالة قصيرة.',
      messageTooShort: 'يجب ألا تقل الرسالة عن {min} حرفًا.',
      messageTooLong: 'يجب ألا تزيد الرسالة على {max} حرف.',
    },
    notifications: {
      emailOpened: 'سيُفتح تطبيق البريد لديك الآن والرسالة جاهزة للإرسال.',
      emailNotConfigured: 'لم يُضبط البريد الإلكتروني للتواصل بعد، لذا تعذّر تجهيز الرسالة.',
      emailCopied: 'تم نسخ البريد الإلكتروني.',
      copyFailed: 'تعذّر النسخ تلقائيًا. يرجى تحديد العنوان ونسخه يدويًا.',
    },
  },
  footer: {
    tagline: 'تطبيقات ويب وجوال بالعربية والإنجليزية.',
    rights: '© {year} {name}. جميع الحقوق محفوظة.',
    builtWith: 'بُني باستخدام React وTypeScript وVite.',
    lastUpdated: 'آخر تحديث {date}',
    backToTop: 'العودة إلى الأعلى',
  },
}

export default ar
