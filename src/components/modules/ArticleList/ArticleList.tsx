import React from 'react';

import { ArticleListProps } from './ArticleList.props';
import styles from './ArticleList.module.css';

import { ArticleCard } from '../../common/ArticleCard/ArticleCard';
import { getId } from '../../../utils';
import { useObserver } from './hooks/useObserver';
import { TArticle } from '../../types';

export const ArticleList = ({ className }: ArticleListProps): JSX.Element => {
  const [query, _] = React.useState('moscow');
  const [pageNumber, setPageNumber] = React.useState(1);

  const { setError, articles, hasMore, loading, error } = useObserver(query, pageNumber);

  const observer = React.useRef<IntersectionObserver>();

  const lastElementRef = React.useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          if (error) {
            setError('');
          } else {
            setPageNumber((prevPageNumber) => prevPageNumber + 1);
          }
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <>
      <ul className={styles.list}>
        {articles.map((article: TArticle) => (
          <ArticleCard className={styles.elem} article={article} key={getId()} />
        ))}
        <div ref={lastElementRef}></div>
      </ul>
      {error && <p>{error}</p>}
    </>
  );
};
