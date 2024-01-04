'use client'

import { createContext } from "react"

export type CurrentUserAccount = {
  id: string|null,
  displayName: string|null
}

export type CurrentUserAccountSetter = (currentUserAccount: CurrentUserAccount) => void

const LoginContext = createContext<{
  currentUserAccount: CurrentUserAccount,
  setCurrentUserAccount: CurrentUserAccountSetter,
  token: string|null,
  setToken: (token: string|null) => void
}>({
  currentUserAccount: {
    id: null,
    displayName: null
  },
  setCurrentUserAccount: (currentUserAccount: CurrentUserAccount) => {},
  token: null,
  setToken: (token: string|null) => {},
})

export default LoginContext