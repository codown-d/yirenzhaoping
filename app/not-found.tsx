"use client"

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">页面未找到</h2>
          <p className="text-gray-600">
            抱歉，您访问的页面不存在或已被移动。
          </p>
        </div>
        
        <div className="space-y-4">
          <Button asChild className="w-full">
            <Link href="/">
              <Home className="h-4 w-4 mr-2" />
              返回首页
            </Link>
          </Button>
          
          <Button
            variant="outline"
            className="w-full"
            onClick={() => {
              if (typeof window !== 'undefined') {
                window.history.back()
              }
            }}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            返回上一页
          </Button>
        </div>
        
        <div className="mt-8 text-sm text-gray-500">
          <p>如果您认为这是一个错误，请联系我们的客服团队。</p>
        </div>
      </div>
    </div>
  )
}
