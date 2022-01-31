import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { useAxios } from './useAxios';

const useHttpRequest = () => {
  const { get, post, remove, put } = useAxios();

  const getRequest = <T extends object>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return new Promise(async (resolve, reject) => {
      try {
        const res: AxiosResponse = await get<T>(url, {
          validateStatus: (status: number): boolean => {
            if (status >= 200 && status <= 204) {
              return true;
            }
            return false;
          },
          ...config,
        });
        resolve(res);
      } catch (error) {
        console.log('Error', error);
        reject(error);
      }
    });
  };

  const postRequest = <T extends object>(url: string, body: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return new Promise(async (resolve, reject) => {
      try {
        const res: AxiosResponse = await post<T>(url, body, {
          validateStatus: (status: number): boolean => {
            if (status >= 200 && status <= 204) {
              return true;
            }
            return false;
          },
          ...config,
        });
        resolve(res);
      } catch (error) {
        console.log('Error', error);
        reject(error);
      }
    });
  };

  const deleteRequest = <T extends object>(url: string, body?: any): Promise<AxiosResponse<T>> => {
    return new Promise(async (resolve, reject) => {
      try {
        const res: AxiosResponse = await remove<T>(url, {
          validateStatus: (status: number): boolean => {
            if (status >= 200 && status <= 204) {
              return true;
            }
            return false;
          },
          data: body,
        });

        resolve(res);
      } catch (error) {
        console.log('Error', error);
        reject(error);
      }
    });
  };

  const updateRequest = <T extends object>(url: string, body?: any): Promise<AxiosResponse<T>> => {
    return new Promise(async (resolve, reject) => {
      try {
        const res: AxiosResponse = await put<T>(url, body, {
          validateStatus: (status: number): boolean => {
            if (status >= 200 && status <= 204) {
              return true;
            }
            return false;
          },
        });

        resolve(res);
      } catch (error) {
        console.log('Error', error);
        reject(error);
      }
    });
  };

  return {
    getRequest,
    postRequest,
    deleteRequest,
    updateRequest,
  };
};

export default useHttpRequest;
