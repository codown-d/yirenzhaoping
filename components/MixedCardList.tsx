"use client"

import React from 'react'
import JobCard from './JobCard'
import JobseekerCard from './JobseekerCard'
import { JobData, JobseekerData } from '@/constants'



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
                job={item as JobData}
              />
            )
        })}
      <h2 className="text-base font-semibold mb-3">推荐求职薏仁</h2>
         {jobseeker.map((item) => {
            return (
              <JobseekerCard
                key={`jobseeker-${item.id}`}
                jobseeker={item as JobseekerData}
              />
            )
        })}
      </div>
    </div>
  )
}
