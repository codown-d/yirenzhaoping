"use client";

import { useAuth, UserType } from "@/lib/auth-context";
import { Mail, MessageCircle, Plus, User, Users } from "lucide-react";
import Link from "next/link";
import React from "react";

const Footer = () => {
  
  const { role } = useAuth()
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white border-t">
      <div className="flex justify-around py-2">
        <Link
          href="/employer"
          className="flex flex-col items-center py-2 text-green-600"
        >
          <Users className="h-5 w-5" />
          <span className="text-xs mt-1">{role===UserType.Employer?'薏人':'职位'}</span>
        </Link>
        <Link
          href="/messages"
          className="flex flex-col items-center py-2 text-gray-400"
        >
          <Mail className="h-5 w-5" />
          <span className="text-xs mt-1">消息</span>
        </Link>
        {/* <Link
          href={role===UserType.Employer?'/post/employer':'post/jobseeker'}
          className="flex flex-col items-center py-2 text-gray-400"
        >
          <div className="bg-green-500 rounded-full p-1">
            <Plus className="h-4 w-4 text-white" />
          </div>
          <span className="text-xs mt-1">发布</span>
        </Link> */}
        <Link
          href="/forum"
          className="flex flex-col items-center py-2 text-gray-400"
        >
          <MessageCircle className="h-5 w-5" />
          <span className="text-xs mt-1">论坛</span>
        </Link>
        <Link
          href="/profile/employer"
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
