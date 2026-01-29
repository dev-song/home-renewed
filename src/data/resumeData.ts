import { Github, Linkedin } from 'lucide-react';

import epicAiDashboard from '../assets/epic-ai_dashboard.webp';
import epicAiFeeds from '../assets/epic-ai_feeds.webp';
import epicAiCopilot from '../assets/epic-ai_copilot.webp';
import epicAiFinancialComparison from '../assets/epic-ai_financial-comparison.webp';
import epicAiResearchCenter from '../assets/epic-ai_research-center.webp';
import epicAiNewsArticle1 from '../assets/epic-ai_news-article-1.webp';
import epicAiNewsArticle2 from '../assets/epic-ai_news-article-2.webp';
import epicAiNewsArticle3 from '../assets/epic-ai_news-article-3.webp';
import epicFinanceCreditCard from '../assets/epic-finance_credit-card.webp';
import epicFinanceDashboard from '../assets/epic-finance_dashboard.webp';
import epicFinanceExport from '../assets/epic-finance_export.webp';
import epicFinanceHeatmap from '../assets/epic-finance_heatmap.webp';
import epicFinanceHeatmapYoutube from '../assets/epic-finance_heatmap_youtube.webp';
import epicFinanceIndustry from '../assets/epic-finance_industry.webp';
import { PROJECT_VIDEO } from '../constants/media';

const socialLinks = [
  { name: 'GitHub', url: import.meta.env.VITE_DEV_GITHUB_URL, icon: Github },
  { name: 'LinkedIn', url: import.meta.env.VITE_DEV_LINKEDIN_URL, icon: Linkedin },
];

const languageAgnosticData = {
  skills: [
    {
      category: 'Frontend',
      items: [
        'TypeScript',
        'React',
        'Vite',
        'Tanstack Query',
        'Tailwind CSS',
        'Next.js',
        'Highcharts',
        'GraphQL',
        'SCSS',
        'D3.js',
      ],
    },
    {
      category: 'Infra',
      items: [
        'AWS S3',
        'AWS CloudFront',
        'AWS Route53',
        'AWS AppSync',
        'AWS Lambda',
        'AWS Amplify',
        'GitHub Actions',
        'Docker',
      ],
    },
    { category: 'Tools', items: ['Git', 'Figma', 'Slack', 'Asana', 'Jira'] },
  ],
  media: {
    epicAi: [
      {
        type: 'video' as const,
        url: PROJECT_VIDEO.EPIC_AI_COPILOT,
        thumbnail: epicAiCopilot,
        alt: 'epic AI - Copilot',
      },
      {
        type: 'video' as const,
        url: PROJECT_VIDEO.EPIC_AI_RESEARCH_CENTER,
        thumbnail: epicAiResearchCenter,
        alt: 'epic AI - Research Center',
      },
      {
        type: 'video' as const,
        url: PROJECT_VIDEO.EPIC_AI_COMPANY_ANALYSIS,
        thumbnail: epicAiDashboard,
        alt: 'epic AI - Company Analysis',
      },
      {
        type: 'video' as const,
        url: PROJECT_VIDEO.EPIC_AI_FEEDS,
        thumbnail: epicAiFeeds,
        alt: 'epic AI - Feeds',
      },
      {
        type: 'image' as const,
        url: epicAiFinancialComparison,
        alt: 'epic AI - Financial Comparison',
      },
      {
        type: 'video' as const,
        url: PROJECT_VIDEO.EPIC_AI_NEWS_ARTICLE_1,
        thumbnail: epicAiNewsArticle1,
        alt: 'epic AI - News Article 1',
      },
      {
        type: 'video' as const,
        url: PROJECT_VIDEO.EPIC_AI_NEWS_ARTICLE_2,
        thumbnail: epicAiNewsArticle2,
        alt: 'epic AI - News Article 2',
      },
      {
        type: 'video' as const,
        url: PROJECT_VIDEO.EPIC_AI_NEWS_ARTICLE_3,
        thumbnail: epicAiNewsArticle3,
        alt: 'epic AI - News Article 3',
      },
    ],
    epicFinance: [
      {
        type: 'video' as const,
        url: PROJECT_VIDEO.EPIC_FINANCE_COMPANY,
        thumbnail: epicFinanceDashboard,
        alt: 'epic Finance - Company Data',
      },
      {
        type: 'video' as const,
        url: PROJECT_VIDEO.EPIC_FINANCE_INDUSTRY,
        thumbnail: epicFinanceIndustry,
        alt: 'epic Finance - Industry Data',
      },
      {
        type: 'video' as const,
        url: PROJECT_VIDEO.EPIC_FINANCE_CREDIT_CARD,
        thumbnail: epicFinanceCreditCard,
        alt: 'epic Finance - Credit Card Data',
      },
      {
        type: 'video' as const,
        url: PROJECT_VIDEO.EPIC_FINANCE_EXPORT,
        thumbnail: epicFinanceExport,
        alt: 'epic Finance - Trade Export Data',
      },
      {
        type: 'video' as const,
        url: PROJECT_VIDEO.EPIC_FINANCE_HEATMAP,
        thumbnail: epicFinanceHeatmap,
        alt: 'epic Finance - Heatmap',
      },
      {
        type: 'image' as const,
        url: epicFinanceHeatmapYoutube,
        alt: 'epic Finance - Heatmap YouTube Broadcast',
      },
    ],
  },
};

const resumeKo = {
  hero: {
    name: '송상수',
    title: '소프트웨어 엔지니어',
    tagline: '금융 데이터 시각화를 주력으로, 제품 생애주기 전반을 아우르는 웹 프론트엔드 개발자',
    socials: socialLinks,
    email: import.meta.env.VITE_DEV_EMAIL,
  },
  about: {
    description: [
      '실시간 금융 데이터 및 시계열 데이터 시각화를 주력으로 다뤄온 웹 프론트엔드 개발자 송상수입니다.',
      'TypeScript와 React를 기반으로 GraphQL(AWS AppSync), SSE 스트리밍, 실시간 무한스크롤 피드를 구현·최적화한 경험이 있습니다. Primitive 컴포넌트와 Compound Component 패턴 기반의 디자인 시스템을 구축하고 지속적으로 고도화했습니다.',
      'GitHub Actions + AWS(Amplify·S3·CloudFront)로 제품 배포 프로세스에 CI/CD를 적용하였고, 데이터 시각화 라이브러리인 Highcharts, D3를 재사용하기 편하게 모듈화함으로써 유지보수성을 개선해왔습니다.',
      '서비스의 가장 앞단에서 사용자와 만나는 웹 프론트엔드 분야에 매력을 느껴 커리어를 시작한 이래, 지금은 기능 개발을 포함한 제품 생애주기 전반에 관심을 갖고 개발을 하고 있습니다.',
      '좋은 동료이자 신뢰할 수 있는 전문가로서, 사용자가 쓰기에 좋으면서 기술적으로도 안정적·효율적인 제품을 만들고 싶습니다.',
    ],
  },
  experience: [
    {
      company: '한경에이셀',
      role: '소프트웨어 엔지니어',
      period: '2020.12 - 2025.12',
      description:
        '자사 금융 AI 및 빅데이터 분석 플랫폼 프론트엔드 개발의 주축으로 참여했습니다. 각종 데이터 시각화 구현 및 디자인 시스템 구축을 통해 개발 효율성을 지속적으로 향상시켰습니다.',
    },
    {
      company: 'JTBC콘텐트허브',
      role: '인사담당자',
      period: '2017.09 - 2019.05',
      description:
        '인사 운영 업무 전반을 담당하며, 콘텐츠 제작 환경에 최적화된 인사 시스템을 구축하고 급여 및 채용 프로세스를 전담했습니다.',
    },
  ],
  projects: [
    {
      title: 'epic AI',
      description:
        '금융 리서치 AI 어시스턴트 SaaS입니다. KOSPI/KOSDAQ 상장사 정보 대시보드 및 리서치 테이블, 실시간 피드, LLM 코파일럿 인터페이스를 구축했고 자체 디자인 시스템을 고도화했습니다. 외부 데이터 제공자와의 협업을 통해 데이터 특성에 맞는 UX를 적용했습니다. 2025년 10월 출시 후 국내 주요 증권사 및 금융기관에서 도입해 사용 중입니다.',
      technologies: ['TypeScript', 'React', 'Vite', 'Tanstack Query', 'Tailwind CSS', 'Highcharts'],
      link: 'https://home.epic.ai.kr/',
      media: languageAgnosticData.media.epicAi,
    },
    {
      title: 'epic Finance',
      description:
        '금융 데이터 SaaS입니다. KOSPI/KOSDAQ 시장 정보 대시보드, 상장사 정보 대시보드, 산업군별 통계 대시보드, 신용카드 및 무역 거래 데이터 시각화 페이지를 구축했습니다. GraphQL과 WebSocket을 활용해 실시간 주가/지수 변동을 구현했습니다. 상장사별 시가총액 비중을 시각화한 히트맵 페이지는 한경TV YouTube 채널을 통해 방송되고 있습니다.',
      technologies: [
        'TypeScript',
        'React',
        'Vite',
        'Highcharts',
        'GraphQL',
        'WebSocket',
        'SCSS',
        'D3',
      ],
      link: 'https://bigfinance.co.kr/home',
      media: languageAgnosticData.media.epicFinance,
    },
  ],
  education: [
    {
      school: '한국방송통신대학교',
      degree: '컴퓨터과학',
      period: '2022.03 - 2024.02',
    },
    {
      school: '한양대학교',
      degree: '경제금융학',
      period: '2010.03 - 2017.08',
    },
  ],
  certificates: [
    {
      name: 'AWS Certified Developer - Associate',
      date: '2025.01',
    },
    {
      name: 'AWS Certified Solutions Architect - Associate',
      date: '2024.09',
    },
    {
      name: '정보처리기사',
      date: '2024.09',
    },
  ],
  skills: languageAgnosticData.skills,
  contact: {
    email: import.meta.env.VITE_DEV_EMAIL,
    phone: '+82 010-3601-8508',
    location: '대한민국, 서울',
  },
};

const resumeEn = {
  hero: {
    name: 'Sangsu Song',
    title: 'Software Engineer',
    tagline:
      'Web Frontend Developer specializing in financial data visualization and covering the full product lifecycle',
    socials: socialLinks,
    email: import.meta.env.VITE_DEV_EMAIL,
  },
  about: {
    description: [
      'I am Sangsu Song, a Web Frontend Developer specializing in real-time financial data and time-series data visualization.',
      'I have experience implementing and optimizing GraphQL (AWS AppSync), SSE streaming, and real-time infinite scroll feeds using TypeScript and React. I have built and continuously refined design systems based on Primitive components and Compound Component patterns.',
      'I applied CI/CD to product deployment using GitHub Actions + AWS (Amplify, S3, CloudFront) and improved maintainability by modularizing data visualization libraries like Highcharts and D3.',
      'Started my career with a passion for Web Frontend on the user-facing side, and I am now interested in the entire software development lifecycle including feature development.',
      'As a reliable colleague and expert, I aim to build products that are user-friendly, technically stable, and efficient.',
    ],
  },
  experience: [
    {
      company: 'Hankyung Aicel',
      role: 'Software Engineer',
      period: '2020.12 - 2025.12',
      description:
        'Led the frontend development of a financial AI and big data analysis platform. Continuously improved development efficiency through data visualization implementations and design system construction.',
    },
    {
      company: 'JTBC ContentHub',
      role: 'HR Manager',
      period: '2017.09 - 2019.05',
      description:
        'Managed overall HR operations, established an HR system optimized for content production, and handled payroll and recruitment.',
    },
  ],
  projects: [
    {
      title: 'epic AI',
      description:
        'Financial Research AI Assistant SaaS. Built dashboards for KOSPI/KOSDAQ listed companies, research tables, real-time feeds, and LLM copilot interfaces. Enhanced the proprietary design system and applied UX tailored to data characteristics. Adopted by major domestic securities firms and financial institutions since its launch in October 2025.',
      technologies: ['TypeScript', 'React', 'Vite', 'Tanstack Query', 'Tailwind CSS', 'Highcharts'],
      link: 'https://home.epic.ai.kr/',
      media: languageAgnosticData.media.epicAi,
    },
    {
      title: 'epic Finance',
      description:
        'Financial Data SaaS. Built dashboards for KOSPI/KOSDAQ market info, listed company info, industry statistics, and visualized credit card/trade data. Implemented real-time stock/index fluctuations using GraphQL and WebSocket. The market cap heatmap is broadcast on 한경TV YouTube channel.',
      technologies: [
        'TypeScript',
        'React',
        'Vite',
        'Highcharts',
        'GraphQL',
        'WebSocket',
        'SCSS',
        'D3',
      ],
      link: 'https://bigfinance.co.kr/home',
      media: languageAgnosticData.media.epicFinance,
    },
  ],
  education: [
    {
      school: 'Korea National Open University',
      degree: 'Computer Science',
      period: '2022.03 - 2024.02',
    },
    {
      school: 'Hanyang University',
      degree: 'Economics & Finance',
      period: '2010.03 - 2017.08',
    },
  ],
  certificates: [
    {
      name: 'AWS Certified Developer - Associate',
      date: '2025.01',
    },
    {
      name: 'AWS Certified Solutions Architect - Associate',
      date: '2024.09',
    },
    {
      name: 'Engineer Information Processing (정보처리기사)',
      date: '2024.09',
    },
  ],
  skills: languageAgnosticData.skills,
  contact: {
    email: import.meta.env.VITE_DEV_EMAIL,
    phone: '+82 010-3601-8508',
    location: 'Seoul, Republic of Korea',
  },
} satisfies typeof resumeKo;

export const resumeData = {
  ko: resumeKo,
  en: resumeEn,
};
