import axios, { AxiosRequestConfig } from 'axios';
import { TQueryParams } from '../components/types';
import { HTTPMethods } from '../components/constants';

const sendApiRequest = <U>(options: AxiosRequestConfig) => {
  return axios.request<U>(options);
};

export const fetchNews = <U>(params: TQueryParams, signal?: AbortSignal) =>
  sendApiRequest<U>({
    url: `https://gnews.io/api/v4/search?&apikey=${apikey}`,
    method: HTTPMethods.GET,
    params,
  });

// env
const apikey: string = '1bb330b75d1843750e46282aa4e85e17';
