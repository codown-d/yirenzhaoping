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
  LogOut,
  Settings,
  UserCircle,
  Headphones,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
                    <>
                      <div className="border-t border-gray-200 my-4"></div>
                      <button
                        onClick={logout}
                        className="flex items-center w-full text-left py-3 px-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        退出登录
                      </button>
                    </>
                  )}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
          <h1 className="text-xl font-bold text-green-600">薏仁直聘</h1>
        </div>
        <div className="flex items-center space-x-2">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 rounded-full p-0">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={user?.avatar || "/placeholder.svg?height=32&width=32"}
                    />
                    <AvatarFallback>{user?.name?.[0] || "我"}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user?.name || "用户"}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.email || user?.phone || ""}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="flex items-center">
                    <UserCircle className="mr-2 h-4 w-4" />
                    <span>个人中心</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings" className="flex items-center">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>设置</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-red-600 focus:text-red-600 focus:bg-red-50"
                  onClick={logout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>退出登录</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
