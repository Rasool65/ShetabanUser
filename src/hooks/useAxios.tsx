import axios, { AxiosInstance, AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config/apiConfig/apiBaseUrl';
import { TOKEN_NAME, _UUID } from '../config/apiConfig/apiConstantNames';
import { URL_LOGIN } from '../config/urls';

export const useAxios = () => {
  const navigate = useNavigate();

  let instance: AxiosInstance;
  const token = localStorage.getItem(TOKEN_NAME) || '';

  const headers: AxiosRequestHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  if (token && token != '') {
    headers['Authorization'] = `Bearer ${token}`;
  }

  instance = axios.create({
    baseURL: API_BASE_URL,
    headers,
  });

  // API response interceptor
  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log('Error', error);

      // Remove token and redirect
      if ((error.response && error.response.status === 403) || error.response.status === 401) {
        localStorage.removeItem(TOKEN_NAME);
        localStorage.removeItem(_UUID);
        navigate(URL_LOGIN);
        return;
      }

      return Promise.reject(error);
    }
  );

  const get = <T extends object>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return instance.get<T>(url, config);
  };

  const post = <T extends object>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return instance.post<T>(url, data, config);
  };

  const put = <T extends object>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return instance.put<T>(url, data, config);
  };

  const remove = <T extends object>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return instance.delete<T>(url, config);
  };

  return {
    get,
    post,
    put,
    remove,
  };
};
