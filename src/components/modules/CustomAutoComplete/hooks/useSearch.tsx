import React from 'react';
import { Select, Skeleton } from 'antd';
import { AxiosResponse } from 'axios';

import styles from '../CustomAutoComplete.module.css';

import { getErrorMessage, getId } from '../../../../utils';
import { useDebounce } from '../../../../hooks';
import { TArticle, TNewsItem } from '../../../types';
import { fetchNews } from '../../../../api';

const getOptionsContent = (
  loading: boolean,
  error: string,
  search?: string,
  options?: TArticle[]
) => {
  if (options?.length)
    return options?.map((item) => (
      <Select.Option key={getId()}>
        <a className={styles.content} aria-label={item.title + 'link'} href={item.url}>
          <div className={styles.imgContainer}>
            <img alt={item.title} src={item.image} />
          </div>
          <p className={styles.title}>{item.title}</p>
        </a>
      </Select.Option>
    ));
  else if (!loading && !options?.length && search)
    return (
      <Select.Option>
        <p>Not found :(</p>
      </Select.Option>
    );
  else if (loading)
    return (
      <Select.Option>
        <Skeleton active />
      </Select.Option>
    );
  else if (error)
    return (
      <Select.Option>
        <p>{error}</p>
      </Select.Option>
    );
};

export const useSearch = () => {
  const [options, setOptions] = React.useState<TArticle[]>();

  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>('');

  const controller = React.useRef<AbortController>(new AbortController());

  const [search, setSearch] = React.useState<string>('');
  const debouncedValue = useDebounce<string>(search, 500, controller.current);

  const handleChange = (search: string) => {
    controller.current.abort();
    setSearch(search);
  };

  React.useEffect(() => {
    if (!debouncedValue) {
      setOptions([]);
      return;
    }

    setLoading(true);

    fetchNews<TNewsItem>({ q: debouncedValue }, controller.current.signal)
      .then((res: AxiosResponse<TNewsItem>) => {
        setOptions(res.data.articles);
      })
      .catch((e: unknown) => {
        controller.current.abort();
        setError(getErrorMessage(e));
      })
      .finally(() => {
        setLoading(false);
      });
  }, [debouncedValue]);

  return {
    preparedData: getOptionsContent(loading, error, debouncedValue, options),
    search,
    handleChange,
  };
};
