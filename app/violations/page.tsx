"use client"

import { useState } from "react"
import { 
  ArrowLeft, 
  AlertTriangle, 
  Shield, 
  Calendar, 
  User, 
  FileText,
  Search,
  Filter,
  Eye
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

export default function ViolationsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")

  // 模拟违规数据
  const violations = [
    {
      id: "V2024001",
      userId: "user123",
      userName: "张某某",
      userType: "求职者",
      violationType: "虚假信息",
      description: "在个人简历中提供虚假学历信息",
      reportDate: "2024-03-15",
      status: "已处理",
      penalty: "账号警告，限制发布功能7天",
      severity: "中等",
      evidenceCount: 3
    },
    {
      id: "V2024002",
      userId: "emp456",
      userName: "某某公司",
      userType: "招聘方",
      violationType: "虚假招聘",
      description: "发布虚假职位信息，收取求职者费用",
      reportDate: "2024-03-12",
      status: "已处理",
      penalty: "账号封禁30天，退还相关费用",
      severity: "严重",
      evidenceCount: 8
    },
    {
      id: "V2024003",
      userId: "user789",
      userName: "李某某",
      userType: "求职者",
      violationType: "恶意骚扰",
      description: "多次向招聘方发送不当信息",
      reportDate: "2024-03-10",
      status: "处理中",
      penalty: "调查中",
      severity: "轻微",
      evidenceCount: 2
    },
    {
      id: "V2024004",
      userId: "emp101",
      userName: "某某传媒",
      userType: "招聘方",
      violationType: "歧视性招聘",
      description: "在招聘信息中包含性别、年龄歧视内容",
      reportDate: "2024-03-08",
      status: "已处理",
      penalty: "删除违规信息，账号警告",
      severity: "中等",
      evidenceCount: 1
    }
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "严重": return "bg-red-100 text-red-800"
      case "中等": return "bg-yellow-100 text-yellow-800"
      case "轻微": return "bg-blue-100 text-blue-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "已处理": return "bg-green-100 text-green-800"
      case "处理中": return "bg-orange-100 text-orange-800"
      case "待处理": return "bg-gray-100 text-gray-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const filteredViolations = violations.filter(violation => {
    const matchesSearch = violation.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         violation.violationType.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterType === "all" || violation.userType === filterType
    return matchesSearch && matchesFilter
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-4 py-3">
          <div className="flex items-center">
            <Button variant="ghost" size="sm" asChild className="mr-3 p-2">
              <Link href="/">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <h1 className="text-lg font-semibold">违规公示</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="px-4 py-6">
        {/* 公示说明 */}
        <Card className="mb-6 border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-orange-800">
              <Shield className="h-5 w-5" />
              <span>违规公示说明</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="text-orange-700">
            <p className="text-sm leading-relaxed">
              为维护平台秩序，保护用户权益，现将违反平台规定的账号及违规行为进行公示。
              公示内容包括违规类型、处理结果等信息。我们将持续加强平台治理，
              为用户提供安全、可信的求职招聘环境。
            </p>
          </CardContent>
        </Card>

        {/* 搜索和筛选 */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="搜索用户名或违规类型..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-full md:w-40">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="筛选类型" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部</SelectItem>
                  <SelectItem value="求职者">求职者</SelectItem>
                  <SelectItem value="招聘方">招聘方</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* 违规列表 */}
        <div className="space-y-4">
          {filteredViolations.map((violation) => (
            <Card key={violation.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <CardTitle className="text-base">{violation.userName}</CardTitle>
                      <Badge variant="outline">{violation.userType}</Badge>
                      <Badge className={getSeverityColor(violation.severity)}>
                        {violation.severity}
                      </Badge>
                    </div>
                    <CardDescription>违规编号: {violation.id}</CardDescription>
                  </div>
                  <Badge className={getStatusColor(violation.status)}>
                    {violation.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-sm text-red-600 mb-1">违规类型</h4>
                    <p className="text-sm">{violation.violationType}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-sm text-gray-700 mb-1">违规描述</h4>
                    <p className="text-sm text-gray-600">{violation.description}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-sm text-gray-700 mb-1">处理结果</h4>
                    <p className="text-sm text-gray-600">{violation.penalty}</p>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>举报时间: {violation.reportDate}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <FileText className="h-3 w-3" />
                        <span>证据: {violation.evidenceCount}项</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                      <Eye className="h-3 w-3 mr-1" />
                      详情
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredViolations.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <AlertTriangle className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">暂无违规记录</h3>
              <p className="text-gray-500">没有找到符合条件的违规记录</p>
            </CardContent>
          </Card>
        )}

        {/* 举报入口 */}
        <Card className="mt-6 border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-blue-800">发现违规行为？</h3>
                <p className="text-sm text-blue-600">请及时举报，共同维护平台秩序</p>
              </div>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                <AlertTriangle className="h-4 w-4 mr-2" />
                我要举报
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 统计信息 */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>本月共处理违规案例 {violations.filter(v => v.status === "已处理").length} 起</p>
          <p className="mt-1">平台致力于为用户提供安全、诚信的求职招聘环境</p>
        </div>
      </main>
    </div>
  )
}
