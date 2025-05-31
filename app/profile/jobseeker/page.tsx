"use client"

import { useState } from "react"
import { useAuth, useUserType, useIsAuthenticated } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { 
  ArrowLeft, User, Edit, Settings, Heart, Star, Eye, MessageCircle, 
  Briefcase, Award, GraduationCap, MapPin, Phone, Mail, Calendar,
  TrendingUp, Clock, FileText, Camera, Video, Share2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"

export default function JobseekerProfilePage() {
  const router = useRouter()
  const { user, logout } = useAuth()
  const userType = useUserType()
  const isAuthenticated = useIsAuthenticated()

  // 注释：允许未登录用户访问，显示默认数据

  // 模拟求职者数据
  const jobseekerData = {
    name: user?.name || "李小华",
    avatar: user?.avatar || "/placeholder.svg?height=120&width=120",
    title: "专业古典舞演员",
    location: "北京市朝阳区",
    phone: "138****8888",
    email: "lixiaohua@example.com",
    experience: "3年",
    education: "北京舞蹈学院",
    skills: ["古典舞", "民族舞", "芭蕾基础", "现代舞"],
    profileViews: 156,
    profileLikes: 89,
    applications: 12,
    interviews: 5,
    profileCompletion: 85,
    recentActivities: [
      { type: "application", content: "申请了《梁祝》主演职位", time: "2小时前" },
      { type: "view", content: "东方歌舞团查看了您的简历", time: "5小时前" },
      { type: "like", content: "星光艺术团关注了您", time: "1天前" },
      { type: "update", content: "更新了个人作品集", time: "2天前" },
    ],
    savedJobs: [
      {
        id: 1,
        title: "古典舞演员",
        company: "东方歌舞团",
        location: "北京",
        salary: "8K-15K",
        posted: "2天前"
      },
      {
        id: 2,
        title: "舞蹈教师",
        company: "艺术培训中心",
        location: "上海",
        salary: "6K-10K",
        posted: "1周前"
      }
    ],
    myApplications: [
      {
        id: 1,
        title: "民族舞演员",
        company: "中央民族歌舞团",
        status: "面试中",
        appliedDate: "2024-01-15",
        statusColor: "bg-blue-500"
      },
      {
        id: 2,
        title: "古典舞独舞演员",
        company: "国家大剧院",
        status: "已投递",
        appliedDate: "2024-01-10",
        statusColor: "bg-yellow-500"
      }
    ]
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "application": return <Briefcase className="h-4 w-4" />
      case "view": return <Eye className="h-4 w-4" />
      case "like": return <Heart className="h-4 w-4" />
      case "update": return <Edit className="h-4 w-4" />
      default: return <Clock className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center">
            <Button variant="ghost" size="sm" asChild className="mr-2">
              <Link href="/jobseeker">
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
                  <AvatarImage src={jobseekerData.avatar} />
                  <AvatarFallback className="text-2xl">{jobseekerData.name[0]}</AvatarFallback>
                </Avatar>
                <Button size="sm" className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0">
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-2xl font-bold">{jobseekerData.name}</h2>
                  <Button variant="outline" size="sm" className="rounded-xl">
                    <Edit className="h-4 w-4 mr-2" />
                    编辑资料
                  </Button>
                </div>
                
                <p className="text-lg text-gray-700 mb-2">{jobseekerData.title}</p>
                
                <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {jobseekerData.location}
                  </div>
                  <div className="flex items-center">
                    <Briefcase className="h-4 w-4 mr-1" />
                    {jobseekerData.experience}经验
                  </div>
                  <div className="flex items-center">
                    <GraduationCap className="h-4 w-4 mr-1" />
                    {jobseekerData.education}
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {jobseekerData.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
                
                {/* Profile Completion */}
                <div className="bg-blue-50 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">资料完整度</span>
                    <span className="text-sm text-blue-600">{jobseekerData.profileCompletion}%</span>
                  </div>
                  <Progress value={jobseekerData.profileCompletion} className="h-2" />
                  <p className="text-xs text-gray-600 mt-1">完善资料可获得更多工作机会</p>
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
              <div className="text-2xl font-bold">{jobseekerData.profileViews}</div>
              <div className="text-sm text-gray-600">简历浏览</div>
            </CardContent>
          </Card>
          
          <Card className="rounded-xl">
            <CardContent className="p-4 text-center">
              <Heart className="h-6 w-6 mx-auto text-red-500 mb-2" />
              <div className="text-2xl font-bold">{jobseekerData.profileLikes}</div>
              <div className="text-sm text-gray-600">获得关注</div>
            </CardContent>
          </Card>
          
          <Card className="rounded-xl">
            <CardContent className="p-4 text-center">
              <Briefcase className="h-6 w-6 mx-auto text-green-500 mb-2" />
              <div className="text-2xl font-bold">{jobseekerData.applications}</div>
              <div className="text-sm text-gray-600">投递简历</div>
            </CardContent>
          </Card>
          
          <Card className="rounded-xl">
            <CardContent className="p-4 text-center">
              <MessageCircle className="h-6 w-6 mx-auto text-purple-500 mb-2" />
              <div className="text-2xl font-bold">{jobseekerData.interviews}</div>
              <div className="text-sm text-gray-600">面试邀请</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="activity" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="activity">动态</TabsTrigger>
            <TabsTrigger value="applications">申请记录</TabsTrigger>
            <TabsTrigger value="saved">收藏职位</TabsTrigger>
            <TabsTrigger value="portfolio">作品集</TabsTrigger>
          </TabsList>

          {/* Activity Tab */}
          <TabsContent value="activity">
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle>最近动态</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {jobseekerData.recentActivities.map((activity, index) => (
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

          {/* Applications Tab */}
          <TabsContent value="applications">
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle>申请记录</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {jobseekerData.myApplications.map((application) => (
                    <div key={application.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-medium">{application.title}</h4>
                          <p className="text-sm text-gray-600">{application.company}</p>
                        </div>
                        <Badge className={`${application.statusColor} text-white`}>
                          {application.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-500">申请时间: {application.appliedDate}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Saved Jobs Tab */}
          <TabsContent value="saved">
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle>收藏的职位</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {jobseekerData.savedJobs.map((job) => (
                    <div key={job.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-medium">{job.title}</h4>
                          <p className="text-sm text-gray-600">{job.company}</p>
                          <p className="text-sm text-gray-500">{job.location} · {job.salary}</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Heart className="h-4 w-4" />
                          </Button>
                          <Button size="sm">
                            申请
                          </Button>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500">发布时间: {job.posted}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Portfolio Tab */}
          <TabsContent value="portfolio">
            <Card className="rounded-2xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>我的作品集</CardTitle>
                  <Button size="sm" className="rounded-xl">
                    <Camera className="h-4 w-4 mr-2" />
                    添加作品
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {/* 示例作品 */}
                  <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden relative group">
                    <img 
                      src="/placeholder.svg?height=200&width=200" 
                      alt="作品1" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="flex space-x-2">
                        <Button size="sm" variant="secondary">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="secondary">
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  {/* 添加更多作品的占位符 */}
                  <div className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Camera className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500">添加图片</p>
                    </div>
                  </div>
                  
                  <div className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Video className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500">添加视频</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <Button asChild className="h-12 rounded-xl">
            <Link href="/post/create">
              <FileText className="h-5 w-5 mr-2" />
              发布求职信息
            </Link>
          </Button>
          <Button variant="outline" asChild className="h-12 rounded-xl">
            <Link href="/candidate/1">
              <Eye className="h-5 w-5 mr-2" />
              预览我的简历
            </Link>
          </Button>
        </div>
      </main>
    </div>
  )
}
