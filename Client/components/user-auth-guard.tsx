"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function UserAuthGuard({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = () => {
      const userAuth = localStorage.getItem("userAuth")
      const currentUser = localStorage.getItem("currentUser")

      if (userAuth === "true" && currentUser) {
        setIsAuthenticated(true)
      } else {
        router.push("/auth")
      }
      setIsLoading(false)
    }

    checkAuth()
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return children
}
