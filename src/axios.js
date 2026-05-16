import axios from "axios";
import { getcookie } from "~/composables/auth";
import { toast } from "~/composables/util";

let service = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // 确认环境变量配置正确
  timeout: 10000, // 超时时间是否过短（图库图片多可适当延长）
  headers: {
    'Content-Type': 'application/json' // 确认请求头符合后端要求
  }
});

// 添加请求拦截器
service.interceptors.request.use(
 config => {
    // 确认 token 正确添加（如果后端需要鉴权）
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => Promise.reject(error)
  
);

// 添加响应拦截器
service.interceptors.response.use(
  (response) => {
    const res = response.data
    
    // 根据你的后端实际 code 修改（200 / 0 / 2000）
    if (res.code !== 200) {
      ElMessage.error(res.msg || '请求失败')
      
      // ✅ 必须 return reject，否则会 undefined
      return Promise.reject(new Error(res.msg || 'Error'))
    }
    return res
  },
  (error) => {
    console.error('请求异常：', error)
    ElMessage.error(error.message || '网络异常，请重试')
    return Promise.reject(error)
  }
);

export default service;
