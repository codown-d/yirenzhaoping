"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import {
  ArrowLeft, Camera, Save, User, MapPin, Briefcase, GraduationCap,
  Phone, Mail, Calendar, Award, Star, Upload, Image, Video, X
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function EditJobseekerProfilePage() {
  const router = useRouter()
  const { user } = useAuth()

  // 表单数据状态 - 基于candidate详情页面数据结构
  const [formData, setFormData] = useState({
    // 基本信息
    name: user?.name || "李小华",
    age: "24",
    gender: "女",
    major: "古典舞",
    location: "北京市朝阳区",
    school: "北京舞蹈学院",
    avatar: user?.avatar || "/placeholder.svg?height=120&width=120",
    phone: "138****8888",
    email: user?.email || "lixiaohua@example.com",

    // 技能和介绍
    skills: ["古典舞", "民族舞", "芭蕾基础", "现代舞"],
    introduction: "我是一名专业的古典舞演员，毕业于北京舞蹈学院。有5年的舞台表演经验，擅长古典舞、民族舞，并具备芭蕾舞基础。曾参与多个大型舞蹈演出，希望能加入专业团队，展示自己的舞蹈才华。",

    // 工作经历
    experience: [
      {
        company: "东方歌舞团",
        position: "舞蹈演员",
        duration: "2021.06 - 2024.03",
        description: "参与团队的国内外巡演，主要表演民族舞和古典舞节目"
      },
      {
        company: "星光艺术团",
        position: "舞蹈演员",
        duration: "2019.08 - 2021.05",
        description: "参与各类商业演出和文艺晚会"
      }
    ],

    // 教育背景
    education: [
      {
        school: "北京舞蹈学院",
        major: "中国古典舞表演",
        degree: "学士学位",
        duration: "2015.09 - 2019.06",
        gpa: "3.8/4.0",
        honors: ["优秀毕业生", "专业第一名"]
      },
      {
        school: "北京舞蹈学院附中",
        major: "中国古典舞",
        degree: "中专",
        duration: "2012.09 - 2015.06",
        gpa: "优秀",
        honors: ["三好学生"]
      }
    ],

    // 获奖经历
    awards: ["全国舞蹈比赛金奖", "亚洲青年舞蹈家大赛银奖"],

    // 代表作品
    performances: [
      "《丝路花雨》主要舞者",
      "《梁祝》独舞",
      "《春江花月夜》群舞"
    ],

    // 求职意向
    expectedSalary: "8000-12000",
    workType: "全职",

    // 媒体文件 - 具体分类
    portfolioImages: [] as File[], // 个人展示图片 (最多4张)
    introductionVideo: null as File | null, // 自我介绍视频 (1个)
    skillVideos: [] as File[] // 专业技能视频 (最多3个)
  })

  // 技能输入状态
  const [newSkill, setNewSkill] = useState("")

  // 处理表单提交
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // 这里处理表单提交逻辑
    console.log("提交表单数据:", formData)
    // 模拟保存成功
    alert("资料更新成功！")
    router.push("/profile/jobseeker")
  }

  // 处理头像上传
  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setFormData(prev => ({ ...prev, avatar: e.target?.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  // 处理个人展示图片上传 (最多4张)
  const handlePortfolioImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const remainingSlots = 4 - formData.portfolioImages.length
    const filesToAdd = files.slice(0, remainingSlots)
    setFormData(prev => ({ ...prev, portfolioImages: [...prev.portfolioImages, ...filesToAdd] }))
  }

  // 处理自我介绍视频上传 (1个)
  const handleIntroductionVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData(prev => ({ ...prev, introductionVideo: file }))
    }
  }

  // 处理专业技能视频上传 (最多3个)
  const handleSkillVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const remainingSlots = 3 - formData.skillVideos.length
    const filesToAdd = files.slice(0, remainingSlots)
    setFormData(prev => ({ ...prev, skillVideos: [...prev.skillVideos, ...filesToAdd] }))
  }

  // 添加技能
  const addSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData(prev => ({ ...prev, skills: [...prev.skills, newSkill.trim()] }))
      setNewSkill("")
    }
  }

  // 删除技能
  const removeSkill = (skill: string) => {
    setFormData(prev => ({ ...prev, skills: prev.skills.filter(s => s !== skill) }))
  }

  // 删除个人展示图片
  const removePortfolioImage = (index: number) => {
    setFormData(prev => ({ ...prev, portfolioImages: prev.portfolioImages.filter((_, i) => i !== index) }))
  }

  // 删除自我介绍视频
  const removeIntroductionVideo = () => {
    setFormData(prev => ({ ...prev, introductionVideo: null }))
  }

  // 删除专业技能视频
  const removeSkillVideo = (index: number) => {
    setFormData(prev => ({ ...prev, skillVideos: prev.skillVideos.filter((_, i) => i !== index) }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.back()}
              className="rounded-full"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-lg font-semibold">编辑个人资料</h1>
          </div>
          <Button onClick={handleSubmit} size="sm" className="rounded-xl">
            <Save className="h-4 w-4 mr-2" />
            保存
          </Button>
        </div>
      </header>

      <main className="pb-20">
        <form onSubmit={handleSubmit} className="space-y-6 p-4">
          {/* 基本信息 */}
          <Card className="rounded-xl">
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                基本信息
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* 头像 */}
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={formData.avatar} />
                    <AvatarFallback className="text-2xl">{formData.name[0]}</AvatarFallback>
                  </Avatar>
                  <Button
                    type="button"
                    size="sm"
                    className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0"
                    onClick={() => document.getElementById('avatar-upload')?.click()}
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                  <input
                    type="file"
                    id="avatar-upload"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    className="hidden"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">更换头像</h3>
                  <p className="text-sm text-gray-600">支持 JPG、PNG 格式，建议尺寸 400x400</p>
                </div>
              </div>

              {/* 姓名和专业 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">姓名 *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="mt-1"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="major">专业特长 *</Label>
                  <Input
                    id="major"
                    value={formData.major}
                    onChange={(e) => setFormData(prev => ({ ...prev, major: e.target.value }))}
                    className="mt-1"
                    required
                  />
                </div>
              </div>

              {/* 联系方式 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">手机号码</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="email">邮箱地址</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="mt-1"
                  />
                </div>
              </div>

              {/* 地区和学校 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="location">所在地区</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="school">毕业院校</Label>
                  <Input
                    id="school"
                    value={formData.school}
                    onChange={(e) => setFormData(prev => ({ ...prev, school: e.target.value }))}
                    className="mt-1"
                  />
                </div>
              </div>

              {/* 个人信息 */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="age">年龄</Label>
                  <Input
                    id="age"
                    value={formData.age}
                    onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="gender">性别</Label>
                  <Select value={formData.gender} onValueChange={(value) => setFormData(prev => ({ ...prev, gender: value }))}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="男">男</SelectItem>
                      <SelectItem value="女">女</SelectItem>
                      <SelectItem value="不便透露">不便透露</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* 个人简介 */}
              <div>
                <Label htmlFor="introduction">个人简介</Label>
                <Textarea
                  id="introduction"
                  value={formData.introduction}
                  onChange={(e) => setFormData(prev => ({ ...prev, introduction: e.target.value }))}
                  className="mt-1"
                  rows={4}
                  placeholder="请简要介绍您的专业背景、工作经验和个人特色..."
                />
              </div>
            </CardContent>
          </Card>

          {/* 技能标签 */}
          <Card className="rounded-xl">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="h-5 w-5 mr-2" />
                技能标签
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {formData.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                    <span>{skill}</span>
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="ml-1 text-gray-500 hover:text-red-500"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex space-x-2">
                <Input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="添加技能标签"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                />
                <Button type="button" onClick={addSkill} variant="outline">
                  添加
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* 获奖经历 */}
          <Card className="rounded-xl">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Star className="h-5 w-5 mr-2" />
                获奖经历
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {formData.awards.map((award, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm">{award}</span>
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({
                        ...prev,
                        awards: prev.awards.filter((_, i) => i !== index)
                      }))}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex space-x-2">
                <Input
                  placeholder="添加获奖经历"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      const value = (e.target as HTMLInputElement).value.trim()
                      if (value && !formData.awards.includes(value)) {
                        setFormData(prev => ({ ...prev, awards: [...prev.awards, value] }))
                        ;(e.target as HTMLInputElement).value = ''
                      }
                    }
                  }}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={(e) => {
                    const input = e.currentTarget.previousElementSibling as HTMLInputElement
                    const value = input.value.trim()
                    if (value && !formData.awards.includes(value)) {
                      setFormData(prev => ({ ...prev, awards: [...prev.awards, value] }))
                      input.value = ''
                    }
                  }}
                >
                  添加
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* 代表作品 */}
          <Card className="rounded-xl">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                代表作品
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {formData.performances.map((performance, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm">{performance}</span>
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({
                        ...prev,
                        performances: prev.performances.filter((_, i) => i !== index)
                      }))}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex space-x-2">
                <Input
                  placeholder="添加代表作品"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      const value = (e.target as HTMLInputElement).value.trim()
                      if (value && !formData.performances.includes(value)) {
                        setFormData(prev => ({ ...prev, performances: [...prev.performances, value] }))
                        ;(e.target as HTMLInputElement).value = ''
                      }
                    }
                  }}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={(e) => {
                    const input = e.currentTarget.previousElementSibling as HTMLInputElement
                    const value = input.value.trim()
                    if (value && !formData.performances.includes(value)) {
                      setFormData(prev => ({ ...prev, performances: [...prev.performances, value] }))
                      input.value = ''
                    }
                  }}
                >
                  添加
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* 个人展示 */}
          <Card className="rounded-xl">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Upload className="h-5 w-5 mr-2" />
                个人展示
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* 个人展示图片 (4张) */}
              <div>
                <Label htmlFor="portfolio-images">个人展示图片 (最多4张)</Label>
                <p className="text-xs text-gray-500 mb-2">展示您的形象、舞台风采或专业照片</p>
                <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Image className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600 mb-2">
                    已上传 {formData.portfolioImages.length}/4 张图片
                  </p>
                  <input
                    type="file"
                    id="portfolio-images"
                    multiple
                    accept="image/*"
                    onChange={handlePortfolioImageUpload}
                    className="hidden"
                    disabled={formData.portfolioImages.length >= 4}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => document.getElementById('portfolio-images')?.click()}
                    disabled={formData.portfolioImages.length >= 4}
                  >
                    {formData.portfolioImages.length >= 4 ? '已达上限' : '选择图片'}
                  </Button>
                </div>
                {formData.portfolioImages.length > 0 && (
                  <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-3">
                    {formData.portfolioImages.map((file, index) => (
                      <div key={index} className="relative">
                        <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                          <Image className="h-8 w-8 text-gray-400" />
                        </div>
                        <button
                          type="button"
                          onClick={() => removePortfolioImage(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                        >
                          <X className="h-3 w-3" />
                        </button>
                        <p className="text-xs text-gray-600 mt-1 truncate">{file.name}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 自我介绍视频 (1个) */}
              <div>
                <Label htmlFor="introduction-video">自我介绍视频 (1个)</Label>
                <p className="text-xs text-gray-500 mb-2">录制一段简短的自我介绍，展示您的个人魅力</p>
                <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Video className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600 mb-2">
                    {formData.introductionVideo ? '已上传自我介绍视频' : '上传自我介绍视频'}
                  </p>
                  <input
                    type="file"
                    id="introduction-video"
                    accept="video/*"
                    onChange={handleIntroductionVideoUpload}
                    className="hidden"
                    disabled={!!formData.introductionVideo}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => document.getElementById('introduction-video')?.click()}
                    disabled={!!formData.introductionVideo}
                  >
                    {formData.introductionVideo ? '已上传' : '选择视频'}
                  </Button>
                </div>
                {formData.introductionVideo && (
                  <div className="mt-3">
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-center space-x-3">
                        <Video className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="text-sm font-medium text-blue-900">自我介绍视频</p>
                          <p className="text-xs text-blue-700">
                            {formData.introductionVideo.name} • {(formData.introductionVideo.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={removeIntroductionVideo}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* 专业技能视频 (3个) */}
              <div>
                <Label htmlFor="skill-videos">专业技能视频 (最多3个)</Label>
                <p className="text-xs text-gray-500 mb-2">展示您的专业技能、表演片段或作品集锦</p>
                <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Video className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600 mb-2">
                    已上传 {formData.skillVideos.length}/3 个专业视频
                  </p>
                  <input
                    type="file"
                    id="skill-videos"
                    multiple
                    accept="video/*"
                    onChange={handleSkillVideoUpload}
                    className="hidden"
                    disabled={formData.skillVideos.length >= 3}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => document.getElementById('skill-videos')?.click()}
                    disabled={formData.skillVideos.length >= 3}
                  >
                    {formData.skillVideos.length >= 3 ? '已达上限' : '选择视频'}
                  </Button>
                </div>
                {formData.skillVideos.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {formData.skillVideos.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                        <div className="flex items-center space-x-3">
                          <Video className="h-5 w-5 text-green-600" />
                          <div>
                            <p className="text-sm font-medium text-green-900">专业技能视频 {index + 1}</p>
                            <p className="text-xs text-green-700">
                              {file.name} • {(file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeSkillVideo(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* 求职意向 */}
          <Card className="rounded-xl">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Briefcase className="h-5 w-5 mr-2" />
                求职意向
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expectedSalary">期望薪资</Label>
                  <Select value={formData.expectedSalary} onValueChange={(value) => setFormData(prev => ({ ...prev, expectedSalary: value }))}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3000-5000">3000-5000元</SelectItem>
                      <SelectItem value="5000-8000">5000-8000元</SelectItem>
                      <SelectItem value="8000-12000">8000-12000元</SelectItem>
                      <SelectItem value="12000-20000">12000-20000元</SelectItem>
                      <SelectItem value="20000以上">20000元以上</SelectItem>
                      <SelectItem value="面议">面议</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="workType">工作类型</Label>
                  <Select value={formData.workType} onValueChange={(value) => setFormData(prev => ({ ...prev, workType: value }))}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="全职">全职</SelectItem>
                      <SelectItem value="兼职">兼职</SelectItem>
                      <SelectItem value="实习">实习</SelectItem>
                      <SelectItem value="临时">临时工作</SelectItem>
                      <SelectItem value="自由职业">自由职业</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </form>
      </main>
    </div>
  )
}
