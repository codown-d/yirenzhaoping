"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Users, Tag, Briefcase, UserCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function CreatePostPage() {
  const router = useRouter()

  // 检查用户身份并智能跳转
  useEffect(() => {
    const userType = localStorage.getItem('userType')
    const searchParams = new URLSearchParams(window.location.search)
    const type = searchParams.get('type')

    // 如果URL中指定了类型，直接跳转
    if (type === 'jobseeker') {
      router.push('/post/jobseeker')
      return
    }
    if (type === 'employer') {
      router.push('/post/employer')
      return
    }

    // 如果用户已经设置了身份，智能跳转
    if (userType === 'jobseeker') {
      router.push('/post/jobseeker')
      return
    }
    if (userType === 'employer') {
      router.push('/post/employer')
      return
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center">
            <Button variant="ghost" size="sm" asChild className="mr-2">
              <Link href="/forum">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <h1 className="text-xl font-bold text-green-600">选择发布类型</h1>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto p-4 pb-20">
        <div className="space-y-6">
          {/* 说明文字 */}
          <div className="text-center py-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">您要发布什么信息？</h2>
            <p className="text-gray-600">请选择您要发布的信息类型，我们将为您提供专门的发布页面</p>
          </div>

          {/* 选择卡片 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 求职信息 */}
            <Card className="rounded-2xl hover:shadow-lg transition-shadow cursor-pointer group">
              <Link href="/post/jobseeker">
                <CardContent className="p-8 text-center">
                  <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                    <UserCheck className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">发布求职信息</h3>
                  <p className="text-gray-600 mb-4">展示您的专业技能和表演经验，寻找心仪的演出机会</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">个人简介</span>
                    <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">作品展示</span>
                    <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">求职意向</span>
                  </div>
                </CardContent>
              </Link>
            </Card>

            {/* 招聘信息 */}
            <Card className="rounded-2xl hover:shadow-lg transition-shadow cursor-pointer group">
              <Link href="/post/employer">
                <CardContent className="p-8 text-center">
                  <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                    <Briefcase className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">发布招聘信息</h3>
                  <p className="text-gray-600 mb-4">发布演出招聘需求，寻找合适的表演人才</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm">职位描述</span>
                    <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm">薪资待遇</span>
                    <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm">任职要求</span>
                  </div>
                </CardContent>
              </Link>
            </Card>
          </div>

          {/* 快速选择 */}
          <div className="bg-white rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">快速选择</h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                className="flex-1 h-12 rounded-xl bg-blue-500 hover:bg-blue-600"
              >
                <Link href="/post/jobseeker">
                  <UserCheck className="h-5 w-5 mr-2" />
                  我是求职者
                </Link>
              </Button>
              <Button
                asChild
                className="flex-1 h-12 rounded-xl bg-green-500 hover:bg-green-600"
              >
                <Link href="/post/employer">
                  <Briefcase className="h-5 w-5 mr-2" />
                  我是招聘方
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
