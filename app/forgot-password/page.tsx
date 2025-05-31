"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Check, Loader2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [phone, setPhone] = useState("")
  const [code, setCode] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [isCodeSent, setIsCodeSent] = useState(false)
  const [countdown, setCountdown] = useState(60)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  // 处理倒计时
  useEffect(() => {
    let timer: NodeJS.Timeout
    if (isCodeSent && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1)
      }, 1000)
    } else if (countdown === 0) {
      setIsCodeSent(false)
      setCountdown(60)
    }
    return () => clearTimeout(timer)
  }, [isCodeSent, countdown])

  // 发送验证码
  const handleSendCode = () => {
    if (!phone) {
      setError("请输入手机号")
      return
    }
    if (!/^1[3-9]\d{9}$/.test(phone)) {
      setError("请输入正确的手机号")
      return
    }

    setIsLoading(true)
    setError("")

    // 模拟发送验证码
    setTimeout(() => {
      setIsLoading(false)
      setIsCodeSent(true)
      setSuccess("验证码已发送，请注意查收")
      // 清除成功消息
      setTimeout(() => setSuccess(""), 3000)
    }, 1500)
  }

  // 验证手机号和验证码
  const handleVerifyCode = () => {
    if (!phone) {
      setError("请输入手机号")
      return
    }
    if (!code) {
      setError("请输入验证码")
      return
    }

    setIsLoading(true)
    setError("")

    // 模拟验证
    setTimeout(() => {
      setIsLoading(false)
      setStep(2)
    }, 1500)
  }

  // 重置密码
  const handleResetPassword = () => {
    if (!newPassword) {
      setError("请输入新密码")
      return
    }
    if (newPassword.length < 6) {
      setError("密码长度不能少于6位")
      return
    }
    if (newPassword !== confirmPassword) {
      setError("两次输入的密码不一致")
      return
    }

    setIsLoading(true)
    setError("")

    // 模拟重置密码
    setTimeout(() => {
      setIsLoading(false)
      setSuccess("密码重置成功，请使用新密码登录")

      // 模拟跳转
      setTimeout(() => {
        router.push("/login")
      }, 2000)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-4 py-3">
          <div className="flex items-center">
            <Button variant="ghost" size="sm" asChild className="mr-3 p-2">
              <Link href="/login">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <h1 className="text-lg font-semibold">找回密码</h1>
          </div>
        </div>
      </header>

      <main className="px-4 py-6">
        <Card className="w-full rounded-2xl shadow-sm">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-xl font-bold">找回密码</CardTitle>
            <CardDescription className="text-gray-600">
              {step === 1 ? "请输入您的手机号和验证码" : "请设置新密码"}
            </CardDescription>
          </CardHeader>
          <CardContent className="px-6 pb-6">
            {/* 错误和成功提示 */}
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {success && (
              <Alert className="mb-4 bg-green-50 text-green-700 border-green-200">
                <Check className="h-4 w-4 mr-2" />
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}

            {/* 步骤1：验证手机号 */}
            {step === 1 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium">
                    手机号
                  </Label>
                  <Input
                    id="phone"
                    placeholder="请输入手机号"
                    className="h-12 rounded-xl border-gray-200"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="code" className="text-sm font-medium">
                    验证码
                  </Label>
                  <div className="flex space-x-3">
                    <Input
                      id="code"
                      placeholder="请输入验证码"
                      className="flex-1 h-12 rounded-xl border-gray-200"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                    />
                    <Button
                      variant="outline"
                      className="px-4 h-12 rounded-xl border-gray-200 whitespace-nowrap"
                      onClick={handleSendCode}
                      disabled={isCodeSent || isLoading}
                    >
                      {isLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : isCodeSent ? (
                        `${countdown}秒后重发`
                      ) : (
                        "获取验证码"
                      )}
                    </Button>
                  </div>
                </div>
                <Button className="w-full h-12 rounded-xl mt-6" onClick={handleVerifyCode} disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      验证中...
                    </>
                  ) : (
                    "下一步"
                  )}
                </Button>
              </div>
            )}

            {/* 步骤2：设置新密码 */}
            {step === 2 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="newPassword" className="text-sm font-medium">
                    新密码
                  </Label>
                  <Input
                    id="newPassword"
                    type="password"
                    placeholder="请输入新密码"
                    className="h-12 rounded-xl border-gray-200"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm font-medium">
                    确认密码
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="请再次输入新密码"
                    className="h-12 rounded-xl border-gray-200"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <Button className="w-full h-12 rounded-xl mt-6" onClick={handleResetPassword} disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      提交中...
                    </>
                  ) : (
                    "重置密码"
                  )}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
