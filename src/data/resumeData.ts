import { Github, Linkedin } from 'lucide-react';

import epicAiDashboard from '../assets/epic-ai_dashboard.webp';
import epicAiFeeds from '../assets/epic-ai_feeds.webp';
import epicAiCopilot from '../assets/epic-ai_copilot.webp';
import epicAiFinancialComparison from '../assets/epic-ai_financial-comparison.webp';
import epicAiResearchCenter from '../assets/epic-ai_research-center.webp';
import epicFinanceCreditCard from '../assets/epic-finance_credit-card.webp';
import epicFinanceDashboard from '../assets/epic-finance_dashboard.webp';
import epicFinanceExport from '../assets/epic-finance_export.webp';
import epicFinanceHeatmap from '../assets/epic-finance_heatmap.webp';
import epicFinanceHeatmapYoutube from '../assets/epic-finance_heatmap_youtube.webp';
import epicFinanceIndustry from '../assets/epic-finance_industry.webp';
import { PROJECT_VIDEO } from '../constants/media';

export const resumeData = {
  hero: {
    name: '송상수',
    title: '소프트웨어 엔지니어',
    tagline: '데이터 시각화 및 시스템 모듈화에 주력해 온 6년차 웹 프론트엔드 개발자',
    socials: [
      { name: 'GitHub', url: 'https://github.com/dev-song', icon: Github },
      { name: 'LinkedIn', url: 'https://www.linkedin.com/in/sangsu-song', icon: Linkedin },
    ],
    email: 'dvlprsong@gmail.com',
  },
  about: {
    description: [
      '실시간 금융 데이터와 시계열 시각화를 주력으로 다뤄온 프론트엔드 개발자 송상수입니다.',
      'TypeScript와 React를 기반으로 GraphQL(AWS AppSync), SSE 스트리밍, 실시간 무한스크롤 피드를 구현·최적화한 경험이 있습니다. Primitive 컴포넌트와 Compound Component 패턴 기반의 디자인 시스템을 구축하고 지속적으로 고도화했습니다.',
      'GitHub Actions + AWS(Amplify·S3·CloudFront)로 제품 배포 프로세스에 CI/CD를 적용하였고, 데이터 시각화 라이브러리인 Highcharts, D3를 재사용하기 편하게 모듈화함으로써 유지보수성을 개선해왔습니다.',
      '서비스의 가장 앞단에서 사용자와 만나는 웹 프론트엔드 분야에 매력을 느껴 커리어를 시작한 이래, 지금은 기능 개발을 포함한 제품 생애주기 전반에 관심을 갖고 개발을 하고 있습니다.',
      '좋은 동료이자 신뢰할 수 있는 전문가로서, 사용자가 쓰기 좋으면서 기술적으로도 안정적·효율적인 제품을 만들고 싶습니다.',
    ],
  },
  experience: [
    {
      company: '한경에이셀',
      role: '소프트웨어 엔지니어',
      period: '2020.12 - 2025.12',
      description:
        '자사 금융 AI 및 빅데이터 분석 플랫폼 프론트엔드 개발의 주축으로 참여했습니다. 데이터 시각화 및 디자인 시스템 구축을 통해 개발 효율성을 향상시켰습니다.',
    },
    {
      company: 'JTBC콘텐트허브',
      role: '인사담당자',
      period: '2017.09 - 2019.05',
      description:
        '인사 운영 업무 전반을 담당하며, 콘텐츠 제작 환경에 최적화된 인사 시스템을 구축하고 급여 및 채용 프로세스를 전담했습니다.',
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
        'd3.js',
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
  projects: [
    {
      title: 'epic AI',
      description:
        '금융 리서치 AI 어시스턴트 SaaS입니다. KOSPI/KOSDAQ 상장사 정보 대시보드 및 리서치 테이블, 실시간 피드, LLM 코파일럿 인터페이스를 구축했고 자체 디자인 시스템을 고도화했습니다. 외부 데이터 제공자와의 협업을 통해 데이터 특성에 맞는 UX를 적용했습니다. 2025년 10월 출시 직후 국내 주요 증권사 및 금융기관에서 도입되었습니다.',
      technologies: ['TypeScript', 'React', 'Vite', 'Tanstack Query', 'Tailwind CSS', 'Highcharts'],
      link: 'https://home.epic.ai.kr/',
      media: [
        {
          type: 'video' as const,
          url: PROJECT_VIDEO.EPIC_AI_FEEDS,
          thumbnail: epicAiFeeds,
          alt: 'epic AI 피드 화면',
        },
        {
          type: 'video' as const,
          url: PROJECT_VIDEO.EPIC_AI_RESEARCH_CENTER,
          thumbnail: epicAiResearchCenter,
          alt: 'epic AI 리서치 센터 화면',
        },
        {
          type: 'video' as const,
          url: PROJECT_VIDEO.EPIC_AI_COPILOT,
          thumbnail: epicAiCopilot,
          alt: 'epic AI 코파일럿 화면',
        },
        {
          type: 'video' as const,
          url: PROJECT_VIDEO.EPIC_AI_COMPANY_ANALYSIS,
          thumbnail: epicAiDashboard,
          alt: 'epic AI 기업분석 화면',
        },
        { type: 'image' as const, url: epicAiFinancialComparison },
      ],
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
      media: [
        {
          type: 'video' as const,
          url: PROJECT_VIDEO.EPIC_FINANCE_COMPANY,
          thumbnail: epicFinanceDashboard,
          alt: 'epic Finance 기업 데이터 화면',
        },
        {
          type: 'video' as const,
          url: PROJECT_VIDEO.EPIC_FINANCE_INDUSTRY,
          thumbnail: epicFinanceIndustry,
          alt: 'epic Finance 산업 데이터 화면',
        },
        {
          type: 'video' as const,
          url: PROJECT_VIDEO.EPIC_FINANCE_CREDIT_CARD,
          thumbnail: epicFinanceCreditCard,
          alt: 'epic Finance 신용카드 데이터 화면',
        },
        {
          type: 'video' as const,
          url: PROJECT_VIDEO.EPIC_FINANCE_EXPORT,
          thumbnail: epicFinanceExport,
          alt: 'epic Finance 무역 데이터 화면',
        },
        {
          type: 'video' as const,
          url: PROJECT_VIDEO.EPIC_FINANCE_HEATMAP,
          thumbnail: epicFinanceHeatmap,
          alt: 'epic Finance 히트맵 화면',
        },
        {
          type: 'image' as const,
          url: epicFinanceHeatmapYoutube,
          alt: 'epic Finance 히트맵 YouTube 방송 화면',
        },
      ],
    },
  ],
  contact: {
    email: 'dvlprsong@gmail.com',
    phone: '+82 010-3601-8508',
    location: '대한민국, 서울',
  },
};
