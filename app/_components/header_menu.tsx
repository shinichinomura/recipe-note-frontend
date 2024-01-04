'use client'

import React, {useContext, useEffect} from "react"
import Link from "next/link"
import LoginContext from "@/app/_contexts/login_context"
import {useRouter} from "next/navigation";

export default function HeaderMenu() {
  const loginContext = useContext(LoginContext)
  const router = useRouter()

  const LogOut = () => {
    fetch('http://localhost:3000/logout', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${loginContext.token}`
      }
    })
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        loginContext.setCurrentUserAccount({
          id: null,
          displayName: null
        })
        loginContext.setToken(null)
        router.push('/')
      })
  }

  return (
    <div className="flex">
      {
        !loginContext.currentUserAccount.id ? (
          <>
            <Link href="/signup" className="rounded-md ring-1 ring-emerald-600 text-emerald-600 hover:opacity-75 px-4 py-2 mx-1">会員登録</Link>
            <Link href="/login"  className="rounded-md ring-1 ring-emerald-600 text-emerald-600 hover:opacity-75 px-4 py-2 mx-1">ログイン</Link>
          </>
        ) : (
          <>
            <button onClick={LogOut} className="rounded-md ring-1 ring-emerald-600 text-emerald-600 hover:opacity-75 px-4 py-2 mx-1">ログアウト</button>
          </>
        )
      }
    </div>
  )
}