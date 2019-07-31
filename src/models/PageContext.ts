import { MarkdownRemark } from './QueryResult';

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
