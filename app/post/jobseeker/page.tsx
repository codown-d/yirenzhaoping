"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Upload, MapPin, DollarSign, Calendar, User, Tag, Image, Video, Star, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"

export default function JobseekerPostPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    expectedSalary: "",
    workType: "",
    category: "",
    skills: [] as string[],
    advantages: [] as string[],
    contactInfo: "",
    images: [] as File[],
    videos: [] as File[],
    urgent: false,
    experience: "",
    education: "",
    availability: "",
    personalStatement: "",
  })

  // 分类切换状态
  const [categoryType, setCategoryType] = useState<'frontend' | 'backend'>('frontend')

  const frontendCategories = [
    "舞蹈表演", "戏曲表演", "武术表演", "杂技表演",
    "声乐表演", "器乐表演", "话剧表演", "音乐剧表演",
    "影视表演", "商业演出", "教学培训", "其他"
  ]

  const backendCategories = [
    "导演", "副导演", "执行导演", "编剧",
    "制片人", "制片助理", "摄影师", "摄像师",
    "灯光师", "音响师", "舞美设计", "服装设计"
  ]

  const currentCategories = categoryType === 'frontend' ? frontendCategories : backendCategories

  const workTypes = ["全职", "兼职", "临时", "合同制", "实习"]
  
  const experienceOptions = ["应届生", "1年以内", "1-3年", "3-5年", "5年以上"]
  
  const educationOptions = ["中专", "大专", "本科", "硕士", "博士"]

  const availabilityOptions = ["立即到岗", "1周内", "2周内", "1个月内", "面议"]

  const commonSkills = [
    "古典舞", "民族舞", "芭蕾舞", "现代舞", "爵士舞", "街舞",
    "京剧", "昆曲", "豫剧", "越剧", "黄梅戏", "评剧",
    "太极拳", "长拳", "南拳", "剑术", "刀术", "棍术",
    "杂技", "魔术", "小丑表演", "高空表演"
  ]

  const commonAdvantages = [
    "形象气质佳", "舞台经验丰富", "专业院校毕业", "获奖经历",
    "团队合作能力强", "责任心强", "能适应出差", "英语流利",
    "创新能力强", "学习能力强", "抗压能力强", "沟通能力强"
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("提交求职信息:", formData)
    router.push('/forum')
  }

  const handleSkillToggle = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }))
  }

  const handleAdvantageToggle = (advantage: string) => {
    setFormData(prev => ({
      ...prev,
      advantages: prev.advantages.includes(advantage)
        ? prev.advantages.filter(a => a !== advantage)
        : [...prev.advantages, advantage]
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
            <h1 className="text-xl font-bold text-green-600">发布求职信息</h1>
          </div>
          <Button 
            type="submit" 
            form="jobseeker-post-form"
            className="rounded-xl"
          >
            发布
          </Button>
        </div>
      </header>

      <main className="max-w-2xl mx-auto p-4 pb-24">
        <form id="jobseeker-post-form" onSubmit={handleSubmit} className="space-y-6">
          {/* 基本信息 */}
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                基本信息
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">求职标题 *</Label>
                <Input
                  id="title"
                  placeholder="如：专业古典舞演员求职"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="mt-1"
                  required
                />
              </div>

              <div>
                <Label htmlFor="personalStatement">个人简介 *</Label>
                <Textarea
                  id="personalStatement"
                  placeholder="请简要介绍您的专业背景、表演经验、个人特长等..."
                  value={formData.personalStatement}
                  onChange={(e) => setFormData(prev => ({ ...prev, personalStatement: e.target.value }))}
                  className="mt-1 min-h-[100px]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="categoryType">专业类型 *</Label>
                  <Select
                    value={categoryType}
                    onValueChange={(value: 'frontend' | 'backend') => {
                      setCategoryType(value)
                      setFormData(prev => ({ ...prev, category: "" })) // 重置类别选择
                    }}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="选择专业类型" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="frontend">
                        <div className="flex items-center">
                          <span className="mr-2">🎭</span>
                          <div>
                            <div className="font-medium">前台表演</div>
                            <div className="text-xs text-gray-500">舞台表演、演出等</div>
                          </div>
                        </div>
                      </SelectItem>
                      <SelectItem value="backend">
                        <div className="flex items-center">
                          <span className="mr-2">🎬</span>
                          <div>
                            <div className="font-medium">后台制作</div>
                            <div className="text-xs text-gray-500">导演、制片、技术等</div>
                          </div>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="category">具体专业 *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                    disabled={!categoryType}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder={
                        !categoryType
                          ? "请先选择专业类型"
                          : `选择${categoryType === 'frontend' ? '前台表演' : '后台制作'}专业`
                      } />
                    </SelectTrigger>
                    <SelectContent>
                      {currentCategories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="location">期望工作地点 *</Label>
                <Input
                  id="location"
                  placeholder="如：北京市朝阳区"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  className="mt-1"
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* 求职期望 */}
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="h-5 w-5 mr-2" />
                求职期望
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expectedSalary">期望薪资</Label>
                  <Input
                    id="expectedSalary"
                    placeholder="如：8000-12000/月"
                    value={formData.expectedSalary}
                    onChange={(e) => setFormData(prev => ({ ...prev, expectedSalary: e.target.value }))}
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

              <div>
                <Label htmlFor="availability">到岗时间</Label>
                <Select onValueChange={(value) => setFormData(prev => ({ ...prev, availability: value }))}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="选择到岗时间" />
                  </SelectTrigger>
                  <SelectContent>
                    {availabilityOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* 个人背景 */}
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="h-5 w-5 mr-2" />
                个人背景
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
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
                  <Label htmlFor="education">学历水平</Label>
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
                <Label>专业技能</Label>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {commonSkills.map((skill) => (
                    <div key={skill} className="flex items-center space-x-2">
                      <Checkbox
                        id={skill}
                        checked={formData.skills.includes(skill)}
                        onCheckedChange={() => handleSkillToggle(skill)}
                      />
                      <Label htmlFor={skill} className="text-sm cursor-pointer">
                        {skill}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label>个人优势</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {commonAdvantages.map((advantage) => (
                    <div key={advantage} className="flex items-center space-x-2">
                      <Checkbox
                        id={advantage}
                        checked={formData.advantages.includes(advantage)}
                        onCheckedChange={() => handleAdvantageToggle(advantage)}
                      />
                      <Label htmlFor={advantage} className="text-sm cursor-pointer">
                        {advantage}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 作品展示 */}
          {/* <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Upload className="h-5 w-5 mr-2" />
                作品展示
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="images">上传表演照片</Label>
                <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Image className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600 mb-2">展示您的舞台风采</p>
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
                    选择照片
                  </Button>
                </div>
                {formData.images.length > 0 && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-600">已选择 {formData.images.length} 张照片</p>
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="videos">上传表演视频</Label>
                <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Video className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600 mb-2">展示您的表演技巧</p>
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
          </Card> */}

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
                  急需工作
                </Label>
              </div>
            </CardContent>
          </Card>
        </form>
      </main>
    </div>
  )
}
