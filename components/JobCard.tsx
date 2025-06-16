"use client"

import React from 'react'
import { useRouter } from "next/navigation"
import { Heart, GraduationCap, Clock, MapPin, Building } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { JobData } from '@/constants'

interface JobCardProps {
  job: JobData
  className?: string
}

export default function JobCard({ job, className = "" }: JobCardProps) {
  const router = useRouter()

  const handleViewJob = () => {
    router.push(`/job/${job.id}`)
  }

  const handleApply = () => {
    router.push(`/job/${job.id}`)
  }

  return (
    <div className={`bg-white rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow ${className}`}>
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-start space-x-2 mb-1">
            <h3 
              className="font-medium text-sm leading-tight cursor-pointer hover:text-blue-600 transition-colors flex-1" 
              onClick={handleViewJob}
            >
              {job.title}
            </h3>
            {job.urgent && (
              <Badge className="bg-red-100 text-red-800 text-xs px-1.5 py-0.5 flex-shrink-0">急招</Badge>
            )}
            {/* {job.verified && (
              <Badge className="bg-green-100 text-green-800 text-xs px-1.5 py-0.5 flex-shrink-0">认证</Badge>
            )} */}
          </div>
          <div className="flex items-center space-x-2 text-xs text-gray-600 mb-2">
            <Building className="h-3 w-3" />
            <span>{job.company}</span>
            <span>•</span>
            <MapPin className="h-3 w-3" />
            <span>{job.location}</span>
          </div>
        </div>
        <Button variant="ghost" size="sm" className="h-7 w-7 p-0 flex-shrink-0 ml-2">
          <Heart className="h-3.5 w-3.5" />
        </Button>
      </div>

      <div className="flex items-center space-x-2 text-xs text-gray-600 mb-2">
        <span>{job.type}</span>
        <span>•</span>
        <span className="text-green-600 font-medium">{job.salary}/月</span>
      </div>

      {/* 需求专业和到岗时间 - 移动端紧凑布局 */}
      <div className="space-y-1 mb-2">
        <div className="flex items-center space-x-1 text-xs text-gray-600">
          <GraduationCap className="h-3 w-3 flex-shrink-0" />
          <span className="truncate">需求专业：{job.requiredMajor}</span>
        </div>
        <div className="flex items-center space-x-1 text-xs text-gray-600">
          <Clock className="h-3 w-3 flex-shrink-0" />
          <span>到岗时间：{job.startTime}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-1 mb-2">
        {job.tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="text-xs px-2 py-0.5">
            {tag}
          </Badge>
        ))}
      </div>

      <p className="text-xs text-gray-600 mb-3 line-clamp-2">{job.description}</p>

      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500">{job.posted}</span>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="rounded-lg h-7 px-3 text-xs"
            onClick={handleViewJob}
          >
            查看详情
          </Button>
          {/* <Button 
            size="sm" 
            className="rounded-lg h-7 px-3 text-xs" 
            onClick={handleApply}
          >
            立即申请
          </Button> */}
        </div>
      </div>
    </div>
  )
}
