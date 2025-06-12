"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import {
  ArrowLeft, Camera, Save, Building, MapPin, Phone, Mail, 
  Users, Award, Globe, FileText, Upload, Image, X
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function EditEmployerProfilePage() {
  const router = useRouter()
  const { user } = useAuth()

  // 表单数据状态 - 基于employer profile数据结构
  const [formData, setFormData] = useState({
    // 基本信息
    name: user?.name || "张总",
    avatar: user?.avatar || "/placeholder.svg?height=120&width=120",
    title: "东方歌舞团 - 人事总监",
    company: "东方歌舞团",
    location: "北京市朝阳区",
    phone: "138****9999",
    email: user?.email || "zhang@dongfang.com",

    // 公司信息
    establishedYear: "1952年",
    employeeCount: "200-500人",
    industry: "文艺表演",
    address: "北京市朝阳区文化艺术中心",
    website: "www.dongfangdance.com",

    // 公司介绍
    description: "东方歌舞团是一家专业的表演艺术团体，致力于中国传统舞蹈的传承与创新，常年在国内外进行巡演活动。",
    culture: "传承经典、创新发展、团队协作、追求卓越",

    // 福利待遇和要求
    benefits: ["五险一金", "演出补贴", "舞台机会多", "国内外巡演", "专业培训"],
    requirements: ["相关专业背景", "良好的沟通能力", "团队合作精神", "学习能力强"],

    // 媒体文件 - 具体分类
    workEnvironmentImages: [] as File[], // 工作环境照片 (最多4张)
    teamPhotos: [] as File[] // 团队风采照片 (最多4张)
  })

  // 福利输入状态
  const [newBenefit, setNewBenefit] = useState("")
  // 要求输入状态
  const [newRequirement, setNewRequirement] = useState("")

  // 处理表单提交
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("提交表单数据:", formData)
    alert("公司资料更新成功！")
    router.push("/profile/employer")
  }

  // 处理Logo上传
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setFormData(prev => ({ ...prev, avatar: e.target?.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  // 处理工作环境照片上传 (最多4张)
  const handleWorkEnvironmentImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const remainingSlots = 4 - formData.workEnvironmentImages.length
    const filesToAdd = files.slice(0, remainingSlots)
    setFormData(prev => ({ ...prev, workEnvironmentImages: [...prev.workEnvironmentImages, ...filesToAdd] }))
  }

  // 处理团队风采照片上传 (最多4张)
  const handleTeamPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const remainingSlots = 4 - formData.teamPhotos.length
    const filesToAdd = files.slice(0, remainingSlots)
    setFormData(prev => ({ ...prev, teamPhotos: [...prev.teamPhotos, ...filesToAdd] }))
  }

  // 添加福利
  const addBenefit = () => {
    if (newBenefit.trim() && !formData.benefits.includes(newBenefit.trim())) {
      setFormData(prev => ({ ...prev, benefits: [...prev.benefits, newBenefit.trim()] }))
      setNewBenefit("")
    }
  }

  // 删除福利
  const removeBenefit = (benefit: string) => {
    setFormData(prev => ({ ...prev, benefits: prev.benefits.filter(b => b !== benefit) }))
  }

  // 添加要求
  const addRequirement = () => {
    if (newRequirement.trim() && !formData.requirements.includes(newRequirement.trim())) {
      setFormData(prev => ({ ...prev, requirements: [...prev.requirements, newRequirement.trim()] }))
      setNewRequirement("")
    }
  }

  // 删除要求
  const removeRequirement = (requirement: string) => {
    setFormData(prev => ({ ...prev, requirements: prev.requirements.filter(r => r !== requirement) }))
  }

  // 删除工作环境照片
  const removeWorkEnvironmentImage = (index: number) => {
    setFormData(prev => ({ ...prev, workEnvironmentImages: prev.workEnvironmentImages.filter((_, i) => i !== index) }))
  }

  // 删除团队风采照片
  const removeTeamPhoto = (index: number) => {
    setFormData(prev => ({ ...prev, teamPhotos: prev.teamPhotos.filter((_, i) => i !== index) }))
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
            <h1 className="text-lg font-semibold">编辑公司资料</h1>
          </div>
          <Button onClick={handleSubmit} size="sm" className="rounded-xl">
            <Save className="h-4 w-4 mr-2" />
            保存
          </Button>
        </div>
      </header>

      <main className="pb-24">
        <form onSubmit={handleSubmit} className="space-y-6 p-4">
          {/* 公司基本信息 */}
          <Card className="rounded-xl">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building className="h-5 w-5 mr-2" />
                公司基本信息
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* 公司Logo */}
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={formData.avatar} />
                    <AvatarFallback className="text-2xl">{formData.company?.[0] || 'C'}</AvatarFallback>
                  </Avatar>
                  <Button
                    type="button"
                    size="sm"
                    className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0"
                    onClick={() => document.getElementById('logo-upload')?.click()}
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                  <input
                    type="file"
                    id="logo-upload"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">更换公司Logo</h3>
                  <p className="text-sm text-gray-600">支持 JPG、PNG 格式，建议尺寸 400x400</p>
                </div>
              </div>

              {/* 公司名称和联系人 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="company">公司名称 *</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                    className="mt-1"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="name">联系人姓名 *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="mt-1"
                    required
                  />
                </div>
              </div>

              {/* 职位和头像字段 */}
              <div>
                <Label htmlFor="title">职位/职务</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="mt-1"
                  placeholder="如：人事总监、招聘经理等"
                />
              </div>

              {/* 行业和规模 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="industry">所属行业</Label>
                  <Select value={formData.industry} onValueChange={(value) => setFormData(prev => ({ ...prev, industry: value }))}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="文艺表演">文艺表演</SelectItem>
                      <SelectItem value="影视传媒">影视传媒</SelectItem>
                      <SelectItem value="演艺娱乐">演艺娱乐</SelectItem>
                      <SelectItem value="文化艺术">文化艺术</SelectItem>
                      <SelectItem value="教育培训">教育培训</SelectItem>
                      <SelectItem value="广告营销">广告营销</SelectItem>
                      <SelectItem value="其他">其他</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="employeeCount">公司规模</Label>
                  <Select value={formData.employeeCount} onValueChange={(value) => setFormData(prev => ({ ...prev, employeeCount: value }))}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-20人">1-20人</SelectItem>
                      <SelectItem value="20-50人">20-50人</SelectItem>
                      <SelectItem value="50-200人">50-200人</SelectItem>
                      <SelectItem value="200-500人">200-500人</SelectItem>
                      <SelectItem value="500人以上">500人以上</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* 联系方式 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">联系电话</Label>
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

              {/* 地址信息 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="location">所在城市</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="website">公司网站</Label>
                  <Input
                    id="website"
                    value={formData.website}
                    onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                    className="mt-1"
                    placeholder="www.example.com"
                  />
                </div>
              </div>

              {/* 详细地址 */}
              <div>
                <Label htmlFor="address">详细地址</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                  className="mt-1"
                  placeholder="如：北京市朝阳区文化艺术中心"
                />
              </div>

              {/* 成立年份 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="establishedYear">成立年份</Label>
                  <Input
                    id="establishedYear"
                    value={formData.establishedYear}
                    onChange={(e) => setFormData(prev => ({ ...prev, establishedYear: e.target.value }))}
                    className="mt-1"
                    placeholder="如：1952年"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 公司介绍 */}
          <Card className="rounded-xl">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                公司介绍
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="description">公司简介</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="mt-1"
                  rows={4}
                  placeholder="请介绍您的公司背景、业务范围、发展历程等..."
                />
              </div>
              <div>
                <Label htmlFor="culture">企业文化</Label>
                <Textarea
                  id="culture"
                  value={formData.culture}
                  onChange={(e) => setFormData(prev => ({ ...prev, culture: e.target.value }))}
                  className="mt-1"
                  rows={2}
                  placeholder="请描述公司的价值观、工作氛围等..."
                />
              </div>
            </CardContent>
          </Card>

          {/* 福利待遇 */}
          <Card className="rounded-xl">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="h-5 w-5 mr-2" />
                福利待遇
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {formData.benefits.map((benefit, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                    <span>{benefit}</span>
                    <button
                      type="button"
                      onClick={() => removeBenefit(benefit)}
                      className="ml-1 text-gray-500 hover:text-red-500"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex space-x-2">
                <Input
                  value={newBenefit}
                  onChange={(e) => setNewBenefit(e.target.value)}
                  placeholder="添加福利待遇"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addBenefit())}
                />
                <Button type="button" onClick={addBenefit} variant="outline">
                  添加
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* 招聘要求 */}
          <Card className="rounded-xl">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                通用招聘要求
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {formData.requirements.map((requirement, index) => (
                  <Badge key={index} variant="outline" className="flex items-center space-x-1">
                    <span>{requirement}</span>
                    <button
                      type="button"
                      onClick={() => removeRequirement(requirement)}
                      className="ml-1 text-gray-500 hover:text-red-500"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex space-x-2">
                <Input
                  value={newRequirement}
                  onChange={(e) => setNewRequirement(e.target.value)}
                  placeholder="添加招聘要求"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addRequirement())}
                />
                <Button type="button" onClick={addRequirement} variant="outline">
                  添加
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* 公司展示 */}
          <Card className="rounded-xl">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Upload className="h-5 w-5 mr-2" />
                公司展示
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* 工作环境照片 (4张) */}
              <div>
                <Label htmlFor="work-environment-images">工作环境照片 (最多6张)</Label>
                <p className="text-xs text-gray-500 mb-2">展示办公环境、工作场所、设施设备等</p>
                <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Image className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600 mb-2">
                    已上传 {formData.workEnvironmentImages.length}/6 张工作环境照片
                  </p>
                  <input
                    type="file"
                    id="work-environment-images"
                    multiple
                    accept="image/*"
                    onChange={handleWorkEnvironmentImageUpload}
                    className="hidden"
                    disabled={formData.workEnvironmentImages.length >= 4}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => document.getElementById('work-environment-images')?.click()}
                    disabled={formData.workEnvironmentImages.length >= 4}
                  >
                    {formData.workEnvironmentImages.length >= 4 ? '已达上限' : '选择照片'}
                  </Button>
                </div>
                {formData.workEnvironmentImages.length > 0 && (
                  <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-3">
                    {formData.workEnvironmentImages.map((file, index) => (
                      <div key={index} className="relative">
                        <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                          <Image className="h-8 w-8 text-gray-400" />
                        </div>
                        <button
                          type="button"
                          onClick={() => removeWorkEnvironmentImage(index)}
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

              {/* 团队风采照片 (4张) */}
              <div>
                <Label htmlFor="team-photos">团队风采照片 (最多4张)</Label>
                <p className="text-xs text-gray-500 mb-2">展示团队合影、活动照片、工作场景等</p>
                <div className="mt-2 border-2 border-dashed border-orange-300 rounded-lg p-6 text-center">
                  <Users className="h-8 w-8 mx-auto text-orange-400 mb-2" />
                  <p className="text-sm text-gray-600 mb-2">
                    已上传 {formData.teamPhotos.length}/4 张团队风采照片
                  </p>
                  <input
                    type="file"
                    id="team-photos"
                    multiple
                    accept="image/*"
                    onChange={handleTeamPhotoUpload}
                    className="hidden"
                    disabled={formData.teamPhotos.length >= 4}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => document.getElementById('team-photos')?.click()}
                    disabled={formData.teamPhotos.length >= 4}
                    className="border-orange-300 text-orange-600 hover:bg-orange-50"
                  >
                    {formData.teamPhotos.length >= 4 ? '已达上限' : '选择照片'}
                  </Button>
                </div>
                {formData.teamPhotos.length > 0 && (
                  <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-3">
                    {formData.teamPhotos.map((file, index) => (
                      <div key={index} className="relative">
                        <div className="aspect-square bg-orange-50 rounded-lg flex items-center justify-center overflow-hidden border border-orange-200">
                          <Users className="h-8 w-8 text-orange-400" />
                        </div>
                        <button
                          type="button"
                          onClick={() => removeTeamPhoto(index)}
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
            </CardContent>
          </Card>
        </form>
      </main>
    </div>
  )
}
