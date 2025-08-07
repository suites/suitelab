import { defineCollection, z } from 'astro:content';

// 블로그 포스트 스키마 정의 (우리 스타일 + 기본 템플릿 호환)
const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    // 우리 스타일 필드들
    date: z
      .string()
      .transform((str) => new Date(str))
      .optional(),
    category: z
      .enum([
        'web',
        'network',
        'cs',
        'algorithm',
        'deep-learning',
        'infrastructure',
        'infra', // infrastructure의 줄임말
      ])
      .optional(),
    emoji: z.string().optional(),
    slug: z.string().optional(),
    // 기본 템플릿 호환 필드들 (더 유연하게)
    pubDate: z
      .union([z.string(), z.date()])
      .transform((val) => (typeof val === 'string' ? new Date(val) : val))
      .optional(),
    updatedDate: z
      .union([z.string(), z.date()])
      .transform((val) => (typeof val === 'string' ? new Date(val) : val))
      .optional(),
    heroImage: z
      .union([
        z.string(), // 기본 문자열 경로
        z.object({
          src: z.string(),
          width: z.number(),
          height: z.number(),
          format: z.enum([
            'png',
            'jpg',
            'jpeg',
            'tiff',
            'webp',
            'gif',
            'svg',
            'avif',
          ]),
        }),
      ])
      .optional(),
  }),
});

export const collections = { 
  blog 
};

// 타입 추론을 위한 export
export type BlogPost = z.infer<typeof blog.schema>;