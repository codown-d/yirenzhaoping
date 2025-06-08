"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { FilterPageHeader } from "@/components/ui/page-header"
import {
  LOCATION_DATA,
  AGE_GROUP_OPTIONS,
  FRONTEND_SPECIALTIES,
  BACKEND_SPECIALTIES,
  EDUCATION_OPTIONS,
  getProvinces,
  getCities,
  getDistricts,
  getSpecialtiesByCategory
} from "@/constants"


export default function EmployerFilterPage() {
  const router = useRouter()

  // 筛选条件状态
  const [selectedProvince, setSelectedProvince] = useState<string>("")
  const [selectedCity, setSelectedCity] = useState<string>("")
  const [selectedDistrict, setSelectedDistrict] = useState<string>("")
  const [location, setLocation] = useState<string[]>([])
  const [gender, setGender] = useState<string>("")
  const [categoryType, setCategoryType] = useState<'frontend' | 'backend'>('frontend')
  const [specialties, setSpecialties] = useState<string[]>([])
  const [ageGroup, setAgeGroup] = useState<string>("unlimited")
  const [experience, setExperience] = useState<string>("")
  const [education, setEducation] = useState<string[]>([])

  // 根据当前选择的类别获取专业列表
  const getCurrentSpecialties = () => {
    return getSpecialtiesByCategory(categoryType)
  }

  // 页面加载时从 localStorage 读取筛选条件
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedFilters = localStorage.getItem('employer_filters')
        if (savedFilters) {
          const filters = JSON.parse(savedFilters)
          if (filters.location) setLocation(filters.location)
          if (filters.gender) setGender(filters.gender)
          if (filters.categoryType) setCategoryType(filters.categoryType)
          if (filters.specialties) setSpecialties(filters.specialties)
          if (filters.ageGroup) setAgeGroup(filters.ageGroup)
          if (filters.experience) setExperience(filters.experience)
          if (filters.education) setEducation(filters.education)
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

  // 处理专业选择
  const handleSpecialtyChange = (specialty: string) => {
    if (specialties.includes(specialty)) {
      setSpecialties(specialties.filter((item) => item !== specialty))
    } else {
      setSpecialties([...specialties, specialty])
    }
  }

  // 处理学历选择
  const handleEducationChange = (edu: string) => {
    if (education.includes(edu)) {
      setEducation(education.filter((item) => item !== edu))
    } else {
      setEducation([...education, edu])
    }
  }

  // 重置所有筛选条件
  const handleReset = () => {
    setSelectedProvince("")
    setSelectedCity("")
    setSelectedDistrict("")
    setLocation([])
    setGender("")
    setCategoryType('frontend')
    setSpecialties([])
    setAgeGroup("unlimited")
    setExperience("")
    setEducation([])
  }

  // 应用筛选条件
  const handleApply = () => {
    const filters = {
      location,
      gender,
      categoryType,
      specialties,
      ageGroup,
      experience,
      education,
    }

    // 保存筛选条件到 localStorage
    localStorage.setItem('employer_filters', JSON.stringify(filters))

    // 返回首页
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 头部组件 */}
      <FilterPageHeader
        title="筛选求职者"
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

        {/* 性别筛选 */}
        <div className="bg-white rounded-2xl p-4 mb-4">
          <h3 className="text-base font-medium mb-3">性别</h3>
          <RadioGroup value={gender} onValueChange={setGender} className="flex gap-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="male" id="male" />
              <Label htmlFor="male">男</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="female" id="female" />
              <Label htmlFor="female">女</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="" id="any-gender" />
              <Label htmlFor="any-gender">不限</Label>
            </div>
          </RadioGroup>
        </div>

        {/* 求职者类别筛选 */}
        <div className="bg-white rounded-2xl p-4 mb-4">
          <h3 className="text-base font-medium mb-3">求职者类别</h3>
          <div className="flex bg-gray-100 rounded-xl p-1">
            <Button
              variant={categoryType === 'frontend' ? 'default' : 'ghost'}
              size="sm"
              className={`rounded-lg px-4 py-2 text-sm flex-1 text-black hover:text-[#fff] ${
                categoryType === 'frontend'
                  ? 'bg-white shadow-sm'
                  : 'hover:bg-gray-200 hover:text-black'
              }`}
              onClick={() => {
                setCategoryType('frontend')
                setSpecialties([]) // 清空已选择的专业
              }}
            >
              台前
            </Button>
            <Button
              variant={categoryType === 'backend' ? 'default' : 'ghost'}
              size="sm"
              className={`rounded-lg px-4 py-2 text-sm flex-1 text-black hover:text-[#fff] ${
                categoryType === 'backend'
                  ? 'bg-white shadow-sm'
                  : 'hover:bg-gray-200 hover:text-black'
              }`}
              onClick={() => {
                setCategoryType('backend')
                setSpecialties([]) // 清空已选择的专业
              }}
            >
              幕后
            </Button>
          </div>
        </div>

        {/* 专业筛选 */}
        <div className="bg-white rounded-2xl p-4 mb-4">
          <h3 className="text-base font-medium mb-3">专业</h3>
          <div className="grid grid-cols-3 gap-2">
            {getCurrentSpecialties().map((specialty) => (
              <div key={specialty} className="flex items-center space-x-2">
                <Checkbox
                  id={specialty}
                  checked={specialties.includes(specialty)}
                  onCheckedChange={() => handleSpecialtyChange(specialty)}
                />
                <Label htmlFor={specialty} className="text-sm">
                  {specialty}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* 年龄筛选 */}
        <div className="bg-white rounded-2xl p-4 mb-4">
          <h3 className="text-base font-medium mb-3">年龄段</h3>
          <Select value={ageGroup} onValueChange={setAgeGroup}>
            <SelectTrigger>
              <SelectValue placeholder="请选择年龄段" />
            </SelectTrigger>
            <SelectContent>
              {AGE_GROUP_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* 经验筛选 */}
        <div className="bg-white rounded-2xl p-4 mb-4">
          <h3 className="text-base font-medium mb-3">经验要求</h3>
          <RadioGroup value={experience} onValueChange={setExperience} className="space-y-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="" id="any-exp" />
              <Label htmlFor="any-exp">不限</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="0-1" id="exp-0-1" />
              <Label htmlFor="exp-0-1">应届/1年以内</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="1-3" id="exp-1-3" />
              <Label htmlFor="exp-1-3">1-3年</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="3-5" id="exp-3-5" />
              <Label htmlFor="exp-3-5">3-5年</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="5+" id="exp-5+" />
              <Label htmlFor="exp-5+">5年以上</Label>
            </div>
          </RadioGroup>
        </div>

        {/* 学历筛选 */}
        <div className="bg-white rounded-2xl p-4 mb-4">
          <h3 className="text-base font-medium mb-3">学历要求</h3>
          <div className="flex flex-wrap gap-2">
            {EDUCATION_OPTIONS.map((edu) => (
              <Badge
                key={edu}
                variant={education.includes(edu) ? "default" : "outline"}
                className={`rounded-full px-3 py-1 cursor-pointer ${
                  education.includes(edu) ? "bg-green-100 text-green-800 hover:bg-green-200" : ""
                }`}
                onClick={() => handleEducationChange(edu)}
              >
                {edu}
                {education.includes(edu) && <X className="ml-1 h-3 w-3" />}
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
