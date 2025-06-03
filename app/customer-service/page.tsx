"use client"

import { useState } from "react"
import { useAuth, useIsAuthenticated } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { 
  ArrowLeft, 
  Headphones, 
  MessageCircle, 
  Phone, 
  Mail, 
  Clock, 
  HelpCircle,
  Send,
  Paperclip,
  Smile
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"

export default function CustomerServicePage() {
  const router = useRouter()
  const { user } = useAuth()
  const isAuthenticated = useIsAuthenticated()
  const [message, setMessage] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")

  const serviceOptions = [
    {
      icon: MessageCircle,
      title: "在线客服",
      description: "实时在线咨询，快速解决问题",
      status: "在线",
      statusColor: "bg-green-500",
      action: "立即咨询"
    },
    {
      icon: Phone,
      title: "电话客服",
      description: "400-888-9999",
      status: "工作时间：9:00-18:00",
      statusColor: "bg-blue-500",
      action: "拨打电话"
    },
    {
      icon: Mail,
      title: "邮件客服",
      description: "service@yirenzhaoping.com",
      status: "24小时内回复",
      statusColor: "bg-orange-500",
      action: "发送邮件"
    }
  ]

  const faqCategories = [
    { id: "account", name: "账户问题", count: 12 },
    { id: "payment", name: "支付问题", count: 8 },
    { id: "job", name: "职位相关", count: 15 },
    { id: "vip", name: "VIP服务", count: 6 },
    { id: "other", name: "其他问题", count: 10 }
  ]

  const commonQuestions = [
    {
      question: "如何修改个人资料？",
      answer: "进入个人中心，点击编辑资料按钮即可修改个人信息。"
    },
    {
      question: "如何申请职位？",
      answer: "在职位详情页面点击申请按钮，填写相关信息即可提交申请。"
    },
    {
      question: "VIP会员有什么特权？",
      answer: "VIP会员享有简历置顶、优先推荐、查看联系方式等多项特权。"
    },
    {
      question: "如何联系招聘方？",
      answer: "VIP用户可直接查看联系方式，普通用户可通过平台内消息联系。"
    }
  ]

  const handleSendMessage = () => {
    if (message.trim()) {
      // 这里可以添加发送消息的逻辑
      console.log("发送消息:", message)
      setMessage("")
    }
  }

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
            <div className="flex items-center space-x-2">
              <Headphones className="h-5 w-5 text-blue-600" />
              <h1 className="text-lg font-semibold">联系客服</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="px-4 py-6">
        {/* 客服选项 */}
        <div className="space-y-4 mb-6">
          {serviceOptions.map((option, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <option.icon className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">{option.title}</h3>
                      <p className="text-sm text-gray-600">{option.description}</p>
                      <div className="flex items-center space-x-1 mt-1">
                        <div className={`w-2 h-2 rounded-full ${option.statusColor}`}></div>
                        <span className="text-xs text-gray-500">{option.status}</span>
                      </div>
                    </div>
                  </div>
                  <Button size="sm" className="rounded-xl">
                    {option.action}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 在线聊天 */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MessageCircle className="h-5 w-5" />
              <span>在线咨询</span>
            </CardTitle>
            <CardDescription>
              描述您遇到的问题，我们将尽快为您解答
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* 问题分类 */}
              <div>
                <label className="text-sm font-medium mb-2 block">问题分类</label>
                <div className="flex flex-wrap gap-2">
                  {faqCategories.map((category) => (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? "default" : "outline"}
                      size="sm"
                      className="rounded-full"
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      {category.name}
                    </Button>
                  ))}
                </div>
              </div>

              {/* 消息输入 */}
              <div className="space-y-2">
                <Textarea
                  placeholder="请描述您遇到的问题..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="min-h-[100px]"
                />
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Smile className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button onClick={handleSendMessage} disabled={!message.trim()}>
                    <Send className="h-4 w-4 mr-2" />
                    发送
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 常见问题 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <HelpCircle className="h-5 w-5" />
              <span>常见问题</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {commonQuestions.map((faq, index) => (
                <div key={index}>
                  <details className="group">
                    <summary className="flex items-center justify-between cursor-pointer py-2">
                      <span className="font-medium">{faq.question}</span>
                      <div className="w-5 h-5 flex items-center justify-center">
                        <div className="w-3 h-0.5 bg-gray-400 group-open:rotate-90 transition-transform"></div>
                        <div className="w-0.5 h-3 bg-gray-400 absolute group-open:rotate-0 transition-transform"></div>
                      </div>
                    </summary>
                    <div className="pt-2 pb-4 text-sm text-gray-600">
                      {faq.answer}
                    </div>
                  </details>
                  {index < commonQuestions.length - 1 && <Separator />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 工作时间提示 */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <div className="flex items-center justify-center space-x-1 mb-1">
            <Clock className="h-4 w-4" />
            <span>客服工作时间：周一至周日 9:00-18:00</span>
          </div>
          <p>非工作时间请留言，我们会在工作时间内及时回复</p>
        </div>
      </main>
    </div>
  )
}
