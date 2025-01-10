import { AxiosRequestConfig } from 'axios';
import apiClient from './api-client';

export interface FetchResponse<T> {
  count: number;
  next: string | null;
  results: T[];
}

class HttpService<T> {
  constructor(private endpoint: string) {}

  getAll = (requestConfig?: AxiosRequestConfig): Promise<FetchResponse<T>> => {
    return apiClient.get(this.endpoint, requestConfig).then((res) => res.data);
  };

  get = (id: string | number): Promise<T> => {
    return apiClient.get(`${this.endpoint}/${id}`).then((res) => res.data);
  };

  create = (entity: T): Promise<T> => {
    return apiClient.post(this.endpoint, entity).then((res) => res.data);
  };
}

const create = <T>(endpoint: string) => new HttpService<T>(endpoint);

export default create;
