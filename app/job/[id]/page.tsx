import {
  ArrowLeft,
  MapPin,
  Building,
  Users,
  Clock,
  Heart,
  Star,
  MessageCircle,
  Share2,
  Calendar,
  Music,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

export async function generateStaticParams() {
  // 为静态导出生成职位ID参数
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
  ]
}

export default function JobDetailPage() {
  const job = {
    id: 1,
    title: "民族舞演员",
    company: "东方歌舞团",
    salary: "8K-15K",
    location: "北京市海淀区",
    experience: "3-5年",
    education: "舞蹈相关专业",
    type: "全职",
    performanceType: "民族舞",
    startTime: "立即到岗",
    workSchedule: {
      workDays: "周一至周六",
      workHours: "9:00-18:00",
      rehearsalTime: "19:00-21:00",
      overtime: "演出期间需要",
      restDay: "周日",
      flexibleSchedule: true
    },
    requirements: ["民族舞", "3年经验", "形象佳", "身高165cm以上", "有团队合作经验"],
    benefits: ["五险一金", "演出补贴", "舞台机会多", "国内外巡演", "专业培训"],
    description: `我们正在寻找有经验的民族舞演员加入我们的团队。您将参与团队的常规演出和国内外巡演活动。

职责包括：
• 参与团队日常排练
• 出演各类民族舞蹈节目
• 参与国内外巡演和文艺演出
• 配合编导完成新节目的创作
• 参与团队宣传活动

工作时间安排：
• 工作日：周一至周六 9:00-18:00
• 晚间排练：19:00-21:00（根据演出安排）
• 休息日：周日（演出期间可能调整）
• 演出期间：根据演出时间安排，可能包含晚间和周末
• 巡演期间：根据行程安排，时间相对灵活

要求：
• 3年以上专业民族舞表演经验
• 舞蹈相关专业毕业
• 形象气质佳，身高165cm以上
• 有较强的舞台表现力和团队合作精神
• 能适应巡演生活和灵活的工作时间安排`,
    companyInfo: {
      name: "东方歌舞团",
      industry: "表演艺术",
      size: "50-100人",
      founded: "1995年",
      description: "东方歌舞团是一家专业的表演艺术团体，致力于中国传统舞蹈的传承与创新，常年在国内外进行巡演活动。",
      address: "北京市海淀区文化艺术中心",
      website: "www.dongfangdance.com",
    },
    upcomingProjects: [
      {
        name: "《锦绣中华》民族舞蹈专场",
        date: "2024-06-15",
        location: "北京国家大剧院",
      },
      {
        name: "亚洲文化艺术节巡演",
        date: "2024-07-20",
        location: "多个亚洲国家",
      },
    ],
    images: [
      "/placeholder.svg?height=200&width=300",
      "/placeholder.svg?height=200&width=300",
      "/placeholder.svg?height=200&width=300",
      "/placeholder.svg?height=200&width=300",
    ],
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Button variant="ghost" size="sm" asChild className="mr-4">
              <Link href="/">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <h1 className="text-xl font-semibold">职位详情</h1>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Info */}
            <Card className="rounded-xl">
              <CardHeader>
                <CardTitle className="text-2xl">{job.title}</CardTitle>
                <div className="flex items-center space-x-4 text-gray-600">
                  <div className="flex items-center">
                    <Building className="h-4 w-4 mr-1" />
                    <span>{job.company}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{job.location}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
                  <div>
                    <p className="text-sm text-gray-500">薪资</p>
                    <p className="text-2xl font-bold text-red-500">{job.salary}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">经验</p>
                    <p className="font-medium">{job.experience}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">学历</p>
                    <p className="font-medium">{job.education}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">类型</p>
                    <p className="font-medium">{job.performanceType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">到岗时间</p>
                    <p className="font-medium">{job.startTime}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">工作时间</p>
                    <p className="font-medium">{job.workSchedule.workHours}</p>
                  </div>
                </div>

                {/* 工作时间详情 */}
                {/* <div className="bg-blue-50 rounded-xl p-4 mb-6">
                  <h4 className="font-medium mb-3 flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-blue-600" />
                    工作时间安排
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">工作日：</span>
                      <span className="font-medium">{job.workSchedule.workDays}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">工作时间：</span>
                      <span className="font-medium">{job.workSchedule.workHours}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">排练时间：</span>
                      <span className="font-medium">{job.workSchedule.rehearsalTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">休息日：</span>
                      <span className="font-medium">{job.workSchedule.restDay}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">加班安排：</span>
                      <span className="font-medium">{job.workSchedule.overtime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">时间灵活性：</span>
                      <span className="font-medium">{job.workSchedule.flexibleSchedule ? "较灵活" : "固定时间"}</span>
                    </div>
                  </div>
                </div> */}

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">演员要求</h4>
                    <div className="flex flex-wrap gap-2">
                      {job.requirements.map((req, index) => (
                        <Badge key={index} variant="secondary">
                          {req}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">福利待遇</h4>
                    <div className="flex flex-wrap gap-2">
                      {job.benefits.map((benefit, index) => (
                        <Badge key={index} variant="outline">
                          {benefit}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Job Description */}
            <Card className="rounded-xl">
              <CardHeader>
                <CardTitle>职位描述</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none">
                  <pre className="whitespace-pre-wrap font-sans text-gray-700 leading-relaxed">{job.description}</pre>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Performances */}
            <Card className="rounded-xl">
              <CardHeader>
                <CardTitle>即将项目</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {job.upcomingProjects.map((performance, index) => (
                    <div key={index} className="flex items-start space-x-4 p-3 border rounded-xl">
                      <div className="bg-green-100 p-3 rounded-full">
                        <Music className="h-5 w-5 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{performance.name}</h4>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>{performance.date}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>{performance.location}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

  <Card className="rounded-xl">
              <CardHeader>
                <CardTitle>工作环境照片</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {job.images.map((image, index) => (
                    <div key={index} className="aspect-video bg-gray-200 rounded-xl overflow-hidden">
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`团队风采 ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            {/* Company Images */}
            <Card className="rounded-xl">
              <CardHeader>
                <CardTitle>团队风采</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {job.images.map((image, index) => (
                    <div key={index} className="aspect-video bg-gray-200 rounded-xl overflow-hidden">
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`团队风采 ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Company Info */}
            <Card className="rounded-xl">
              <CardHeader>
                <CardTitle>团队信息</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">行业</p>
                      <p className="font-medium">{job.companyInfo.industry}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">规模</p>
                      <p className="font-medium">{job.companyInfo.size}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">成立时间</p>
                      <p className="font-medium">{job.companyInfo.founded}</p>
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="font-medium mb-2">团队简介</h4>
                    <p className="text-gray-700">{job.companyInfo.description}</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">团队地址</h4>
                    <p className="text-gray-700">{job.companyInfo.address}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Apply */}
            <Card className="rounded-xl">
              <CardHeader>
                <CardTitle>快速申请</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full h-12" size="lg">
                  立即申请
                </Button>
                <p className="text-xs text-gray-500 text-center">申请后团队将在24小时内联系您</p>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card className="rounded-xl">
              <CardHeader>
                <CardTitle>其他操作</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full h-12">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  联系团队
                </Button>
                <Button variant="outline" className="w-full h-12">
                  <Heart className="h-4 w-4 mr-2" />
                  关注团队
                </Button>
                <Button variant="outline" className="w-full h-12">
                  <Star className="h-4 w-4 mr-2" />
                  收藏职位
                </Button>
                <Button variant="outline" className="w-full h-12">
                  <Share2 className="h-4 w-4 mr-2" />
                  分享职位
                </Button>
              </CardContent>
            </Card>

            {/* Company Quick Info */}
            <Card className="rounded-xl">
              <CardHeader>
                <CardTitle>团队信息</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 p-4">
                <div className="text-center space-y-3">
                  <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto">
                    <Building className="h-8 w-8 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">{job.companyInfo.name}</h4>
                    <p className="text-sm text-gray-600">{job.companyInfo.industry}</p>
                  </div>
                  <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      <span>{job.companyInfo.size}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{job.companyInfo.founded}</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    查看团队详情
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Similar Jobs */}
            <Card className="rounded-xl">
              <CardHeader>
                <CardTitle>相似职位</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-3">
                  <div className="p-3 border rounded-xl">
                    <h5 className="font-medium text-sm">古典舞演员</h5>
                    <p className="text-xs text-gray-600">某艺术团</p>
                    <p className="text-xs text-red-500 font-medium">10K-18K</p>
                  </div>
                  <div className="p-3 border rounded-xl">
                    <h5 className="font-medium text-sm">舞蹈教师</h5>
                    <p className="text-xs text-gray-600">艺术培训中心</p>
                    <p className="text-xs text-red-500 font-medium">8K-15K</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
