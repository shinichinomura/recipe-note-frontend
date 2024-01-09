import {NextRequest} from "next/server";
import {cookies} from "next/headers";

const serverActionUrlToApiUrl = (url: string) => {
  const originalUrl = new URL(url)
  const apiPathname = originalUrl.pathname.replace(/^\/api\//, '')

  return `${process.env.NEXT_PUBLIC_API_BASE_URL}/${apiPathname}${originalUrl.search}`
}

export async function GET (request: NextRequest) {
  const apiUrl = serverActionUrlToApiUrl(request.url)

  const response = await fetch(apiUrl, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${cookies().get('token').value}`
    }
  })

  return response
}

export async function POST (request: NextRequest) {
  const apiUrl = serverActionUrlToApiUrl(request.url)

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${cookies().get('token').value}`,
      'Content-Type': 'application/json'
    },
    duplex: "half",
    body: request.body
  })

  return response
}

export async function PUT (request: NextRequest) {
  const apiUrl = serverActionUrlToApiUrl(request.url)

  const response = await fetch(apiUrl, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${cookies().get('token').value}`
    },
    duplex: "half",
    body: request.body
  })

  return response
}