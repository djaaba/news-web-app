import React from 'react';

import { TArticle, TNewsItem } from '../../../types';
import { fetchNews } from '../../../../api';
import { getErrorMessage } from '../../../../utils';

export const useObserver = (query: string, pageNumber: number | string) => {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string>('');
  const [articles, setArticles] = React.useState<TArticle[]>([]);
  const [hasMore, setHasMore] = React.useState<boolean>(false);
  const controller = React.useRef<AbortController>(new AbortController());

  React.useEffect(() => {
    setArticles([]);
  }, [query]);

  React.useEffect(() => {
    setLoading(true);
    fetchNews<TNewsItem>({ q: query, page: pageNumber }, controller.current.signal)
      .then((res: { data: TNewsItem }) => {
        setArticles((prevArticles) => {
          return [...prevArticles, ...res.data.articles];
        });
        setHasMore(res.data.articles.length > 0);
      })
      .catch((e: unknown) => {
        controller.current.abort();
        setError(getErrorMessage(e));
      })
      .finally(() => {
        setLoading(false);
      });
    return () => controller.current.abort();
  }, [pageNumber, error]);

  return {
    loading,
    error,
    articles,
    hasMore,

    setError,
  };
};
