"use client"

import { useState } from "react"
import { useAuth, useUserType, useIsAuthenticated } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import {
  User, Edit, Settings, Heart, Star, Eye, MessageCircle,
  Briefcase, Award, Building, MapPin, Phone, Mail, Calendar,
  TrendingUp, Clock, FileText, Camera, Users, Plus, Search, LogOut, Shield, CheckCircle, Crown, Zap, Headphones, AlertTriangle,
  Bookmark, Bell, History
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { ProfilePageHeader } from "@/components/ui/page-header"
import { SAMPLE_EMPLOYER_PROFILE_COMPLETE } from "@/constants"
import Link from "next/link"

export default function EmployerProfilePage() {
  const router = useRouter()
  const { user, logout } = useAuth()
  const userType = useUserType()
  const isAuthenticated = useIsAuthenticated()

  // 注释：允许未登录用户访问，显示默认数据

  // 使用常量文件中的数据，支持用户登录状态覆盖
  const employerData = {
    ...SAMPLE_EMPLOYER_PROFILE_COMPLETE,
    name: user?.name || SAMPLE_EMPLOYER_PROFILE_COMPLETE.name,
    avatar: user?.avatar || SAMPLE_EMPLOYER_PROFILE_COMPLETE.avatar,
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
      {/* 头部组件 */}
      <ProfilePageHeader
        title="企业中心"
        
        showEdit={true}
        onEdit={() => router.push('/profile/employer/edit')}
      />

      <main className="max-w-4xl mx-auto p-4 pb-24">
        {/* Profile Header */}
        <Card className="rounded-2xl mb-6">
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <div className="relative flex-shrink-0">
                <Avatar className="h-16 w-16 md:h-20 md:w-20">
                  <AvatarImage src={employerData.avatar} />
                  <AvatarFallback className="text-lg md:text-2xl">{employerData.name[0]}</AvatarFallback>
                </Avatar>
                <Button size="sm" className="absolute -bottom-1 -right-1 h-6 w-6 md:h-8 md:w-8 rounded-full p-0">
                  <Camera className="h-3 w-3 md:h-4 md:w-4" />
                </Button>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                  <div className="flex flex-col space-y-2 mb-2 md:mb-0">
                    <h2 className="text-lg md:text-2xl font-bold truncate">{employerData.name}</h2>
                    <div className="flex flex-wrap gap-2">
                      {employerData.isVerified && (
                        <div className="flex items-center space-x-1 bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                          <CheckCircle className="h-3 w-3 md:h-4 md:w-4" />
                          <span className="text-xs font-medium">企业认证</span>
                        </div>
                      )}
                      {employerData.vipStatus.isVip && (
                        <div className="flex items-center space-x-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded-full">
                          <Crown className="h-3 w-3 md:h-4 md:w-4" />
                          <span className="text-xs font-medium">{employerData.vipStatus.level}</span>
                        </div>
                      )}
                    </div>
                  </div>
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

        {/* VIP功能卡片 */}
        <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200 mb-6">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Crown className="h-5 w-5 text-yellow-600" />
                <CardTitle className="text-lg">VIP会员服务</CardTitle>
              </div>
              {employerData.vipStatus.isVip && (
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                  剩余{employerData.vipStatus.remainingDays}天
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {employerData.vipStatus.isVip ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">当前等级</span>
                  <span className="font-medium text-yellow-700">{employerData.vipStatus.level}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">到期时间</span>
                  <span className="font-medium">{employerData.vipStatus.expireDate}</span>
                </div>

                <div className="bg-white rounded-lg p-3 space-y-2">
                  <h4 className="font-medium text-sm mb-2">专享权益</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center space-x-1">
                      <Zap className="h-3 w-3 text-yellow-600 flex-shrink-0" />
                      <span className="truncate">优先推荐</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye className="h-3 w-3 text-blue-600 flex-shrink-0" />
                      <span className="truncate">查看联系方式</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageCircle className="h-3 w-3 text-green-600 flex-shrink-0" />
                      <span className="truncate">无限私信</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="h-3 w-3 text-purple-600 flex-shrink-0" />
                      <span className="truncate">数据分析</span>
                    </div>
                  </div>
                </div>

                <Button variant="outline" className="w-full rounded-xl border-yellow-300 text-yellow-700 hover:bg-yellow-50">
                  续费会员
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-gray-600">开通VIP会员，享受更多专属服务</p>

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
                  <Badge variant="secondary">{employerData.followedCandidates.length} 位候选人</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {employerData.followedCandidates.map((candidate) => (
                    <div key={candidate.id} className="flex items-start space-x-3 p-3 border rounded-lg hover:shadow-md transition-shadow">
                      <Avatar className="h-10 w-10 flex-shrink-0">
                        <AvatarImage src={candidate.avatar} />
                        <AvatarFallback className="text-sm">{candidate.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-1">
                          <h4 className="font-medium text-sm truncate pr-2">{candidate.name}</h4>
                          <Badge variant={candidate.isActive ? "default" : "secondary"} className="text-xs px-2 py-0.5 flex-shrink-0">
                            {candidate.isActive ? "活跃" : "不活跃"}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-600 mb-2 truncate">{candidate.title}</p>
                        <div className="flex items-center space-x-2 text-xs text-gray-600 mb-1">
                          <span className="truncate">{candidate.experience}经验</span>
                          <span>•</span>
                          <span className="truncate">{candidate.education}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-xs text-gray-600 mb-2">
                          <span className="truncate">{candidate.location}</span>
                          <span>•</span>
                          <span>最后活跃: {candidate.lastActive}</span>
                        </div>
                        <div className="text-xs text-gray-500 mb-2">关注于 {candidate.followDate}</div>
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
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-red-100 text-red-800">
                      {employerData.messages.filter(msg => !msg.isRead).length} 条未读
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
                    <div key={message.id} className={`flex items-start space-x-3 p-4 border rounded-lg ${!message.isRead ? 'bg-blue-50 border-blue-200' : 'bg-white'}`}>
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={message.avatar} />
                        <AvatarFallback>
                          {message.type === 'system' ? <Bell className="h-4 w-4" /> :
                            message.type === 'application' ? <Users className="h-4 w-4" /> :
                              message.type === 'interview' ? <Calendar className="h-4 w-4" /> :
                                <MessageCircle className="h-4 w-4" />}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium text-sm">{message.title}</h4>
                          <div className="flex items-center space-x-2">
                            {!message.isRead && (
                              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                            )}
                            <span className="text-xs text-gray-500">{message.time}</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">{message.content}</p>
                        <div className="flex space-x-2 mt-2">
                          <Button size="sm" variant="outline">
                            查看详情
                          </Button>
                          {message.type === 'application' && (
                            <Button size="sm">
                              查看简历
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
                  <Badge variant="secondary" className="hidden sm:inline-flex">
                    {employerData.collections.length} 项收藏
                  </Badge>
                  <Badge variant="secondary" className="sm:hidden text-xs">
                    {employerData.collections.length}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {employerData.collections.map((item) => (
                    <div key={item.id} className="border rounded-lg p-3 sm:p-4">
                      {item.type === 'candidate' ? (
                        <div className="space-y-3">
                          {/* 候选人信息 */}
                          <div className="flex items-start space-x-3">
                            <Avatar className="h-10 w-10 flex-shrink-0">
                              <AvatarImage src={item.avatar} />
                              <AvatarFallback>{item.name?.[0] || 'U'}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-2 mb-1">
                                <h4 className="font-medium truncate">{item.name}</h4>
                                <Badge variant="default" className="text-xs flex-shrink-0">候选人</Badge>
                              </div>
                              <p className="text-sm text-gray-600 truncate">{item.title}</p>
                              <div className="flex flex-wrap gap-2 text-xs text-gray-500 mt-1">
                                <span className="bg-gray-100 px-2 py-1 rounded">{item.experience}经验</span>
                                <span className="bg-gray-100 px-2 py-1 rounded hidden sm:inline">{item.education}</span>
                                <span className="bg-gray-100 px-2 py-1 rounded">{item.location}</span>
                              </div>
                            </div>
                          </div>

                          {/* 底部信息和操作 */}
                          <div className="flex items-center justify-between pt-2 border-t">
                            <div className="flex items-center space-x-2 text-xs text-gray-500">
                              <span>收藏于 {item.collectedDate}</span>
                              <Badge variant="outline" className="text-xs">
                                {item.status}
                              </Badge>
                            </div>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline" className="h-8 w-8 p-0 sm:w-auto sm:px-3">
                                <Bookmark className="h-4 w-4" />
                                <span className="hidden sm:inline ml-1">取消收藏</span>
                              </Button>
                              <Button size="sm" className="h-8 px-3">
                                <span className="hidden sm:inline">联系</span>
                                <span className="sm:hidden">联系</span>
                              </Button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {/* 模板信息 */}
                          <div>
                            <div className="flex items-center space-x-2 mb-1">
                              <h4 className="font-medium">{item.title}</h4>
                              <Badge variant="secondary" className="text-xs">模板</Badge>
                            </div>
                            <p className="text-sm text-gray-600">{item.description}</p>
                          </div>

                          {/* 底部信息和操作 */}
                          <div className="flex items-center justify-between pt-2 border-t">
                            <div className="flex items-center space-x-2 text-xs text-gray-500">
                              <span>收藏于 {item.collectedDate}</span>
                              <Badge variant="outline" className="text-xs">
                                {item.status}
                              </Badge>
                            </div>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline" className="h-8 w-8 p-0 sm:w-auto sm:px-3">
                                <Bookmark className="h-4 w-4" />
                                <span className="hidden sm:inline ml-1">取消收藏</span>
                              </Button>
                              <Button size="sm" variant="outline" className="h-8 px-3">
                                使用
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
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
                    <Badge variant="secondary" className="hidden sm:inline-flex">
                      {employerData.browsingHistory.length} 条记录
                    </Badge>
                    <Badge variant="secondary" className="sm:hidden text-xs">
                      {employerData.browsingHistory.length}
                    </Badge>
                    <Button size="sm" variant="outline" className="text-xs px-2 sm:px-3">
                      <span className="hidden sm:inline">清空记录</span>
                      <span className="sm:hidden">清空</span>
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {employerData.browsingHistory.map((item) => (
                    <div key={item.id} className="border rounded-lg p-3 sm:p-4">
                      {item.type === 'candidate' ? (
                        <div className="space-y-3">
                          {/* 候选人信息 */}
                          <div className="flex items-start space-x-3">
                            <Avatar className="h-10 w-10 flex-shrink-0">
                              <AvatarImage src={item.avatar} />
                              <AvatarFallback>{item.name?.[0] || 'U'}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-2 mb-1 flex-wrap">
                                <h4 className="font-medium truncate">{item.name}</h4>
                                <Badge variant="default" className="text-xs flex-shrink-0">候选人</Badge>
                                {item.viewCount > 1 && (
                                  <Badge variant="outline" className="text-xs flex-shrink-0">
                                    浏览 {item.viewCount} 次
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-gray-600 truncate">{item.title}</p>
                              <div className="flex flex-wrap gap-2 text-xs text-gray-500 mt-1">
                                <span className="bg-gray-100 px-2 py-1 rounded">{item.experience}经验</span>
                                <span className="bg-gray-100 px-2 py-1 rounded hidden sm:inline">{item.education}</span>
                                <span className="bg-gray-100 px-2 py-1 rounded">{item.location}</span>
                              </div>
                            </div>
                          </div>

                          {/* 底部信息和操作 */}
                          <div className="flex items-center justify-between pt-2 border-t">
                            <div className="flex items-center space-x-1 text-xs text-gray-500">
                              <Clock className="h-3 w-3 flex-shrink-0" />
                              <span className="truncate">最后浏览: {item.viewDate}</span>
                            </div>
                            <div className="flex space-x-2 flex-shrink-0">
                              <Button size="sm" variant="outline" className="h-8 px-2 sm:px-3">
                                <Eye className="h-4 w-4" />
                                <span className="hidden sm:inline ml-1">再次查看</span>
                              </Button>
                              <Button size="sm" variant="outline" className="h-8 px-2 sm:px-3">
                                <Bookmark className="h-4 w-4" />
                                <span className="hidden sm:inline ml-1">收藏</span>
                              </Button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {/* 模板信息 */}
                          <div>
                            <div className="flex items-center space-x-2 mb-1 flex-wrap">
                              <h4 className="font-medium">{item.title}</h4>
                              <Badge variant="secondary" className="text-xs flex-shrink-0">模板</Badge>
                              {item.viewCount > 1 && (
                                <Badge variant="outline" className="text-xs flex-shrink-0">
                                  浏览 {item.viewCount} 次
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-600">{item.description}</p>
                          </div>

                          {/* 底部信息和操作 */}
                          <div className="flex items-center justify-between pt-2 border-t">
                            <div className="flex items-center space-x-1 text-xs text-gray-500">
                              <Clock className="h-3 w-3 flex-shrink-0" />
                              <span className="truncate">最后浏览: {item.viewDate}</span>
                            </div>
                            <div className="flex space-x-2 flex-shrink-0">
                              <Button size="sm" variant="outline" className="h-8 px-2 sm:px-3">
                                <Eye className="h-4 w-4" />
                                <span className="hidden sm:inline ml-1">再次查看</span>
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
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
            <Link href="/post/employer">
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
