import { api } from '@/services/axios'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest, response: NextResponse) {
  const { searchParams } = new URL(request.url)

  const code = searchParams.get('code')

  const redirectTo = request.cookies.get('redirectTo')?.value

  const registerUserResponse = await api.post('/register', {
    code,
  })

  const { token } = registerUserResponse.data

  const redirectURL = redirectTo ?? new URL('/', request.url)

  const cookiesExpiresInSeconds = 60 * 60 * 24 * 30 // 30 days

  return NextResponse.redirect(redirectURL, {
    headers: {
      'Set-Cookie': `@devDiet=${token}; Path=/; max-age=${cookiesExpiresInSeconds}`,
    },
  })
}
