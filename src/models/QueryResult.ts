import { AllMarkdownRemark } from './AllMarkdownRemark';
import { MarkdownRemark } from './MarkdownRemark';

export interface QueryResult {
  site: Site;
  markdownRemark: MarkdownRemark;
  // allMarkdownRemark: AllMarkdownRemark;
}

interface Site {
  siteMetadata: SiteMetadata;
}
interface SiteMetadata {
  title: string;
  author: string;
  description: string;
  siteUrl: string;
  resumeUrl: string;
  email: string;
  social: Social;
  categories: Category[];
}

interface Social {
  instagram: string;
  github: string;
  linkedin: string;
}

export interface Category {
  name: string;
  slug: string;
  color: string;
  icon: string;
  link: string;
}
