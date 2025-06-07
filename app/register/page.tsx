"use client"

import { useState } from "react"
import { useAuth, UserType } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff } from "lucide-react"
import Link from "next/link"

export default function RegisterPage() {
  const { login } = useAuth()
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    phone: "",
    password: "",
    confirmPassword: "",
    verificationCode: ""
  })

  const handleSubmit = async () => {
    // 基本验证
    if (!formData.phone || !formData.password || !formData.confirmPassword || !formData.verificationCode) {
      alert("请填写所有必填项")
      return
    }

    if (formData.password !== formData.confirmPassword) {
      alert("两次输入的密码不一致")
      return
    }

    if (formData.password.length < 6) {
      alert("密码长度不能少于6位")
      return
    }

    setIsLoading(true)

    try {
      // 模拟注册API调用
      await new Promise(resolve => setTimeout(resolve, 1000))

      // 注册成功，保存用户信息
      const userData = {
        name: "新用户",
        userType: UserType.JobSeeker, // 默认为求职者，用户可以后续切换
        phone: formData.phone,
        avatar: "/placeholder.svg?height=60&width=60"
      }

      login(userData)
      router.push("/") // 直接跳转到首页
    } catch (error) {
      alert("注册失败，请重试")
    } finally {
      setIsLoading(false)
    }
  }

  const handleGetVerificationCode = () => {
    if (!formData.phone) {
      alert("请先输入手机号")
      return
    }
    // 模拟发送验证码
    alert("验证码已发送到您的手机")
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md rounded-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-green-600">薏仁直聘</CardTitle>
          <CardDescription>创建您的账户</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* 手机号 */}
            <div className="space-y-2">
              <Label htmlFor="phone">手机号</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="请输入手机号"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>

            {/* 密码 */}
            <div className="space-y-2">
              <Label htmlFor="password">密码</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="请输入密码（至少6位）"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            {/* 确认密码 */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">确认密码</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="请再次输入密码"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            {/* 验证码 */}
            <div className="space-y-2">
              <Label htmlFor="verificationCode">短信验证码</Label>
              <div className="flex space-x-2">
                <Input
                  id="verificationCode"
                  placeholder="请输入验证码"
                  value={formData.verificationCode}
                  onChange={(e) => setFormData({...formData, verificationCode: e.target.value})}
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleGetVerificationCode}
                  disabled={!formData.phone}
                >
                  获取验证码
                </Button>
              </div>
            </div>

            {/* 注册按钮 */}
            <Button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full h-12 mt-6"
            >
              {isLoading ? "注册中..." : "立即注册"}
            </Button>
          </div>

          <div className="mt-6 text-center text-sm">
            已有账户？{" "}
            <Link href="/login" className="text-green-600 hover:underline">
              立即登录
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
