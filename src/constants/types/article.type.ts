export type SourceType = {
  name: string;
  url: string;
}

export type ArticleType = {
  title: string;
  description: string;
  content: string;
  url: string;
  image: string;
  publishedAt: string;
  source: SourceType
}

export interface ArticleResData {
  totalArticles: number;
  articles: Array<ArticleType>;
}

export interface ArticleParamType {
  q?: string;
  category?: string;
  from?: string;
  to?: string;
  lang?: string;
  max?: string;
}