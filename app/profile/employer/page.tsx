"use client"

import { useState } from "react"
import { useAuth, useUserType, useIsAuthenticated } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { 
  ArrowLeft, User, Edit, Settings, Heart, Star, Eye, MessageCircle, 
  Briefcase, Award, Building, MapPin, Phone, Mail, Calendar,
  TrendingUp, Clock, FileText, Camera, Users, Plus, Search
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"

export default function EmployerProfilePage() {
  const router = useRouter()
  const { user, logout } = useAuth()
  const userType = useUserType()
  const isAuthenticated = useIsAuthenticated()

  // 注释：允许未登录用户访问，显示默认数据

  // 模拟招聘方数据
  const employerData = {
    name: user?.name || "张总",
    avatar: user?.avatar || "/placeholder.svg?height=120&width=120",
    title: "东方歌舞团 - 人事总监",
    company: "东方歌舞团",
    location: "北京市朝阳区",
    phone: "138****9999",
    email: "zhang@dongfang.com",
    establishedYear: "1952年",
    employeeCount: "200-500人",
    industry: "文艺表演",
    profileViews: 234,
    jobViews: 1580,
    applications: 89,
    interviews: 23,
    profileCompletion: 92,
    recentActivities: [
      { type: "post", content: "发布了《梁祝》主演招聘", time: "1小时前" },
      { type: "view", content: "查看了李小华的简历", time: "3小时前" },
      { type: "interview", content: "安排了王明的面试", time: "5小时前" },
      { type: "update", content: "更新了公司介绍", time: "1天前" },
    ],
    activeJobs: [
      {
        id: 1,
        title: "古典舞演员",
        department: "表演部",
        applications: 15,
        views: 156,
        posted: "3天前",
        status: "招聘中",
        urgent: true
      },
      {
        id: 2,
        title: "民族舞编导",
        department: "创作部",
        applications: 8,
        views: 89,
        posted: "1周前",
        status: "招聘中",
        urgent: false
      }
    ],
    candidates: [
      {
        id: 1,
        name: "李小华",
        title: "古典舞演员",
        experience: "3年",
        education: "北京舞蹈学院",
        status: "待面试",
        appliedFor: "古典舞演员",
        appliedDate: "2024-01-15",
        avatar: "/placeholder.svg?height=40&width=40"
      },
      {
        id: 2,
        name: "王明",
        title: "武术表演",
        experience: "5年",
        education: "上海戏剧学院",
        status: "已面试",
        appliedFor: "武术指导",
        appliedDate: "2024-01-12",
        avatar: "/placeholder.svg?height=40&width=40"
      }
    ]
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "post": return <Briefcase className="h-4 w-4" />
      case "view": return <Eye className="h-4 w-4" />
      case "interview": return <MessageCircle className="h-4 w-4" />
      case "update": return <Edit className="h-4 w-4" />
      default: return <Clock className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "待面试": return "bg-yellow-500"
      case "已面试": return "bg-blue-500"
      case "已录用": return "bg-green-500"
      case "已拒绝": return "bg-red-500"
      default: return "bg-gray-500"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center">
            <Button variant="ghost" size="sm" asChild className="mr-2">
              <Link href="/employer">
                <ArrowLeft className="h-5 w-5 mr-2" />
                返回
              </Link>
            </Button>
            <h1 className="text-xl font-bold text-green-600">个人中心</h1>
          </div>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/settings">
              <Settings className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4 pb-20">
        {/* Profile Header */}
        <Card className="rounded-2xl mb-6">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="relative">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={employerData.avatar} />
                  <AvatarFallback className="text-2xl">{employerData.name[0]}</AvatarFallback>
                </Avatar>
                <Button size="sm" className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0">
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-2xl font-bold">{employerData.name}</h2>
                  <Button variant="outline" size="sm" className="rounded-xl">
                    <Edit className="h-4 w-4 mr-2" />
                    编辑资料
                  </Button>
                </div>
                
                <p className="text-lg text-gray-700 mb-2">{employerData.title}</p>
                
                <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                  <div className="flex items-center">
                    <Building className="h-4 w-4 mr-1" />
                    {employerData.company}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {employerData.location}
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {employerData.employeeCount}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    成立于{employerData.establishedYear}
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary">{employerData.industry}</Badge>
                  <Badge variant="outline">国有企业</Badge>
                  <Badge variant="outline">文化艺术</Badge>
                </div>
                
                {/* Profile Completion */}
                <div className="bg-blue-50 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">企业资料完整度</span>
                    <span className="text-sm text-blue-600">{employerData.profileCompletion}%</span>
                  </div>
                  <Progress value={employerData.profileCompletion} className="h-2" />
                  <p className="text-xs text-gray-600 mt-1">完善企业资料可吸引更多优秀人才</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card className="rounded-xl">
            <CardContent className="p-4 text-center">
              <Eye className="h-6 w-6 mx-auto text-blue-500 mb-2" />
              <div className="text-2xl font-bold">{employerData.profileViews}</div>
              <div className="text-sm text-gray-600">企业浏览</div>
            </CardContent>
          </Card>
          
          <Card className="rounded-xl">
            <CardContent className="p-4 text-center">
              <Briefcase className="h-6 w-6 mx-auto text-green-500 mb-2" />
              <div className="text-2xl font-bold">{employerData.jobViews}</div>
              <div className="text-sm text-gray-600">职位浏览</div>
            </CardContent>
          </Card>
          
          <Card className="rounded-xl">
            <CardContent className="p-4 text-center">
              <Users className="h-6 w-6 mx-auto text-purple-500 mb-2" />
              <div className="text-2xl font-bold">{employerData.applications}</div>
              <div className="text-sm text-gray-600">收到简历</div>
            </CardContent>
          </Card>
          
          <Card className="rounded-xl">
            <CardContent className="p-4 text-center">
              <MessageCircle className="h-6 w-6 mx-auto text-orange-500 mb-2" />
              <div className="text-2xl font-bold">{employerData.interviews}</div>
              <div className="text-sm text-gray-600">面试安排</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="activity" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="activity">动态</TabsTrigger>
            <TabsTrigger value="jobs">招聘职位</TabsTrigger>
            <TabsTrigger value="candidates">候选人</TabsTrigger>
            <TabsTrigger value="company">企业信息</TabsTrigger>
          </TabsList>

          {/* Activity Tab */}
          <TabsContent value="activity">
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle>最近动态</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {employerData.recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="bg-white p-2 rounded-full">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">{activity.content}</p>
                        <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Jobs Tab */}
          <TabsContent value="jobs">
            <Card className="rounded-2xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>招聘职位</CardTitle>
                  <Button size="sm" asChild className="rounded-xl">
                    <Link href="/post/create">
                      <Plus className="h-4 w-4 mr-2" />
                      发布职位
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {employerData.activeJobs.map((job) => (
                    <div key={job.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="font-medium">{job.title}</h4>
                            {job.urgent && (
                              <Badge className="bg-red-100 text-red-800 text-xs">急招</Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">{job.department}</p>
                          <p className="text-xs text-gray-500">发布时间: {job.posted}</p>
                        </div>
                        <Badge className="bg-green-100 text-green-800">
                          {job.status}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-2 text-gray-400" />
                          <span>{job.applications} 份简历</span>
                        </div>
                        <div className="flex items-center">
                          <Eye className="h-4 w-4 mr-2 text-gray-400" />
                          <span>{job.views} 次浏览</span>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2 mt-3">
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4 mr-1" />
                          编辑
                        </Button>
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-1" />
                          查看
                        </Button>
                        <Button size="sm">
                          <Users className="h-4 w-4 mr-1" />
                          查看简历
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Candidates Tab */}
          <TabsContent value="candidates">
            <Card className="rounded-2xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>候选人管理</CardTitle>
                  <Button size="sm" variant="outline" className="rounded-xl">
                    <Search className="h-4 w-4 mr-2" />
                    搜索人才
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {employerData.candidates.map((candidate) => (
                    <div key={candidate.id} className="border rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={candidate.avatar} />
                          <AvatarFallback>{candidate.name[0]}</AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <h4 className="font-medium">{candidate.name}</h4>
                              <p className="text-sm text-gray-600">{candidate.title}</p>
                            </div>
                            <Badge className={`${getStatusColor(candidate.status)} text-white text-xs`}>
                              {candidate.status}
                            </Badge>
                          </div>
                          
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                            <span>{candidate.experience}经验</span>
                            <span>{candidate.education}</span>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="text-xs text-gray-500">
                              申请职位: {candidate.appliedFor} · {candidate.appliedDate}
                            </div>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">
                                <Eye className="h-4 w-4 mr-1" />
                                查看简历
                              </Button>
                              <Button size="sm">
                                <MessageCircle className="h-4 w-4 mr-1" />
                                联系
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Company Tab */}
          <TabsContent value="company">
            <Card className="rounded-2xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>企业信息</CardTitle>
                  <Button size="sm" variant="outline" className="rounded-xl">
                    <Edit className="h-4 w-4 mr-2" />
                    编辑信息
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">企业名称</label>
                    <p className="mt-1">{employerData.company}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">所在地区</label>
                    <p className="mt-1">{employerData.location}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">成立时间</label>
                    <p className="mt-1">{employerData.establishedYear}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">企业规模</label>
                    <p className="mt-1">{employerData.employeeCount}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">所属行业</label>
                    <p className="mt-1">{employerData.industry}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">联系电话</label>
                    <p className="mt-1">{employerData.phone}</p>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700">企业简介</label>
                  <p className="mt-1 text-gray-600">
                    东方歌舞团成立于1952年，是中国最具影响力的国家级艺术团体之一。
                    我们致力于传承和发展中华民族优秀的传统文化艺术，同时积极吸收世界各国的优秀文化成果。
                    团内汇聚了众多优秀的艺术家和表演人才，在国内外享有盛誉。
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <Button asChild className="h-12 rounded-xl">
            <Link href="/post/create">
              <Plus className="h-5 w-5 mr-2" />
              发布招聘信息
            </Link>
          </Button>
          <Button variant="outline" asChild className="h-12 rounded-xl">
            <Link href="/employer">
              <Search className="h-5 w-5 mr-2" />
              搜索人才
            </Link>
          </Button>
        </div>
      </main>
    </div>
  )
}
