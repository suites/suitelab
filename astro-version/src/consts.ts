// 사이트 기본 정보
export const SITE_TITLE = 'suite.lab';
export const SITE_DESCRIPTION = `기술과 커뮤니케이션의 힘이 세상을 바꾼다고 믿습니다.
편리한 세상으로 나아가기 위해 고민하고 개발합니다.`;
export const SITE_URL = 'https://suitee.me';
export const AUTHOR_NAME = 'yoon.homme';
export const AUTHOR_EMAIL = 'woosiks.io@gmail.com';
export const RESUME_URL = 'http://resume.suitee.me';

// 소셜 링크 타입 정의
export interface SocialLinks {
  instagram: string;
  github: string;
  linkedin: string;
}

export const SOCIAL_LINKS: SocialLinks = {
  instagram: 'yoon.homme',
  github: 'suites',
  linkedin: 'suitee',
};

// 카테고리 타입 정의
export interface Category {
  name: string;
  slug: string;
  color: string;
  icon: string;
  link: string;
}

export const CATEGORIES: readonly Category[] = [
  {
    name: 'Web',
    slug: 'web',
    color: '#0c9ee4',
    icon: '🌐',
    link: '/category/web',
  },
  {
    name: 'Network',
    slug: 'network',
    color: '#C0D545',
    icon: '🌿',
    link: '/category/network',
  },
  {
    name: 'Computer Science',
    slug: 'cs',
    color: '#ffa22b',
    icon: '💻',
    link: '/category/cs',
  },
  {
    name: 'Algorithm',
    slug: 'algorithm',
    color: '#0c9ee4',
    icon: '🧩',
    link: '/category/algorithm',
  },
  {
    name: 'Deep Learning',
    slug: 'deep-learning',
    color: '#C0D545',
    icon: '🧠',
    link: '/category/deep-learning',
  },
  {
    name: 'Infrastructure',
    slug: 'infrastructure',
    color: '#f7615f',
    icon: '🏗️',
    link: '/category/infrastructure',
  },
  {
    name: 'Infra',
    slug: 'infra',
    color: '#f7615f',
    icon: '🏗️',
    link: '/category/infra',
  },
] as const;

// 카테고리 타입 추론
export type CategorySlug = typeof CATEGORIES[number]['slug'];