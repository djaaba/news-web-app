import React from 'react';
import dayjs from 'dayjs';
import cn from 'classnames';

import { ArticleCardProps } from './ArticleCard.props';
import styles from './ArticleCard.module.css';

export const ArticleCard = React.forwardRef(
  (
    { article, className }: ArticleCardProps,
    ref: React.ForwardedRef<HTMLDivElement>
  ): JSX.Element => {
    const { title, image, description, url, publishedAt } = article;

    return (
      <div className={cn(styles.container, className)} ref={ref}>
        <a aria-label={title + 'link'} href={url} className={styles.imgContainer}>
          <img alt={title} src={image} />
        </a>
        <div className={styles.text}>
          <p>{title}</p>
          <p>{description}</p>
          <p>Posted: {dayjs(publishedAt).format('MMM D, YYYY h:mm A')}</p>
          <a href={url}>Read more...</a>
        </div>
      </div>
    );
  }
);
