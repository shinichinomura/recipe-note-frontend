import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const response = await fetch( `${process.env.NEXT_PUBLIC_API_BASE_URL}/logout`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${cookies().get('token').value}`
    }
  })

  cookies().delete('token')

  return response;
}