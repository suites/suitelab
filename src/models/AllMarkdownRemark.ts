import { MarkdownRemark } from './MarkdownRemark';

interface MarkdownRemarkEdge {
  node: MarkdownRemark;
  next: MarkdownRemark;
  previous: MarkdownRemark;
}

export interface AllMarkdownRemark {
  edges: MarkdownRemarkEdge[];
}