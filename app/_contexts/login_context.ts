'use client'

import { createContext } from "react"

export type CurrentUserAccount = {
  id: string|null,
  displayName: string|null
}

export type CurrentUserAccountSetter = (currentUserAccount: CurrentUserAccount) => void

const LoginContext = createContext<{
  currentUserAccount: CurrentUserAccount,
  setCurrentUserAccount: CurrentUserAccountSetter
}>({
  currentUserAccount: {
    id: null,
    displayName: null
  },
  setCurrentUserAccount: (currentUserAccount: CurrentUserAccount) => {}
})

export default LoginContext