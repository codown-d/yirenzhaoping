"use client";

import { usePathname } from "next/navigation";
import React, { createContext, useContext, useState, useEffect } from "react";

export enum UserType {
  JobSeeker = "jobseeker",
  Employer = "employer",
}

export interface User {
  id: string;
  name: string;
  userType: UserType;
  avatar?: string;
  phone?: string;
  email?: string;
  isAuthenticated: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (userData: Omit<User, "id" | "isAuthenticated">) => void;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  switchUserType: (newType: UserType) => void;
  isLoading: boolean;
  role: UserType;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<UserType>(UserType.JobSeeker);
  const [isLoading, setIsLoading] = useState(true);

  // 从 localStorage 加载用户数据
  useEffect(() => {
    const loadUser = () => {
      try {
        const savedUser = localStorage.getItem("yirenzhaoping_user");
        const savedUserType = localStorage.getItem("yirenzhaoping_userType");

        if (savedUser) {
          const userData = JSON.parse(savedUser);
          setUser(userData);
          console.log(userData)
          setRole(userData.userType);
        } else if (savedUserType) {
          // 如果没有用户数据但有保存的用户类型，使用保存的类型
          setRole(savedUserType as UserType);
        }
      } catch (error) {
        console.error("Failed to load user data:", error);
        localStorage.removeItem("yirenzhaoping_user");
        localStorage.removeItem("yirenzhaoping_userType");
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  // 保存用户数据到 localStorage
  const saveUser = (userData: User | null) => {
    try {
      if (userData) {
        localStorage.setItem("yirenzhaoping_user", JSON.stringify(userData));
        localStorage.setItem("role", "employer");
      } else {
        localStorage.removeItem("yirenzhaoping_user");
      }
    } catch (error) {
      console.error("Failed to save user data:", error);
    }
  };

  const login = (userData: Omit<User, "id" | "isAuthenticated">) => {
    const newUser: User = {
      ...userData,
      id: Date.now().toString(), // 简单的 ID 生成，实际项目中应该从后端获取
      isAuthenticated: true,
    };
    setUser(newUser);
    saveUser(newUser);
  };

  const logout = () => {
    setUser(null);
    saveUser(null);
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      saveUser(updatedUser);
    }
  };

  const switchUserType = (newType: UserType) => {
    setRole(newType);
    if (user) {
      const updatedUser = { ...user, userType: newType };
      setUser(updatedUser);
      saveUser(updatedUser);
    }
    // 保存当前身份类型到 localStorage
    try {
      localStorage.setItem("yirenzhaoping_userType", newType);
    } catch (error) {
      console.error("Failed to save user type:", error);
    }
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    updateUser,
    switchUserType,
    isLoading,
    role,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// 便捷的 hooks
export function useUser() {
  const { user } = useAuth();
  return user;
}

export function useUserType() {
  const { user } = useAuth();
  return user?.userType || null;
}

export function useIsAuthenticated() {
  const { user } = useAuth();
  return user?.isAuthenticated || false;
}
