import type {AxiosInstance, AxiosRequestConfig, AxiosResponse, Method} from 'axios'; // 导入 AxiosInstance 类型
import axios from 'axios';

// 创建一个 axios 实例
const http: AxiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000',  // 设置你的 API 基础 URL
  timeout: 10000,  // 设置请求超时时间
});

// 请求拦截器
// http.interceptors.request.use(
//   (config: AxiosRequestConfig) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// 响应拦截器
http.interceptors.response.use(
  (response: AxiosResponse) => {
    // 处理响应数据（根据 FastAPI 返回的通用结构）
    const responseData = response.data as ResponseModel;
    if (responseData.code === 200) {
      // 如果返回的状态码是 200，直接返回数据部分
      return responseData.data;
    } else {
      // 如果状态码不是 200，则抛出错误，方便后续处理
      return Promise.reject(responseData);
    }
  },
  (error) => {
    // 错误处理：比如服务器错误、超时等
    if (error.response) {
      const {code, message, error: errorMessage} = error.response.data;
      switch (code) {
        case 400:
          alert('请求错误: ' + message);
          break;
        case 401:
          alert('未授权，请登录: ' + message);
          break;
        case 403:
          alert('没有权限: ' + message);
          break;
        case 404:
          alert('请求的资源未找到: ' + message);
          break;
        case 500:
          alert('服务器错误: ' + message);
          break;
        default:
          alert('网络异常，请稍后重试: ' + (errorMessage || message));
      }
    } else if (error.request) {
      alert('请求未收到响应');
    } else {
      alert('请求配置错误');
    }
    return Promise.reject(error);
  }
);

// 通用的请求函数
interface RequestParams<T> {
  url: string;
  data?: T;
  method?: Method;
  params?: T;
}

export interface ResponseModel<T> {
  code: number;  // 状态码
  message: string;  // 响应信息
  data?: T;  // 数据内容
  error?: string;  // 错误信息
}

export async function request<T>({url, data, method = 'GET', params}: RequestParams): Promise<T> {
  try {
    const config: AxiosRequestConfig = {
      url,
      method,
      data,
      params,
    };

    const response: AxiosResponse<ResponseModel<T>> = await http(config);
    console.log(response)
    // FastAPI 返回的格式是通用的 ResponseModel
    return response;
  } catch (error) {
    console.error('请求失败', error);
    throw error;
  }
}

// GET 请求
export function get<T>(url: string, params?: RequestParams): Promise<T> {
  return request<T>({url, method: 'GET', params});
}

// POST 请求
export function post<T>(url: string, data?: RequestParams): Promise<T> {
  return request<T>({url, method: 'POST', data});
}

// PUT 请求
export function put<T>(url: string, data?: RequestParams): Promise<T> {
  return request<T>({url, method: 'PUT', data});
}

// DELETE 请求
export function del<T>(url: string, data?: RequestParams): Promise<T> {
  return request<T>({url, method: 'DELETE', data});
}

export default http;
