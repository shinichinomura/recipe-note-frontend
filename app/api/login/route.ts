import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const response = await fetch( `${process.env.NEXT_PUBLIC_API_BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    duplex: "half",
    body: request.body
  })

  const data = await response.json()
  cookies().set('token', data.token, { path: '/', httpOnly: true })

  delete data.token

  return NextResponse.json(data);
}

export async function GET(request: NextRequest) {
  if (cookies().get('token')) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/secure/user_accounts/me`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${cookies().get('token').value}`
      }
    })
    return response;
  }
  else {
    cookies().delete('token')

    return Response.json({ status: "error" })
  }
}