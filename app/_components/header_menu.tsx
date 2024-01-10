'use client'

import React, {useContext, useEffect} from "react"
import Link from "next/link"
import LoginContext from "@/app/_contexts/login_context"
import {useRouter} from "next/navigation";

export default function HeaderMenu() {
  const loginContext = useContext(LoginContext)
  const router = useRouter()

  const LogOut = () => {
    fetch(`/api/logout`, {
      method: 'POST'
    })
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        loginContext.setCurrentUserAccount({
          id: null,
          displayName: null
        })
        router.push('/')
      })
  }

  return (
    <div className="flex">
      {
        !loginContext.currentUserAccount.id ? (
          <>
            <Link href="/signup" className="text-sm rounded-full bg-emerald-500 text-white hover:bg-emerald-400 px-4 py-2 mx-1">会員登録</Link>
            <Link href="/login"  className="text-sm rounded-full bg-emerald-500 text-white hover:bg-emerald-400 px-4 py-2 mx-1">ログイン</Link>
          </>
        ) : (
          <>
            <button onClick={LogOut} className="text-sm text-emerald-700">ログアウト</button>
          </>
        )
      }
    </div>
  )
}