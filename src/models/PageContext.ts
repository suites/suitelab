import { MarkdownRemark } from './MarkdownRemark';

export interface RelatedPost {
  node: MarkdownRemark;
}

export interface PostPageContext {
  relatedPosts: RelatedPost[];
  slug: string;
}

export interface CategoryPageContext {
  category: string;
}
