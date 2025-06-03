"use client"

import { 
  ArrowLeft, 
  FileText, 
  Shield, 
  AlertCircle,
  CheckCircle,
  Clock
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

export default function TermsPage() {
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
              <FileText className="h-5 w-5 text-blue-600" />
              <h1 className="text-lg font-semibold">用户协议</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="px-4 py-6 max-w-4xl mx-auto">
        {/* 协议信息 */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-green-600" />
              <span>艺人招聘平台用户服务协议</span>
            </CardTitle>
            <CardDescription className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>生效时间：2024年1月1日</span>
              </div>
              <div className="flex items-center space-x-1">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>最新版本：v2.1</span>
              </div>
            </CardDescription>
          </CardHeader>
        </Card>

        {/* 协议内容 */}
        <div className="space-y-6">
          {/* 第一条 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">第一条 协议的接受</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none">
              <p className="text-gray-700 leading-relaxed">
                欢迎使用艺人招聘平台（以下简称"本平台"）。本协议是您与本平台之间关于使用本平台服务的法律协议。
                当您注册成为本平台用户或使用本平台服务时，即表示您已阅读、理解并同意接受本协议的全部条款。
              </p>
              <p className="text-gray-700 leading-relaxed mt-3">
                如果您不同意本协议的任何条款，请不要使用本平台服务。本平台有权根据需要修改本协议，
                修改后的协议将在本平台公布，您继续使用本平台服务即视为接受修改后的协议。
              </p>
            </CardContent>
          </Card>

          {/* 第二条 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">第二条 服务内容</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">2.1 平台服务</h4>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    本平台为用户提供艺人招聘信息发布、求职信息展示、在线沟通、简历管理等相关服务。
                    具体服务内容以本平台实际提供的功能为准。
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">2.2 服务范围</h4>
                  <ul className="text-gray-700 text-sm space-y-1 list-disc list-inside">
                    <li>为求职者提供职位搜索、简历投递、面试安排等服务</li>
                    <li>为招聘方提供人才搜索、简历筛选、招聘管理等服务</li>
                    <li>提供VIP增值服务，包括优先推荐、数据分析等功能</li>
                    <li>提供客服咨询、技术支持等辅助服务</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 第三条 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">第三条 用户权利与义务</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2 text-green-600">3.1 用户权利</h4>
                  <ul className="text-gray-700 text-sm space-y-1 list-disc list-inside">
                    <li>免费注册和使用本平台基础服务</li>
                    <li>自主管理个人信息和隐私设置</li>
                    <li>享受平台提供的技术支持和客服服务</li>
                    <li>对平台服务提出意见和建议</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2 text-orange-600">3.2 用户义务</h4>
                  <ul className="text-gray-700 text-sm space-y-1 list-disc list-inside">
                    <li>提供真实、准确、完整的个人信息</li>
                    <li>遵守国家法律法规和平台规定</li>
                    <li>不得发布虚假、违法或不当信息</li>
                    <li>尊重其他用户的合法权益</li>
                    <li>妥善保管账号密码，对账号行为负责</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 第四条 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">第四条 禁止行为</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-start space-x-2">
                  <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <div className="space-y-2">
                    <h4 className="font-medium text-red-800">严禁以下行为：</h4>
                    <ul className="text-red-700 text-sm space-y-1 list-disc list-inside">
                      <li>发布虚假招聘信息或求职信息</li>
                      <li>进行任何形式的欺诈、诈骗活动</li>
                      <li>发布违法、暴力、色情等不当内容</li>
                      <li>恶意骚扰、诽谤其他用户</li>
                      <li>使用技术手段干扰平台正常运行</li>
                      <li>盗用他人账号或冒充他人身份</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 第五条 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">第五条 违约责任</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 text-sm leading-relaxed mb-3">
                用户违反本协议的，本平台有权采取以下措施：
              </p>
              <ul className="text-gray-700 text-sm space-y-1 list-disc list-inside">
                <li>警告、限制功能使用</li>
                <li>删除违规内容</li>
                <li>暂停或终止账号服务</li>
                <li>追究法律责任</li>
              </ul>
            </CardContent>
          </Card>

          {/* 第六条 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">第六条 免责声明</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 text-sm leading-relaxed">
                本平台仅提供信息发布和交流平台，不对用户发布的信息真实性负责，
                不对用户间的交易行为承担责任。用户应自行判断信息的真实性和可靠性，
                并承担相应风险。
              </p>
            </CardContent>
          </Card>

          {/* 联系方式 */}
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="text-lg text-blue-800">联系我们</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-blue-700">
                <p>如对本协议有任何疑问，请联系我们：</p>
                <p>客服电话：400-888-9999</p>
                <p>客服邮箱：service@yirenzhaoping.com</p>
                <p>工作时间：周一至周日 9:00-18:00</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 相关链接 */}
        <div className="mt-8 flex justify-center space-x-4">
          <Button variant="outline" asChild>
            <Link href="/privacy">隐私政策</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/violations">违规公示</Link>
          </Button>
        </div>
      </main>
    </div>
  )
}
