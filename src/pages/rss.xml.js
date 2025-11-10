import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';

export async function GET(context) {
  const posts = await getCollection('blog');
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: posts.map((post) => {
      // 우리 스타일의 slug 우선 사용
      const slug = post.data.slug || post.id;
      const date = post.data.date || post.data.pubDate;

      return {
        title: post.data.title,
        description: post.data.description || '',
        pubDate: date,
        link: `/${slug}/`,
      };
    }),
  });
}
