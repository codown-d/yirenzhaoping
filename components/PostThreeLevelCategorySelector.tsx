"use client"

import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronDown, ChevronRight } from "lucide-react"
import { getAllThreeLevelCategories } from "@/constants"

interface PostThreeLevelCategorySelectorProps {
  selectedCategory?: string
  selectedSubcategory?: string
  selectedItem?: string
  onCategoryChange?: (category: string) => void
  onSubcategoryChange?: (subcategory: string) => void
  onItemChange?: (item: string) => void
  className?: string
}

export default function PostThreeLevelCategorySelector({ 
  selectedCategory = "frontend",
  selectedSubcategory = "",
  selectedItem = "",
  onCategoryChange,
  onSubcategoryChange,
  onItemChange,
  className = ""
}: PostThreeLevelCategorySelectorProps) {
  const [activeCategory, setActiveCategory] = useState<string>(selectedCategory)
  const [activeSubcategory, setActiveSubcategory] = useState<string>(selectedSubcategory)
  const [activeItem, setActiveItem] = useState<string>(selectedItem)
  
  const allCategories = getAllThreeLevelCategories()
  
  // 同步外部状态
  useEffect(() => {
    setActiveCategory(selectedCategory)
  }, [selectedCategory])

  useEffect(() => {
    setActiveSubcategory(selectedSubcategory)
  }, [selectedSubcategory])

  useEffect(() => {
    setActiveItem(selectedItem)
  }, [selectedItem])

  // 处理一级分类切换
  const handleCategoryChange = (categoryKey: string) => {
    setActiveCategory(categoryKey)
    setActiveSubcategory("") // 重置二级分类
    setActiveItem("") // 重置三级分类
    onCategoryChange?.(categoryKey)
    onSubcategoryChange?.("")
    onItemChange?.("")
  }

  // 处理二级分类切换
  const handleSubcategoryChange = (subcategory: string) => {
    setActiveSubcategory(subcategory)
    setActiveItem("") // 重置三级分类
    onSubcategoryChange?.(subcategory)
    onItemChange?.("")
  }

  // 处理三级分类切换
  const handleItemChange = (item: string) => {
    setActiveItem(item)
    onItemChange?.(item)
  }

  const currentCategoryData = allCategories[activeCategory as keyof typeof allCategories]
  const currentSubcategoryData = currentCategoryData?.categories.find(cat => cat.name === activeSubcategory)

  return (
    <div className={`space-y-4 ${className}`}>
      {/* 一级分类选择 */}
      <div>
        <Label className="text-sm font-medium">职位类型 *</Label>
        <Select
          value={activeCategory}
          onValueChange={handleCategoryChange}
        >
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="选择职位类型" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(allCategories).map(([key, category]) => (
              <SelectItem key={key} value={key}>
                <div className="flex items-center">
                  <span className="mr-2">{category.icon}</span>
                  <div>
                    <div className="font-medium">{category.name}</div>
                  </div>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* 二级分类选择 */}
      {activeCategory && (
        <div>
          <Label className="text-sm font-medium">职位领域 *</Label>
          <Select
            value={activeSubcategory}
            onValueChange={handleSubcategoryChange}
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="选择职位领域" />
            </SelectTrigger>
            <SelectContent>
              {currentCategoryData.categories.map((subcategory) => (
                <SelectItem key={subcategory.name} value={subcategory.name}>
                  <div className="flex items-center">
                    <span className="mr-2">{subcategory.icon}</span>
                    <div>
                      <div className="font-medium">{subcategory.name}</div>
                    </div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* 三级分类选择 */}
      {activeSubcategory && currentSubcategoryData && (
        <div>
          <Label className="text-sm font-medium">具体职位 *</Label>
          <Select
            value={activeItem}
            onValueChange={handleItemChange}
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="选择具体职位" />
            </SelectTrigger>
            <SelectContent>
              {currentSubcategoryData.children.map((item) => (
                <SelectItem key={item.name} value={item.name}>
                  <div className="flex items-center">
                    <span className="mr-2">{item.icon}</span>
                    <div>
                      <div className="font-medium">{item.name}</div>
                    </div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* 选择结果预览 */}
      {activeCategory && activeSubcategory && activeItem && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-3">
            <div className="text-sm">
              <span className="text-gray-600">已选择：</span>
              <span className="font-medium text-blue-700">
                {allCategories[activeCategory as keyof typeof allCategories].name} → {activeSubcategory} → {activeItem}
              </span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
