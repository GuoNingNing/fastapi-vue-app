import type {AxiosInstance, AxiosRequestConfig, AxiosResponse, Method} from 'axios'; // 导入 Axios 类型
import axios from 'axios';
import router from './router'; // 导入 router 实例

const baseUrl = import.meta.env.VUE_APP_BASE_URL;

// 创建一个 axios 实例
const http: AxiosInstance = axios.create({
  baseURL: baseUrl,  // 设置你的 API 基础 URL
  timeout: 100000,  // 设置请求超时时间
});

// 请求拦截器
http.interceptors.request.use(
  (config) => {
    const access_token = localStorage.getItem('access_token');
    if (access_token) {
      config.headers['Authorization'] = `Bearer ${access_token}`;
    } else {
      router.push({name: 'Login'});
    }
    return config;
  },
  (error) => {
    // 处理请求错误
    return Promise.reject(error);
  }
);

// 响应拦截器
http.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.status === 200) {
      // 如果返回的状态码是 200，直接返回数据部分
      return response.data;
    } else {
      // 如果状态码不是 200，则抛出错误，方便后续处理
      return Promise.reject(new Error(JSON.stringify(response) || '请求失败'));
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
interface RequestParams {
  url: string;
  data?: Record<string, unknown>;  // data 改为 Record 类型
  method?: Method;
  params?: Record<string, unknown>;  // params 改为 Record 类型
}

// 通用请求函数
export async function request<T>({url, data, method = 'GET', params}: RequestParams): Promise<T> {
  try {
    const config: AxiosRequestConfig = {
      url,
      method,
      data,
      params,
    };

    return http(config);  // 返回数据部分
  } catch (error) {
    console.error('请求失败', error);
    throw error;
  }
}

// GET 请求
export function get<T>(url: string, params?: Record<string, unknown>): Promise<T> {
  return request<T>({url, method: 'GET', params});
}

// POST 请求
export function post<T>(url: string, data?: Record<string, unknown>): Promise<T> {
  return request<T>({url, method: 'POST', data});
}

// PUT 请求
export function put<T>(url: string, data?: Record<string, unknown>): Promise<T> {
  return request<T>({url, method: 'PUT', data});
}

// DELETE 请求
export function del<T>(url: string, data?: Record<string, unknown>): Promise<T> {
  return request<T>({url, method: 'DELETE', data});
}

export default http;
