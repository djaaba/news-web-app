export type TNewsItem = {
  totalArticles: number;
  articles: TArticle[];
};

export type TArticle = {
  title: string;
  description: string;
  content: string;
  url: string;
  image: string;
  publishedAt: string;
  source: {
    name: string;
    url: string;
  };
};

export type TQueryParams = {
  q: string;
  lang?: string;
  country?: string;
  max?: number;
  in?: TAttributesForSearch;
  nullable?: TAttributesForSearch;
  from?: string;
  to?: string;
  sortby?: 'publishedAt' | 'relevance';
  page?: number | string;
  expand?: 'content';
};

type TAttributesForSearch = [TAttribute?, TAttribute?, TAttribute?];
type TAttribute = 'title' | 'description' | 'content';
