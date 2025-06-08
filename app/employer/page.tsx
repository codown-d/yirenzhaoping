"use client"

import { useState, useEffect } from "react"
import { useAuth, useUserType, useIsAuthenticated } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { Search, Filter, Star, Heart, MessageCircle, User, Users, GraduationCap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CarouselBanner } from "@/components/ui/carousel-banner"
import {
  getAgeGroupText,
  SAMPLE_PERFORMERS,
  EMPLOYER_BANNER_SLIDES
} from "@/constants"
import ThreeLevelCategories from "@/components/ThreeLevelCategories"

export default function EmployerPage() {
  const router = useRouter()
  const { user, logout } = useAuth()
  const userType = useUserType()
  const isAuthenticated = useIsAuthenticated()

  // 未登录状态允许访问，按照求职者逻辑处理
  const effectiveUserType = userType || 'jobseeker'

  // 从 localStorage 加载筛选条件
  const [employerFilters, setEmployerFilters] = useState<any>({})

  // 页面加载时从 localStorage 读取筛选条件
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedEmployerFilters = localStorage.getItem('employer_filters')
        if (savedEmployerFilters) {
          setEmployerFilters(JSON.parse(savedEmployerFilters))
        }
      } catch (error) {
        console.error('Failed to load filters:', error)
      }
    }
  }, [])

  // 检查是否有活跃的筛选条件
  const hasActiveFilters = () => {
    return (
      employerFilters.location?.length > 0 ||
      employerFilters.gender !== "" ||
      (employerFilters.categoryType && employerFilters.categoryType !== 'frontend') ||
      employerFilters.specialties?.length > 0 ||
      (employerFilters.ageGroup && employerFilters.ageGroup !== 'unlimited') ||
      employerFilters.experience !== "" ||
      employerFilters.education?.length > 0
    )
  }

  // 清除筛选条件的辅助函数
  const clearFilter = (type: string, value?: string) => {
    if (type === "location" && value) {
      const newFilters = {
        ...employerFilters,
        location: employerFilters.location.filter((item: string) => item !== value),
      }
      setEmployerFilters(newFilters)
      localStorage.setItem('employer_filters', JSON.stringify(newFilters))
    } else if (type === "gender") {
      const newFilters = { ...employerFilters, gender: "" }
      setEmployerFilters(newFilters)
      localStorage.setItem('employer_filters', JSON.stringify(newFilters))
    } else if (type === "categoryType") {
      const newFilters = { ...employerFilters, categoryType: 'frontend' }
      setEmployerFilters(newFilters)
      localStorage.setItem('employer_filters', JSON.stringify(newFilters))
    } else if (type === "specialties" && value) {
      const newFilters = {
        ...employerFilters,
        specialties: employerFilters.specialties.filter((item: string) => item !== value),
      }
      setEmployerFilters(newFilters)
      localStorage.setItem('employer_filters', JSON.stringify(newFilters))
    } else if (type === "ageGroup") {
      const newFilters = { ...employerFilters, ageGroup: 'unlimited' }
      setEmployerFilters(newFilters)
      localStorage.setItem('employer_filters', JSON.stringify(newFilters))
    } else if (type === "experience") {
      const newFilters = { ...employerFilters, experience: "" }
      setEmployerFilters(newFilters)
      localStorage.setItem('employer_filters', JSON.stringify(newFilters))
    } else if (type === "education" && value) {
      const newFilters = {
        ...employerFilters,
        education: employerFilters.education.filter((item: string) => item !== value),
      }
      setEmployerFilters(newFilters)
      localStorage.setItem('employer_filters', JSON.stringify(newFilters))
    }
  }

  // 格式化经验显示
  const getExperienceText = (exp: string) => {
    switch (exp) {
      case "0-1": return "应届/1年以内"
      case "1-3": return "1-3年"
      case "3-5": return "3-5年"
      case "5+": return "5年以上"
      default: return ""
    }
  }

  // 格式化年龄段显示
  const getAgeGroupText = (ageGroup: string) => {
    switch (ageGroup) {
      case "unlimited": return "不限"
      case "under18": return "18岁以下"
      case "18-35": return "18-35岁"
      case "over35": return "35岁以上"
      default: return ""
    }
  }

  // 使用常量文件中的数据
  const performers = SAMPLE_PERFORMERS
  const bannerSlides = EMPLOYER_BANNER_SLIDES

  const [searchValue, setSearchValue] = useState("")

  // 处理分类选择
  const handleCategorySelect = (category: string, subcategory: string, item: string) => {
    console.log('选择了分类:', { category, subcategory, item })
    // 这里可以添加跳转到具体分类页面的逻辑
  }

  // 跳转到筛选页面
  const handleFilterClick = () => {
    router.push('/filter/employer')
  }

  // 搜索处理函数
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('搜索:', searchValue)
    // 这里可以添加搜索逻辑
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="pb-24">
        {/* Banner轮播 */}
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
            <form onSubmit={handleSearchSubmit} className="flex space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="搜索求职者、专业..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="pl-10 h-10 rounded-lg border-gray-200 text-sm"
                />
              </div>
              <Button
                variant="outline"
                size="sm"
                className="h-10 px-3 rounded-lg flex-shrink-0"
                onClick={handleFilterClick}
                type="button"
              >
                <Filter className="h-4 w-4 mr-1" />
                <span className="text-xs">筛选</span>
                {hasActiveFilters() && (
                  <Badge className="ml-1 bg-green-500 text-white text-xs px-1.5 py-0.5">
                    {(employerFilters.location?.length || 0) +
                     (employerFilters.gender ? 1 : 0) +
                     (employerFilters.categoryType && employerFilters.categoryType !== 'frontend' ? 1 : 0) +
                     (employerFilters.specialties?.length || 0) +
                     (employerFilters.ageGroup && employerFilters.ageGroup !== 'unlimited' ? 1 : 0) +
                     (employerFilters.experience ? 1 : 0) +
                     (employerFilters.education?.length || 0)}
                  </Badge>
                )}
              </Button>
            </form>
          </div>
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters() && (
          <div className="px-4 mb-4">
            <div className="bg-white rounded-2xl shadow-sm p-4">
              <h3 className="font-medium mb-3">已选条件</h3>
              <div className="flex flex-wrap gap-2">
                {employerFilters.location?.map((city: string) => (
                  <Badge key={city} variant="secondary" className="rounded-full px-3 py-1">
                    {city}
                    <button className="ml-1 text-gray-500" onClick={() => clearFilter("location", city)}>
                      ×
                    </button>
                  </Badge>
                ))}

                {employerFilters.gender && (
                  <Badge variant="secondary" className="rounded-full px-3 py-1">
                    {employerFilters.gender === "male" ? "男" : "女"}
                    <button className="ml-1 text-gray-500" onClick={() => clearFilter("gender")}>
                      ×
                    </button>
                  </Badge>
                )}

                {employerFilters.categoryType && employerFilters.categoryType !== 'frontend' && (
                  <Badge variant="secondary" className="rounded-full px-3 py-1">
                    {employerFilters.categoryType === 'backend' ? '幕后' :
                     employerFilters.categoryType === 'operations' ? '运营' : '台前'}
                    <button className="ml-1 text-gray-500" onClick={() => clearFilter("categoryType")}>
                      ×
                    </button>
                  </Badge>
                )}

                {employerFilters.specialties?.map((specialty: string) => (
                  <Badge key={specialty} variant="secondary" className="rounded-full px-3 py-1">
                    {specialty}
                    <button className="ml-1 text-gray-500" onClick={() => clearFilter("specialties", specialty)}>
                      ×
                    </button>
                  </Badge>
                ))}
                
                {employerFilters.ageGroup && employerFilters.ageGroup !== 'unlimited' && (
                  <Badge variant="secondary" className="rounded-full px-3 py-1">
                    {getAgeGroupText(employerFilters.ageGroup)}
                    <button className="ml-1 text-gray-500" onClick={() => clearFilter("ageGroup")}>
                      ×
                    </button>
                  </Badge>
                )}
                
                {employerFilters.experience && (
                  <Badge variant="secondary" className="rounded-full px-3 py-1">
                    {getExperienceText(employerFilters.experience)}
                    <button className="ml-1 text-gray-500" onClick={() => clearFilter("experience")}>
                      ×
                    </button>
                  </Badge>
                )}
                
                {employerFilters.education?.map((edu: string) => (
                  <Badge key={edu} variant="secondary" className="rounded-full px-3 py-1">
                    {edu}
                    <button className="ml-1 text-gray-500" onClick={() => clearFilter("education", edu)}>
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
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
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
                    <Users className="h-5 w-5 text-green-600" />
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

        {/* Recommended Performers - 移动端优化 */}
        <div className="px-3">
          <h2 className="text-base font-semibold mb-3">推荐求职者</h2>
          <div className="space-y-3">
            {performers.map((performer) => (
              <div key={performer.id} className="bg-white rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start space-x-3">
                  <Avatar className="h-10 w-10 flex-shrink-0">
                    <AvatarImage src={performer.avatar} />
                    <AvatarFallback className="text-sm">{performer.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="font-medium text-sm cursor-pointer hover:text-blue-600 transition-colors truncate" onClick={()=>{
                        router.push("/candidate/1")
                      }}>{performer.name}</h3>
                      <div className="flex items-center space-x-1 flex-shrink-0 ml-2">
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                          <Heart className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                          <MessageCircle className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-gray-600 mb-2">
                      <span>{performer.age}岁</span>
                      <span>•</span>
                      <span className="truncate">{performer.specialty}</span>
                      <span>•</span>
                      <span className="truncate">{performer.experience}</span>
                    </div>

                    {/* 学校和专业信息 - 移动端紧凑布局 */}
                    <div className="flex items-center space-x-1 text-xs text-gray-600 mb-2">
                      <GraduationCap className="h-3 w-3 flex-shrink-0" />
                      <span className="truncate">{performer.school}</span>
                      <span>•</span>
                      <span className="truncate">{performer.major}</span>
                    </div>
                    <div className="flex items-center space-x-1 mb-2">
                      <Star className="h-3 w-3 text-yellow-400 fill-current flex-shrink-0" />
                      <span className="text-xs font-medium">{performer.rating}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {performer.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs px-2 py-0.5">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-xs text-gray-600 mb-2 line-clamp-2">{performer.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-green-600">{performer.price}</span>
                      <Button size="sm" className="rounded-lg h-7 px-3 text-xs" onClick={()=>{
                        router.push("/candidate/1")
                      }}>
                        查看详情
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

     
    </div>
  )
}
