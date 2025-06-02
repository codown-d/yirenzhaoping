"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Check, Loader2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth, UserType } from "@/lib/auth-context"  // 添加UserType导入

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [activeTab, setActiveTab] = useState("phone")
  const [phone, setPhone] = useState("")
  const [code, setCode] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
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

  // 手机号登录
  const handlePhoneLogin = () => {
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

    // 模拟登录
    setTimeout(() => {
      setIsLoading(false)
      setSuccess("登录成功，正在跳转...")

      // 模拟用户数据 - 根据手机号判断用户类型
      const isEmployer = phone.endsWith('0') || phone.endsWith('2') || phone.endsWith('4') || phone.endsWith('6') || phone.endsWith('8')
      const userData = {
        name: isEmployer ? "星光文化传媒" : "李小华",
        userType: isEmployer ? UserType.Employer : UserType.JobSeeker,  // 修改这里
        phone: phone,
        avatar: "/placeholder.svg?height=60&width=60",
        role: isEmployer? "employer" : "jobseeker"
      }

      login(userData)

      // 模拟登录成功后跳转
      setTimeout(() => {
        router.push("/")
      }, 1000)
    }, 1500)
  }

  // 账号密码登录
  const handleAccountLogin = () => {
    if (!username) {
      setError("请输入用户名")
      return
    }
    if (!password) {
      setError("请输入密码")
      return
    }

    setIsLoading(true)
    setError("")

    // 模拟登录
    setTimeout(() => {
      setIsLoading(false)
      setSuccess("登录成功，正在跳转...")

      // 模拟用户数据 - 根据用户名判断用户类型
      const isEmployer = username.includes('公司') || username.includes('团') || username.includes('传媒') || username.includes('文化')
      const userData = {
        name: isEmployer ? username : "张明",
        userType: isEmployer ? UserType.Employer : UserType.JobSeeker,  // 修改这里
        email: `${username}@example.com`,
        avatar: "/placeholder.svg?height=60&width=60"
      }

      login(userData)

      // 模拟登录成功后跳转
      setTimeout(() => {
        router.push("/")
      }, 1000)
    }, 1500)
  }

  // 微信授权登录
  const handleWechatLogin = () => {
    setIsLoading(true)
    setError("")

    // 模拟微信授权
    setTimeout(() => {
      setIsLoading(false)
      setSuccess("微信授权成功，正在跳转...")

      // 模拟微信用户数据 - 随机分配用户类型
      const isEmployer = Math.random() > 0.5
      const userData = {
        name: isEmployer ? "东方歌舞团" : "王小美",
        userType: isEmployer ? UserType.Employer : UserType.JobSeeker,  // 修改这里
        avatar: "/placeholder.svg?height=60&width=60"
      }

      login(userData)

      // 模拟登录成功后跳转
      setTimeout(() => {
        router.push("/")
      }, 1000)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-4 py-3">
          <div className="flex items-center">
            <Button variant="ghost" size="sm" asChild className="mr-3 p-2">
              <Link href="/">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <h1 className="text-lg font-semibold">登录</h1>
          </div>
        </div>
      </header>

      <main className="px-4 py-6">
        <Card className="w-full rounded-2xl shadow-sm">
          <CardHeader className="text-center pb-6">
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-green-600">薏</span>
            </div>
            <CardTitle className="text-2xl font-bold text-green-600">薏仁直聘</CardTitle>
            <CardDescription className="text-gray-600">艺术表演人才招聘平台</CardDescription>
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

            {/* 微信登录按钮 */}
            <Button
              className="w-full bg-green-500 hover:bg-green-600 text-white h-12 rounded-xl mb-6"
              onClick={handleWechatLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
              ) : (
                <div className="w-5 h-5 mr-3 bg-white rounded-full flex items-center justify-center">
                  <span className="text-green-500 text-xs font-bold">微</span>
                </div>
              )}
              微信授权登录
            </Button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-3 text-gray-500">其他登录方式</span>
              </div>
            </div>

            {/* 登录选项卡 */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="phone" className="rounded-xl">
                  手机验证码
                </TabsTrigger>
                <TabsTrigger value="account" className="rounded-xl">
                  账号密码
                </TabsTrigger>
              </TabsList>

              {/* 手机验证码登录 */}
              <TabsContent value="phone" className="space-y-4">
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
                <Button className="w-full h-12 rounded-xl mt-6" onClick={handlePhoneLogin} disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      登录中...
                    </>
                  ) : (
                    "登录"
                  )}
                </Button>
              </TabsContent>

              {/* 账号密码登录 */}
              <TabsContent value="account" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-sm font-medium">
                    用户名
                  </Label>
                  <Input
                    id="username"
                    placeholder="请输入用户名"
                    className="h-12 rounded-xl border-gray-200"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="password" className="text-sm font-medium">
                      密码
                    </Label>
                    <Link href="/forgot-password" className="text-xs text-green-600">
                      忘记密码?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="请输入密码"
                    className="h-12 rounded-xl border-gray-200"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Button className="w-full h-12 rounded-xl mt-6" onClick={handleAccountLogin} disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      登录中...
                    </>
                  ) : (
                    "登录"
                  )}
                </Button>
              </TabsContent>
            </Tabs>

            <div className="text-center text-sm mt-6">
              <span className="text-gray-600">还没有账户？</span>
              <Link href="/register" className="text-green-600 hover:underline ml-1">
                立即注册
              </Link>
            </div>

            <div className="text-center text-xs text-gray-500 mt-4">
              登录即表示同意
              <Link href="/terms" className="text-green-600 hover:underline mx-1">
                用户协议
              </Link>
              和
              <Link href="/privacy" className="text-green-600 hover:underline mx-1">
                隐私政策
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
