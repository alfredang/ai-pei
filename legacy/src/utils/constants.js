import {
  HiAcademicCap,
  HiBookOpen,
  HiSparkles,
  HiShieldCheck,
  HiCpuChip,
  HiBuildingOffice2,
  HiCodeBracket,
  HiChartBar,
  HiRocketLaunch,
} from 'react-icons/hi2'

export const NAV_LINKS = [
  { label: 'Home', to: 'home' },
  { label: 'About', to: 'about' },
  {
    label: 'Portfolio',
    to: 'services',
    dropdown: true,
    children: [
      {
        icon: HiAcademicCap,
        title: 'Training Management System',
        description: 'End-to-end course scheduling, enrollment & certification tracking.',
        to: 'services',
        accent: 'blue',
      },
      {
        icon: HiBookOpen,
        title: 'Learning Management System',
        description: 'Interactive eLearning delivery with analytics & instructor dashboards.',
        to: 'services',
        accent: 'cyan',
      },
      {
        icon: HiSparkles,
        title: 'AI-Powered Solutions',
        description: 'Intelligent automation, smart chatbots & AI-driven websites.',
        to: 'services',
        accent: 'purple',
      },
    ],
  },
  { label: 'Why Us', to: 'why-us' },
  { label: 'Contact', to: 'contact' },
]

export const SERVICES = [
  {
    id: 'tms',
    icon: HiAcademicCap,
    title: 'Training Management System',
    description:
      'Streamline your entire training lifecycle with our comprehensive TMS platform. From scheduling to certification, manage it all in one place.',
    features: [
      'Course scheduling & management',
      'Enrollment & registration workflows',
      'Reporting & analytics dashboards',
      'Scalable for institutions of any size',
    ],
    accent: 'blue',
  },
  {
    id: 'lms',
    icon: HiBookOpen,
    title: 'Learning Management System',
    description:
      'Deliver engaging, interactive learning experiences with our AI-enhanced LMS. Built for modern learners and educators alike.',
    features: [
      'Interactive eLearning delivery',
      'Assessment & progress tracking',
      'Instructor dashboards & analytics',
      'Cloud-based multi-tenant platform',
    ],
    accent: 'cyan',
  },
  {
    id: 'ai',
    icon: HiSparkles,
    title: 'AI-Powered Solutions',
    description:
      'Transform your business with intelligent automation. From AI-powered websites to custom workflow automation, we build the future.',
    features: [
      'Smart chatbots & virtual assistants',
      'AI content automation',
      'Intelligent lead generation',
      'Custom workflow automation',
    ],
    accent: 'purple',
  },
]

export const WHY_CHOOSE_US = [
  {
    icon: HiShieldCheck,
    title: 'Secure & Scalable',
    description:
      'Enterprise-grade security with infrastructure that scales alongside your growth.',
    accent: 'blue',
  },
  {
    icon: HiCpuChip,
    title: 'AI Integration',
    description:
      'Cutting-edge AI capabilities woven seamlessly into every solution we deliver.',
    accent: 'purple',
  },
  {
    icon: HiBuildingOffice2,
    title: 'Enterprise Ready',
    description:
      'Robust architecture built for organizations of any size, from startups to enterprises.',
    accent: 'cyan',
  },
  {
    icon: HiCodeBracket,
    title: 'Custom Development',
    description:
      'Tailored solutions engineered to fit your unique business requirements.',
    accent: 'blue',
  },
  {
    icon: HiChartBar,
    title: 'Data-Driven Insights',
    description:
      'Actionable analytics and intelligent reporting to power smarter decisions.',
    accent: 'purple',
  },
  {
    icon: HiRocketLaunch,
    title: 'Fast Deployment',
    description:
      'Rapid implementation with agile methodology. Go live faster without compromising quality.',
    accent: 'cyan',
  },
]

export const FOOTER_LINKS = {
  quickLinks: [
    { label: 'Home', to: 'home' },
    { label: 'About', to: 'about' },
    { label: 'Services', to: 'services' },
    { label: 'Contact', to: 'contact' },
  ],
  services: [
    { label: 'Training Management System', to: 'services' },
    { label: 'Learning Management System', to: 'services' },
    { label: 'AI-Powered Solutions', to: 'services' },
  ],
}

export const SOCIAL_LINKS = [
  { label: 'LinkedIn', url: '#', icon: 'FaLinkedin' },
  { label: 'Twitter', url: '#', icon: 'FaXTwitter' },
]
