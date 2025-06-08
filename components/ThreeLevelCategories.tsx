"use client"

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronDown, ChevronRight } from "lucide-react"
import { getAllThreeLevelCategories } from "@/constants"

interface ThreeLevelCategoriesProps {
  onCategorySelect?: (category: string, subcategory: string, item: string) => void
  selectedCategory?: string
  className?: string
}

export default function ThreeLevelCategories({ 
  onCategorySelect, 
  selectedCategory = "frontend",
  className = ""
}: ThreeLevelCategoriesProps) {
  const [activeCategory, setActiveCategory] = useState<string>(selectedCategory)
  const [expandedSubcategories, setExpandedSubcategories] = useState<Set<string>>(new Set())
  
  const allCategories = getAllThreeLevelCategories()
  
  // 切换子类别展开状态
  const toggleSubcategory = (subcategoryName: string) => {
    const newExpanded = new Set(expandedSubcategories)
    if (newExpanded.has(subcategoryName)) {
      newExpanded.delete(subcategoryName)
    } else {
      newExpanded.add(subcategoryName)
    }
    setExpandedSubcategories(newExpanded)
  }

  // 处理类别选择
  const handleCategoryChange = (categoryKey: string) => {
    setActiveCategory(categoryKey)
    setExpandedSubcategories(new Set()) // 重置展开状态
  }

  // 处理项目点击
  const handleItemClick = (category: string, subcategory: string, item: string) => {
    onCategorySelect?.(category, subcategory, item)
  }

  const currentCategoryData = allCategories[activeCategory as keyof typeof allCategories]

  return (
    <div className={`space-y-4 ${className}`}>
      {/* 一级分类切换 */}
      <div className="flex bg-gray-100 rounded-xl p-1">
        {Object.entries(allCategories).map(([key, category]) => (
          <Button
            key={key}
            variant={activeCategory === key ? 'default' : 'ghost'}
            size="sm"
            className={`rounded-lg px-3 py-2 text-sm flex-1 text-black hover:text-[#fff] ${
              activeCategory === key
                ? 'bg-white shadow-sm'
                : 'hover:bg-gray-200 hover:text-black'
            }`}
            onClick={() => handleCategoryChange(key)}
          >
            <span className="mr-1">{category.icon}</span>
            {category.name}
          </Button>
        ))}
      </div>

      {/* 当前分类信息 */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center">
          <span className="mr-2">{currentCategoryData.icon}</span>
          {currentCategoryData.name}
        </h3>
        <Badge variant="secondary">
          共 {currentCategoryData.count} 个职位
        </Badge>
      </div>

      {/* 二级和三级分类展示 */}
      <div className="space-y-3">
        {currentCategoryData.categories.map((subcategory) => (
          <Card key={subcategory.name} className="overflow-hidden">
            <CardContent className="p-0">
              {/* 二级分类头部 */}
              <div 
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => toggleSubcategory(subcategory.name)}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{subcategory.icon}</span>
                  <div>
                    <h4 className="font-medium text-base">{subcategory.name}</h4>
                    <p className="text-sm text-gray-500">
                      {subcategory.count} 个职位
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="text-xs">
                    {subcategory.children.length} 类
                  </Badge>
                  {expandedSubcategories.has(subcategory.name) ? (
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  )}
                </div>
              </div>

              {/* 三级分类内容 */}
              {expandedSubcategories.has(subcategory.name) && (
                <div className="px-4 pb-4 border-t bg-gray-50">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3">
                    {subcategory.children.map((item) => (
                      <div
                        key={item.name}
                        className="flex items-center justify-between p-3 bg-white rounded-lg border hover:border-green-300 hover:shadow-sm transition-all cursor-pointer"
                        onClick={() => handleItemClick(activeCategory, subcategory.name, item.name)}
                      >
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">{item.icon}</span>
                          <div>
                            <p className="font-medium text-sm">{item.name}</p>
                            <p className="text-xs text-gray-500">{item.count} 个</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 展开所有/收起所有 */}
      <div className="flex justify-center pt-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            if (expandedSubcategories.size === currentCategoryData.categories.length) {
              setExpandedSubcategories(new Set())
            } else {
              setExpandedSubcategories(new Set(currentCategoryData.categories.map(cat => cat.name)))
            }
          }}
        >
          {expandedSubcategories.size === currentCategoryData.categories.length ? '收起所有' : '展开所有'}
        </Button>
      </div>
    </div>
  )
}
