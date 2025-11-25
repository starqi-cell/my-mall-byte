// src/api/client.ts
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://dummyjson.com', // 修改为 DummyJSON 地址
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 响应拦截器
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.status, error.message);
    return Promise.reject(error);
  }
);

export default apiClient;