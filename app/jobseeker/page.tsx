"use client"

import { useState, useEffect } from "react"
import { useAuth, useUserType, useIsAuthenticated } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { Search, Filter, Heart, User, Briefcase, GraduationCap, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { CarouselBanner } from "@/components/ui/carousel-banner"
import Link from "next/link"

export default function JobseekerPage() {
  const router = useRouter()
  const { user, logout } = useAuth()
  const userType = useUserType()
  const isAuthenticated = useIsAuthenticated()

  // 未登录状态允许访问，按照求职者逻辑处理
  const effectiveUserType = userType || 'jobseeker'

  // 从 localStorage 加载筛选条件
  const [jobseekerFilters, setJobseekerFilters] = useState<any>({})

  // 页面加载时从 localStorage 读取筛选条件
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedJobseekerFilters = localStorage.getItem('jobseeker_filters')
        if (savedJobseekerFilters) {
          setJobseekerFilters(JSON.parse(savedJobseekerFilters))
        }
      } catch (error) {
        console.error('Failed to load filters:', error)
      }
    }
  }, [])

  // 检查是否有活跃的筛选条件
  const hasActiveFilters = () => {
    return (
      jobseekerFilters.location?.length > 0 ||
      (jobseekerFilters.categoryType && jobseekerFilters.categoryType !== 'frontend') ||
      jobseekerFilters.jobTypes?.length > 0 ||
      (jobseekerFilters.salaryRange && (jobseekerFilters.salaryRange[0] !== 0 || jobseekerFilters.salaryRange[1] !== 50)) ||
      jobseekerFilters.employmentType !== "" ||
      jobseekerFilters.benefits?.length > 0
    )
  }

  // 跳转到筛选页面
  const handleFilterClick = () => {
    router.push('/filter/jobseeker')
  }



  // 清除筛选条件的辅助函数
  const clearFilter = (type: string, value?: string) => {
    if (type === "location" && value) {
      const newFilters = {
        ...jobseekerFilters,
        location: jobseekerFilters.location.filter((item: string) => item !== value),
      }
      setJobseekerFilters(newFilters)
      localStorage.setItem('jobseeker_filters', JSON.stringify(newFilters))
    } else if (type === "categoryType") {
      const newFilters = { ...jobseekerFilters, categoryType: 'frontend' }
      setJobseekerFilters(newFilters)
      localStorage.setItem('jobseeker_filters', JSON.stringify(newFilters))
    } else if (type === "jobTypes" && value) {
      const newFilters = {
        ...jobseekerFilters,
        jobTypes: jobseekerFilters.jobTypes.filter((item: string) => item !== value),
      }
      setJobseekerFilters(newFilters)
      localStorage.setItem('jobseeker_filters', JSON.stringify(newFilters))
    } else if (type === "salaryRange") {
      const newFilters = { ...jobseekerFilters, salaryRange: [0, 50] }
      setJobseekerFilters(newFilters)
      localStorage.setItem('jobseeker_filters', JSON.stringify(newFilters))
    } else if (type === "employmentType") {
      const newFilters = { ...jobseekerFilters, employmentType: "" }
      setJobseekerFilters(newFilters)
      localStorage.setItem('jobseeker_filters', JSON.stringify(newFilters))
    } else if (type === "benefits" && value) {
      const newFilters = {
        ...jobseekerFilters,
        benefits: jobseekerFilters.benefits.filter((item: string) => item !== value),
      }
      setJobseekerFilters(newFilters)
      localStorage.setItem('jobseeker_filters', JSON.stringify(newFilters))
    }
  }

  // 格式化薪资显示
  const formatSalary = (value: number) => {
    if (value === 0) return "不限"
    if (value >= 50) return "50K+"
    return `${value}K`
  }

  // 格式化工作性质
  const getEmploymentTypeText = (type: string) => {
    switch (type) {
      case "full-time": return "全职"
      case "part-time": return "兼职"
      case "temporary": return "临时"
      case "contract": return "合同制"
      default: return ""
    }
  }

  // 招聘职位数据
  const opportunities = [
    {
      id: 1,
      title: "大型音乐剧《猫》舞蹈演员",
      company: "星光文化传媒",
      location: "北京",
      salary: "8000-12000",
      type: "全职",
      tags: ["五险一金", "工作补贴", "培训机会"],
      description: "招聘专业舞蹈演员，要求有扎实的舞蹈基础，形象气质佳，有团队合作精神。",
      posted: "2天前",
      urgent: true,
      requiredMajor: "舞蹈表演专业",
      startTime: "立即到岗"
    },
    {
      id: 2,
      title: "武术指导及表演",
      company: "东方影视",
      location: "上海",
      salary: "10000-15000",
      type: "合同制",
      tags: ["影视经验", "高薪", "知名导演"],
      description: "知名导演新片招聘武术指导，要求有丰富的武术表演和指导经验。",
      posted: "1天前",
      urgent: false,
      requiredMajor: "武术与民族传统体育",
      startTime: "1周内到岗"
    },
    {
      id: 3,
      title: "儿童剧表演演员",
      company: "童话王国剧团",
      location: "广州",
      salary: "6000-8000",
      type: "兼职",
      tags: ["周末工作", "儿童剧", "轻松愉快"],
      description: "招聘儿童剧表演演员，要求喜欢孩子，表演生动有趣，周末工作。",
      posted: "3天前",
      urgent: false,
      requiredMajor: "表演专业",
      startTime: "2周内到岗"
    }
  ]

  // Banner轮播数据
  const bannerSlides = [
    {
      id: 1,
      title: "发现招聘职位",
      subtitle: "专业求职者招聘平台",
      description: "汇聚全国优质招聘职位，为您的艺术才华找到最佳工作机会",
      image: "/placeholder.svg?height=200&width=400",
      buttonText: "立即查看",
      backgroundColor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    },
    {
      id: 2,
      title: "丰富职位类型",
      subtitle: "覆盖各类表演领域",
      description: "舞台剧、音乐剧、舞蹈表演、影视拍摄等多种职位等你来",
      image: "/placeholder.svg?height=200&width=400",
      buttonText: "浏览职位",
      backgroundColor: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
    },
    {
      id: 3,
      title: "专业成长平台",
      subtitle: "提升艺术技能",
      description: "与知名导演合作，参与优质项目，让您的艺术生涯更上一层楼",
      image: "/placeholder.svg?height=200&width=400",
      buttonText: "开始申请",
      backgroundColor: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
    }
  ]

  // 分类切换状态
  const [categoryType, setCategoryType] = useState<'frontend' | 'backend'>('frontend')

  // 表演类别
  const frontendCategories = [
    { name: "舞蹈", count: 56, icon: "💃" },
    { name: "表演", count: 43, icon: "🎭" },
    { name: "武术", count: 28, icon: "🥋" },
    { name: "杂技", count: 15, icon: "🤹" },
    { name: "音乐", count: 37, icon: "🎵" },
    { name: "戏曲", count: 22, icon: "🎪" },
  ]

  const backendCategories = [
    { name: "导演", count: 15, icon: "🎬" },
    { name: "编剧", count: 12, icon: "✍️" },
    { name: "制片", count: 8, icon: "📋" },
    { name: "摄影", count: 22, icon: "📷" },
    { name: "灯光", count: 18, icon: "💡" },
    { name: "音响", count: 16, icon: "🔊" },
  ]

  const currentCategories = categoryType === 'frontend' ? frontendCategories : backendCategories

  return (
    <div className="min-h-screen bg-gray-50">
  

      {/* Main Content */}
      <main className="pb-20">
        <div className="mb-6">
          <CarouselBanner
            slides={bannerSlides}
            height="180px"
            autoPlay={true}
            autoPlayInterval={4000}
          />
        </div>

        {/* Search Section - 移动端优化 */}
        <div className="px-3 mb-4">
          <div className="bg-white rounded-xl shadow-sm p-3">
            <div className="flex space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="搜索招聘职位、公司..."
                  className="pl-10 h-10 rounded-lg border-gray-200 text-sm"
                />
              </div>
              <Button
                variant="outline"
                size="sm"
                className="h-10 px-3 rounded-lg flex-shrink-0"
                onClick={handleFilterClick}
              >
                <Filter className="h-4 w-4 mr-1" />
                <span className="text-xs">筛选</span>
                {hasActiveFilters() && (
                  <Badge className="ml-1 bg-green-500 text-white text-xs px-1.5 py-0.5">
                    {(jobseekerFilters.location?.length || 0) +
                     (jobseekerFilters.categoryType && jobseekerFilters.categoryType !== 'frontend' ? 1 : 0) +
                     (jobseekerFilters.jobTypes?.length || 0) +
                     (jobseekerFilters.salaryRange && (jobseekerFilters.salaryRange[0] !== 0 || jobseekerFilters.salaryRange[1] !== 50) ? 1 : 0) +
                     (jobseekerFilters.employmentType ? 1 : 0) +
                     (jobseekerFilters.benefits?.length || 0)}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters() && (
          <div className="px-4 mb-4">
            <div className="bg-white rounded-2xl shadow-sm p-4">
              <h3 className="font-medium mb-3">已选条件</h3>
              <div className="flex flex-wrap gap-2">
                {jobseekerFilters.location?.map((city: string) => (
                  <Badge key={city} variant="secondary" className="rounded-full px-3 py-1">
                    {city}
                    <button className="ml-1 text-gray-500" onClick={() => clearFilter("location", city)}>
                      ×
                    </button>
                  </Badge>
                ))}

                {jobseekerFilters.categoryType && jobseekerFilters.categoryType !== 'frontend' && (
                  <Badge variant="secondary" className="rounded-full px-3 py-1">
                    {jobseekerFilters.categoryType === 'backend' ? '后台' : '前台'}
                    <button className="ml-1 text-gray-500" onClick={() => clearFilter("categoryType")}>
                      ×
                    </button>
                  </Badge>
                )}

                {jobseekerFilters.jobTypes?.map((type: string) => (
                  <Badge key={type} variant="secondary" className="rounded-full px-3 py-1">
                    {type}
                    <button className="ml-1 text-gray-500" onClick={() => clearFilter("jobTypes", type)}>
                      ×
                    </button>
                  </Badge>
                ))}
                
                {jobseekerFilters.salaryRange && (jobseekerFilters.salaryRange[0] !== 0 || jobseekerFilters.salaryRange[1] !== 50) && (
                  <Badge variant="secondary" className="rounded-full px-3 py-1">
                    {formatSalary(jobseekerFilters.salaryRange[0])}-{formatSalary(jobseekerFilters.salaryRange[1])}
                    <button className="ml-1 text-gray-500" onClick={() => clearFilter("salaryRange")}>
                      ×
                    </button>
                  </Badge>
                )}
                
                {jobseekerFilters.employmentType && (
                  <Badge variant="secondary" className="rounded-full px-3 py-1">
                    {getEmploymentTypeText(jobseekerFilters.employmentType)}
                    <button className="ml-1 text-gray-500" onClick={() => clearFilter("employmentType")}>
                      ×
                    </button>
                  </Badge>
                )}
                
                {jobseekerFilters.benefits?.map((benefit: string) => (
                  <Badge key={benefit} variant="secondary" className="rounded-full px-3 py-1">
                    {benefit}
                    <button className="ml-1 text-gray-500" onClick={() => clearFilter("benefits", benefit)}>
                      ×
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}
    {/* 未登录状态的选择组件 - 移动端优化 */}
    {!isAuthenticated && (
        <div className="px-3 py-4">
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-100">
            <div className="grid grid-cols-2 gap-3">
              {/* 来求职 */}
              <div
                className="bg-white rounded-lg p-3 border-2 border-blue-200 hover:border-blue-400 transition-all cursor-pointer group active:scale-95"
                onClick={() => router.push('/login?type=jobseeker')}
              >
                <div className="text-center">
                  <div className="bg-blue-100 rounded-full w-10 h-10 flex items-center justify-center mx-auto mb-2 group-hover:bg-blue-200 transition-colors">
                    <User className="h-5 w-5 text-blue-600" />
                  </div>
                  <h3 className="text-sm font-bold text-gray-800 mb-1">我来求职</h3>
                  <p className="text-gray-600 text-xs mb-2">寻找表演机会</p>
                  <div className="flex flex-wrap gap-1 justify-center">
                    <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full text-xs">找工作</span>
                  </div>
                </div>
              </div>

              {/* 来招聘 */}
              <div
                className="bg-white rounded-lg p-3 border-2 border-green-200 hover:border-green-400 transition-all cursor-pointer group active:scale-95"
                onClick={() => router.push('/login?type=employer')}
              >
                <div className="text-center">
                  <div className="bg-green-100 rounded-full w-10 h-10 flex items-center justify-center mx-auto mb-2 group-hover:bg-green-200 transition-colors">
                    <Briefcase className="h-5 w-5 text-green-600" />
                  </div>
                  <h3 className="text-sm font-bold text-gray-800 mb-1">我来招聘</h3>
                  <p className="text-gray-600 text-xs mb-2">发布职位招聘</p>
                  <div className="flex flex-wrap gap-1 justify-center">
                    <span className="bg-green-50 text-green-700 px-2 py-0.5 rounded-full text-xs">招人才</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
        {/* Categories - 移动端优化 */}
        <div className="px-3 mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-semibold">类别</h2>
            <div className="flex bg-gray-100 rounded-lg p-0.5">
              <Button
                variant={categoryType === 'frontend' ? 'default' : 'ghost'}
                size="sm"
                className={`rounded-md px-3 py-1.5 text-xs text-black hover:text-[#fff] ${
                  categoryType === 'frontend'
                    ? 'bg-white shadow-sm'
                    : 'hover:bg-gray-200 hover:text-black'
                }`}
                onClick={() => setCategoryType('frontend')}
              >
                前台
              </Button>
              <Button
                variant={categoryType === 'backend' ? 'default' : 'ghost'}
                size="sm"
                className={`rounded-md px-3 py-1.5 text-xs text-black hover:text-[#fff] ${
                  categoryType === 'backend'
                    ? 'bg-white shadow-sm'
                    : 'hover:bg-gray-200 hover:text-black'
                }`}
                onClick={() => setCategoryType('backend')}
              >
                后台
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {currentCategories.map((category) => (
              <div key={category.name} className="bg-white rounded-xl p-3 text-center shadow-sm hover:shadow-md transition-shadow active:scale-95">
                <div className="text-xl mb-1">{category.icon}</div>
                <div className="font-medium text-xs text-gray-800">{category.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Opportunities - 移动端优化 */}
        <div className="px-3">
          <h2 className="text-base font-semibold mb-3">推荐招聘职位</h2>
          <div className="space-y-3">
            {opportunities.map((opportunity) => (
              <div key={opportunity.id} className="bg-white rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start space-x-2 mb-1">
                      <h3 className="font-medium text-sm leading-tight cursor-pointer hover:text-blue-600 transition-colors flex-1" onClick={()=>{
                        router.push("/job/1")
                      }}>{opportunity.title}</h3>
                      {opportunity.urgent && (
                        <Badge className="bg-red-100 text-red-800 text-xs px-1.5 py-0.5 flex-shrink-0">急招</Badge>
                      )}
                    </div>
                    <p className="text-xs text-gray-600 mb-2">{opportunity.company}</p>
                  </div>
                  <Button variant="ghost" size="sm" className="h-7 w-7 p-0 flex-shrink-0 ml-2">
                    <Heart className="h-3.5 w-3.5" />
                  </Button>
                </div>

                <div className="flex items-center space-x-2 text-xs text-gray-600 mb-2">
                  <span>{opportunity.type}</span>
                  <span>•</span>
                  <span className="text-green-600 font-medium">{opportunity.salary}/月</span>
                </div>

                {/* 需求专业和到岗时间 - 移动端紧凑布局 */}
                <div className="space-y-1 mb-2">
                  <div className="flex items-center space-x-1 text-xs text-gray-600">
                    <GraduationCap className="h-3 w-3 flex-shrink-0" />
                    <span className="truncate">需求专业：{opportunity.requiredMajor}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-xs text-gray-600">
                    <Clock className="h-3 w-3 flex-shrink-0" />
                    <span>到岗时间：{opportunity.startTime}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-2">
                  {opportunity.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs px-2 py-0.5">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <p className="text-xs text-gray-600 mb-3 line-clamp-2">{opportunity.description}</p>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{opportunity.posted}</span>
                  <Button size="sm" className="rounded-lg h-7 px-3 text-xs" onClick={()=>{
                        router.push("/job/1")
                      }}>
                    立即申请
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
