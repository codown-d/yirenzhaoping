"use client"

import { ArrowLeft, Search, Menu, User, Bell, RefreshCw, Briefcase, UserCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { useRouter } from "next/navigation"
import { useAuth, useIsAuthenticated, UserType } from "@/lib/auth-context"

interface PageHeaderProps {
  // 基本配置
  title?: string
  showBack?: boolean
  onBack?: () => void
  
  // 搜索功能
  showSearch?: boolean
  searchPlaceholder?: string
  searchValue?: string
  onSearchChange?: (value: string) => void
  onSearchSubmit?: (value: string) => void
  
  // 右侧操作
  showProfile?: boolean
  showNotifications?: boolean
  showMenu?: boolean
  rightContent?: React.ReactNode
  
  // 样式配置
  className?: string
  variant?: 'default' | 'transparent' | 'gradient'
}

export function PageHeader({
  title,
  showBack = false,
  onBack,
  showSearch = false,
  searchPlaceholder = "搜索...",
  searchValue = "",
  onSearchChange,
  onSearchSubmit,
  showProfile = true,
  showNotifications = false,
  showMenu = false,
  rightContent,
  className = "",
  variant = 'default'
}: PageHeaderProps) {
  const router = useRouter()
  const { user } = useAuth()
  const isAuthenticated = useIsAuthenticated()

  const handleBack = () => {
    if (onBack) {
      onBack()
    } else {
      router.back()
    }
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (onSearchSubmit) {
      onSearchSubmit(searchValue)
    }
  }

  const getVariantClasses = () => {
    switch (variant) {
      case 'transparent':
        return 'bg-transparent'
      case 'gradient':
        return 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
      default:
        return 'bg-white border-b border-gray-200'
    }
  }

  return (
    <header className={`sticky top-0 z-50 ${getVariantClasses()} ${className}`}>
      <div className="flex items-center justify-between px-4 py-3 max-w-md mx-auto">
        {/* 左侧：返回按钮或菜单 */}
        <div className="flex items-center">
          {showBack ? (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 mr-2"
              onClick={handleBack}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          ) : showMenu ? (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 mr-2"
            >
              <Menu className="h-4 w-4" />
            </Button>
          ) : null}
        </div>

        {/* 中间：标题或搜索框 */}
        <div className="flex-1 mx-2">
          {showSearch ? (
            <form onSubmit={handleSearchSubmit} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder={searchPlaceholder}
                value={searchValue}
                onChange={(e) => onSearchChange?.(e.target.value)}
                className="pl-10 h-9 rounded-full border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </form>
          ) : title ? (
            <h1 className="text-lg font-semibold text-center truncate">
              {title}
            </h1>
          ) : null}
        </div>

        {/* 右侧：通知、用户头像等 */}
        <div className="flex items-center space-x-2">
          {rightContent}
          
          {showNotifications && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 relative"
            >
              <Bell className="h-4 w-4" />
              {/* 通知小红点 */}
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs"></span>
            </Button>
          )}

          {showProfile && isAuthenticated && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => router.push('/profile')}
            >
              <Avatar className="h-7 w-7">
                <AvatarImage src={user?.avatar} />
                <AvatarFallback className="text-xs">
                  {user?.name?.[0] || 'U'}
                </AvatarFallback>
              </Avatar>
            </Button>
          )}

          {showProfile && !isAuthenticated && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => router.push('/login')}
            >
              <User className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}

// 预设配置的头部组件

// 主页头部（带搜索）
export function HomePageHeader({
  searchValue,
  onSearchChange,
  onSearchSubmit,
  searchPlaceholder = "搜索职位、公司...",
  showNotifications = true,
  ...props
}: Omit<PageHeaderProps, 'showSearch' | 'title'> & {
  searchValue?: string
  onSearchChange?: (value: string) => void
  onSearchSubmit?: (value: string) => void
  searchPlaceholder?: string
}) {
  return (
    <PageHeader
      showSearch
      searchValue={searchValue}
      onSearchChange={onSearchChange}
      onSearchSubmit={onSearchSubmit}
      searchPlaceholder={searchPlaceholder}
      showNotifications={showNotifications}
      {...props}
    />
  )
}

// 二级页面头部（带返回按钮）
export function SubPageHeader({
  title,
  onBack,
  ...props
}: Omit<PageHeaderProps, 'showBack'> & {
  title: string
  onBack?: () => void
}) {
  return (
    <PageHeader
      title={title}
      showBack
      onBack={onBack}
      {...props}
    />
  )
}

// 筛选页面头部
export function FilterPageHeader({
  title = "筛选",
  onBack,
  onReset,
  onApply,
  ...props
}: Omit<PageHeaderProps, 'showBack' | 'rightContent'> & {
  title?: string
  onBack?: () => void
  onReset?: () => void
  onApply?: () => void
}) {
  return (
    <PageHeader
      title={title}
      showBack
      onBack={onBack}
      rightContent={
        <div className="flex items-center space-x-2">
          {onReset && (
            <Button
              variant="ghost"
              size="sm"
              className="text-sm px-2 py-1 h-7"
              onClick={onReset}
            >
              重置
            </Button>
          )}
          {onApply && (
            <Button
              size="sm"
              className="text-sm px-3 py-1 h-7"
              onClick={onApply}
            >
              确定
            </Button>
          )}
        </div>
      }
      showProfile={false}
      {...props}
    />
  )
}

// 个人资料页面头部
export function ProfilePageHeader({
  title = "个人中心",
  showEdit = false,
  showRoleSwitch = true,
  onEdit,
  ...props
}: Omit<PageHeaderProps, 'rightContent'> & {
  title?: string
  showEdit?: boolean
  showRoleSwitch?: boolean
  onEdit?: () => void
}) {
  const { role } = useAuth()
  const router = useRouter()

  const handleRoleSwitchClick = () => {
    router.push('/role-switch')
  }

  const getRoleIcon = (userType: UserType) => {
    return userType === UserType.JobSeeker ? (
      <UserCheck className="h-4 w-4" />
    ) : (
      <Briefcase className="h-4 w-4" />
    )
  }

  const getRoleText = (userType: UserType) => {
    return userType === UserType.JobSeeker ? "求职者" : "招聘方"
  }

  return (
    <PageHeader
      title={title}
      rightContent={
        <div className="flex items-center space-x-2">
          {showRoleSwitch && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2 text-sm flex items-center space-x-1"
              onClick={handleRoleSwitchClick}
            >
              {role==='employer'?'切换为求职者':'切换为招聘方'}
            </Button>
          )}

          {showEdit && onEdit && (
            <Button
              variant="ghost"
              size="sm"
              className="text-sm px-2 py-1 h-7"
              onClick={onEdit}
            >
              编辑
            </Button>
          )}
        </div>
      }
      showProfile={false}
      {...props}
    />
  )
}
