"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PageHeader, SubPageHeader } from "@/components/ui/page-header"
import { SAMPLE_CONVERSATIONS, SAMPLE_SYSTEM_MESSAGES } from "@/constants"
import Link from "next/link"

export default function MessagesPage() {
  const [activeTab, setActiveTab] = useState("all")

  // 使用常量文件中的数据
  const conversations = SAMPLE_CONVERSATIONS
  const systemMessages = SAMPLE_SYSTEM_MESSAGES

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 头部组件 */}
      <PageHeader
        title="消息"
      />

      <main className="px-4 py-4 pb-24">
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
