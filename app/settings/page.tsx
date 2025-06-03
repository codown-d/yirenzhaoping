"use client"

import { useState } from "react"
import { useAuth, useIsAuthenticated } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { 
  ArrowLeft, 
  LogOut, 
  User, 
  Bell, 
  Shield, 
  HelpCircle, 
  ChevronRight,
  Smartphone,
  Mail,
  Globe
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"

export default function SettingsPage() {
  const router = useRouter()
  const { user, logout } = useAuth()
  const isAuthenticated = useIsAuthenticated()
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)

  // 如果未登录，重定向到登录页面
  if (!isAuthenticated) {
    router.push('/login')
    return null
  }

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  const settingsItems = [
    {
      icon: User,
      title: "个人信息",
      description: "管理您的个人资料和账户信息",
      href: "/profile"
    },
    {
      icon: Bell,
      title: "通知设置",
      description: "管理推送通知和消息提醒",
      href: "/settings/notifications"
    },
    {
      icon: Shield,
      title: "隐私与安全",
      description: "账户安全设置和隐私控制",
      href: "/settings/privacy"
    },
    {
      icon: Globe,
      title: "语言与地区",
      description: "设置语言偏好和地区信息",
      href: "/settings/language"
    },
    {
      icon: HelpCircle,
      title: "帮助与支持",
      description: "获取帮助和联系客服",
      href: "/help"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-4 py-3">
          <div className="flex items-center">
            <Button variant="ghost" size="sm" asChild className="mr-3 p-2">
              <Link href="/">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <h1 className="text-lg font-semibold">设置</h1>
          </div>
        </div>
      </header>

      <main className="px-4 py-6">
        {/* User Profile Card */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={user?.avatar || "/placeholder.svg?height=64&width=64"} />
                <AvatarFallback className="text-lg">{user?.name?.[0] || "我"}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-xl font-semibold">{user?.name || "用户"}</h2>
                <div className="flex items-center space-x-2 text-sm text-gray-600 mt-1">
                  {user?.phone && (
                    <div className="flex items-center space-x-1">
                      <Smartphone className="h-4 w-4" />
                      <span>{user.phone}</span>
                    </div>
                  )}
                  {user?.email && (
                    <div className="flex items-center space-x-1">
                      <Mail className="h-4 w-4" />
                      <span>{user.email}</span>
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  {user?.userType === "employer" ? "招聘方" : "求职者"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Settings Items */}
        <Card className="mb-6">
          <CardContent className="p-0">
            {settingsItems.map((item, index) => (
              <div key={item.title}>
                <Link href={item.href} className="block">
                  <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <item.icon className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">{item.title}</h3>
                        <p className="text-sm text-gray-500">{item.description}</p>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                </Link>
                {index < settingsItems.length - 1 && <Separator />}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Logout Section */}
        <Card>
          <CardContent className="p-6">
            {!showLogoutConfirm ? (
              <Button
                variant="outline"
                className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300"
                onClick={() => setShowLogoutConfirm(true)}
              >
                <LogOut className="mr-2 h-4 w-4" />
                退出登录
              </Button>
            ) : (
              <div className="space-y-4">
                <Alert>
                  <AlertDescription>
                    确定要退出登录吗？退出后您需要重新登录才能使用完整功能。
                  </AlertDescription>
                </Alert>
                <div className="flex space-x-3">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setShowLogoutConfirm(false)}
                  >
                    取消
                  </Button>
                  <Button
                    variant="destructive"
                    className="flex-1"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    确认退出
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* App Info */}
        <div className="text-center text-sm text-gray-500 mt-8">
          <p>薏仁直聘 v1.0.0</p>
          <p className="mt-1">求职者招聘平台</p>
        </div>
      </main>
    </div>
  )
}
