import type { CollectionEntry } from 'astro:content';

// 블로그 포스트 타입
export type BlogPost = CollectionEntry<'blog'>;
export type BlogPostData = BlogPost['data'];

// 컴포넌트 Props 타입들
export interface LayoutProps {
  title?: string;
  description?: string;
}

export interface BlogPostLayoutProps extends BlogPostData {
  content?: string;
}

export interface PostCardProps {
  post: BlogPost;
}

export interface CategoryLabelProps {
  category: string;
  isLink?: boolean;
}

export interface HeaderProps {
  title?: string;
  location?: Location;
}

// 유틸리티 타입들
export interface DateFormatOptions {
  year?: 'numeric' | '2-digit';
  month?: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow';
  day?: 'numeric' | '2-digit';
  locale?: string;
}

// SEO 관련 타입
export interface SEOProps {
  title?: string | undefined;
  description?: string | undefined;
  canonical?: string | undefined;
  image?: string | undefined;
  type?: 'website' | 'article' | undefined;
}