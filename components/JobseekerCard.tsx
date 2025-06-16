'use client';
import React from "react";
import { useRouter } from "next/navigation";
import { Heart, User, GraduationCap, MapPin, Star, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { JobseekerData } from "@/constants";

interface JobseekerCardProps {
  jobseeker: JobseekerData;
  className?: string;
}

export default function JobseekerCard({
  jobseeker,
  className = "",
}: JobseekerCardProps) {
  const router = useRouter();
  console.log(jobseeker);
  const handleViewProfile = () => {
    router.push(`/candidate/1`);
  };

  const handleContact = () => {
    router.push(`/chat/${jobseeker.id}`);
  };

  return (
    <div
      className={`bg-white rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow ${className}`}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-start space-x-3 flex-1 min-w-0">
          <Avatar className="h-10 w-10 flex-shrink-0">
            <AvatarImage src={jobseeker.avatar} alt={jobseeker.name} />
            <AvatarFallback>
              <User className="h-5 w-5" />
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-start space-x-2 mb-1">
              <h3
                className="font-medium text-sm leading-tight cursor-pointer hover:text-blue-600 transition-colors flex-1"
                onClick={handleViewProfile}
              >
                {jobseeker.name}
              </h3>
              {jobseeker.verified && (
                <Badge className="bg-blue-100 text-blue-800 text-xs px-1.5 py-0.5 flex-shrink-0">
                  认证
                </Badge>
              )}
              {/* {jobseeker.urgent && (
                <Badge className="bg-red-100 text-red-800 text-xs px-1.5 py-0.5 flex-shrink-0">急找工作</Badge>
              )} */}
            </div>
            {/* //年龄，专业，身高，体重 */}
            {jobseeker.category==='舞蹈类'?<div className="flex items-center space-x-2 text-xs text-gray-600 mb-1">
              <span>{jobseeker.age}岁</span>
              <span>•</span>
              <span className="truncate">{jobseeker.category}</span>
              <span>•</span>
              <span>{jobseeker.height}</span>
              <span>•</span>
              <span>{jobseeker.weight}</span>
            </div>:<div className="flex items-center space-x-2 text-xs text-gray-600 mb-1">
              <span>{jobseeker.age}岁</span>
              <span>•</span>
              <span>{jobseeker.category}</span>
              <span>•</span>
              <span>{jobseeker.experience}</span>
            </div>}
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="h-7 w-7 p-0 flex-shrink-0 ml-2"
        >
          <Heart className="h-3.5 w-3.5" />
        </Button>
      </div>

      {/* <div className="flex items-center space-x-2 text-xs text-gray-600 mb-2">
        <span>{jobseeker.category}</span>
        <span>•</span>
        <span className="text-green-600 font-medium">
          {jobseeker.hourlyRate}/小时
        </span>
      </div> */}

      {/* 专业技能和学历 - 移动端紧凑布局 */}
      <div className="space-y-1 mb-2">
        <div className="flex items-center space-x-1 text-xs text-gray-600">
          <MapPin className="h-4 w-4 " />
          <span>{jobseeker.school}</span>
          <span>•</span>
          <span>{jobseeker.major}</span>
        </div>
        {/* <div className="flex items-center space-x-1 text-xs text-gray-600">
          <Clock className="h-3 w-3 flex-shrink-0" />
          <span>可工作时间：{jobseeker.availability}</span>
        </div> */}
        <div className="flex items-center space-x-1 text-xs text-gray-600">
          <Clock className="h-3 w-3 flex-shrink-0" />
          <span>联系方式：{jobseeker.mobile}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-1 mb-2">
        {jobseeker.tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="text-xs px-2 py-0.5">
            {tag}
          </Badge>
        ))}
      </div>

      <p className="text-xs text-gray-600 mb-3 line-clamp-2">
        {jobseeker.description}
      </p>

      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500">{jobseeker.posted}</span>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="rounded-lg h-7 px-3 text-xs"
            onClick={handleViewProfile}
          >
            查看详情
          </Button>
          {/* <Button 
            size="sm" 
            className="rounded-lg h-7 px-3 text-xs" 
            onClick={handleContact}
          >
            立即联系
          </Button> */}
        </div>
      </div>
    </div>
  );
}
