import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const tokenCookie = cookies().get('token')
  const headers = tokenCookie === undefined ? new Headers() : new Headers({
    Authorization: `Bearer ${tokenCookie.value}`
  })

  const response = await fetch( `${process.env.NEXT_PUBLIC_API_BASE_URL}/logout`, {
    method: 'POST',
    headers: headers
  })

  cookies().delete('token')

  return response;
}