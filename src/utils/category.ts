import { CATEGORIES } from '@/consts';
import type { Category, CategorySlug } from '@/consts';

/**
 * 카테고리 슬러그로 카테고리 정보 찾기
 */
export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((category) => category.slug === slug);
}

/**
 * 카테고리 슬러그 유효성 검사
 */
export function isValidCategorySlug(slug: string): slug is CategorySlug {
  return CATEGORIES.some((category) => category.slug === slug);
}

/**
 * 모든 카테고리 슬러그 목록 반환
 */
export function getAllCategorySlugs(): CategorySlug[] {
  return CATEGORIES.map((category) => category.slug as CategorySlug);
}

/**
 * 카테고리명으로 카테고리 정보 찾기
 */
export function getCategoryByName(name: string): Category | undefined {
  return CATEGORIES.find(
    (category) => category.name.toLowerCase() === name.toLowerCase(),
  );
}
