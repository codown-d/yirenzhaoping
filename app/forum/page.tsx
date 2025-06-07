"use client"

import { useState } from "react"
import { Search, Plus, Heart, MessageCircle, Share2, TrendingUp, Hash, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PageHeader, SubPageHeader } from "@/components/ui/page-header"
import { SAMPLE_FORUM_TOPICS, SAMPLE_FORUM_POSTS } from "@/constants"
import Link from "next/link"
import { useAuth, UserType } from "@/lib/auth-context"

export default function ForumPage() {
  const [activeTab, setActiveTab] = useState("hot")

  // 使用常量文件中的数据
  const topics = SAMPLE_FORUM_TOPICS
  const posts = SAMPLE_FORUM_POSTS

  const { role } = useAuth()

  // 未登录状态按照求职者逻辑处理
  const effectiveRole = role || UserType.JobSeeker
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 头部组件 */}
      <PageHeader
        title="论坛"
      />

      <main className="px-4 py-4 pb-24">

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

        {/* Post Creation Card */}
        <Card className="rounded-2xl shadow-sm mb-4 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-green-100 text-green-600">我</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <Button
                  variant="outline"
                  className="w-full justify-start text-gray-500 bg-white hover:bg-gray-50 rounded-xl h-10"
                  asChild
                >
                  <Link href="/post/forum">
                    分享你的表演经验、技巧或心得...
                  </Link>
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-green-200">
              <div className="flex space-x-4">
                <Button variant="ghost" size="sm" className="text-green-600 hover:bg-green-100" asChild>
                  <Link href="/post/forum">
                    <Plus className="h-4 w-4 mr-1" />
                    发布动态
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" className="text-green-600 hover:bg-green-100" asChild>
                  <Link href="/post/forum">
                    <Hash className="h-4 w-4 mr-1" />
                    参与话题
                  </Link>
                </Button>
              </div>
              <Badge className="bg-green-100 text-green-700 hover:bg-green-200">
                <TrendingUp className="h-3 w-3 mr-1" />
                热门
              </Badge>
            </div>
          </CardContent>
        </Card>

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

      {/* Floating Action Button */}
      <div className="fixed bottom-20 right-4 z-40">
        <Button
          size="lg"
          className="h-14 w-14 rounded-full shadow-lg bg-purple-500 hover:bg-purple-600 border-4 border-white"
          asChild
        >
          <Link href="/post/forum">
            <Plus className="h-6 w-6" />
          </Link>
        </Button>
      </div>
   
    </div>
  )
}
