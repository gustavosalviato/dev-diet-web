import axios from 'axios'
import { parseCookies } from 'nookies'

const cookies = parseCookies()

export const api = axios.create({
  // baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  baseURL: 'http://localhost:3333',
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${cookies['devdiet.token']}`,
  },
})
