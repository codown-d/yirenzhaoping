"use client"

import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ChevronDown, ChevronRight, X } from "lucide-react"
import { getAllThreeLevelCategories } from "@/constants"

interface ThreeLevelCategoryFilterProps {
  selectedCategory?: string
  selectedJobTypes?: string[]
  onCategoryChange?: (category: string) => void
  onJobTypesChange?: (jobTypes: string[]) => void
  className?: string
}

export default function ThreeLevelCategoryFilter({ 
  selectedCategory = "frontend",
  selectedJobTypes = [],
  onCategoryChange,
  onJobTypesChange,
  className = ""
}: ThreeLevelCategoryFilterProps) {
  const [activeCategory, setActiveCategory] = useState<string>(selectedCategory)
  const [expandedSubcategories, setExpandedSubcategories] = useState<Set<string>>(new Set())
  const [selectedTypes, setSelectedTypes] = useState<string[]>(selectedJobTypes)
  
  const allCategories = getAllThreeLevelCategories()
  
  // 同步外部状态
  useEffect(() => {
    setActiveCategory(selectedCategory)
  }, [selectedCategory])

  useEffect(() => {
    setSelectedTypes(selectedJobTypes)
  }, [selectedJobTypes])

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

  // 处理类别切换
  const handleCategoryChange = (categoryKey: string) => {
    setActiveCategory(categoryKey)
    setExpandedSubcategories(new Set()) // 重置展开状态
    setSelectedTypes([]) // 清空已选择的职位类型
    onCategoryChange?.(categoryKey)
    onJobTypesChange?.([])
  }

  // 处理职位类型选择
  const handleJobTypeToggle = (jobType: string) => {
    const newSelectedTypes = selectedTypes.includes(jobType)
      ? selectedTypes.filter(type => type !== jobType)
      : [...selectedTypes, jobType]
    
    setSelectedTypes(newSelectedTypes)
    onJobTypesChange?.(newSelectedTypes)
  }

  // 移除选中的职位类型
  const removeJobType = (jobType: string) => {
    const newSelectedTypes = selectedTypes.filter(type => type !== jobType)
    setSelectedTypes(newSelectedTypes)
    onJobTypesChange?.(newSelectedTypes)
  }

  // 清空所有选择
  const clearAllSelections = () => {
    setSelectedTypes([])
    onJobTypesChange?.([])
  }

  const currentCategoryData = allCategories[activeCategory as keyof typeof allCategories]

  return (
    <div className={`space-y-4 ${className}`}>
      {/* 一级分类切换 */}
      <div className="bg-white rounded-2xl p-4">
        <h3 className="text-base font-medium mb-3">职位类别</h3>
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
      </div>

      {/* 已选择的职位类型 */}
      {selectedTypes.length > 0 && (
        <div className="bg-white rounded-2xl p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-medium">已选择职位类型</h3>
            <Button variant="ghost" size="sm" onClick={clearAllSelections}>
              清空
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedTypes.map((type) => (
              <Badge
                key={type}
                variant="default"
                className="bg-green-100 text-green-800 hover:bg-green-200 cursor-pointer"
                onClick={() => removeJobType(type)}
              >
                {type}
                <X className="ml-1 h-3 w-3" />
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* 二级和三级分类筛选 */}
      <div className="bg-white rounded-2xl p-4">
        <h3 className="text-base font-medium mb-3">选择具体职位</h3>
        <div className="space-y-3">
          {currentCategoryData.categories.map((subcategory) => (
            <Card key={subcategory.name} className="overflow-hidden">
              <CardContent className="p-0">
                {/* 二级分类头部 */}
                <div 
                  className="flex items-center justify-between p-3 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => toggleSubcategory(subcategory.name)}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">{subcategory.icon}</span>
                    <div>
                      <h4 className="font-medium text-sm">{subcategory.name}</h4>
                      <p className="text-xs text-gray-500">
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

                {/* 三级分类选择 */}
                {expandedSubcategories.has(subcategory.name) && (
                  <div className="px-3 pb-3 border-t bg-gray-50">
                    <div className="grid grid-cols-1 gap-2 pt-3">
                      {subcategory.children.map((item) => (
                        <div
                          key={item.name}
                          className="flex items-center space-x-2 p-2 bg-white rounded border hover:border-green-300 transition-colors"
                        >
                          <Checkbox
                            id={`${subcategory.name}-${item.name}`}
                            checked={selectedTypes.includes(item.name)}
                            onCheckedChange={() => handleJobTypeToggle(item.name)}
                          />
                          <Label 
                            htmlFor={`${subcategory.name}-${item.name}`}
                            className="flex items-center space-x-2 cursor-pointer flex-1"
                          >
                            <span className="text-base">{item.icon}</span>
                            <div>
                              <p className="font-medium text-sm">{item.name}</p>
                              <p className="text-xs text-gray-500">{item.count} 个职位</p>
                            </div>
                          </Label>
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
        <div className="flex justify-center pt-3">
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
    </div>
  )
}
