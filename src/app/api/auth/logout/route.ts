import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest, response: NextResponse) {
  const redirectURL = new URL('/', request.url)

  return NextResponse.redirect(redirectURL, {
    headers: {
      'Set-Cookie': `@devDiet=; Path=/; max-age=0`,
    },
  })
}
