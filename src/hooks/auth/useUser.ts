import decode from 'jwt-decode'
import { parseCookies } from 'nookies'

interface User {
  name: string
  avatarUrl: string
  sub: string
}

export function UseUser() {
  const { '@devDiet': token } = parseCookies()

  if (!token) {
    return
  }

  const user: User = decode(token)

  return user
}
