import { SITE_TITLE, SITE_DESCRIPTION, SITE_URL } from '@/consts';
import type { SEOProps } from '@/types';

/**
 * SEO 메타데이터 생성
 */
export function generateSEO(props: Partial<SEOProps> = {}): Required<SEOProps> {
  const {
    title,
    description = SITE_DESCRIPTION,
    canonical,
    image,
    type = 'website',
  } = props;

  const fullTitle = title ? `${title} | ${SITE_TITLE}` : SITE_TITLE;
  const fullCanonical = canonical || SITE_URL;
  const fullImage = image || `${SITE_URL}/images/ogp.png`;

  return {
    title: fullTitle,
    description,
    canonical: fullCanonical,
    image: fullImage,
    type,
  };
}

/**
 * 페이지 제목 생성
 */
export function generatePageTitle(title?: string): string {
  return title ? `${title} | ${SITE_TITLE}` : SITE_TITLE;
}

/**
 * Open Graph 이미지 URL 생성
 */
export function generateOGImageUrl(title?: string): string {
  if (!title) return `${SITE_URL}/images/ogp.png`;
  
  // 제목이 있으면 동적 OG 이미지 생성 (향후 구현)
  const encodedTitle = encodeURIComponent(title);
  return `${SITE_URL}/api/og?title=${encodedTitle}`;
}