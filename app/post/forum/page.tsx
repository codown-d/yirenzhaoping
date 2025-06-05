"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Image, Video, Hash, MapPin, Users, Eye, EyeOff, Star, Plus, X, Camera, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Link from "next/link"

export default function ForumPostPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    topics: [] as string[],
    location: "",
    visibility: "public", // public, private, followers
    allowComments: true,
    isAnonymous: false,
    images: [] as File[],
    videos: [] as File[],
    mood: "none", // 心情状态
    customTopic: "",
  })

  // 帖子分类
  const categories = [
    { value: "experience", label: "经验分享", icon: "💡" },
    { value: "discussion", label: "讨论交流", icon: "💬" },
    { value: "showcase", label: "作品展示", icon: "🎭" },
    { value: "tutorial", label: "教程指导", icon: "📚" },
    { value: "news", label: "行业资讯", icon: "📰" },
    { value: "question", label: "求助提问", icon: "❓" },
    { value: "daily", label: "日常分享", icon: "📝" },
    { value: "event", label: "活动通知", icon: "📅" },
  ]

  // 热门话题
  const popularTopics = [
    "舞蹈技巧", "表演心得", "舞台经验", "练功日常", "比赛分享",
    "服装道具", "化妆造型", "音乐推荐", "身体保养", "心理调节",
    "行业趋势", "大师课程", "演出机会", "团队合作", "创作灵感"
  ]

  // 心情状态
  const moodOptions = [
    { value: "none", label: "无", emoji: "" },
    { value: "happy", label: "开心", emoji: "😊" },
    { value: "excited", label: "兴奋", emoji: "🤩" },
    { value: "proud", label: "自豪", emoji: "😎" },
    { value: "grateful", label: "感恩", emoji: "🙏" },
    { value: "thoughtful", label: "深思", emoji: "🤔" },
    { value: "inspired", label: "受启发", emoji: "💡" },
    { value: "tired", label: "疲惫", emoji: "😴" },
    { value: "nervous", label: "紧张", emoji: "😰" },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("发布论坛帖子:", formData)
    // 这里可以添加实际的提交逻辑
    router.push('/forum')
  }

  const handleTopicToggle = (topic: string) => {
    if (formData.topics.includes(topic)) {
      setFormData(prev => ({
        ...prev,
        topics: prev.topics.filter(t => t !== topic)
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        topics: [...prev.topics, topic]
      }))
    }
  }

  const handleAddCustomTopic = () => {
    if (formData.customTopic.trim() && !formData.topics.includes(formData.customTopic.trim())) {
      setFormData(prev => ({
        ...prev,
        topics: [...prev.topics, prev.customTopic.trim()],
        customTopic: ""
      }))
    }
  }

  const handleRemoveTopic = (topic: string) => {
    setFormData(prev => ({
      ...prev,
      topics: prev.topics.filter(t => t !== topic)
    }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setFormData(prev => ({ ...prev, images: [...prev.images, ...files] }))
  }

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setFormData(prev => ({ ...prev, videos: [...prev.videos, ...files] }))
  }

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }))
  }

  const removeVideo = (index: number) => {
    setFormData(prev => ({
      ...prev,
      videos: prev.videos.filter((_, i) => i !== index)
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center">
            <Button variant="ghost" size="sm" asChild className="mr-2">
              <Link href="/forum">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <h1 className="text-xl font-bold text-green-600">发布帖子</h1>
          </div>
          <Button 
            type="submit" 
            form="forum-post-form"
            className="rounded-xl"
            disabled={!formData.title.trim() || !formData.content.trim()}
          >
            发布
          </Button>
        </div>
      </header>

      <main className="max-w-2xl mx-auto p-4 pb-20">
        <form id="forum-post-form" onSubmit={handleSubmit} className="space-y-6">
          {/* 基本信息 */}
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Hash className="h-5 w-5 mr-2" />
                基本信息
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">帖子标题 *</Label>
                <Input
                  id="title"
                  placeholder="分享一个有趣的话题..."
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="mt-1"
                  maxLength={100}
                  required
                />
                <div className="text-xs text-gray-500 mt-1">
                  {formData.title.length}/100
                </div>
              </div>

              <div>
                <Label htmlFor="content">帖子内容 *</Label>
                <Textarea
                  id="content"
                  placeholder="分享你的想法、经验或见解..."
                  value={formData.content}
                  onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                  className="mt-1 min-h-[120px]"
                  maxLength={2000}
                  required
                />
                <div className="text-xs text-gray-500 mt-1">
                  {formData.content.length}/2000
                </div>
              </div>

              <div>
                <Label htmlFor="category">帖子分类 *</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="选择帖子分类" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        <span className="flex items-center">
                          <span className="mr-2">{category.icon}</span>
                          {category.label}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="mood">心情状态</Label>
                <Select value={formData.mood} onValueChange={(value) => setFormData(prev => ({ ...prev, mood: value }))}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="选择当前心情" />
                  </SelectTrigger>
                  <SelectContent>
                    {moodOptions.map((mood) => (
                      <SelectItem key={mood.value} value={mood.value}>
                        <span className="flex items-center">
                          {mood.emoji && <span className="mr-2">{mood.emoji}</span>}
                          {mood.label}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* 话题标签 */}
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Hash className="h-5 w-5 mr-2" />
                话题标签
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>热门话题</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {popularTopics.map((topic) => (
                    <Badge
                      key={topic}
                      variant={formData.topics.includes(topic) ? "default" : "outline"}
                      className={`cursor-pointer rounded-full px-3 py-1 ${
                        formData.topics.includes(topic) 
                          ? "bg-green-100 text-green-800 hover:bg-green-200" 
                          : "hover:bg-gray-100"
                      }`}
                      onClick={() => handleTopicToggle(topic)}
                    >
                      #{topic}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="customTopic">自定义话题</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    id="customTopic"
                    placeholder="输入自定义话题"
                    value={formData.customTopic}
                    onChange={(e) => setFormData(prev => ({ ...prev, customTopic: e.target.value }))}
                    maxLength={20}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleAddCustomTopic}
                    disabled={!formData.customTopic.trim()}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {formData.topics.length > 0 && (
                <div>
                  <Label>已选择的话题</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.topics.map((topic) => (
                      <Badge
                        key={topic}
                        className="bg-green-100 text-green-800 hover:bg-green-200 rounded-full px-3 py-1 cursor-pointer"
                        onClick={() => handleRemoveTopic(topic)}
                      >
                        #{topic}
                        <X className="ml-1 h-3 w-3" />
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* 媒体上传 */}
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Camera className="h-5 w-5 mr-2" />
                媒体内容
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="images">上传图片</Label>
                  <div className="mt-1">
                    <input
                      type="file"
                      id="images"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full h-20 border-dashed"
                      onClick={() => document.getElementById('images')?.click()}
                    >
                      <div className="text-center">
                        <Image className="h-6 w-6 mx-auto mb-1" />
                        <span className="text-sm">选择图片</span>
                      </div>
                    </Button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="videos">上传视频</Label>
                  <div className="mt-1">
                    <input
                      type="file"
                      id="videos"
                      multiple
                      accept="video/*"
                      onChange={handleVideoUpload}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full h-20 border-dashed"
                      onClick={() => document.getElementById('videos')?.click()}
                    >
                      <div className="text-center">
                        <Video className="h-6 w-6 mx-auto mb-1" />
                        <span className="text-sm">选择视频</span>
                      </div>
                    </Button>
                  </div>
                </div>
              </div>

              {/* 已上传的图片 */}
              {formData.images.length > 0 && (
                <div>
                  <Label>已上传的图片</Label>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {formData.images.map((file, index) => (
                      <div key={index} className="relative">
                        <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                          <Image className="h-8 w-8 text-gray-400" />
                        </div>
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                          onClick={() => removeImage(index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                        <p className="text-xs text-gray-500 mt-1 truncate">{file.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 已上传的视频 */}
              {formData.videos.length > 0 && (
                <div>
                  <Label>已上传的视频</Label>
                  <div className="space-y-2 mt-2">
                    {formData.videos.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <Video className="h-4 w-4 mr-2 text-gray-500" />
                          <span className="text-sm truncate">{file.name}</span>
                        </div>
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="h-6 w-6 rounded-full p-0"
                          onClick={() => removeVideo(index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* 位置和隐私设置 */}
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                发布设置
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="location">位置信息（可选）</Label>
                <div className="flex items-center mt-1">
                  <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                  <Input
                    id="location"
                    placeholder="添加位置信息"
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  />
                </div>
              </div>

              <div>
                <Label>可见性设置</Label>
                <RadioGroup
                  value={formData.visibility}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, visibility: value }))}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="public" id="public" />
                    <Label htmlFor="public" className="flex items-center cursor-pointer">
                      <Eye className="h-4 w-4 mr-1" />
                      公开 - 所有人可见
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="followers" id="followers" />
                    <Label htmlFor="followers" className="flex items-center cursor-pointer">
                      <Users className="h-4 w-4 mr-1" />
                      关注者可见
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="private" id="private" />
                    <Label htmlFor="private" className="flex items-center cursor-pointer">
                      <EyeOff className="h-4 w-4 mr-1" />
                      仅自己可见
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="allowComments"
                    checked={formData.allowComments}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, allowComments: !!checked }))}
                  />
                  <Label htmlFor="allowComments" className="cursor-pointer">
                    允许评论
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isAnonymous"
                    checked={formData.isAnonymous}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isAnonymous: !!checked }))}
                  />
                  <Label htmlFor="isAnonymous" className="cursor-pointer">
                    匿名发布
                  </Label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 发布预览 */}
          <Card className="rounded-2xl bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
            <CardContent className="p-4">
              <div className="text-center">
                <h3 className="font-semibold text-green-800 mb-2">发布提示</h3>
                <p className="text-sm text-green-700 mb-3">
                  请确保您的内容符合社区规范，友善交流，共建和谐论坛环境
                </p>
                <div className="flex items-center justify-center space-x-4 text-xs text-green-600">
                  <span>• 尊重他人</span>
                  <span>• 内容真实</span>
                  <span>• 积极正面</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </form>
      </main>
    </div>
  )
}
