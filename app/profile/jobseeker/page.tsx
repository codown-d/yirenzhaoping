"use client"

import { useState } from "react"
import { useAuth, useUserType, useIsAuthenticated } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import {
  ArrowLeft, User, Edit, Settings, Heart, Star, Eye, MessageCircle,
  Briefcase, Award, GraduationCap, MapPin, Phone, Mail, Calendar,
  TrendingUp, Clock, FileText, Camera, Video, Share2, LogOut, Shield, CheckCircle, Crown, Zap, Headphones, AlertTriangle,
  Bookmark, Users, Bell, History
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
    isVerified: true, // 个人实名认证状态
    verificationDate: "2024-01-10", // 认证时间
    vipStatus: {
      isVip: true,
      level: "白金会员",
      expireDate: "2024-11-30",
      remainingDays: 267
    },
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
    ],
    // 新增功能数据
    followedCompanies: [
      {
        id: 1,
        name: "东方歌舞团",
        logo: "/placeholder.svg?height=40&width=40",
        industry: "表演艺术",
        location: "北京",
        followDate: "2024-01-10",
        isActive: true,
        newJobs: 3
      },
      {
        id: 2,
        name: "中央芭蕾舞团",
        logo: "/placeholder.svg?height=40&width=40",
        industry: "表演艺术",
        location: "北京",
        followDate: "2024-01-08",
        isActive: true,
        newJobs: 1
      },
      {
        id: 3,
        name: "上海歌剧院",
        logo: "/placeholder.svg?height=40&width=40",
        industry: "表演艺术",
        location: "上海",
        followDate: "2024-01-05",
        isActive: false,
        newJobs: 0
      }
    ],
    messages: [
      {
        id: 1,
        type: "system",
        title: "简历被查看",
        content: "您的简历被东方歌舞团查看了",
        time: "2024-01-20 14:30",
        isRead: false,
        avatar: "/placeholder.svg?height=32&width=32"
      },
      {
        id: 2,
        type: "interview",
        title: "面试邀请",
        content: "中央芭蕾舞团邀请您参加面试",
        time: "2024-01-19 10:15",
        isRead: false,
        avatar: "/placeholder.svg?height=32&width=32"
      },
      {
        id: 3,
        type: "system",
        title: "职位推荐",
        content: "为您推荐了3个匹配的职位",
        time: "2024-01-18 09:00",
        isRead: true,
        avatar: "/placeholder.svg?height=32&width=32"
      },
      {
        id: 4,
        type: "message",
        title: "私信消息",
        content: "某艺术团向您发送了私信",
        time: "2024-01-17 16:45",
        isRead: true,
        avatar: "/placeholder.svg?height=32&width=32"
      }
    ],
    collections: [
      {
        id: 1,
        type: "job",
        title: "民族舞演员",
        company: "东方歌舞团",
        location: "北京",
        salary: "8K-15K",
        collectedDate: "2024-01-15",
        status: "招聘中"
      },
      {
        id: 2,
        type: "job",
        title: "芭蕾舞演员",
        company: "中央芭蕾舞团",
        location: "北京",
        salary: "12K-20K",
        collectedDate: "2024-01-12",
        status: "招聘中"
      },
      {
        id: 3,
        type: "company",
        title: "上海歌剧院",
        description: "国际知名歌剧院",
        location: "上海",
        collectedDate: "2024-01-10",
        status: "活跃"
      }
    ],
    browsingHistory: [
      {
        id: 1,
        type: "job",
        title: "现代舞演员",
        company: "某现代舞团",
        location: "深圳",
        salary: "10K-18K",
        viewDate: "2024-01-20 15:30",
        viewCount: 3
      },
      {
        id: 2,
        type: "job",
        title: "舞蹈编导",
        company: "艺术学院",
        location: "广州",
        salary: "15K-25K",
        viewDate: "2024-01-19 11:20",
        viewCount: 1
      },
      {
        id: 3,
        type: "company",
        title: "北京现代舞团",
        description: "专业现代舞团体",
        location: "北京",
        viewDate: "2024-01-18 14:15",
        viewCount: 2
      },
      {
        id: 4,
        type: "job",
        title: "音乐剧演员",
        company: "某音乐剧公司",
        location: "上海",
        salary: "12K-22K",
        viewDate: "2024-01-17 09:45",
        viewCount: 1
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

      <main className="max-w-4xl mx-auto p-4 pb-20">
        {/* Profile Header */}
        <Card className="rounded-2xl mb-6">
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <div className="relative flex-shrink-0">
                <Avatar className="h-16 w-16 md:h-20 md:w-20">
                  <AvatarImage src={jobseekerData.avatar} />
                  <AvatarFallback className="text-lg md:text-2xl">{jobseekerData.name[0]}</AvatarFallback>
                </Avatar>
                <Button size="sm" className="absolute -bottom-1 -right-1 h-6 w-6 md:h-8 md:w-8 rounded-full p-0">
                  <Camera className="h-3 w-3 md:h-4 md:w-4" />
                </Button>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                  <div className="flex flex-col space-y-2 mb-2 md:mb-0">
                    <h2 className="text-lg md:text-2xl font-bold truncate">{jobseekerData.name}</h2>
                    <div className="flex flex-wrap gap-2">
                      {jobseekerData.isVerified && (
                        <div className="flex items-center space-x-1 bg-green-100 text-green-800 px-2 py-1 rounded-full">
                          <CheckCircle className="h-3 w-3 md:h-4 md:w-4" />
                          <span className="text-xs font-medium">实名认证</span>
                        </div>
                      )}
                      {jobseekerData.vipStatus.isVip && (
                        <div className="flex items-center space-x-1 bg-gradient-to-r from-purple-400 to-pink-500 text-white px-2 py-1 rounded-full">
                          <Crown className="h-3 w-3 md:h-4 md:w-4" />
                          <span className="text-xs font-medium">{jobseekerData.vipStatus.level}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-xl self-start md:self-center"
                    onClick={() => router.push('/profile/jobseeker/edit')}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">编辑资料</span>
                    <span className="sm:hidden">编辑</span>
                  </Button>
                </div>

                <p className="text-lg text-gray-700 mb-2">{jobseekerData.title}</p>

                <div className="flex flex-wrap gap-2 md:gap-4 text-xs md:text-sm text-gray-600 mb-3">
                  <div className="flex items-center">
                    <MapPin className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                    <span className="truncate max-w-[120px] md:max-w-none">{jobseekerData.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Briefcase className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                    <span>{jobseekerData.experience}经验</span>
                  </div>
                  <div className="flex items-center">
                    <GraduationCap className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                    <span className="truncate max-w-[100px] md:max-w-none">{jobseekerData.education}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 md:gap-2 mb-4">
                  {jobseekerData.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="text-xs px-2 py-1">
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

        {/* VIP功能卡片 */}
        <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200 mb-6">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Crown className="h-5 w-5 text-purple-600" />
                <CardTitle className="text-lg">VIP会员服务</CardTitle>
              </div>
              {jobseekerData.vipStatus.isVip && (
                <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                  剩余{jobseekerData.vipStatus.remainingDays}天
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {jobseekerData.vipStatus.isVip ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">当前等级</span>
                  <span className="font-medium text-purple-700">{jobseekerData.vipStatus.level}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">到期时间</span>
                  <span className="font-medium">{jobseekerData.vipStatus.expireDate}</span>
                </div>

                <div className="bg-white rounded-lg p-3 space-y-2">
                  <h4 className="font-medium text-sm mb-2">专享权益</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center space-x-1">
                      <Zap className="h-3 w-3 text-purple-600 flex-shrink-0" />
                      <span className="truncate">简历置顶</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye className="h-3 w-3 text-blue-600 flex-shrink-0" />
                      <span className="truncate">查看谁看过我</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageCircle className="h-3 w-3 text-green-600 flex-shrink-0" />
                      <span className="truncate">优先沟通</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Briefcase className="h-3 w-3 text-orange-600 flex-shrink-0" />
                      <span className="truncate">专属职位推荐</span>
                    </div>
                  </div>
                </div>

                <Button variant="outline" className="w-full rounded-xl border-purple-300 text-purple-700 hover:bg-purple-50">
                  续费会员
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-gray-600">开通VIP会员，获得更多求职机会</p>

                <div className="bg-white rounded-lg p-3">
                  <h4 className="font-medium text-sm mb-2">会员套餐</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">月度会员</span>
                      <span className="font-bold text-purple-600">¥59/月</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">季度会员</span>
                      <span className="font-bold text-purple-600">¥158/季</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">年度会员</span>
                      <span className="font-bold text-purple-600">¥588/年</span>
                    </div>
                  </div>
                </div>

                <Button className="w-full rounded-xl bg-gradient-to-r from-purple-400 to-pink-500 hover:from-purple-500 hover:to-pink-600">
                  <Crown className="h-4 w-4 mr-2" />
                  立即开通VIP
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs defaultValue="following" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="following">我的关注</TabsTrigger>
            <TabsTrigger value="messages">我的消息</TabsTrigger>
            <TabsTrigger value="collections">我的收藏</TabsTrigger>
            <TabsTrigger value="history">我的足迹</TabsTrigger>
          </TabsList>

          {/* Following Tab */}
          <TabsContent value="following">
            <Card className="rounded-2xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    我的关注
                  </CardTitle>
                  <Badge variant="secondary">{jobseekerData.followedCompanies.length} 家企业</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {jobseekerData.followedCompanies.map((company) => (
                    <div key={company.id} className="flex items-start space-x-3 p-3 border rounded-lg hover:shadow-md transition-shadow">
                      <Avatar className="h-10 w-10 flex-shrink-0">
                        <AvatarImage src={company.logo} />
                        <AvatarFallback className="text-sm">{company.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-1">
                          <h4 className="font-medium text-sm truncate pr-2">{company.name}</h4>
                          <div className="flex items-center space-x-1 flex-shrink-0">
                            {company.newJobs > 0 && (
                              <Badge className="bg-red-100 text-red-800 text-xs px-1.5 py-0.5">
                                {company.newJobs}新
                              </Badge>
                            )}
                            <Badge variant={company.isActive ? "default" : "secondary"} className="text-xs px-2 py-0.5">
                              {company.isActive ? "活跃" : "不活跃"}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 text-xs text-gray-600 mb-2">
                          <span className="truncate">{company.industry}</span>
                          <span>•</span>
                          <span className="truncate">{company.location}</span>
                        </div>
                        <div className="text-xs text-gray-500 mb-2">关注于 {company.followDate}</div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" className="h-7 px-2 text-xs">
                            <MessageCircle className="h-3 w-3 mr-1" />
                            私信
                          </Button>
                          <Button size="sm" variant="outline" className="h-7 w-7 p-0">
                            <Heart className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages">
            <Card className="rounded-2xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <Bell className="h-5 w-5 mr-2" />
                    我的消息
                  </CardTitle>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge className="bg-red-100 text-red-800 text-xs px-2 py-1">
                      {jobseekerData.messages.filter(msg => !msg.isRead).length} 条未读
                    </Badge>
                    <Button size="sm" variant="outline" className="text-xs px-2 py-1 h-7">
                      <span className="hidden sm:inline">全部标记已读</span>
                      <span className="sm:hidden">标记已读</span>
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {jobseekerData.messages.map((message) => (
                    <div key={message.id} className={`flex items-start space-x-3 p-3 border rounded-lg hover:shadow-md transition-shadow ${!message.isRead ? 'bg-blue-50 border-blue-200' : 'bg-white'}`}>
                      <Avatar className="h-8 w-8 flex-shrink-0">
                        <AvatarImage src={message.avatar} />
                        <AvatarFallback className="text-xs">
                          {message.type === 'system' ? <Bell className="h-3 w-3" /> :
                            message.type === 'interview' ? <Calendar className="h-3 w-3" /> :
                              <MessageCircle className="h-3 w-3" />}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-1">
                          <h4 className="font-medium text-sm truncate pr-2">{message.title}</h4>
                          <div className="flex items-center space-x-1 flex-shrink-0">
                            {!message.isRead && (
                              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                            )}
                            <span className="text-xs text-gray-500">{message.time}</span>
                          </div>
                        </div>
                        <p className="text-xs text-gray-600 mb-2 line-clamp-2">{message.content}</p>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" className="h-7 px-2 text-xs">
                            查看详情
                          </Button>
                          {message.type === 'interview' && (
                            <Button size="sm" className="h-7 px-2 text-xs">
                              回复
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Collections Tab */}
          <TabsContent value="collections">
            <Card className="rounded-2xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <Bookmark className="h-5 w-5 mr-2" />
                    我的收藏
                  </CardTitle>
                  <Badge variant="secondary">{jobseekerData.collections.length} 项收藏</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {jobseekerData.collections.map((item) => (
                    <div key={item.id} className="border rounded-lg p-3 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="font-medium text-sm truncate">{item.title}</h4>
                            <Badge variant={item.type === 'job' ? 'default' : 'secondary'} className="text-xs px-2 py-0.5 flex-shrink-0">
                              {item.type === 'job' ? '职位' : '企业'}
                            </Badge>
                          </div>
                          {item.type === 'job' ? (
                            <>
                              <p className="text-xs text-gray-600 truncate">{item.company}</p>
                              <p className="text-xs text-gray-500">{item.location} · {item.salary}</p>
                            </>
                          ) : (
                            <>
                              <p className="text-xs text-gray-600 line-clamp-2">{item.description}</p>
                              <p className="text-xs text-gray-500">{item.location}</p>
                            </>
                          )}
                          <div className="flex items-center space-x-2 text-xs text-gray-500 mt-2">
                            <span>收藏于 {item.collectedDate}</span>
                            <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                              {item.status}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex flex-col space-y-1 ml-2 flex-shrink-0">
                          <Button size="sm" variant="outline" className="h-7 w-7 p-0">
                            <Bookmark className="h-3 w-3" />
                          </Button>
                          {item.type === 'job' && (
                            <Button size="sm" className="h-7 px-2 text-xs">
                              申请
                            </Button>
                          )}
                          {item.type === 'company' && (
                            <Button size="sm" variant="outline" className="h-7 px-2 text-xs">
                              查看
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history">
            <Card className="rounded-2xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <History className="h-5 w-5 mr-2" />
                    我的足迹
                  </CardTitle>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="secondary" className="text-xs px-2 py-1">{jobseekerData.browsingHistory.length} 条记录</Badge>
                    <Button size="sm" variant="outline" className="text-xs px-2 py-1 h-7">
                      <span className="hidden sm:inline">清空记录</span>
                      <span className="sm:hidden">清空</span>
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {jobseekerData.browsingHistory.map((item) => (
                    <div key={item.id} className="border rounded-lg p-3 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-1 mb-1 flex-wrap">
                            <h4 className="font-medium text-sm truncate">{item.title}</h4>
                            <Badge variant={item.type === 'job' ? 'default' : 'secondary'} className="text-xs px-2 py-0.5 flex-shrink-0">
                              {item.type === 'job' ? '职位' : '企业'}
                            </Badge>
                            {item.viewCount > 1 && (
                              <Badge variant="outline" className="text-xs px-1.5 py-0.5 flex-shrink-0">
                                {item.viewCount}次
                              </Badge>
                            )}
                          </div>
                          {item.type === 'job' ? (
                            <>
                              <p className="text-xs text-gray-600 truncate">{item.company}</p>
                              <p className="text-xs text-gray-500">{item.location} · {item.salary}</p>
                            </>
                          ) : (
                            <>
                              <p className="text-xs text-gray-600 line-clamp-2">{item.description}</p>
                              <p className="text-xs text-gray-500">{item.location}</p>
                            </>
                          )}
                          <div className="flex items-center space-x-1 text-xs text-gray-500 mt-2">
                            <Clock className="h-3 w-3 flex-shrink-0" />
                            <span>最后浏览: {item.viewDate}</span>
                          </div>
                        </div>
                        <div className="flex flex-col space-y-1 ml-2 flex-shrink-0">
                          <Button size="sm" variant="outline" className="h-7 px-2 text-xs">
                            <Eye className="h-3 w-3 mr-1" />
                            查看
                          </Button>
                          {item.type === 'job' && (
                            <Button size="sm" variant="outline" className="h-7 px-2 text-xs">
                              <Bookmark className="h-3 w-3 mr-1" />
                              收藏
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4 mt-6 mb-4">
          <Button asChild className="h-12 rounded-xl">
            <Link href="/post/jobseeker">
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

        {/* Customer Service */}
        <div className="mb-4">
          <Button variant="outline" asChild className="w-full h-12 rounded-xl border-blue-200 text-blue-600 hover:bg-blue-50">
            <Link href="/customer-service">
              <Headphones className="h-5 w-5 mr-2" />
              联系客服
            </Link>
          </Button>
        </div>

        {/* Legal and Policy Links */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <Button variant="outline" asChild className="h-12 rounded-xl border-gray-200 text-gray-600 hover:bg-gray-50">
            <Link href="/terms">
              <FileText className="h-5 w-5 mr-2" />
              用户协议
            </Link>
          </Button>
          <Button variant="outline" asChild className="h-12 rounded-xl border-orange-200 text-orange-600 hover:bg-orange-50">
            <Link href="/violations">
              <AlertTriangle className="h-5 w-5 mr-2" />
              违规公示
            </Link>
          </Button>
        </div>

        {/* Settings and Logout */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <Button variant="outline" asChild className="h-12 rounded-xl">
            <Link href="/settings">
              <Settings className="h-5 w-5 mr-2" />
              设置
            </Link>
          </Button>
          <Button
            variant="outline"
            className="h-12 rounded-xl text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300"
            onClick={() => {
              logout()
              router.push('/login')
            }}
          >
            <LogOut className="h-5 w-5 mr-2" />
            退出登录
          </Button>
        </div>
      </main>
    </div>
  )
}
