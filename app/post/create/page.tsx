"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Upload, MapPin, DollarSign, Calendar, Users, Tag, Image, Video } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Link from "next/link"

export default function CreatePostPage() {
  const router = useRouter()
  const [postType, setPostType] = useState<"job" | "talent">("job") // job: 招聘, talent: 求职
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    workType: "",
    category: "",
    requirements: [] as string[],
    benefits: [] as string[],
    contactInfo: "",
    images: [] as File[],
    videos: [] as File[],
    tags: [] as string[],
    urgent: false,
    experience: "",
    education: "",
    companyName: "",
    position: "",
  })

  const categories = [
    "舞蹈表演", "戏曲表演", "武术表演", "杂技表演", 
    "声乐表演", "器乐表演", "话剧表演", "音乐剧表演",
    "影视表演", "商业演出", "教学培训", "其他"
  ]

  const workTypes = ["全职", "兼职", "临时", "合同制", "实习"]
  
  const experienceOptions = ["不限", "应届生", "1年以内", "1-3年", "3-5年", "5年以上"]
  
  const educationOptions = ["不限", "中专", "大专", "本科", "硕士", "博士"]

  const commonRequirements = [
    "形象气质佳", "有表演经验", "专业院校毕业", "团队合作能力强",
    "责任心强", "能适应出差", "有获奖经历", "英语流利"
  ]

  const commonBenefits = [
    "五险一金", "演出补贴", "培训机会", "弹性工作", 
    "包食宿", "交通补贴", "年终奖", "带薪年假"
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // 这里处理表单提交逻辑
    console.log("提交帖子:", { postType, ...formData })
    // 提交成功后跳转到论坛页面
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
                <ArrowLeft className="h-5 w-5 mr-2" />
                返回
              </Link>
            </Button>
            <h1 className="text-xl font-bold text-green-600">发布信息</h1>
          </div>
          <Button 
            type="submit" 
            form="post-form"
            className="rounded-xl"
          >
            发布
          </Button>
        </div>
      </header>

      <main className="max-w-2xl mx-auto p-4 pb-20">
        <form id="post-form" onSubmit={handleSubmit} className="space-y-6">
          {/* 帖子类型选择 */}
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>选择发布类型</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup 
                value={postType} 
                onValueChange={(value: "job" | "talent") => setPostType(value)}
                className="flex space-x-6"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="job" id="job" />
                  <Label htmlFor="job" className="flex items-center space-x-2 cursor-pointer">
                    <Users className="h-4 w-4" />
                    <span>招聘信息</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="talent" id="talent" />
                  <Label htmlFor="talent" className="flex items-center space-x-2 cursor-pointer">
                    <Tag className="h-4 w-4" />
                    <span>求职信息</span>
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* 基本信息 */}
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>基本信息</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">标题 *</Label>
                <Input
                  id="title"
                  placeholder={postType === "job" ? "如：招聘古典舞演员" : "如：专业古典舞演员求职"}
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="mt-1"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">详细描述 *</Label>
                <Textarea
                  id="description"
                  placeholder={postType === "job" 
                    ? "请详细描述职位要求、工作内容、薪资待遇等..." 
                    : "请介绍您的专业技能、表演经验、求职意向等..."
                  }
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="mt-1 min-h-[120px]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">表演类别 *</Label>
                  <Select onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="选择类别" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

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
              </div>

              {postType === "job" && (
                <div>
                  <Label htmlFor="companyName">公司/团体名称</Label>
                  <Input
                    id="companyName"
                    placeholder="如：东方歌舞团"
                    value={formData.companyName}
                    onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
                    className="mt-1"
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* 薪资和工作类型 */}
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
                  <Label htmlFor="salary">薪资范围</Label>
                  <Input
                    id="salary"
                    placeholder={postType === "job" ? "如：8000-12000/月" : "如：期望8000+/月"}
                    value={formData.salary}
                    onChange={(e) => setFormData(prev => ({ ...prev, salary: e.target.value }))}
                    className="mt-1"
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
            </CardContent>
          </Card>

          {/* 要求和经验 */}
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>
                {postType === "job" ? "职位要求" : "个人经验"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="experience">经验要求</Label>
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

              {postType === "job" && (
                <div>
                  <Label>职位要求</Label>
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
              )}

              {postType === "job" && (
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
              )}
            </CardContent>
          </Card>

          {/* 媒体上传 */}
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Upload className="h-5 w-5 mr-2" />
                上传媒体
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="images">上传图片</Label>
                <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Image className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600 mb-2">点击上传图片或拖拽到此处</p>
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
                <Label htmlFor="videos">上传视频</Label>
                <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Video className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600 mb-2">点击上传视频或拖拽到此处</p>
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
                  {postType === "job" ? "紧急招聘" : "急需工作"}
                </Label>
              </div>
            </CardContent>
          </Card>
        </form>
      </main>
    </div>
  )
}
