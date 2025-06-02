"use client"

import { useState } from "react"
import { useAuth, UserType } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload } from "lucide-react"
import Link from "next/link"

export default function RegisterPage() {
  const { login } = useAuth()
  const router = useRouter()
  const [userType, setUserType] = useState<UserType>(UserType.JobSeeker)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    company: ""
  })

  const handleNext = () => {
    if (step === 2) {
      // 注册成功，保存用户信息
      const userData = {
        name: userType === "employer" ? formData.company || "新注册公司" : formData.name || "新用户",
        userType: userType,
        phone: formData.phone,
        avatar: "/placeholder.svg?height=60&width=60"
      }

      login(userData)
      setStep(step + 1)
    } else {
      setStep(step + 1)
    }
  }

  const handleBack = () => {
    setStep(step - 1)
  }

  const performanceTypes = ["舞蹈", "表演", "武术", "杂技", "音乐", "戏曲", "其他"]

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl rounded-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-green-600">薏仁直聘</CardTitle>
          <CardDescription>{step === 1 ? "选择您的身份" : step === 2 ? "身份认证" : "完善信息"}</CardDescription>
        </CardHeader>
        <CardContent>
          {step === 1 && (
            <div className="space-y-6">
              <RadioGroup value={userType} onValueChange={(value) => setUserType(value as UserType)}>
                <div className="flex items-center space-x-2 p-4 border rounded-xl">
                  <RadioGroupItem value="jobseeker" id="jobseeker" />
                  <Label htmlFor="jobseeker" className="flex-1 cursor-pointer">
                    <div>
                      <h3 className="font-medium">我是表演者</h3>
                      <p className="text-sm text-gray-600">寻找演出和表演机会</p>
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-4 border rounded-xl">
                  <RadioGroupItem value="employer" id="employer" />
                  <Label htmlFor="employer" className="flex-1 cursor-pointer">
                    <div>
                      <h3 className="font-medium">我是招募方</h3>
                      <p className="text-sm text-gray-600">发布演出需求，招募表演人才</p>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
              <Button onClick={handleNext} className="w-full h-12">
                下一步
              </Button>
            </div>
          )}

          {step === 2 && userType === "jobseeker" && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">表演者身份认证</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">姓名</Label>
                  <Input
                    id="name"
                    placeholder="请输入真实姓名"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="idcard">身份证号</Label>
                  <Input id="idcard" placeholder="请输入身份证号" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">手机号</Label>
                  <Input
                    id="phone"
                    placeholder="请输入手机号"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="code">验证码</Label>
                  <div className="flex space-x-2">
                    <Input id="code" placeholder="验证码" className="flex-1" />
                    <Button variant="outline" size="sm">
                      获取
                    </Button>
                  </div>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="performanceType">表演类型</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="选择您的主要表演类型" />
                    </SelectTrigger>
                    <SelectContent>
                      {performanceTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>求职状态</Label>
                <RadioGroup defaultValue="active">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="active" id="active" />
                    <Label htmlFor="active">在职正在找工作</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="passive" id="passive" />
                    <Label htmlFor="passive">离职正在找工作</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="passive" id="passive" />
                    <Label htmlFor="passive">在职暂不找工作</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="flex space-x-4">
                <Button variant="outline" onClick={handleBack} className="flex-1 h-12">
                  上一步
                </Button>
                <Button onClick={handleNext} className="flex-1 h-12">
                  下一步
                </Button>
              </div>
            </div>
          )}

          {step === 2 && userType === "employer" && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">招募方认证</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="company">团体/公司名称</Label>
                  <Input
                    id="company"
                    placeholder="请输入团体或公司名称"
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label>营业执照/团体资质</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-600">点击上传相关证明文件</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contact">负责人姓名</Label>
                    <Input id="contact" placeholder="请输入负责人姓名" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">联系电话</Label>
                    <Input id="phone" placeholder="请输入联系电话" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="performanceType">主要招募类型</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="选择您主要招募的表演类型" />
                    </SelectTrigger>
                    <SelectContent>
                      {performanceTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="code">短信验证码</Label>
                  <div className="flex space-x-2">
                    <Input id="code" placeholder="验证码" className="flex-1" />
                    <Button variant="outline" size="sm">
                      获取验证码
                    </Button>
                  </div>
                </div>
              </div>
              <div className="flex space-x-4">
                <Button variant="outline" onClick={handleBack} className="flex-1 h-12">
                  上一步
                </Button>
                <Button onClick={handleNext} className="flex-1 h-12">
                  提交认证
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-medium">注册成功！</h3>
              <p className="text-gray-600">您的账户已创建成功，现在可以开始使用薏仁直聘了</p>
              <Button
                className="w-full h-12"
                onClick={() => router.push("/")}
              >
                进入首页
              </Button>
            </div>
          )}

          {step < 3 && (
            <div className="mt-6 text-center text-sm">
              已有账户？{" "}
              <Link href="/login" className="text-green-600 hover:underline">
                立即登录
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
