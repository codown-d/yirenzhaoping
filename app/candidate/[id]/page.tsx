import { ArrowLeft, MapPin, Phone, Mail, Heart, Star, MessageCircle, Share2, Music, Award, GraduationCap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

export async function generateStaticParams() {
  // 为静态导出生成候选人ID参数
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
  ]
}

export default function CandidateDetailPage() {
  const candidate = {
    id: 1,
    name: "李小华",
    age: 24,
    gender: "女",
    major: "古典舞",
    location: "北京市朝阳区",
    school: "北京舞蹈学院",
    avatar: "/placeholder.svg?height=120&width=120",
    skills: ["古典舞", "民族舞", "芭蕾基础", "现代舞"],
    phone: "138****8888",
    email: "lixiaohua@example.com",
    introduction:
      "我是一名专业的古典舞演员，毕业于北京舞蹈学院。有5年的舞台表演经验，擅长古典舞、民族舞，并具备芭蕾舞基础。曾参与多个大型舞蹈演出，希望能加入专业团队，展示自己的舞蹈才华。",
    experience: [
      {
        company: "东方歌舞团",
        position: "舞蹈演员",
        duration: "2021.06 - 2024.03",
        description: "参与团队的国内外巡演，主要表演民族舞和古典舞节目",
      },
      {
        company: "星光艺术团",
        position: "舞蹈演员",
        duration: "2019.08 - 2021.05",
        description: "参与各类商业演出和文艺晚会",
      },
    ],
    education: [
      {
        school: "北京舞蹈学院",
        major: "中国古典舞表演",
        degree: "学士学位",
        duration: "2015.09 - 2019.06",
        gpa: "3.8/4.0",
        honors: ["优秀毕业生", "专业第一名"],
      },
      {
        school: "北京舞蹈学院附中",
        major: "中国古典舞",
        degree: "中专",
        duration: "2012.09 - 2015.06",
        gpa: "优秀",
        honors: ["三好学生"],
      },
    ],
    awards: ["全国舞蹈比赛金奖", "亚洲青年舞蹈家大赛银奖"],
    performances: ["《丝路花雨》主要舞者", "《梁祝》独舞", "《春江花月夜》群舞"],
    videos: [
      {
        title: "古典舞《洛神赋》片段",
        thumbnail: "/placeholder.svg?height=200&width=300",
        url: "#",
      },
      {
        title: "民族舞《茉莉花》",
        thumbnail: "/placeholder.svg?height=200&width=300",
        url: "#",
      },
    ],
    images: {
      stage: [
        {
          url: "/placeholder.svg?height=300&width=400",
          title: "《洛神赋》舞台表演",
          description: "2023年国家大剧院演出",
        },
        {
          url: "/placeholder.svg?height=300&width=400",
          title: "民族舞《茉莉花》",
          description: "亚洲文化节表演",
        },
        {
          url: "/placeholder.svg?height=300&width=400",
          title: "古典舞独舞",
          description: "个人代表作品",
        },
      ],
      training: [
        {
          url: "/placeholder.svg?height=300&width=400",
          title: "日常训练",
          description: "基本功练习",
        },
        {
          url: "/placeholder.svg?height=300&width=400",
          title: "排练现场",
          description: "新剧目排练",
        },
      ],
      awards: [
        {
          url: "/placeholder.svg?height=300&width=400",
          title: "全国舞蹈比赛颁奖",
          description: "获得金奖",
        },
        {
          url: "/placeholder.svg?height=300&width=400",
          title: "亚洲青年舞蹈家大赛",
          description: "银奖获得者",
        },
      ],
    },
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
            <h1 className="text-xl font-semibold">求职者详情</h1>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-4">
            {/* Basic Info */}
            <Card className="rounded-xl">
              <CardHeader>
                <div className="flex items-start space-x-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={candidate.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="text-2xl">{candidate.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <CardTitle className="text-2xl">{candidate.name}</CardTitle>
                    <p className="text-gray-600 mt-1">
                      {candidate.age}岁 · {candidate.gender}
                    </p>
                    <p className="text-lg font-medium mt-2">{candidate.major}</p>
                    <div className="flex items-center text-gray-500 mt-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{candidate.location}</span>
                    </div>
                    <div className="flex items-center text-gray-500 mt-1">
                      <GraduationCap className="h-4 w-4 mr-1" />
                      <span>{candidate.school}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">专业技能</h4>
                    <div className="flex flex-wrap gap-2">
                      {candidate.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="font-medium mb-2">自我介绍</h4>
                    <p className="text-gray-700 leading-relaxed">{candidate.introduction}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Videos */}
            <Card className="rounded-xl">
              <CardHeader>
                <CardTitle>表演视频</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {candidate.videos.map((video, index) => (
                    <div key={index} className="space-y-2">
                      <div className="aspect-video bg-gray-200 rounded-xl overflow-hidden relative">
                        <img
                          src={video.thumbnail || "/placeholder.svg"}
                          alt={video.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="bg-black bg-opacity-50 rounded-full p-3">
                            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <p className="font-medium text-sm">{video.title}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Stage Photos */}
            <Card className="rounded-xl">
              <CardHeader>
                <CardTitle>舞台风采</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {candidate.images.stage.map((image, index) => (
                    <div key={index} className="space-y-2">
                      <div className="aspect-[4/3] bg-gray-200 rounded-xl overflow-hidden">
                        <img
                          src={image.url || "/placeholder.svg"}
                          alt={image.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div>
                        <h5 className="font-medium text-sm">{image.title}</h5>
                        <p className="text-xs text-gray-500">{image.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Training Photos */}
            <Card className="rounded-xl">
              <CardHeader>
                <CardTitle>训练日常</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {candidate.images.training.map((image, index) => (
                    <div key={index} className="space-y-2">
                      <div className="aspect-[4/3] bg-gray-200 rounded-xl overflow-hidden">
                        <img
                          src={image.url || "/placeholder.svg"}
                          alt={image.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div>
                        <h5 className="font-medium text-sm">{image.title}</h5>
                        <p className="text-xs text-gray-500">{image.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Award Photos */}
            <Card className="rounded-xl">
              <CardHeader>
                <CardTitle>获奖时刻</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {candidate.images.awards.map((image, index) => (
                    <div key={index} className="space-y-2">
                      <div className="aspect-[4/3] bg-gray-200 rounded-xl overflow-hidden">
                        <img
                          src={image.url || "/placeholder.svg"}
                          alt={image.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div>
                        <h5 className="font-medium text-sm">{image.title}</h5>
                        <p className="text-xs text-gray-500">{image.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Performances */}
            <Card className="rounded-xl">
              <CardHeader>
                <CardTitle>代表作品</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {candidate.performances.map((performance, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="bg-green-100 p-2 rounded-full">
                        <Music className="h-5 w-5 text-green-600" />
                      </div>
                      <span>{performance}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Awards */}
            <Card className="rounded-xl">
              <CardHeader>
                <CardTitle>获奖经历</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {candidate.awards.map((award, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="bg-yellow-100 p-2 rounded-full">
                        <Award className="h-5 w-5 text-yellow-600" />
                      </div>
                      <span>{award}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Experience */}
            <Card className="rounded-xl">
              <CardHeader>
                <CardTitle>表演经历</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {candidate.experience.map((exp, index) => (
                    <div key={index} className="border-l-2 border-green-200 pl-4">
                      <h4 className="font-medium">{exp.position}</h4>
                      <p className="text-gray-600">{exp.company}</p>
                      <p className="text-sm text-gray-500">{exp.duration}</p>
                      <p className="text-gray-700 mt-2">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Education */}
            <Card className="rounded-xl">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <GraduationCap className="h-5 w-5 mr-2" />
                  教育背景
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {candidate.education.map((edu, index) => (
                    <div key={index} className="border-l-4 border-blue-200 pl-4 bg-blue-50/50 rounded-r-lg py-3">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-lg">{edu.school}</h4>
                        <Badge variant="secondary" className="text-xs">
                          {edu.degree}
                        </Badge>
                      </div>
                      <p className="text-gray-700 font-medium mb-1">{edu.major}</p>
                      <p className="text-sm text-gray-500 mb-2">{edu.duration}</p>

                      {/* GPA信息 */}
                      {edu.gpa && (
                        <div className="flex items-center mb-2">
                          <span className="text-sm text-gray-600 mr-2">GPA:</span>
                          <Badge variant="outline" className="text-xs">
                            {edu.gpa}
                          </Badge>
                        </div>
                      )}

                      {/* 荣誉信息 */}
                      {edu.honors && edu.honors.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {edu.honors.map((honor, honorIndex) => (
                            <Badge key={honorIndex} className="text-xs bg-yellow-100 text-yellow-800">
                              {honor}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Contact Info */}
            <Card className="rounded-xl">
              <CardHeader>
                <CardTitle>联系方式</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{candidate.phone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{candidate.email}</span>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card className="rounded-xl">
              <CardHeader>
                <CardTitle>操作</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full h-12">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  联系
                </Button>
                <Button variant="outline" className="w-full h-12">
                  <Heart className="h-4 w-4 mr-2" />
                  关注
                </Button>
                <Button variant="outline" className="w-full h-12">
                  <Star className="h-4 w-4 mr-2" />
                  收藏
                </Button>
                <Button variant="outline" className="w-full h-12">
                  <Share2 className="h-4 w-4 mr-2" />
                  分享
                </Button>
              </CardContent>
            </Card>

            {/* School Info */}
            <Card className="rounded-xl">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <GraduationCap className="h-5 w-5 mr-2" />
                  毕业院校
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* 主要院校信息 */}
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      <GraduationCap className="h-8 w-8 text-white" />
                    </div>
                    <h4 className="font-semibold text-lg">{candidate.school}</h4>
                    <p className="text-sm text-gray-600 mt-1">国内顶尖舞蹈学府</p>
                  </div>

                  {/* 详细教育信息 */}
                  <div className="space-y-3 pt-3 border-t">
                    {candidate.education.map((edu, index) => (
                      <div key={index} className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-3 border border-blue-100">
                        <div className="space-y-2">
                          <div className="flex items-start justify-between">
                            <h5 className="font-semibold text-sm text-gray-800">{edu.school}</h5>
                            <Badge variant="secondary" className="text-xs">
                              {edu.degree}
                            </Badge>
                          </div>
                          <p className="text-xs text-gray-700 font-medium">{edu.major}</p>
                          <p className="text-xs text-gray-500">{edu.duration}</p>

                          {/* GPA */}
                          {edu.gpa && (
                            <div className="flex items-center">
                              <span className="text-xs text-gray-600 mr-1">GPA:</span>
                              <Badge variant="outline" className="text-xs px-1 py-0">
                                {edu.gpa}
                              </Badge>
                            </div>
                          )}

                          {/* 荣誉 */}
                          {edu.honors && edu.honors.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {edu.honors.slice(0, 2).map((honor, honorIndex) => (
                                <Badge key={honorIndex} className="text-xs bg-yellow-100 text-yellow-700 px-1 py-0">
                                  {honor}
                                </Badge>
                              ))}
                              {edu.honors.length > 2 && (
                                <span className="text-xs text-gray-500">+{edu.honors.length - 2}</span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* 院校特色标签 */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    <Badge variant="outline" className="text-xs">
                      985院校
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      艺术类重点
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      国家级
                    </Badge>
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
