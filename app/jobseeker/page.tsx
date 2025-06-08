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
import {
  SAMPLE_JOB_OPPORTUNITIES,
  JOBSEEKER_BANNER_SLIDES
} from "@/constants"
import ThreeLevelCategories from "@/components/ThreeLevelCategories"

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

  // 搜索处理函数
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('搜索:', searchValue)
    // 这里可以添加搜索逻辑
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

  // 使用常量文件中的数据
  const opportunities = SAMPLE_JOB_OPPORTUNITIES
  const bannerSlides = JOBSEEKER_BANNER_SLIDES

  // 处理分类选择
  const handleCategorySelect = (category: string, subcategory: string, item: string) => {
    console.log('选择了分类:', { category, subcategory, item })
    // 这里可以添加跳转到具体分类页面的逻辑
  }

  return (
    <div className="min-h-screen bg-gray-50">
  

      {/* Main Content */}
      <main className="pb-24">
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
                    {jobseekerFilters.categoryType === 'backend' ? '幕后' :
                     jobseekerFilters.categoryType === 'operations' ? '运营' : '台前'}
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
        {/* Categories - 三级分类展示 */}
        <div className="px-3 mb-6">
          <ThreeLevelCategories
            onCategorySelect={handleCategorySelect}
            selectedCategory="frontend"
          />
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
