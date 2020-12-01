import axios from 'axios'

const myAxios = axios.create()

myAxios.defaults.baseURL = 'http://localhost:8080/'

myAxios.interceptors.request.use((config) => {
  const userStr = localStorage.getItem('user')
  if (userStr) 
    config.headers['x-auth-token'] = JSON.parse(userStr).token  
  return config 
})

export default myAxios

