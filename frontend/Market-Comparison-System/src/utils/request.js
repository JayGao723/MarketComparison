import axios from 'axios'

const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器
request.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    console.error('接口请求失败：', error)

    if (error.response) {
      console.error('状态码：', error.response.status)
      console.error('错误内容：', error.response.data)
    } else {
      console.error('后端可能没有启动，或者网络连接失败')
    }

    return Promise.reject(error)
  }
)

export default request