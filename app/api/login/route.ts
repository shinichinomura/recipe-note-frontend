import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const bodyContent = await request.text()

  const response = await fetch( `${process.env.NEXT_PUBLIC_API_BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: bodyContent
  })

  const data = await response.json()
  cookies().set('token', data.token, { path: '/', httpOnly: true })

  delete data.token

  return NextResponse.json(data);
}

export async function GET(request: NextRequest) {
  const tokenCookie = cookies().get('token')
  const headers = tokenCookie === undefined ? new Headers() : new Headers({
    Authorization: `Bearer ${tokenCookie.value}`
  })

  if (tokenCookie) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/secure/user_accounts/me`, {
      method: 'GET',
      headers: headers
    })

    return response
  }
  else {
    return Response.json({ status: "error" })
  }
}