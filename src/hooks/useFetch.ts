import { useState } from 'react';
import axios, { AxiosRequestConfig } from 'axios';

interface IUserFetchState<T> {
  isLoading: boolean;
  data: T | null;
}

const init: IUserFetchState<any> = {
  isLoading: false,
  data: null,
};

export function useFetch<T>(url?: string): [state: IUserFetchState<any>, execute: (options: AxiosRequestConfig<T>) => Promise<Response | undefined>] {
  const [state, setState] = useState<IUserFetchState<T>>(init);

  const execute = async (options: AxiosRequestConfig<any>) => {
    console.log('isExecuting');
    setState((state) => ({
      ...state,
      isLoading: true,
      error: null,
      response: null,
    }));
    try {
      if (state.isLoading) return;

      const res = await axios({ ...options, url: url || options.url });
      setState((state) => ({
        ...state,
        isLoading: false,
        error: null,
        response: {
          statusCode: res.status,
          body: res.data,
        },
      }));

      return res as any;
    } catch (error) {
      setState((state) => ({
        ...state,
        isLoading: false,
        error: error as any,
        response: null,
      }));
    }
  };

  return [state, execute];
}
