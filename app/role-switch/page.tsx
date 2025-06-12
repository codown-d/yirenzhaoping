"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, UserCheck, Briefcase, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useAuth, UserType } from "@/lib/auth-context"

export default function RoleSwitchPage() {
  const router = useRouter()
  const { role, switchUserType } = useAuth()
  const [selectedRole, setSelectedRole] = useState<UserType>(role)

  const handleRoleSelect = (newRole: UserType) => {
    setSelectedRole(newRole)
  }

  const handleConfirm = () => {
    if (selectedRole !== role) {
      switchUserType(selectedRole)
      // 切换身份后跳转到对应的主页
      if (selectedRole === UserType.JobSeeker) {
        router.push('/jobseeker')
      } else {
        router.push('/employer')
      }
    } else {
      // 如果没有变化，直接返回
      router.back()
    }
  }

  const handleBack = () => {
    router.back()
  }

  const getRoleInfo = (userType: UserType) => {
    if (userType === UserType.JobSeeker) {
      return {
        title: "薏人",
        description: "寻找表演机会，展示才华",
        icon: <UserCheck className="h-8 w-8" />,
        features: [
          "浏览职位信息",
          "投递简历",
          "查看面试邀请",
          "管理求职进度"
        ],
        color: "blue"
      }
    } else {
      return {
        title: "老板",
        description: "发布职位，寻找人才",
        icon: <Briefcase className="h-8 w-8" />,
        features: [
          "发布招聘信息",
          "查看求职者简历",
          "邀请面试",
          "管理招聘流程"
        ],
        color: "green"
      }
    }
  }

  const jobseekerInfo = getRoleInfo(UserType.JobSeeker)
  const employerInfo = getRoleInfo(UserType.Employer)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-4 py-3 max-w-md mx-auto">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={handleBack}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-lg font-semibold">身份切换</h1>
          <div className="w-8"></div> {/* 占位符，保持居中 */}
        </div>
      </header>

      {/* Content */}
      <main className="px-4 py-6 max-w-md mx-auto">
        {/* 当前身份提示 */}
        <div className="mb-6 text-center">
          <p className="text-gray-600 text-sm mb-2">当前身份</p>
          <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
            {getRoleInfo(role).icon}
            <span className="ml-2">{getRoleInfo(role).title}</span>
          </div>
        </div>

        {/* 身份选择 */}
        <div className="space-y-4 mb-8">
          {/* 求职者选项 */}
          <Card 
            className={`cursor-pointer transition-all ${
              selectedRole === UserType.JobSeeker 
                ? 'ring-2 ring-blue-500 bg-blue-50' 
                : 'hover:shadow-md'
            }`}
            onClick={() => handleRoleSelect(UserType.JobSeeker)}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <div className={`p-2 rounded-lg ${
                    selectedRole === UserType.JobSeeker 
                      ? 'bg-blue-100 text-blue-600' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {jobseekerInfo.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">{jobseekerInfo.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{jobseekerInfo.description}</p>
                    <div className="space-y-1">
                      {jobseekerInfo.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2 text-xs text-gray-500">
                          <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {selectedRole === UserType.JobSeeker && (
                  <div className="flex-shrink-0 ml-2">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* 招聘方选项 */}
          <Card 
            className={`cursor-pointer transition-all ${
              selectedRole === UserType.Employer 
                ? 'ring-2 ring-green-500 bg-green-50' 
                : 'hover:shadow-md'
            }`}
            onClick={() => handleRoleSelect(UserType.Employer)}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <div className={`p-2 rounded-lg ${
                    selectedRole === UserType.Employer 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {employerInfo.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">{employerInfo.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{employerInfo.description}</p>
                    <div className="space-y-1">
                      {employerInfo.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2 text-xs text-gray-500">
                          <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {selectedRole === UserType.Employer && (
                  <div className="flex-shrink-0 ml-2">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 说明文字 */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <div className="flex items-start space-x-2">
            <div className="w-4 h-4 bg-yellow-400 rounded-full flex-shrink-0 mt-0.5"></div>
            <div>
              <h4 className="font-medium text-yellow-800 text-sm mb-1">温馨提示</h4>
              <p className="text-yellow-700 text-xs leading-relaxed">
                切换身份后，您将看到对应身份的功能和内容。您可以随时在个人中心切换身份。
              </p>
            </div>
          </div>
        </div>

        {/* 确认按钮 */}
        <div className="space-y-3">
          <Button 
            className="w-full h-12 text-base font-medium"
            onClick={handleConfirm}
            disabled={selectedRole === role}
          >
            {selectedRole === role ? '当前已是此身份' : `切换为${getRoleInfo(selectedRole).title}`}
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full h-10 text-sm"
            onClick={handleBack}
          >
            取消
          </Button>
        </div>
      </main>
    </div>
  )
}
