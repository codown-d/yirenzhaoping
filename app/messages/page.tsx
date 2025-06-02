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
    </div>
  )
}
