"use client";

import { useAuth, UserType } from "@/lib/auth-context";
import { Mail, MessageCircle, Plus, User, Users } from "lucide-react";
import Link from "next/link";
import React from "react";

const Footer = () => {

  const { role, user } = useAuth()
  console.log(role, user?.userType)

  // 未登录状态按照求职者逻辑处理
  const effectiveRole = role || UserType.JobSeeker

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white border-t">
      <div className="flex justify-around py-2">
        <Link
          href={effectiveRole === UserType.Employer ? '/employer' : '/jobseeker'}
          className="flex flex-col items-center py-2 text-green-600"
        >
          <Users className="h-5 w-5" />
          <span className="text-xs mt-1">{effectiveRole === UserType.Employer ? '薏人' : '职位'}</span>
        </Link>
        <Link
          href="/messages"
          className="flex flex-col items-center py-2 text-gray-400"
        >
          <Mail className="h-5 w-5" />
          <span className="text-xs mt-1">消息</span>
        </Link>
        <Link
          href={effectiveRole === UserType.Employer ? '/post/employer' : '/post/jobseeker'}
          className="flex flex-col items-center py-1 relative"
        >
          <div className={`rounded-full p-2.5 shadow-lg transform transition-all duration-200 hover:scale-110 ${
            effectiveRole === UserType.Employer
              ? 'bg-gradient-to-r from-green-500 to-emerald-600'
              : 'bg-gradient-to-r from-blue-500 to-cyan-600'
          }`}>
            <Plus className="h-6 w-6 text-white" />
          </div>
          <span className={`text-xs mt-1 font-medium ${
            effectiveRole === UserType.Employer ? 'text-green-600' : 'text-blue-600'
          }`}>
            {effectiveRole === UserType.Employer ? '发布招聘' : '发布求职'}
          </span>
          {/* 小装饰点 */}
          <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${
            effectiveRole === UserType.Employer ? 'bg-green-400' : 'bg-blue-400'
          } opacity-75 animate-pulse`}></div>
        </Link>
        <Link
          href="/forum"
          className="flex flex-col items-center py-2 text-gray-400"
        >
          <MessageCircle className="h-5 w-5" />
          <span className="text-xs mt-1">论坛</span>
        </Link>
        <Link
          href={effectiveRole === UserType.Employer ? '/profile/employer' : '/profile/jobseeker'}
          className="flex flex-col items-center py-2 text-gray-400"
        >
          <User className="h-5 w-5" />
          <span className="text-xs mt-1">我的</span>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
