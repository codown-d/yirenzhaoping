"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Filter, MapPin } from "lucide-react"
import { EmployerFilterSheet } from "@/components/employer-filter-sheet"
import { JobseekerFilterSheet } from "@/components/jobseeker-filter-sheet"
import { Badge } from "@/components/ui/badge"

export default function FilterDemoPage() {
  const [activeTab, setActiveTab] = useState("employer")
  const [employerFilterOpen, setEmployerFilterOpen] = useState(false)
  const [jobseekerFilterOpen, setJobseekerFilterOpen] = useState(false)

  const [employerFilters, setEmployerFilters] = useState<any>({
    location: [],
    gender: "",
    specialties: [],
    ageRange: [18, 45],
    experience: "",
    education: [],
  })

  const [jobseekerFilters, setJobseekerFilters] = useState<any>({
    location: [],
    jobTypes: [],
    salaryRange: [0, 50],
    employmentType: "",
    benefits: [],
  })

  // 处理招聘方筛选
  const handleEmployerFilters = (filters: any) => {
    setEmployerFilters(filters)
    console.log("应用招聘方筛选:", filters)
  }

  // 处理求职者筛选
  const handleJobseekerFilters = (filters: any) => {
    setJobseekerFilters(filters)
    console.log("应用求职者筛选:", filters)
  }

  // 格式化薪资显示
  const formatSalary = (value: number) => {
    if (value === 0) return "不限"
    if (value >= 50) return "50K+"
    return `${value}K`
  }

  // 清除单个筛选条件 (招聘方)
  const clearEmployerFilter = (type: string, value?: string) => {
    if (type === "location" && value) {
      setEmployerFilters({
        ...employerFilters,
        location: employerFilters.location.filter((item: string) => item !== value),
      })
    } else if (type === "gender") {
      setEmployerFilters({
        ...employerFilters,
        gender: "",
      })
    } else if (type === "specialties" && value) {
      setEmployerFilters({
        ...employerFilters,
        specialties: employerFilters.specialties.filter((item: string) => item !== value),
      })
    } else if (type === "ageRange") {
      setEmployerFilters({
        ...employerFilters,
        ageRange: [18, 45],
      })
    } else if (type === "experience") {
      setEmployerFilters({
        ...employerFilters,
        experience: "",
      })
    } else if (type === "education" && value) {
      setEmployerFilters({
        ...employerFilters,
        education: employerFilters.education.filter((item: string) => item !== value),
      })
    }
  }

  // 清除单个筛选条件 (求职者)
  const clearJobseekerFilter = (type: string, value?: string) => {
    if (type === "location" && value) {
      setJobseekerFilters({
        ...jobseekerFilters,
        location: jobseekerFilters.location.filter((item: string) => item !== value),
      })
    } else if (type === "jobTypes" && value) {
      setJobseekerFilters({
        ...jobseekerFilters,
        jobTypes: jobseekerFilters.jobTypes.filter((item: string) => item !== value),
      })
    } else if (type === "salaryRange") {
      setJobseekerFilters({
        ...jobseekerFilters,
        salaryRange: [0, 50],
      })
    } else if (type === "employmentType") {
      setJobseekerFilters({
        ...jobseekerFilters,
        employmentType: "",
      })
    } else if (type === "benefits" && value) {
      setJobseekerFilters({
        ...jobseekerFilters,
        benefits: jobseekerFilters.benefits.filter((item: string) => item !== value),
      })
    }
  }

  // 检查是否有活跃的筛选条件 (招聘方)
  const hasActiveEmployerFilters = () => {
    return (
      employerFilters.location.length > 0 ||
      employerFilters.gender !== "" ||
      employerFilters.specialties.length > 0 ||
      employerFilters.ageRange[0] !== 18 ||
      employerFilters.ageRange[1] !== 45 ||
      employerFilters.experience !== "" ||
      employerFilters.education.length > 0
    )
  }

  // 检查是否有活跃的筛选条件 (求职者)
  const hasActiveJobseekerFilters = () => {
    return (
      jobseekerFilters.location.length > 0 ||
      jobseekerFilters.jobTypes.length > 0 ||
      jobseekerFilters.salaryRange[0] !== 0 ||
      jobseekerFilters.salaryRange[1] !== 50 ||
      jobseekerFilters.employmentType !== "" ||
      jobseekerFilters.benefits.length > 0
    )
  }

  // 获取工作性质显示文本
  const getEmploymentTypeText = (type: string) => {
    switch (type) {
      case "full-time":
        return "全职"
      case "part-time":
        return "兼职"
      case "temporary":
        return "临时"
      case "contract":
        return "合同制"
      default:
        return ""
    }
  }

  // 获取经验要求显示文本
  const getExperienceText = (exp: string) => {
    switch (exp) {
      case "0-1":
        return "应届/1年以内"
      case "1-3":
        return "1-3年"
      case "3-5":
        return "3-5年"
      case "5+":
        return "5年以上"
      default:
        return ""
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold">筛选演示</h1>
          </div>
        </div>
      </header>

      <main className="px-4 py-4 pb-24">
        {/* 切换标签 */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4">
          <TabsList className="grid w-full grid-cols-2 bg-white rounded-xl shadow-sm">
            <TabsTrigger value="employer" className="rounded-xl">
              招聘方筛选
            </TabsTrigger>
            <TabsTrigger value="jobseeker" className="rounded-xl">
              求职者筛选
            </TabsTrigger>
          </TabsList>

          {/* 招聘方筛选内容 */}
          <TabsContent value="employer" className="mt-0">
            {/* 筛选按钮 */}
            <div className="flex gap-2 mb-4">
              <Button
                variant="outline"
                className="flex-1 h-12 rounded-xl border-gray-200"
                onClick={() => setEmployerFilterOpen(true)}
              >
                <Filter className="h-4 w-4 mr-2" />
                筛选
                {hasActiveEmployerFilters() && (
                  <Badge className="ml-2 bg-green-500">
                    {employerFilters.location.length +
                      (employerFilters.gender ? 1 : 0) +
                      employerFilters.specialties.length +
                      (employerFilters.ageRange[0] !== 18 || employerFilters.ageRange[1] !== 45 ? 1 : 0) +
                      (employerFilters.experience ? 1 : 0) +
                      employerFilters.education.length}
                  </Badge>
                )}
              </Button>
              <Button variant="outline" className="flex-1 h-12 rounded-xl border-gray-200">
                <MapPin className="h-4 w-4 mr-2" />
                位置
              </Button>
            </div>

            {hasActiveEmployerFilters() && (
              <Card className="rounded-xl mb-4">
                <CardContent className="p-4">
                  <h3 className="font-medium mb-3">已选条件</h3>
                  <div className="flex flex-wrap gap-2">
                    {employerFilters.location.map((city: string) => (
                      <Badge key={city} variant="secondary" className="rounded-full px-3 py-1">
                        {city}
                        <button className="ml-1 text-gray-500" onClick={() => clearEmployerFilter("location", city)}>
                          ×
                        </button>
                      </Badge>
                    ))}

                    {employerFilters.gender && (
                      <Badge variant="secondary" className="rounded-full px-3 py-1">
                        {employerFilters.gender === "male" ? "男" : "女"}
                        <button className="ml-1 text-gray-500" onClick={() => clearEmployerFilter("gender")}>
                          ×
                        </button>
                      </Badge>
                    )}

                    {employerFilters.specialties.map((specialty: string) => (
                      <Badge key={specialty} variant="secondary" className="rounded-full px-3 py-1">
                        {specialty}
                        <button
                          className="ml-1 text-gray-500"
                          onClick={() => clearEmployerFilter("specialties", specialty)}
                        >
                          ×
                        </button>
                      </Badge>
                    ))}

                    {(employerFilters.ageRange[0] !== 18 || employerFilters.ageRange[1] !== 45) && (
                      <Badge variant="secondary" className="rounded-full px-3 py-1">
                        {employerFilters.ageRange[0]}-{employerFilters.ageRange[1]}岁
                        <button className="ml-1 text-gray-500" onClick={() => clearEmployerFilter("ageRange")}>
                          ×
                        </button>
                      </Badge>
                    )}

                    {employerFilters.experience && (
                      <Badge variant="secondary" className="rounded-full px-3 py-1">
                        {getExperienceText(employerFilters.experience)}
                        <button className="ml-1 text-gray-500" onClick={() => clearEmployerFilter("experience")}>
                          ×
                        </button>
                      </Badge>
                    )}

                    {employerFilters.education.map((edu: string) => (
                      <Badge key={edu} variant="secondary" className="rounded-full px-3 py-1">
                        {edu}
                        <button className="ml-1 text-gray-500" onClick={() => clearEmployerFilter("education", edu)}>
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="text-center py-10 text-gray-500">点击上方"筛选"按钮打开招聘方筛选面板</div>
          </TabsContent>

          {/* 求职者筛选内容 */}
          <TabsContent value="jobseeker" className="mt-0">
            {/* 筛选按钮 */}
            <div className="flex gap-2 mb-4">
              <Button
                variant="outline"
                className="flex-1 h-12 rounded-xl border-gray-200"
                onClick={() => setJobseekerFilterOpen(true)}
              >
                <Filter className="h-4 w-4 mr-2" />
                筛选
                {hasActiveJobseekerFilters() && (
                  <Badge className="ml-2 bg-green-500">
                    {jobseekerFilters.location.length +
                      jobseekerFilters.jobTypes.length +
                      (jobseekerFilters.salaryRange[0] !== 0 || jobseekerFilters.salaryRange[1] !== 50 ? 1 : 0) +
                      (jobseekerFilters.employmentType ? 1 : 0) +
                      jobseekerFilters.benefits.length}
                  </Badge>
                )}
              </Button>
              <Button variant="outline" className="flex-1 h-12 rounded-xl border-gray-200">
                <MapPin className="h-4 w-4 mr-2" />
                位置
              </Button>
            </div>

            {hasActiveJobseekerFilters() && (
              <Card className="rounded-xl mb-4">
                <CardContent className="p-4">
                  <h3 className="font-medium mb-3">已选条件</h3>
                  <div className="flex flex-wrap gap-2">
                    {jobseekerFilters.location.map((city: string) => (
                      <Badge key={city} variant="secondary" className="rounded-full px-3 py-1">
                        {city}
                        <button className="ml-1 text-gray-500" onClick={() => clearJobseekerFilter("location", city)}>
                          ×
                        </button>
                      </Badge>
                    ))}

                    {jobseekerFilters.jobTypes.map((type: string) => (
                      <Badge key={type} variant="secondary" className="rounded-full px-3 py-1">
                        {type}
                        <button className="ml-1 text-gray-500" onClick={() => clearJobseekerFilter("jobTypes", type)}>
                          ×
                        </button>
                      </Badge>
                    ))}

                    {(jobseekerFilters.salaryRange[0] !== 0 || jobseekerFilters.salaryRange[1] !== 50) && (
                      <Badge variant="secondary" className="rounded-full px-3 py-1">
                        {formatSalary(jobseekerFilters.salaryRange[0])}-{formatSalary(jobseekerFilters.salaryRange[1])}
                        <button className="ml-1 text-gray-500" onClick={() => clearJobseekerFilter("salaryRange")}>
                          ×
                        </button>
                      </Badge>
                    )}

                    {jobseekerFilters.employmentType && (
                      <Badge variant="secondary" className="rounded-full px-3 py-1">
                        {getEmploymentTypeText(jobseekerFilters.employmentType)}
                        <button className="ml-1 text-gray-500" onClick={() => clearJobseekerFilter("employmentType")}>
                          ×
                        </button>
                      </Badge>
                    )}

                    {jobseekerFilters.benefits.map((benefit: string) => (
                      <Badge key={benefit} variant="secondary" className="rounded-full px-3 py-1">
                        {benefit}
                        <button
                          className="ml-1 text-gray-500"
                          onClick={() => clearJobseekerFilter("benefits", benefit)}
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="text-center py-10 text-gray-500">点击上方"筛选"按钮打开求职者筛选面板</div>
          </TabsContent>
        </Tabs>

        {/* 筛选弹出面板 */}
        <EmployerFilterSheet
          open={employerFilterOpen}
          onOpenChange={setEmployerFilterOpen}
          onApplyFilters={handleEmployerFilters}
        />

        <JobseekerFilterSheet
          open={jobseekerFilterOpen}
          onOpenChange={setJobseekerFilterOpen}
          onApplyFilters={handleJobseekerFilters}
        />
      </main>

      {/* 筛选弹出面板 */}
      <EmployerFilterSheet
        open={employerFilterOpen}
        onOpenChange={setEmployerFilterOpen}
        onApplyFilters={handleEmployerFilters}
      />

      <JobseekerFilterSheet
        open={jobseekerFilterOpen}
        onOpenChange={setJobseekerFilterOpen}
        onApplyFilters={handleJobseekerFilters}
      />
    </div>
  )
}
