'use client'

import React, { useState, useContext } from 'react'
import LoginContext from "@/app/_contexts/login_context"
import ErrorMessages from "@/app/_components/error_messages"

export default function Login() {
  const loginContext = useContext(LoginContext)

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const data = Object.fromEntries(formData.entries())

    fetch('http://localhost:3000/login', {
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
          loginContext.setCurrentUserAccount({
            id: data.user_account.id,
            displayName: data.user_account.display_name
          })
          loginContext.setToken(data.token)
        }
      })
  }

  const [errorMessages, setErrorMessages] = useState<string[]>([])

  return (
    <div className="flex flex-1 flex-col justify-center">
      <div className="mx-auto w-full max-w-sm">
        <h2 className="text-2xl text-center">ログイン</h2>
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
          </div>
          <div className="mt-6">
            <input type="submit" className="w-full rounded-md bg-emerald-600 hover:bg-emerald-500 py-2 text-white" value="ログイン" />
          </div>
        </form>
      </div>
    </div>
  )
}
