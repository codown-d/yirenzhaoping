"use client"

import { useState } from "react"
import { ArrowLeft, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

export default function MessagesPage() {
  const [activeTab, setActiveTab] = useState("all")

  const conversations = [
    {
      id: 1,
      name: "东方歌舞团",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "您好，我们对您的简历很感兴趣，希望能进一步沟通",
      time: "10:30",
      unread: 2,
      type: "employer",
      online: true,
    },
    {
      id: 2,
      name: "李小华",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "谢谢您的指导，我会继续努力练习的",
      time: "昨天",
      unread: 0,
      type: "performer",
      online: false,
    },
    {
      id: 3,
      name: "星光马戏团",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "面试时间定在明天下午2点，请准时参加",
      time: "昨天",
      unread: 1,
      type: "employer",
      online: true,
    },
  ]

  const systemMessages = [
    {
      id: 1,
      title: "简历被查看",
      content: "您的简历被东方歌舞团查看了",
      time: "2小时前",
      type: "view",
    },
    {
      id: 2,
      title: "新的职位推荐",
      content: "为您推荐了3个新的演出机会",
      time: "1天前",
      type: "recommendation",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Button variant="ghost" size="sm" asChild className="mr-3 p-2">
                <Link href="/">
                  <ArrowLeft className="h-5 w-5" />
                </Link>
              </Button>
              <h1 className="text-lg font-semibold">消息</h1>
            </div>
            <Button variant="ghost" size="sm" className="p-2">
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="px-4 py-4 pb-20">
        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4">
          <TabsList className="grid w-full grid-cols-3 bg-white rounded-xl shadow-sm">
            <TabsTrigger value="all" className="rounded-xl">
              全部消息
            </TabsTrigger>
            <TabsTrigger value="chat" className="rounded-xl">
              聊天
            </TabsTrigger>
            <TabsTrigger value="system" className="rounded-xl">
              系统消息
            </TabsTrigger>
          </TabsList>

          {/* All Messages & Chat */}
          <TabsContent value={activeTab === "system" ? "system" : "chat"} className="space-y-2 mt-4">
            {activeTab !== "system" &&
              conversations.map((conversation) => (
                <Card key={conversation.id} className="rounded-2xl shadow-sm active:scale-98 transition-transform">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={conversation.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{conversation.name[0]}</AvatarFallback>
                        </Avatar>
                        {conversation.online && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center space-x-2">
                            <h4 className="font-medium text-sm truncate">{conversation.name}</h4>
                            {conversation.type === "employer" && (
                              <Badge variant="secondary" className="text-xs px-2 py-0.5">
                                招募方
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-gray-500">{conversation.time}</span>
                            {conversation.unread > 0 && (
                              <div className="w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                                {conversation.unread}
                              </div>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

            {/* System Messages */}
            {activeTab === "system" &&
              systemMessages.map((message) => (
                <Card key={message.id} className="rounded-2xl shadow-sm active:scale-98 transition-transform">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <div className="w-5 h-5 bg-green-500 rounded-full"></div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium text-sm">{message.title}</h4>
                          <span className="text-xs text-gray-500">{message.time}</span>
                        </div>
                        <p className="text-sm text-gray-600">{message.content}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>
        </Tabs>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex justify-around items-center">
          <Link href="/" className="flex flex-col items-center py-2 text-gray-500">
            <div className="w-6 h-6 mb-1">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
              </svg>
            </div>
            <span className="text-xs">首页</span>
          </Link>
          <Link href="/forum" className="flex flex-col items-center py-2 text-gray-500">
            <div className="w-6 h-6 mb-1">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
              </svg>
            </div>
            <span className="text-xs">论坛</span>
          </Link>
          <Link href="/messages" className="flex flex-col items-center py-2 text-green-600">
            <div className="w-6 h-6 mb-1">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
            </div>
            <span className="text-xs">消息</span>
          </Link>
          <Link href="/profile" className="flex flex-col items-center py-2 text-gray-500">
            <div className="w-6 h-6 mb-1">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
            <span className="text-xs">我的</span>
          </Link>
        </div>
      </nav>
    </div>
  )
}
