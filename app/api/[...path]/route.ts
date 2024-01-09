import {NextRequest} from "next/server";
import {cookies} from "next/headers";

const serverActionUrlToApiUrl = (url: string) => {
  const originalUrl = new URL(url)
  const apiPathname = originalUrl.pathname.replace(/^\/api\//, '')

  return `${process.env.NEXT_PUBLIC_API_BASE_URL}/${apiPathname}${originalUrl.search}`
}

export async function GET (request: NextRequest) {
  const apiUrl = serverActionUrlToApiUrl(request.url)

  const tokenCookie = cookies().get('token')
  const headers = tokenCookie === undefined ? new Headers() : new Headers({
    Authorization: `Bearer ${tokenCookie.value}`
  })

  const response = await fetch(apiUrl, {
    method: 'GET',
    headers: headers
  })

  return response
}

export async function POST (request: NextRequest) {
  const apiUrl = serverActionUrlToApiUrl(request.url)

  const tokenCookie = cookies().get('token')
  const headers = tokenCookie === undefined ? new Headers() : new Headers({
    Authorization: `Bearer ${tokenCookie.value}`
  })

  headers.append('Content-Type', 'application/json')

  const bodyContent = await request.text()

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: headers,
    body: bodyContent
  })

  return response
}

export async function PUT (request: NextRequest) {
  const apiUrl = serverActionUrlToApiUrl(request.url)

  const tokenCookie = cookies().get('token')
  const headers = tokenCookie === undefined ? new Headers() : new Headers({
    Authorization: `Bearer ${tokenCookie.value}`
  })

  headers.append('Content-Type', 'application/json')

  const bodyContent = await request.text()

  const response = await fetch(apiUrl, {
    method: 'PUT',
    headers: headers,
    body: bodyContent
  })

  return response
}