import axios from "axios";

// configuration
const instance = axios.create({
  baseURL: 'http://localhost:4444'
})

instance.interceptors.request.use((config) => {
  config.headers.authorization = window.localStorage.getItem('token')
  return config
})

export default instance