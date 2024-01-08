'use client'

import React, { useState } from 'react'
import ErrorMessages from "@/app/_components/error_messages";

export default function Signup() {
  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const data = Object.fromEntries(formData.entries())

    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        if (data.status === 'error') {
          setErrorMessages(data.errorMessages)
        }
        else {
        }
      })
  }

  const [errorMessages, setErrorMessages] = useState<string[]>([])

  return (
    <div className="flex flex-1 flex-col justify-center">
      <div className="mx-auto w-full max-w-sm">
        <h2 className="text-2xl text-center">会員登録</h2>
      </div>
      <div className="mx-auto w-full max-w-sm mt-8">
        <form onSubmit={(event) => submit(event)}>
          <ErrorMessages messages={errorMessages} />
          <div>
            <label htmlFor="email" className="block">メールアドレス</label>
            <input type="email" required name="email" id="email" className="block w-full rounded-md ring-1 ring-inset ring-gray-300 p-2 mt-1" />
          </div>
          <div className="mt-6">
            <label htmlFor="password" className="block">パスワード</label>
            <input type="password" required name="password" id="password" minLength={8} maxLength={16}  className="block w-full rounded-md ring-1 ring-inset ring-gray-300 p-2 mt-1" />
            <div className="text-sm text-gray-500 mt-1">
              英数字 8〜16文字
            </div>
          </div>
          <div className="mt-6">
            <label htmlFor="displayName" className="block">表示名</label>
            <input type="text" name="display_name" id="displayName" maxLength={16} className="block w-full rounded-md ring-1 ring-inset ring-gray-300 p-2 mt-1" />
            <div className="text-sm text-gray-500 mt-1">
              16文字以下
            </div>
          </div>
          <div className="mt-6">
            <input type="submit" className="w-full rounded-md bg-emerald-600 hover:bg-emerald-500 py-2 text-white" value="会員登録" />
          </div>
        </form>
      </div>
    </div>
  )
}
