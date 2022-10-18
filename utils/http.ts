import axios, { AxiosError } from 'axios';
const successHandler = (res: any) => {
  if (res) return res.data;
}

axios.interceptors.response.use((response) => response, () => {console.log('error')})

export const http = <T>(options: any, responseMapper: Function = successHandler): Promise<T> => {
  return new Promise((resolve, reject) => {
    const { url, method, body, headers, queryParams, responseType, timeout } = options
    axios.request<T>({
      url,
      method,
      data: body,
      headers,
      params: queryParams,
      responseType,
      timeout: timeout || 60000
    }).then(res => resolve(responseMapper(res)))
      .catch(errorHandler(reject, options))
  })
}

export const errorHandler = (reject: Function, options: any) =>
  (error: AxiosError) => {
    if (axios.isCancel(error)) {
      return
    }
    
    return reject(error)
  }