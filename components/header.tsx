"use client";

import React from "react";
import { useState, useEffect } from "react";
import { useAuth, useUserType, useIsAuthenticated } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import {
  Search,
  Filter,
  MapPin,
  Menu,
  Star,
  Heart,
  MessageCircle,
  User,
  Home,
  Users,
  Mail,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { CarouselBanner } from "@/components/ui/carousel-banner";
import Link from "next/link";

const Header: React.FC = () => {
  const isAuthenticated = useIsAuthenticated();
  const { user, logout } = useAuth();
  return (
    <header className="bg-white border-b sticky top-0 z-10">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="mr-2">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80">
              <SheetHeader className="py-6">
                <SheetTitle className="text-lg font-semibold text-green-600 mb-6">
                  薏仁直聘
                </SheetTitle>
              </SheetHeader>
              <div className="py-6">
                <nav className="space-y-4">
                  <Link
                    href="/employer"
                    className="block py-2 text-gray-700 hover:text-green-600"
                  >
                    招聘方首页
                  </Link>
                  <Link
                    href="/jobseeker"
                    className="block py-2 text-gray-700 hover:text-green-600"
                  >
                    求职方首页
                  </Link>
                  <Link
                    href="/post/create"
                    className="block py-2 text-green-600 hover:text-green-700 font-medium"
                  >
                    发布信息
                  </Link>
                  <Link
                    href="/forum"
                    className="block py-2 text-gray-700 hover:text-green-600"
                  >
                    论坛
                  </Link>
                  <Link
                    href="/profile/employer"
                    className="block py-2 text-gray-700 hover:text-green-600"
                  >
                    个人中心
                  </Link>
                  <Link
                    href="/messages"
                    className="block py-2 text-gray-700 hover:text-green-600"
                  >
                    消息
                  </Link>
                  <Link
                    href="/settings"
                    className="block py-2 text-gray-700 hover:text-green-600"
                  >
                    设置
                  </Link>
                  {isAuthenticated && (
                    <button
                      onClick={logout}
                      className="block w-full text-left py-2 text-red-600 hover:text-red-700"
                    >
                      退出登录
                    </button>
                  )}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
          <h1 className="text-xl font-bold text-green-600">薏仁直聘</h1>
        </div>
        <div className="flex items-center space-x-2">
          {isAuthenticated ? (
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={user?.avatar || "/placeholder.svg?height=32&width=32"}
              />
              <AvatarFallback>{user?.name?.[0] || "我"}</AvatarFallback>
            </Avatar>
          ) : (
            <Button
              asChild
              size="sm"
              variant="outline"
              className="h-8 px-3 rounded-xl"
            >
              <Link href="/login">登录</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
