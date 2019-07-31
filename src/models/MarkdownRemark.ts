interface Node {
  id: string;
  parent: Node;
  children: Node[];
}

interface WordCount {
  paragraphs: number;
  sentences: number;
  words: number;
}

interface FrontMatter {
  title: string;
  date: string;
  category: string;
  emoji: string;
  description: string;
}

interface Fields {
  slug: string;
}

interface MarkdownHeading {
  value: string;
  depth: number;
}

export interface MarkdownRemark {
  id: string;
  parent: Node;
  children: Node[];
  frontmatter: FrontMatter;
  rawMarkdownBody: string;
  fileAbsolutePath: string;
  fields: Fields;
  html: string;
  htmlAst: object;
  excerpt: string;
  headings: MarkdownHeading[];
  timeToRead: number;
  tableOfContents: string;
  wordCount: WordCount;
}
