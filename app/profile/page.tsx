"use client"

import { useEffect } from "react"
import { useUserType, useIsAuthenticated } from "@/lib/auth-context"
import { useRouter } from "next/navigation"

export default function ProfilePage() {
  const router = useRouter()
  const userType = useUserType()
  const isAuthenticated = useIsAuthenticated()

  // 根据用户身份自动跳转到对应的个人中心页面
  useEffect(() => {
    if (isAuthenticated && userType) {
      if (userType === "employer") {
        router.push('/profile/employer')
      } else {
        router.push('/profile/jobseeker')
      }
    } else if (!isAuthenticated) {
      // 未登录用户默认跳转到求职者个人中心
      router.push('/profile/jobseeker')
    }
  }, [isAuthenticated, userType, router])

  // 显示加载状态，避免在跳转过程中显示内容
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4"></div>
        <p className="text-gray-600">正在跳转...</p>
      </div>
    </div>
  )
}
