import { defineCollection, z } from 'astro:content';

// 블로그 포스트 스키마 정의
const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string().transform((str) => new Date(str)),
    category: z.enum([
      'web', 
      'network', 
      'cs', 
      'algorithm', 
      'deep-learning', 
      'infrastructure'
    ]),
    emoji: z.string(),
    slug: z.string(),
    description: z.string().optional(),
  }),
});

export const collections = { 
  blog 
};

// 타입 추론을 위한 export
export type BlogPost = z.infer<typeof blog.schema>;