"use client"

import React from 'react'
import JobCard from './JobCard'
import JobseekerCard from './JobseekerCard'

// 定义数据类型
export interface JobData {
  type: 'job'
  id: string
  title: string
  company: string
  companyLogo?: string
  location: string
  jobType: string
  salary: string
  requiredMajor: string
  startTime: string
  description: string
  tags: string[]
  posted: string
  urgent?: boolean
  verified?: boolean
}

export interface JobseekerData {
  type: 'jobseeker'
  id: string
  name: string
  avatar?: string
  age: number
  gender: string
  location: string
  category: string
  specialties: string[]
  experience: string
  education: string
  rating: number
  reviewCount: number
  hourlyRate: string
  availability: string
  description: string
  tags: string[]
  posted: string
  verified?: boolean
  urgent?: boolean
}

export type MixedCardData = JobData | JobseekerData

interface MixedCardListProps {
  data: MixedCardData[]
  title?: string
  className?: string
}

export default function MixedCardList({ data, title, className = "" }: MixedCardListProps) {
  if (!data || data.length === 0) {
    return (
      <div className={`text-center py-8 ${className}`}>
        <p className="text-gray-500 text-sm">暂无数据</p>
      </div>
    )
  }
let job=data.filter(item=>item.type==='job');
let jobseeker=data.filter(item=>item.type==='jobseeker');
  return (
    <div className={className}>
      {/* {title && (
        <h2 className="text-base font-semibold mb-3">{title}</h2>
      )} */}
      <div className="space-y-3">
      <h2 className="text-base font-semibold mb-3">推荐招聘职位</h2>
        {job.map((item) => {
            return (
              <JobCard
                key={`job-${item.id}`}
                job={{
                  id: item.id,
                  title: item.title,
                  company: item.company,
                  companyLogo: item.companyLogo,
                  location: item.location,
                  type: item.jobType,
                  salary: item.salary,
                  requiredMajor: item.requiredMajor,
                  startTime: item.startTime,
                  description: item.description,
                  tags: item.tags,
                  posted: item.posted,
                  urgent: item.urgent,
                  verified: item.verified,
                }}
              />
            )
        })}
      <h2 className="text-base font-semibold mb-3">推荐求职薏仁</h2>
         {jobseeker.map((item) => {
            return (
              <JobseekerCard
                key={`jobseeker-${item.id}`}
                jobseeker={{
                  id: item.id,
                  name: item.name,
                  avatar: item.avatar,
                  age: item.age,
                  gender: item.gender,
                  location: item.location,
                  category: item.category,
                  specialties: item.specialties,
                  experience: item.experience,
                  education: item.education,
                  rating: item.rating,
                  reviewCount: item.reviewCount,
                  hourlyRate: item.hourlyRate,
                  availability: item.availability,
                  description: item.description,
                  tags: item.tags,
                  posted: item.posted,
                  verified: item.verified,
                  urgent: item.urgent,
                }}
              />
            )
        })}
      </div>
    </div>
  )
}
