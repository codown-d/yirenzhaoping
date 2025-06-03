"use client"

import { 
  ArrowLeft, 
  Shield, 
  Lock, 
  Eye,
  Database,
  UserCheck,
  AlertTriangle,
  Clock
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

export default function PrivacyPage() {
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
              <Shield className="h-5 w-5 text-green-600" />
              <h1 className="text-lg font-semibold">隐私政策</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="px-4 py-6 max-w-4xl mx-auto">
        {/* 政策信息 */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Lock className="h-5 w-5 text-green-600" />
              <span>艺人招聘平台隐私保护政策</span>
            </CardTitle>
            <CardDescription className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>更新时间：2024年1月1日</span>
              </div>
              <div className="flex items-center space-x-1">
                <UserCheck className="h-4 w-4 text-green-600" />
                <span>版本：v2.1</span>
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-green-800 text-sm leading-relaxed">
                我们深知个人信息对您的重要性，并会尽全力保护您的个人信息安全可靠。
                我们致力于维持您对我们的信任，恪守以下原则，保护您的个人信息。
              </p>
            </div>
          </CardContent>
        </Card>

        {/* 政策内容 */}
        <div className="space-y-6">
          {/* 信息收集 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Database className="h-5 w-5 text-blue-600" />
                <span>我们收集的信息</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">1.1 您主动提供的信息</h4>
                  <ul className="text-gray-700 text-sm space-y-1 list-disc list-inside">
                    <li>注册信息：用户名、密码、手机号码、邮箱地址</li>
                    <li>个人资料：姓名、性别、年龄、学历、工作经验、技能特长</li>
                    <li>招聘信息：职位描述、薪资要求、工作地点、企业信息</li>
                    <li>联系信息：通讯地址、联系电话等</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">1.2 自动收集的信息</h4>
                  <ul className="text-gray-700 text-sm space-y-1 list-disc list-inside">
                    <li>设备信息：设备型号、操作系统、浏览器类型</li>
                    <li>日志信息：IP地址、访问时间、访问页面</li>
                    <li>使用数据：搜索记录、浏览行为、操作习惯</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 信息使用 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Eye className="h-5 w-5 text-purple-600" />
                <span>信息使用目的</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-medium">提供服务</h4>
                    <p className="text-gray-600 text-sm">为您提供求职招聘、简历管理、职位推荐等核心服务</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-medium">改善体验</h4>
                    <p className="text-gray-600 text-sm">分析用户行为，优化产品功能，提升用户体验</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-medium">安全保障</h4>
                    <p className="text-gray-600 text-sm">识别异常行为，防范安全风险，保护账户安全</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-medium">客服支持</h4>
                    <p className="text-gray-600 text-sm">处理用户咨询，解决技术问题，提供客户服务</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 信息共享 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">信息共享与披露</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start space-x-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-yellow-800 mb-2">重要提醒</h4>
                      <p className="text-yellow-700 text-sm">
                        我们不会向第三方出售、出租或交易您的个人信息。
                        仅在以下情况下，我们可能会共享您的信息：
                      </p>
                    </div>
                  </div>
                </div>
                <ul className="text-gray-700 text-sm space-y-2 list-disc list-inside">
                  <li>获得您的明确同意</li>
                  <li>为提供服务所必需（如向招聘方展示求职者信息）</li>
                  <li>法律法规要求或政府部门要求</li>
                  <li>为保护用户或公众的安全、财产或权利</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* 信息保护 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-green-600" />
                <span>信息安全保护</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="font-medium">技术保护措施</h4>
                  <ul className="text-gray-700 text-sm space-y-1 list-disc list-inside">
                    <li>数据加密传输</li>
                    <li>访问权限控制</li>
                    <li>安全审计监控</li>
                    <li>定期安全评估</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-medium">管理保护措施</h4>
                  <ul className="text-gray-700 text-sm space-y-1 list-disc list-inside">
                    <li>员工保密协议</li>
                    <li>数据访问审批</li>
                    <li>安全培训教育</li>
                    <li>应急响应机制</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 用户权利 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">您的权利</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-1">访问权</h4>
                  <p className="text-blue-700 text-sm">您有权了解我们收集、使用您个人信息的情况</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <h4 className="font-medium text-green-800 mb-1">更正权</h4>
                  <p className="text-green-700 text-sm">您有权要求我们更正或补充您的个人信息</p>
                </div>
                <div className="p-3 bg-orange-50 rounded-lg">
                  <h4 className="font-medium text-orange-800 mb-1">删除权</h4>
                  <p className="text-orange-700 text-sm">在特定情况下，您有权要求我们删除您的个人信息</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <h4 className="font-medium text-purple-800 mb-1">撤回同意权</h4>
                  <p className="text-purple-700 text-sm">您有权撤回对个人信息处理的同意</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 联系方式 */}
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="text-lg text-blue-800">联系我们</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-blue-700">
                <p>如您对本隐私政策有任何疑问或需要行使相关权利，请联系我们：</p>
                <p>隐私保护专员邮箱：privacy@yirenzhaoping.com</p>
                <p>客服电话：400-888-9999</p>
                <p>通讯地址：北京市朝阳区xxx大厦xxx室</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 相关链接 */}
        <div className="mt-8 flex justify-center space-x-4">
          <Button variant="outline" asChild>
            <Link href="/terms">用户协议</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/violations">违规公示</Link>
          </Button>
        </div>
      </main>
    </div>
  )
}
