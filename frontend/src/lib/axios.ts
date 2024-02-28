import type { CreateAxiosDefaults } from 'axios'
import axios from 'axios'

const options: CreateAxiosDefaults = {
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
}

const $axios = axios.create(options)

$axios.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
)

$axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      window.location.href = '/sign-in'
    }
    return Promise.reject(error)
  }
)

export default $axios
