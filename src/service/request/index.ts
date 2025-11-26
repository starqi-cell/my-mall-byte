// src/api/client.ts
import axios from 'axios';
import type { AxiosInstance } from 'axios'
import type { AppRequestConfig } from './type'

class AppRequest {
  instance: AxiosInstance

  constructor(config: AppRequestConfig) {
    this.instance = axios.create(config)

    this.instance.interceptors.request.use(
      (config) => {
        return config
      },
      (err) => {
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        return res.data
      },
      (err) => {
        // 正确地拒绝Promise，确保上层能获取完整的错误信息
        return Promise.reject(err)
      }
    )

    this.instance.interceptors.request.use(
      config.interceptors?.requestSuccessFn as any,
      config.interceptors?.requestFailureFn
    )
    this.instance.interceptors.response.use(
      config.interceptors?.responseSuccessFn,
      config.interceptors?.responseFailureFn
    )
  }


  request<T = any>(config: AppRequestConfig<T>) {

    if (config.interceptors?.requestSuccessFn) {
      config = config.interceptors.requestSuccessFn(config as any)
    }


    return new Promise<T>((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseSuccessFn) {
            res = config.interceptors.responseSuccessFn(res)
          }
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  get<T = any>(config: AppRequestConfig<T>) {
    return this.request({ ...config, method: 'GET' })
  }
  post<T = any>(config: AppRequestConfig<T>) {
    return this.request({ ...config, method: 'POST' })
  }
  delete<T = any>(config: AppRequestConfig<T>) {
    return this.request({ ...config, method: 'DELETE' })
  }
  patch<T = any>(config: AppRequestConfig<T>) {
    return this.request({ ...config, method: 'PATCH' })
  }
}

export default AppRequest
