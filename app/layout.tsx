'use client'

import React, {useState, useEffect} from "react";
import HeaderMenu from "@/app/_components/header_menu"
import LoginContext, {CurrentUserAccount} from "@/app/_contexts/login_context"
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [currentUserAccount, setCurrentUserAccount] = useState<CurrentUserAccount>({
    id: null,
    displayName: null,
  })

  useEffect(() => {
    fetch(
      `/api/login`, {
        method: 'GET'
      })
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        if (data.status === 'success') {
          setCurrentUserAccount({
            id: data.user_account.id,
            displayName: data.user_account.display_name
          })
        }
        else {
          setCurrentUserAccount({
            id: null,
            displayName: null
          })
        }
      })
  }, [])

  return (
    <html lang="ja">
      <LoginContext.Provider value={{
        currentUserAccount: currentUserAccount,
        setCurrentUserAccount: setCurrentUserAccount
      }}>
        <body className="text-md text-gray-800">
          <div className="flex justify-between p-4">
            <div>

            </div>
            <HeaderMenu />
          </div>
          <main className="my-4 px-4">
            {children}
          </main>
        </body>
      </LoginContext.Provider>
    </html>
  )
}
