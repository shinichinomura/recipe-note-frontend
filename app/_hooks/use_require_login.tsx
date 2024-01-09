import { useEffect } from "react"

export function useRequireLogin() {
  useEffect(() => {
    fetch("/api/secure/user_accounts/me", {
      method: 'GET'
    })
      .then((response) => {
        if (response.status === 401) {
          window.location.href = "/login"
        }
        else {
          return response.json()
        }
      })
      .then((data) => {
        if (data.status === 'error') {
          window.location.href = "/login"
        }
      })
  }, [location.pathname])
}