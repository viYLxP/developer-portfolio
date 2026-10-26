/**
 * English dictionary. This file defines the shape of every dictionary:
 * `ar.ts` is typed as `Dictionary`, so a key missing from Arabic is a
 * TypeScript error.
 *
 * Personal details come from the owner's CV. Keep this file and ar.ts in sync.
 */
const en = {
  meta: {
    title: 'Mahmoud Saeed · Software Engineer',
    description:
      'Portfolio of Mahmoud Saeed, a software engineer building web and mobile applications with React, React Native, Angular, Java and Spring Boot.',
  },
  a11y: {
    skipToContent: 'Skip to main content',
    mainNavigation: 'Main navigation',
    footerNavigation: 'Footer navigation',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    switchLanguage: 'Switch language to {language}',
    opensInNewTab: '(opens in a new tab)',
    notifications: 'Notifications',
  },
  common: {
    placeholder: 'Placeholder',
    notConfigured: 'Not configured yet',
    dismiss: 'Dismiss',
  },
  profile: {
    name: 'Mahmoud Saeed',
    initials: 'MS',
    role: 'Software Engineer',
    location: 'Riyadh, Saudi Arabia',
  },
  nav: {
    about: 'About',
    skills: 'Skills',
    projects: 'Projects',
    services: 'Services',
    experience: 'Experience',
    cv: 'CV',
    contact: 'Contact',
  },
  hero: {
    greeting: "Hello, I'm",
    headline: 'I build web and mobile applications, from the interface to the database.',
    intro:
      'Software engineer with hands-on experience building React Native banking apps at Al Rajhi Bank and developing with Java, Angular and Spring Boot at NTG Clarity.',
    primaryCta: 'View my work',
    secondaryCta: 'Get in touch',
    availability: 'Open to new opportunities',
    statsLabel: 'Highlights',
    stats: {
      projects: 'Featured projects',
      languages: 'Languages in every project',
      directions: 'Layout directions: RTL and LTR',
    },
  },
  about: {
    eyebrow: 'About me',
    title: 'Clean code, clear interfaces, both directions.',
    paragraphs: [
      'I am a full stack developer working with Java, C#, Python, PHP and JavaScript. I build web and mobile interfaces with React, Angular and React Native, server-side applications with Spring Boot, and data layers on MySQL and PostgreSQL.',
      'I hold a Bachelor of Engineering Technology in Software Engineering (2024) and a Diploma in Software Engineering (2017). Before moving into development, I worked in technical support: installing systems, fixing hardware and software issues and training users.',
    ],
    factsLabel: 'Quick facts',
    facts: {
      location: 'Location',
      languages: 'Languages',
      focus: 'Focus',
    },
    factValues: {
      languages: 'Arabic, English',
      focus: 'Web and mobile applications, from interface to database',
    },
  },
  skills: {
    eyebrow: 'Skills',
    title: 'Technologies I work with',
    subtitle: 'Languages, frameworks and databases I use to build web and mobile applications.',
    groups: [
      {
        title: 'Programming languages',
        items: ['Java', 'C#', 'Python', 'PHP', 'JavaScript'],
      },
      {
        title: 'Frontend & mobile',
        items: ['React', 'Angular', 'React Native', 'HTML/CSS'],
      },
      {
        title: 'Backend',
        items: ['Spring Boot'],
      },
      {
        title: 'Databases',
        items: ['MySQL', 'PostgreSQL'],
      },
      {
        title: 'Tools',
        items: ['Bitbucket', 'Jira'],
      },
    ],
  },
  projects: {
    eyebrow: 'Featured projects',
    title: 'Selected work',
    subtitle: 'Four bilingual applications, each built as a separate repository.',
    liveDemo: 'Live demo',
    sourceCode: 'Source code',
    linkNotConfigured: 'Link coming soon',
    featuresLabel: 'Key features',
    techLabel: 'Built with',
    items: {
      portfolio: {
        name: 'Developer Portfolio',
        category: 'Personal website',
        summary: 'This site: a fully bilingual portfolio with instant Arabic and English switching and a remembered language choice.',
        features: ['Reusable translation system', 'RTL and LTR layouts', 'Accessible contact form with validation'],
      },
      serviceCompany: {
        name: 'Saudi Service Company Website',
        category: 'Business website',
        summary: 'A marketing site for a Saudi service company with service listings, FAQs and a request-a-quote form.',
        features: ['Request a quote form', 'WhatsApp and contact links', 'Responsive navigation'],
      },
      clientflow: {
        name: 'ClientFlow CRM',
        category: 'Web application',
        summary: 'A lightweight CRM for small teams to manage customers, track their status and keep notes.',
        features: ['Customer create, edit and delete', 'Search and status filters', 'Notes per customer'],
      },
      stockmate: {
        name: 'StockMate Inventory',
        category: 'Web application',
        summary: 'An inventory manager with stock alerts, inventory value calculations and a full movement history.',
        features: ['Product management', 'Low stock alerts', 'Stock movement history'],
      },
    },
  },
  services: {
    eyebrow: 'Services',
    title: 'How I can help',
    subtitle: 'Practical software, delivered in Arabic, English or both.',
    items: [
      {
        title: 'Web applications',
        description: 'Web applications with React or Angular on the front end and Spring Boot on the back end.',
      },
      {
        title: 'Mobile apps',
        description: 'Cross-platform iOS and Android apps built with React Native.',
      },
      {
        title: 'Databases',
        description: 'Storing and managing application data with MySQL and PostgreSQL.',
      },
      {
        title: 'Arabic & English interfaces',
        description: 'Right-to-left and left-to-right layouts that work properly in both languages.',
      },
    ],
  },
  experience: {
    eyebrow: 'Experience',
    title: 'Experience and education',
    present: 'Present',
    groups: {
      work: 'Work experience',
      education: 'Education and certifications',
    },
    items: {
      alRajhi: {
        role: 'React Native Developer',
        organization: 'Al Rajhi Bank',
        description:
          "Built and maintained React Native modules for the bank's iOS and Android apps. Managed tasks in Jira and used Bitbucket for version control and code reviews.",
      },
      ntg: {
        role: 'Applications Programmer',
        organization: 'NTG Clarity Network, Riyadh',
        description:
          'Developed an e-commerce project with Java, Angular and Spring Boot, added features and fixed issues in the NTGApp program, and trained new programming trainees.',
      },
      gulfInstitute: {
        role: 'Technical Support and Administrative Assistant',
        organization: 'Gulf Institute for Training and Education, Buraydah',
        description:
          'Eight months. Installed and configured Windows and software, maintained company hardware and ran Microsoft Excel training sessions.',
      },
      khaleejInstitute: {
        role: 'Technical Support',
        organization: 'Al Khaleej Training Institute, Riyadh',
        description:
          'Six months. Installed and maintained Windows and applications, fixed hardware and software issues, and helped users set up Microsoft Office and Teams.',
      },
      reactNativeCourse: {
        role: 'React Native - The Practical Guide [2025]',
        organization: 'Udemy',
        description: 'Online course.',
      },
      javaCertificate: {
        role: 'Java Full Stack Certification',
        organization: 'NTG Clarity',
        description: 'Two-month full stack Java program.',
      },
      bachelor: {
        role: 'Bachelor of Engineering Technology in Software Engineering',
        organization: 'Technical College, Buraydah',
        description: 'General Organization for Technical and Vocational Training.',
      },
      diploma: {
        role: 'Diploma in Software Engineering',
        organization: 'Technical College, Yanbu',
        description: 'General Organization for Technical and Vocational Training.',
      },
    },
  },
  cv: {
    eyebrow: 'CV',
    title: 'My CV',
    subtitle: 'A one-page summary of my experience, education and skills.',
    fileLabel: 'PDF file',
    download: 'Download CV',
    notConfigured: 'CV coming soon',
  },
  contact: {
    eyebrow: 'Contact',
    title: "Let's work together",
    subtitle: 'Tell me about your project and I will get back to you as soon as possible.',
    channelsLabel: 'Contact details',
    channels: {
      email: 'Email',
      phone: 'Phone',
      linkedin: 'LinkedIn',
      github: 'GitHub',
    },
    copyEmail: 'Copy email',
    form: {
      title: 'Send a message',
      name: 'Full name',
      namePlaceholder: 'e.g. Sara Ahmed',
      email: 'Email address',
      emailPlaceholder: 'name@company.com',
      projectType: 'Project type',
      projectTypePlaceholder: 'Select a project type',
      projectTypes: {
        website: 'Business website',
        webApp: 'Web app or dashboard',
        localization: 'Arabic / English localization',
        other: 'Something else',
      },
      message: 'Message',
      messagePlaceholder: 'A few lines about your goals, timeline and budget',
      characterCount: '{count} / {max} characters',
      required: 'required',
      submit: 'Send message',
      submitting: 'Preparing your email…',
      howItWorks:
        'Sending opens your email app with this message ready to send. This site does not store your details.',
    },
    validation: {
      summary: 'Please correct the highlighted fields.',
      nameRequired: 'Please enter your name.',
      nameTooShort: 'Name must be at least {min} characters.',
      emailRequired: 'Please enter your email address.',
      emailInvalid: 'Please enter a valid email address, like name@company.com.',
      projectTypeRequired: 'Please choose a project type.',
      messageRequired: 'Please write a short message.',
      messageTooShort: 'Message must be at least {min} characters.',
      messageTooLong: 'Message must be {max} characters or fewer.',
    },
    notifications: {
      emailOpened: 'Your email app should now open with the message ready to send.',
      emailNotConfigured: 'The contact email is not configured yet, so the message could not be prepared.',
      emailCopied: 'Email address copied to clipboard.',
      copyFailed: 'Could not copy automatically. Please select the address and copy it.',
    },
  },
  footer: {
    tagline: 'Web and mobile applications in Arabic and English.',
    rights: '© {year} {name}. All rights reserved.',
    builtWith: 'Built with React, TypeScript and Vite.',
    lastUpdated: 'Last updated {date}',
    backToTop: 'Back to top',
  },
}

export type Dictionary = typeof en

export default en
