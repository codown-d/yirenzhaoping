"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Upload, MapPin, DollarSign, Calendar, Building, Tag, Image, Video, Star, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import PostThreeLevelCategorySelector from "@/components/PostThreeLevelCategorySelector"

export default function EmployerPostPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    workType: "",
    categoryType: "frontend", // 一级分类
    subcategory: "", // 二级分类
    specificRole: "", // 三级分类
    requirements: [] as string[],
    benefits: [] as string[],
    contactInfo: "",
    companyName: "",
    companyDescription: "",
    images: [] as File[],
    videos: [] as File[],
    urgent: false,
    experience: "",
    education: "",
    recruitCount: "",
    deadline: "",
    performanceType: "",
    performanceDate: "",
  })

  // 处理三级分类选择
  const handleCategoryChange = (category: string) => {
    setFormData(prev => ({
      ...prev,
      categoryType: category,
      subcategory: "",
      specificRole: ""
    }))
  }

  const handleSubcategoryChange = (subcategory: string) => {
    setFormData(prev => ({
      ...prev,
      subcategory: subcategory,
      specificRole: ""
    }))
  }

  const handleSpecificRoleChange = (role: string) => {
    setFormData(prev => ({
      ...prev,
      specificRole: role
    }))
  }

  const workTypes = ["全职", "兼职", "临时", "合同制", "实习"]
  
  const experienceOptions = ["不限", "应届生", "1年以内", "1-3年", "3-5年", "5年以上"]
  
  const educationOptions = ["不限", "中专", "大专", "本科", "硕士", "博士"]

  const commonRequirements = [
    "形象气质佳", "舞台经验丰富", "专业院校毕业", "获奖经历",
    "团队合作能力强", "责任心强", "能适应出差", "英语流利",
    "创新能力强", "学习能力强", "抗压能力强", "沟通能力强",
    "身高要求", "年龄要求", "性别要求", "体重要求"
  ]

  const commonBenefits = [
    "五险一金", "包食宿", "交通补贴", "话费补贴",
    "年终奖", "绩效奖金", "带薪年假", "节日福利",
    "培训机会", "晋升空间", "团建活动", "健康体检",
    "弹性工作", "免费工作餐", "住房补贴", "出国机会"
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("提交招聘信息:", formData)
    router.push('/forum')
  }

  const handleRequirementToggle = (requirement: string) => {
    setFormData(prev => ({
      ...prev,
      requirements: prev.requirements.includes(requirement)
        ? prev.requirements.filter(r => r !== requirement)
        : [...prev.requirements, requirement]
    }))
  }

  const handleBenefitToggle = (benefit: string) => {
    setFormData(prev => ({
      ...prev,
      benefits: prev.benefits.includes(benefit)
        ? prev.benefits.filter(b => b !== benefit)
        : [...prev.benefits, benefit]
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
            <h1 className="text-xl font-bold text-green-600">发布招聘信息</h1>
          </div>
          <Button 
            type="submit" 
            form="employer-post-form"
            className="rounded-xl"
          >
            发布
          </Button>
        </div>
      </header>

      <main className="max-w-2xl mx-auto p-4 pb-24">
        <form id="employer-post-form" onSubmit={handleSubmit} className="space-y-6">
          {/* 职位信息 */}
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building className="h-5 w-5 mr-2" />
                职位信息
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">职位标题 *</Label>
                <Input
                  id="title"
                  placeholder="如：古典舞演员"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="mt-1"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">职位描述 *</Label>
                <Textarea
                  id="description"
                  placeholder="请详细描述职位要求、工作内容、表演类型等..."
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="mt-1 min-h-[120px]"
                  required
                />
              </div>

              {/* 三级分类选择 */}
              <PostThreeLevelCategorySelector
                selectedCategory={formData.categoryType}
                selectedSubcategory={formData.subcategory}
                selectedItem={formData.specificRole}
                onCategoryChange={handleCategoryChange}
                onSubcategoryChange={handleSubcategoryChange}
                onItemChange={handleSpecificRoleChange}
              />

              <div>
                <Label htmlFor="location">工作地点 *</Label>
                <Input
                  id="location"
                  placeholder="如：北京市朝阳区"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  className="mt-1"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="performanceType">演出类型</Label>
                  <Input
                    id="performanceType"
                    placeholder="如：大型舞台剧"
                    value={formData.performanceType}
                    onChange={(e) => setFormData(prev => ({ ...prev, performanceType: e.target.value }))}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="performanceDate">演出时间</Label>
                  <Input
                    id="performanceDate"
                    placeholder="如：2024年3月-6月"
                    value={formData.performanceDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, performanceDate: e.target.value }))}
                    className="mt-1"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 薪资待遇 */}
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="h-5 w-5 mr-2" />
                薪资待遇
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="salary">薪资范围 *</Label>
                  <Input
                    id="salary"
                    placeholder="如：8000-15000/月"
                    value={formData.salary}
                    onChange={(e) => setFormData(prev => ({ ...prev, salary: e.target.value }))}
                    className="mt-1"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="workType">工作性质</Label>
                  <Select onValueChange={(value) => setFormData(prev => ({ ...prev, workType: value }))}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="选择类型" />
                    </SelectTrigger>
                    <SelectContent>
                      {workTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label>福利待遇</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {commonBenefits.map((benefit) => (
                    <div key={benefit} className="flex items-center space-x-2">
                      <Checkbox
                        id={benefit}
                        checked={formData.benefits.includes(benefit)}
                        onCheckedChange={() => handleBenefitToggle(benefit)}
                      />
                      <Label htmlFor={benefit} className="text-sm cursor-pointer">
                        {benefit}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 任职要求 */}
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                任职要求
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="recruitCount">招聘人数</Label>
                  <Input
                    id="recruitCount"
                    placeholder="如：5人"
                    value={formData.recruitCount}
                    onChange={(e) => setFormData(prev => ({ ...prev, recruitCount: e.target.value }))}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="experience">工作经验</Label>
                  <Select onValueChange={(value) => setFormData(prev => ({ ...prev, experience: value }))}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="选择经验" />
                    </SelectTrigger>
                    <SelectContent>
                      {experienceOptions.map((exp) => (
                        <SelectItem key={exp} value={exp}>
                          {exp}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="education">学历要求</Label>
                  <Select onValueChange={(value) => setFormData(prev => ({ ...prev, education: value }))}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="选择学历" />
                    </SelectTrigger>
                    <SelectContent>
                      {educationOptions.map((edu) => (
                        <SelectItem key={edu} value={edu}>
                          {edu}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label>具体要求</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {commonRequirements.map((requirement) => (
                    <div key={requirement} className="flex items-center space-x-2">
                      <Checkbox
                        id={requirement}
                        checked={formData.requirements.includes(requirement)}
                        onCheckedChange={() => handleRequirementToggle(requirement)}
                      />
                      <Label htmlFor={requirement} className="text-sm cursor-pointer">
                        {requirement}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="deadline">报名截止时间</Label>
                <Input
                  id="deadline"
                  type="date"
                  value={formData.deadline}
                  onChange={(e) => setFormData(prev => ({ ...prev, deadline: e.target.value }))}
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>

          {/* 公司信息 */}
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building className="h-5 w-5 mr-2" />
                公司信息
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="companyName">公司/团体名称 *</Label>
                <Input
                  id="companyName"
                  placeholder="如：北京东方歌舞团"
                  value={formData.companyName}
                  onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
                  className="mt-1"
                  required
                />
              </div>

              <div>
                <Label htmlFor="companyDescription">公司简介 *</Label>
                <Textarea
                  id="companyDescription"
                  placeholder="请简要介绍公司背景、规模、主要业务等..."
                  value={formData.companyDescription}
                  onChange={(e) => setFormData(prev => ({ ...prev, companyDescription: e.target.value }))}
                  className="mt-1 min-h-[80px]"
                />
              </div>
            </CardContent>
          </Card>

          {/* 宣传材料 */}
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Upload className="h-5 w-5 mr-2" />
                宣传材料
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="images">上传宣传图片 *</Label>
                <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Image className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600 mb-2">展示演出场景、公司环境等</p>
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
                    size="sm"
                    onClick={() => document.getElementById('images')?.click()}
                  >
                    选择图片
                  </Button>
                </div>
                {formData.images.length > 0 && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-600">已选择 {formData.images.length} 张图片</p>
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="videos">上传宣传视频 *</Label>
                <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Video className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600 mb-2">展示演出片段、公司介绍等</p>
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
                    size="sm"
                    onClick={() => document.getElementById('videos')?.click()}
                  >
                    选择视频
                  </Button>
                </div>
                {formData.videos.length > 0 && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-600">已选择 {formData.videos.length} 个视频</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* 联系方式 */}
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>联系方式</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <Label htmlFor="contactInfo">联系方式 *</Label>
                <Input
                  id="contactInfo"
                  placeholder="手机号码或微信号"
                  value={formData.contactInfo}
                  onChange={(e) => setFormData(prev => ({ ...prev, contactInfo: e.target.value }))}
                  className="mt-1"
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* 其他选项 */}
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>其他选项</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="urgent"
                  checked={formData.urgent}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, urgent: !!checked }))}
                />
                <Label htmlFor="urgent" className="cursor-pointer">
                  <Star className="h-4 w-4 inline mr-1" />
                  紧急招聘
                </Label>
              </div>
            </CardContent>
          </Card>
        </form>
      </main>
    </div>
  )
}
