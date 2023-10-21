
import axios from 'axios'

export const API = axios.create({ baseURL: 'http://localhost:2000/api/v1' })
// API.defaults.headers.common['Content-Type'] = 'application/json'
  

