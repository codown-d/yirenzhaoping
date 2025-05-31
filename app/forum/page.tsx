"use client"

import { useState } from "react"
import { Search, Plus, Heart, MessageCircle, Share2, TrendingUp, Hash, ArrowLeft, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

export default function ForumPage() {
  const [activeTab, setActiveTab] = useState("hot")

  const topics = [
    { id: 1, name: "舞蹈技巧", count: 234 },
    { id: 2, name: "演出机会", count: 156 },
    { id: 3, name: "武术交流", count: 142 },
    { id: 4, name: "杂技表演", count: 89 },
    { id: 5, name: "音乐分享", count: 176 },
  ]

  const posts = [
    {
      id: 1,
      author: {
        name: "舞蹈小王子",
        avatar: "/placeholder.svg?height=40&width=40",
        title: "古典舞演员",
      },
      content:
        "刚刚结束了一场大型演出，分享一下我的心得体会。这次演出是《丝路花雨》的重排版，我担任主要舞者之一。排练了两个月，每天8小时的高强度训练，但看到观众的反响，一切都值得了...",
      images: ["/placeholder.svg?height=150&width=200", "/placeholder.svg?height=150&width=200"],
      topics: ["舞蹈技巧", "演出机会"],
      likes: 128,
      comments: 45,
      shares: 12,
      time: "2小时前",
      isLiked: false,
    },
    {
      id: 2,
      author: {
        name: "武术达人",
        avatar: "/placeholder.svg?height=40&width=40",
        title: "武术表演者",
      },
      content:
        "给大家分享一个武术表演中的小技巧：如何在长拳表演中提高爆发力。我觉得最重要的是呼吸节奏和发力点的掌握，还有就是要保持身体的协调性...",
      topics: ["武术交流"],
      likes: 89,
      comments: 23,
      shares: 8,
      time: "4小时前",
      isLiked: true,
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
              <h1 className="text-lg font-semibold">论坛</h1>
            </div>
            <Button size="sm" className="h-8 px-3 rounded-xl">
              <Plus className="h-4 w-4 mr-1" />
              发帖
            </Button>
          </div>
        </div>
      </header>

      <main className="px-4 py-4 pb-20">
        {/* Search */}
        <div className="bg-white rounded-2xl shadow-sm p-4 mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input placeholder="搜索话题、内容..." className="pl-10 h-12 rounded-xl border-gray-200" />
          </div>
        </div>

        {/* Hot Topics */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-medium">热门话题</h3>
            <Button variant="ghost" size="sm" className="text-green-600">
              更多
            </Button>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {topics.map((topic) => (
              <div
                key={topic.id}
                className="flex-shrink-0 bg-white rounded-xl px-4 py-2 shadow-sm active:scale-95 transition-transform"
              >
                <div className="flex items-center space-x-2">
                  <Hash className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium">{topic.name}</span>
                  <span className="text-xs text-gray-500">{topic.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4">
          <TabsList className="grid w-full grid-cols-4 bg-white rounded-xl shadow-sm">
            <TabsTrigger value="hot" className="rounded-xl">
              <TrendingUp className="h-4 w-4 mr-1" />
              热门
            </TabsTrigger>
            <TabsTrigger value="latest" className="rounded-xl">
              最新
            </TabsTrigger>
            <TabsTrigger value="following" className="rounded-xl">
              关注
            </TabsTrigger>
            <TabsTrigger value="my" className="rounded-xl">
              我的
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-4 mt-4">
            {posts.map((post) => (
              <Card key={post.id} className="rounded-2xl shadow-sm">
                <CardContent className="p-4">
                  <div className="flex space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={post.author.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium text-sm">{post.author.name}</h4>
                          <span className="text-xs text-gray-500">{post.author.title}</span>
                          <span className="text-xs text-gray-400">·</span>
                          <span className="text-xs text-gray-400">{post.time}</span>
                        </div>
                        <Button variant="ghost" size="sm" className="p-1">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="mb-3">
                        <p className="text-gray-700 leading-relaxed text-sm">{post.content}</p>
                      </div>

                      {post.images && (
                        <div className="grid grid-cols-2 gap-2 mb-3">
                          {post.images.map((image, index) => (
                            <div key={index} className="aspect-[4/3] bg-gray-200 rounded-xl overflow-hidden">
                              <img
                                src={image || "/placeholder.svg"}
                                alt={`帖子图片 ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="flex flex-wrap gap-1 mb-3">
                        {post.topics.map((topic, index) => (
                          <Badge key={index} variant="secondary" className="text-xs rounded-lg">
                            <Hash className="h-3 w-3 mr-1" />
                            {topic}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between text-gray-500">
                        <div className="flex items-center space-x-4">
                          <button
                            className={`flex items-center space-x-1 transition-colors ${
                              post.isLiked ? "text-red-500" : "hover:text-red-500"
                            }`}
                          >
                            <Heart className={`h-4 w-4 ${post.isLiked ? "fill-current" : ""}`} />
                            <span className="text-sm">{post.likes}</span>
                          </button>
                          <button className="flex items-center space-x-1 hover:text-green-500 transition-colors">
                            <MessageCircle className="h-4 w-4" />
                            <span className="text-sm">{post.comments}</span>
                          </button>
                          <button className="flex items-center space-x-1 hover:text-green-500 transition-colors">
                            <Share2 className="h-4 w-4" />
                            <span className="text-sm">{post.shares}</span>
                          </button>
                        </div>
                      </div>
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
          <Link href="/forum" className="flex flex-col items-center py-2 text-green-600">
            <div className="w-6 h-6 mb-1">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
              </svg>
            </div>
            <span className="text-xs">论坛</span>
          </Link>
          <Link href="/messages" className="flex flex-col items-center py-2 text-gray-500">
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
