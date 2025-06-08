"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { FilterPageHeader } from "@/components/ui/page-header"
import {
  BENEFIT_OPTIONS,
  getProvinces,
  getCities,
  getDistricts,
  formatSalary,
  getEmploymentTypeText
} from "@/constants"
import ThreeLevelCategoryFilter from "@/components/ThreeLevelCategoryFilter"


export default function JobseekerFilterPage() {
  const router = useRouter()

  // 筛选条件状态
  const [selectedProvince, setSelectedProvince] = useState<string>("")
  const [selectedCity, setSelectedCity] = useState<string>("")
  const [selectedDistrict, setSelectedDistrict] = useState<string>("")
  const [location, setLocation] = useState<string[]>([])
  const [categoryType, setCategoryType] = useState<'frontend' | 'backend' | 'operations'>('frontend')
  const [jobTypes, setJobTypes] = useState<string[]>([])
  const [salaryRange, setSalaryRange] = useState<[number, number]>([0, 50])
  const [employmentType, setEmploymentType] = useState<string>("unlimited")
  const [benefits, setBenefits] = useState<string[]>([])

  // 处理分类变化
  const handleCategoryChange = (category: string) => {
    setCategoryType(category as 'frontend' | 'backend' | 'operations')
    setJobTypes([]) // 清空职位类型选择
  }

  // 处理职位类型变化
  const handleJobTypesChange = (types: string[]) => {
    setJobTypes(types)
  }

  // 页面加载时从 localStorage 读取筛选条件
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedFilters = localStorage.getItem('jobseeker_filters')
        if (savedFilters) {
          const filters = JSON.parse(savedFilters)
          if (filters.location) setLocation(filters.location)
          if (filters.categoryType) setCategoryType(filters.categoryType)
          if (filters.jobTypes) setJobTypes(filters.jobTypes)
          if (filters.salaryRange) setSalaryRange(filters.salaryRange)
          if (filters.employmentType) setEmploymentType(filters.employmentType)
          if (filters.benefits) setBenefits(filters.benefits)
        }
      } catch (error) {
        console.error('Failed to load filters:', error)
      }
    }
  }, [])



  // 处理省份选择
  const handleProvinceChange = (province: string) => {
    setSelectedProvince(province)
    setSelectedCity("")
    setSelectedDistrict("")
  }

  // 处理城市选择
  const handleCityChange = (city: string) => {
    setSelectedCity(city)
    setSelectedDistrict("")
  }

  // 处理区县选择
  const handleDistrictChange = (district: string) => {
    setSelectedDistrict(district)
  }

  // 添加位置到筛选列表
  const addLocationToFilter = () => {
    if (selectedProvince && selectedCity && selectedDistrict) {
      const locationString = `${selectedProvince}-${selectedCity}-${selectedDistrict}`
      if (!location.includes(locationString)) {
        setLocation([...location, locationString])
      }
      // 重置选择
      setSelectedProvince("")
      setSelectedCity("")
      setSelectedDistrict("")
    }
  }

  // 移除位置筛选
  const removeLocationFilter = (locationToRemove: string) => {
    setLocation(location.filter(item => item !== locationToRemove))
  }



  // 处理福利选择
  const handleBenefitChange = (benefit: string) => {
    if (benefits.includes(benefit)) {
      setBenefits(benefits.filter((item) => item !== benefit))
    } else {
      setBenefits([...benefits, benefit])
    }
  }

  // 重置所有筛选条件
  const handleReset = () => {
    setSelectedProvince("")
    setSelectedCity("")
    setSelectedDistrict("")
    setLocation([])
    setCategoryType('frontend')
    setJobTypes([])
    setSalaryRange([0, 50])
    setEmploymentType("unlimited")
    setBenefits([])
  }

  // 应用筛选条件
  const handleApply = () => {
    const filters = {
      location,
      categoryType,
      jobTypes,
      salaryRange,
      employmentType,
      benefits,
    }

    // 保存筛选条件到 localStorage
    localStorage.setItem('jobseeker_filters', JSON.stringify(filters))

    // 返回首页
    router.push('/')
  }



  return (
    <div className="min-h-screen bg-gray-50">
      {/* 头部组件 */}
      <FilterPageHeader
        title="筛选职位"
        onReset={handleReset}
        onApply={handleApply}
      />

      {/* Content */}
      <div className="p-4 pb-24">
        {/* 位置筛选 */}
        <div className="bg-white rounded-2xl p-4 mb-4">
          <h3 className="text-base font-medium mb-3">位置</h3>

          {/* 三级联动选择器 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
            {/* 省份选择 */}
            <div>
              <Label className="text-sm text-gray-600 mb-1 block">省份</Label>
              <Select value={selectedProvince} onValueChange={handleProvinceChange}>
                <SelectTrigger>
                  <SelectValue placeholder="请选择省份" />
                </SelectTrigger>
                <SelectContent>
                  {getProvinces().map((province) => (
                    <SelectItem key={province} value={province}>
                      {province}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* 城市选择 */}
            <div>
              <Label className="text-sm text-gray-600 mb-1 block">城市</Label>
              <Select
                value={selectedCity}
                onValueChange={handleCityChange}
                disabled={!selectedProvince}
              >
                <SelectTrigger>
                  <SelectValue placeholder="请选择城市" />
                </SelectTrigger>
                <SelectContent>
                  {getCities(selectedProvince).map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* 区县选择 */}
            <div>
              <Label className="text-sm text-gray-600 mb-1 block">区县</Label>
              <Select
                value={selectedDistrict}
                onValueChange={handleDistrictChange}
                disabled={!selectedCity}
              >
                <SelectTrigger>
                  <SelectValue placeholder="请选择区县" />
                </SelectTrigger>
                <SelectContent>
                  {getDistricts(selectedProvince, selectedCity).map((district) => (
                    <SelectItem key={district} value={district}>
                      {district}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* 添加位置按钮 */}
          <div className="mb-3">
            <Button
              variant="outline"
              size="sm"
              onClick={addLocationToFilter}
              disabled={!selectedProvince || !selectedCity || !selectedDistrict}
              className="w-full md:w-auto"
            >
              添加位置
            </Button>
          </div>

          {/* 已选择的位置列表 */}
          {location.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {location.map((loc) => (
                <Badge
                  key={loc}
                  variant="default"
                  className="bg-green-100 text-green-800 hover:bg-green-200 rounded-full px-3 py-1 cursor-pointer"
                  onClick={() => removeLocationFilter(loc)}
                >
                  {loc}
                  <X className="ml-1 h-3 w-3" />
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* 三级分类筛选 */}
        <ThreeLevelCategoryFilter
          selectedCategory={categoryType}
          selectedJobTypes={jobTypes}
          onCategoryChange={handleCategoryChange}
          onJobTypesChange={handleJobTypesChange}
        />

        {/* 薪资范围筛选 */}
        <div className="bg-white rounded-2xl p-4 mb-4">
          <div className="flex justify-between mb-3">
            <h3 className="text-base font-medium">薪资范围</h3>
            <span className="text-sm text-gray-500">
              {formatSalary(salaryRange[0])} - {formatSalary(salaryRange[1])}
            </span>
          </div>
          <Slider
            defaultValue={[0, 50]}
            min={0}
            max={50}
            step={1}
            value={salaryRange}
            onValueChange={(value) => setSalaryRange(value as [number, number])}
            className="mb-4"
          />
        </div>

        {/* 工作性质筛选 */}
        <div className="bg-white rounded-2xl p-4 mb-4">
          <h3 className="text-base font-medium mb-3">工作性质</h3>
          <RadioGroup value={employmentType} onValueChange={setEmploymentType} className="space-y-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="unlimited" id="any-type" />
              <Label htmlFor="any-type">不限</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="full-time" id="full-time" />
              <Label htmlFor="full-time">全职</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="part-time" id="part-time" />
              <Label htmlFor="part-time">兼职</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="temporary" id="temporary" />
              <Label htmlFor="temporary">临时</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="contract" id="contract" />
              <Label htmlFor="contract">合同制</Label>
            </div>
          </RadioGroup>
        </div>

        {/* 福利筛选 */}
        <div className="bg-white rounded-2xl p-4 mb-4">
          <h3 className="text-base font-medium mb-3">福利待遇</h3>
          <div className="flex flex-wrap gap-2">
            {BENEFIT_OPTIONS.map((benefit) => (
              <Badge
                key={benefit}
                variant={benefits.includes(benefit) ? "default" : "outline"}
                className={`rounded-full px-3 py-1 cursor-pointer ${
                  benefits.includes(benefit) ? "bg-green-100 text-green-800 hover:bg-green-200" : ""
                }`}
                onClick={() => handleBenefitChange(benefit)}
              >
                {benefit}
                {benefits.includes(benefit) && <X className="ml-1 h-3 w-3" />}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Fixed Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
        <Button className="w-full h-12 rounded-xl" onClick={handleApply}>
          确定
        </Button>
      </div>
    </div>
  )
}
