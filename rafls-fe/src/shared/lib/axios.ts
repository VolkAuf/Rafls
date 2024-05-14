import axios from 'axios'

const TOKEN_KEY = 'auth'
export const STAGE_API = 'http://localhost:8000/api'
export const PROD_API = ''

const KP_API = 'https://api.kinopoisk.dev/v1.4/'
const KP_API_KEY = 'HGTNGD2-RYQ4XFZ-P49V081-PC0TJHA' //'RDESBHX-06WM5Y1-PK30QQX-HMEKYKE' //'W4FYMM6-J6WM50W-P3QNTHP-DGCHTHS'

export const axiosDefault = axios.create({baseURL: import.meta.env.DEV ? STAGE_API : PROD_API})

export const axiosKP = axios.create({
  baseURL: KP_API + 'movie',
  headers: {accept: 'application/json', 'X-API-KEY': KP_API_KEY},
  paramsSerializer: {
    indexes: null
  }
})

export const axiosKPList = axios.create({
  baseURL: KP_API + 'list',
  headers: {accept: 'application/json', 'X-API-KEY': KP_API_KEY},
  paramsSerializer: {
    indexes: null
  }
})

export const setToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token)
  setBearer(token)
}

export const setBearer = (token: string) => {
  axiosDefault.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export const getToken = (): string | null => {
  const token = localStorage.getItem(TOKEN_KEY)
  if (!token) return null

  return token
}

export const initApi = () => {
  const token = getToken()
  if (token) setBearer(token)
}

export const deleteToken = () => localStorage.removeItem(TOKEN_KEY)