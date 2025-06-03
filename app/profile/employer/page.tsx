"use client";

import { useState } from "react";
import { useAuth, useUserType, useIsAuthenticated } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  User,
  Edit,
  Settings,
  Heart,
  Star,
  Eye,
  MessageCircle,
  Briefcase,
  Award,
  Building,
  MapPin,
  Phone,
  Mail,
  Calendar,
  TrendingUp,
  Clock,
  FileText,
  Camera,
  Users,
  Plus,
  Search,
  LogOut,
  Shield,
  CheckCircle,
  Crown,
  Zap,
  Headphones,
  AlertTriangle,
  Bookmark,
  Bell,
  History,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";

export default function EmployerProfilePage() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const userType = useUserType();
  const isAuthenticated = useIsAuthenticated();

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
    isVerified: true, // 企业认证状态
    verificationDate: "2024-01-15", // 认证时间
    vipStatus: {
      isVip: true,
      level: "黄金会员",
      expireDate: "2024-12-31",
      remainingDays: 298,
    },
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
        urgent: true,
      },
      {
        id: 2,
        title: "民族舞编导",
        department: "创作部",
        applications: 8,
        views: 89,
        posted: "1周前",
        status: "招聘中",
        urgent: false,
      },
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
        avatar: "/placeholder.svg?height=40&width=40",
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
        avatar: "/placeholder.svg?height=40&width=40",
      },
    ],
    // 新增功能数据
    followedCandidates: [
      {
        id: 1,
        name: "李小华",
        title: "专业古典舞演员",
        avatar: "/placeholder.svg?height=40&width=40",
        experience: "3年",
        education: "北京舞蹈学院",
        location: "北京",
        followDate: "2024-01-10",
        isActive: true,
        lastActive: "2小时前",
      },
      {
        id: 2,
        name: "王明",
        title: "武术表演专家",
        avatar: "/placeholder.svg?height=40&width=40",
        experience: "5年",
        education: "上海戏剧学院",
        location: "上海",
        followDate: "2024-01-08",
        isActive: true,
        lastActive: "1天前",
      },
      {
        id: 3,
        name: "张丽",
        title: "民族舞编导",
        avatar: "/placeholder.svg?height=40&width=40",
        experience: "4年",
        education: "中央民族大学",
        location: "北京",
        followDate: "2024-01-05",
        isActive: false,
        lastActive: "1周前",
      },
    ],
    messages: [
      {
        id: 1,
        type: "application",
        title: "新的简历投递",
        content: "李小华申请了古典舞演员职位",
        time: "2024-01-20 14:30",
        isRead: false,
        avatar: "/placeholder.svg?height=32&width=32",
      },
      {
        id: 2,
        type: "system",
        title: "职位推广",
        content: "您的职位已被推荐给50位匹配候选人",
        time: "2024-01-19 10:15",
        isRead: false,
        avatar: "/placeholder.svg?height=32&width=32",
      },
      {
        id: 3,
        type: "interview",
        title: "面试提醒",
        content: "明天下午2点与王明的面试",
        time: "2024-01-18 09:00",
        isRead: true,
        avatar: "/placeholder.svg?height=32&width=32",
      },
      {
        id: 4,
        type: "message",
        title: "候选人咨询",
        content: "张丽询问了职位详情",
        time: "2024-01-17 16:45",
        isRead: true,
        avatar: "/placeholder.svg?height=32&width=32",
      },
    ],
    collections: [
      {
        id: 1,
        type: "candidate",
        name: "李小华",
        title: "专业古典舞演员",
        avatar: "/placeholder.svg?height=40&width=40",
        experience: "3年",
        education: "北京舞蹈学院",
        location: "北京",
        collectedDate: "2024-01-15",
        status: "求职中",
      },
      {
        id: 2,
        type: "candidate",
        name: "王明",
        title: "武术表演专家",
        avatar: "/placeholder.svg?height=40&width=40",
        experience: "5年",
        education: "上海戏剧学院",
        location: "上海",
        collectedDate: "2024-01-12",
        status: "求职中",
      },
      {
        id: 3,
        type: "template",
        title: "舞蹈演员招聘模板",
        description: "适用于各类舞蹈演员招聘",
        collectedDate: "2024-01-10",
        status: "可用",
      },
    ],
    browsingHistory: [
      {
        id: 1,
        type: "candidate",
        name: "张丽",
        title: "民族舞编导",
        avatar: "/placeholder.svg?height=40&width=40",
        experience: "4年",
        education: "中央民族大学",
        location: "北京",
        viewDate: "2024-01-20 15:30",
        viewCount: 2,
      },
      {
        id: 2,
        type: "candidate",
        name: "刘强",
        title: "现代舞演员",
        avatar: "/placeholder.svg?height=40&width=40",
        experience: "2年",
        education: "北京舞蹈学院",
        location: "北京",
        viewDate: "2024-01-19 11:20",
        viewCount: 1,
      },
      {
        id: 3,
        type: "template",
        title: "音乐剧演员招聘模板",
        description: "专业音乐剧演员招聘模板",
        viewDate: "2024-01-18 14:15",
        viewCount: 3,
      },
      {
        id: 4,
        type: "candidate",
        name: "陈美",
        title: "芭蕾舞演员",
        avatar: "/placeholder.svg?height=40&width=40",
        experience: "6年",
        education: "上海戏剧学院",
        location: "上海",
        viewDate: "2024-01-17 09:45",
        viewCount: 1,
      },
    ],
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "post":
        return <Briefcase className="h-4 w-4" />;
      case "view":
        return <Eye className="h-4 w-4" />;
      case "interview":
        return <MessageCircle className="h-4 w-4" />;
      case "update":
        return <Edit className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "待面试":
        return "bg-yellow-500";
      case "已面试":
        return "bg-blue-500";
      case "已录用":
        return "bg-green-500";
      case "已拒绝":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-4xl mx-auto p-4 pb-20">
        {/* Profile Header */}
        <Card className="rounded-2xl mb-6">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="relative">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={employerData.avatar} />
                  <AvatarFallback className="text-2xl">
                    {employerData.name[0]}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="sm"
                  className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <h2 className="text-2xl font-bold">{employerData.name}</h2>
                    {employerData.isVerified && (
                      <div className="flex items-center space-x-1 bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                        <CheckCircle className="h-4 w-4" />
                        <span className="text-xs font-medium">企业认证</span>
                      </div>
                    )}
                    {/* {employerData.vipStatus.isVip && (
                      <div className="flex items-center space-x-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded-full">
                        <Crown className="h-4 w-4" />
                        <span className="text-xs font-medium">{employerData.vipStatus.level}</span>
                      </div>
                    )} */}
                  </div>
                  {/* <Button variant="outline" size="sm" className="rounded-xl">
                    <Edit className="h-4 w-4 mr-2" />
                    编辑资料
                  </Button> */}
                </div>

                <p className="text-lg text-gray-700 mb-2">
                  {employerData.title}
                </p>

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

                {/* <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary">{employerData.industry}</Badge>
                  <Badge variant="outline">国有企业</Badge>
                  <Badge variant="outline">文化艺术</Badge>
                </div> */}

                {/* Profile Completion */}
                <div className="flex justify-between">
                  <div className="bg-blue-50 rounded-lg p-3 flex-1 mr-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">
                        企业资料完整度
                      </span>
                      <span className="text-sm text-blue-600">
                        {employerData.profileCompletion}%{" "}
                      </span>
                    </div>
                    <Progress
                      value={employerData.profileCompletion}
                      className="h-2"
                    />
                    <p className="text-xs text-gray-600 mt-1">
                      完善企业资料可吸引更多优秀人才
                    </p>
                  </div>
                  <Button>编辑</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
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
        </div> */}

        {/* VIP功能卡片 */}
        <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200 mb-6">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Crown className="h-5 w-5 text-yellow-600" />
                <CardTitle className="text-lg">VIP会员服务</CardTitle>
              </div>
              {/* {employerData.vipStatus.isVip && (
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                  剩余{employerData.vipStatus.remainingDays}天
                </Badge>
              )} */}
            </div>
          </CardHeader>
          <CardContent>
            {employerData.vipStatus.isVip ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">金额</span>
                  <span className="font-medium text-purple-700">$260</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">当前等级</span>
                  <span className="font-medium text-purple-700">
                    {employerData.vipStatus.level}
                  </span>
                </div>
                {/* <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">当前等级</span>
                  <span className="font-medium text-yellow-700">{employerData.vipStatus.level}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">到期时间</span>
                  <span className="font-medium">{employerData.vipStatus.expireDate}</span>
                </div>

                <div className="bg-white rounded-lg p-3 space-y-2">
                  <h4 className="font-medium text-sm mb-2">专享权益</h4>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center space-x-1">
                      <Zap className="h-3 w-3 text-yellow-600" />
                      <span>优先推荐</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye className="h-3 w-3 text-blue-600" />
                      <span>查看联系方式</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageCircle className="h-3 w-3 text-green-600" />
                      <span>无限私信</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="h-3 w-3 text-purple-600" />
                      <span>数据分析</span>
                    </div>
                  </div>
                </div> */}

                <Button
                  variant="outline"
                  className="w-full rounded-xl border-yellow-300 text-yellow-700 hover:bg-yellow-50"
                >
                  续费会员
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  开通VIP会员，享受更多专属服务
                </p>

                <div className="bg-white rounded-lg p-3">
                  <h4 className="font-medium text-sm mb-2">会员套餐</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">月度会员</span>
                      <span className="font-bold text-orange-600">¥99/月</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">季度会员</span>
                      <span className="font-bold text-orange-600">¥268/季</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">年度会员</span>
                      <span className="font-bold text-orange-600">¥888/年</span>
                    </div>
                  </div>
                </div>

                <Button className="w-full rounded-xl bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600">
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
                  <Badge variant="secondary">
                    {employerData.followedCandidates.length} 位候选人
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {employerData.followedCandidates.map((candidate) => (
                    <div
                      key={candidate.id}
                      className="flex items-center space-x-4 p-4 border rounded-lg"
                    >
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={candidate.avatar} />
                        <AvatarFallback>{candidate.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium">{candidate.name}</h4>
                          <div className="flex items-center space-x-2">
                            <Badge
                              variant={
                                candidate.isActive ? "default" : "secondary"
                              }
                            >
                              {candidate.isActive ? "活跃" : "不活跃"}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">
                          {candidate.title}
                        </p>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span>{candidate.experience}经验</span>
                          <span>{candidate.education}</span>
                          <span>{candidate.location}</span>
                          <span>最后活跃: {candidate.lastActive}</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          关注于 {candidate.followDate}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <MessageCircle className="h-4 w-4 mr-1" />
                          私信
                        </Button>
                        <Button size="sm" variant="outline">
                          <Heart className="h-4 w-4" />
                        </Button>
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
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-red-100 text-red-800">
                      {
                        employerData.messages.filter((msg) => !msg.isRead)
                          .length
                      }{" "}
                      条未读
                    </Badge>
                    <Button size="sm" variant="outline">
                      全部标记已读
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {employerData.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex items-start space-x-3 p-4 border rounded-lg ${
                        !message.isRead
                          ? "bg-blue-50 border-blue-200"
                          : "bg-white"
                      }`}
                    >
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={message.avatar} />
                        <AvatarFallback>
                          {message.type === "system" ? (
                            <Bell className="h-4 w-4" />
                          ) : message.type === "application" ? (
                            <Users className="h-4 w-4" />
                          ) : message.type === "interview" ? (
                            <Calendar className="h-4 w-4" />
                          ) : (
                            <MessageCircle className="h-4 w-4" />
                          )}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium text-sm">
                            {message.title}
                          </h4>
                          <div className="flex items-center space-x-2">
                            {!message.isRead && (
                              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                            )}
                            <span className="text-xs text-gray-500">
                              {message.time}
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">
                          {message.content}
                        </p>
                        <div className="flex space-x-2 mt-2">
                          <Button size="sm" variant="outline">
                            查看详情
                          </Button>
                          {message.type === "application" && (
                            <Button size="sm">查看简历</Button>
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
                  <Badge variant="secondary">
                    {employerData.collections.length} 项收藏
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {employerData.collections.map((item) => (
                    <div key={item.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          {item.type === "candidate" ? (
                            <div className="flex items-start space-x-3">
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={item.avatar} />
                                <AvatarFallback>
                                  {item.name?.[0] || "U"}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-1">
                                  <h4 className="font-medium">{item.name}</h4>
                                  <Badge variant="default">候选人</Badge>
                                </div>
                                <p className="text-sm text-gray-600">
                                  {item.title}
                                </p>
                                <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                                  <span>{item.experience}经验</span>
                                  <span>{item.education}</span>
                                  <span>{item.location}</span>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div>
                              <div className="flex items-center space-x-2 mb-1">
                                <h4 className="font-medium">{item.title}</h4>
                                <Badge variant="secondary">模板</Badge>
                              </div>
                              <p className="text-sm text-gray-600">
                                {item.description}
                              </p>
                            </div>
                          )}
                          <div className="flex items-center space-x-4 text-xs text-gray-500 mt-2">
                            <span>收藏于 {item.collectedDate}</span>
                            <Badge variant="outline" className="text-xs">
                              {item.status}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Bookmark className="h-4 w-4" />
                          </Button>
                          {item.type === "candidate" && (
                            <Button size="sm">联系</Button>
                          )}
                          {item.type === "template" && (
                            <Button size="sm" variant="outline">
                              使用
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
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary">
                      {employerData.browsingHistory.length} 条记录
                    </Badge>
                    <Button size="sm" variant="outline">
                      清空记录
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {employerData.browsingHistory.map((item) => (
                    <div key={item.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          {item.type === "candidate" ? (
                            <div className="flex items-start space-x-3">
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={item.avatar} />
                                <AvatarFallback>
                                  {item.name?.[0] || "U"}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-1">
                                  <h4 className="font-medium">{item.name}</h4>
                                  <Badge variant="default">候选人</Badge>
                                  {item.viewCount > 1 && (
                                    <Badge
                                      variant="outline"
                                      className="text-xs"
                                    >
                                      浏览 {item.viewCount} 次
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-sm text-gray-600">
                                  {item.title}
                                </p>
                                <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                                  <span>{item.experience}经验</span>
                                  <span>{item.education}</span>
                                  <span>{item.location}</span>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div>
                              <div className="flex items-center space-x-2 mb-1">
                                <h4 className="font-medium">{item.title}</h4>
                                <Badge variant="secondary">模板</Badge>
                                {item.viewCount > 1 && (
                                  <Badge variant="outline" className="text-xs">
                                    浏览 {item.viewCount} 次
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-gray-600">
                                {item.description}
                              </p>
                            </div>
                          )}
                          <div className="flex items-center space-x-4 text-xs text-gray-500 mt-2">
                            <div className="flex items-center space-x-1">
                              <Clock className="h-3 w-3" />
                              <span>最后浏览: {item.viewDate}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-1" />
                            再次查看
                          </Button>
                          {item.type === "candidate" && (
                            <Button size="sm" variant="outline">
                              <Bookmark className="h-4 w-4 mr-1" />
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
            <Link href="#">
              <Plus className="h-5 w-5 mr-2" />
              我要发布
            </Link>
          </Button>
          <Button variant="outline" asChild className="h-12 rounded-xl">
            <Link href="#">
              <Search className="h-5 w-5 mr-2" />
              搜索人才
            </Link>
          </Button>
        </div>

        {/* Customer Service */}
        <div className="mb-4">
          <Button
            variant="outline"
            asChild
            className="w-full h-12 rounded-xl border-blue-200 text-blue-600 hover:bg-blue-50"
          >
            <Link href="#">
              <Headphones className="h-5 w-5 mr-2" />
              客服
            </Link>
          </Button>
        </div>

        {/* Legal and Policy Links */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <Button
            variant="outline"
            asChild
            className="h-12 rounded-xl border-gray-200 text-gray-600 hover:bg-gray-50"
          >
            <Link href="#">
              <FileText className="h-5 w-5 mr-2" />
              用户协议与隐私政策
            </Link>
          </Button>
          <Button
            variant="outline"
            asChild
            className="h-12 rounded-xl border-orange-200 text-orange-600 hover:bg-orange-50"
          >
            <Link href="#">
              <AlertTriangle className="h-5 w-5 mr-2" />
              违规账号公示
            </Link>
          </Button>
        </div>

        {/* Settings and Logout */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <Button variant="outline" asChild className="h-12 rounded-xl">
            <Link href="#">
              <Settings className="h-5 w-5 mr-2" />
              设置
            </Link>
          </Button>
          <Button
            variant="outline"
            className="h-12 rounded-xl text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300"
            onClick={() => {
              logout();
              router.push("/login");
            }}
          >
            <LogOut className="h-5 w-5 mr-2" />
            退出登录
          </Button>
        </div>
      </main>
    </div>
  );
}
