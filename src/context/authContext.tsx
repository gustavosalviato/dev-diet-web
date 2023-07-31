'use client'

import { api } from '@/services/axios'
import { AxiosError } from 'axios'
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import { toast } from 'react-toastify'
import { setCookie, parseCookies, destroyCookie } from 'nookies'

export interface SignInCredentials {
  email: string
  password: string
}

interface User {
  email: string
  name?: string
}

interface authContextType {
  signIn(credential: SignInCredentials): Promise<void>
  isAuthenticated: boolean
  user: User | undefined
}

interface AuthContextProviderProps {
  children: ReactNode
}

export async function signOut() {
  destroyCookie(undefined, 'devdiet.token')
  window.location.replace('/login')
}

export const AuthContext = createContext({} as authContextType)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<User>()
  const isAuthenticated = !!user

  useEffect(() => {
    const { 'devdiet.token': token } = parseCookies()
    if (token) {
      api.get('/me').then((response) => {
        const { user } = response.data

        setUser({
          email: user.email,
          name: user.name,
        })
      })
    }
  }, [])

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const authResponse = await api.post('/sessions', {
        email,
        password,
      })

      const { token } = authResponse.data

      setCookie(undefined, 'devdiet.token', token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/',
      })

      setUser({
        email,
      })

      api.defaults.headers['Authorization'] = `Bearer ${token}`

      window.location.replace('/panel')
    } catch (err) {
      if (err instanceof AxiosError) {
        toast(err.response?.data.message, {
          type: 'error',
        })
      }
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext)
