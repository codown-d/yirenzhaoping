"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

interface JobseekerFilterSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onApplyFilters: (filters: any) => void
}

export function JobseekerFilterSheet({ open, onOpenChange, onApplyFilters }: JobseekerFilterSheetProps) {
  // 筛选条件状态
  const [location, setLocation] = useState<string[]>([])
  const [jobTypes, setJobTypes] = useState<string[]>([])
  const [salaryRange, setSalaryRange] = useState<[number, number]>([0, 50])
  const [employmentType, setEmploymentType] = useState<string>("")
  const [benefits, setBenefits] = useState<string[]>([])

  // 城市列表
  const cities = ["北京", "上海", "广州", "深圳", "成都", "杭州", "武汉", "西安", "南京", "重庆"]

  // 职位类型列表
  const jobTypeOptions = ["舞蹈演员", "武术表演", "杂技演员", "声乐演员", "器乐演奏", "戏曲演员", "主持人", "模特"]

  // 福利列表
  const benefitOptions = [
    "五险一金",
    "工作补贴",
    "提供住宿",
    "培训机会",
    "国内出差",
    "国际出差",
    "项目奖金",
    "灵活工作",
  ]

  // 处理城市选择
  const handleLocationChange = (city: string) => {
    if (location.includes(city)) {
      setLocation(location.filter((item) => item !== city))
    } else {
      setLocation([...location, city])
    }
  }

  // 处理职位类型选择
  const handleJobTypeChange = (type: string) => {
    if (jobTypes.includes(type)) {
      setJobTypes(jobTypes.filter((item) => item !== type))
    } else {
      setJobTypes([...jobTypes, type])
    }
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
    setLocation([])
    setJobTypes([])
    setSalaryRange([0, 50])
    setEmploymentType("")
    setBenefits([])
  }

  // 应用筛选条件
  const handleApply = () => {
    const filters = {
      location,
      jobTypes,
      salaryRange,
      employmentType,
      benefits,
    }
    onApplyFilters(filters)
    onOpenChange(false)
  }

  // 格式化薪资显示
  const formatSalary = (value: number) => {
    if (value === 0) return "不限"
    if (value >= 50) return "50K+"
    return `${value}K`
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] rounded-t-3xl px-0">
        <div className="px-6">
          <SheetHeader className="text-left border-b pb-4 mb-4">
            <SheetTitle className="text-xl">筛选职位</SheetTitle>
          </SheetHeader>
        </div>

        <div className="overflow-y-auto h-[calc(85vh-180px)] px-6">
          {/* 位置筛选 */}
          <div className="mb-6">
            <h3 className="text-base font-medium mb-3">位置</h3>
            <div className="flex flex-wrap gap-2">
              {cities.map((city) => (
                <Badge
                  key={city}
                  variant={location.includes(city) ? "default" : "outline"}
                  className={`rounded-full px-3 py-1 cursor-pointer ${
                    location.includes(city) ? "bg-green-100 text-green-800 hover:bg-green-200" : ""
                  }`}
                  onClick={() => handleLocationChange(city)}
                >
                  {city}
                  {location.includes(city) && <X className="ml-1 h-3 w-3" />}
                </Badge>
              ))}
            </div>
          </div>

          {/* 职位类型筛选 */}
          <div className="mb-6">
            <h3 className="text-base font-medium mb-3">职位类型</h3>
            <div className="grid grid-cols-2 gap-2">
              {jobTypeOptions.map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox
                    id={type}
                    checked={jobTypes.includes(type)}
                    onCheckedChange={() => handleJobTypeChange(type)}
                  />
                  <Label htmlFor={type} className="text-sm">
                    {type}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* 薪资范围筛选 */}
          <div className="mb-6">
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
              className="mb-6"
            />
          </div>

          {/* 工作性质筛选 */}
          <div className="mb-6">
            <h3 className="text-base font-medium mb-3">工作性质</h3>
            <RadioGroup value={employmentType} onValueChange={setEmploymentType} className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="" id="any-type" />
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
          <div className="mb-6">
            <h3 className="text-base font-medium mb-3">福利待遇</h3>
            <div className="flex flex-wrap gap-2">
              {benefitOptions.map((benefit) => (
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

        <SheetFooter className="px-6 pt-4 border-t flex-row gap-4 mt-auto">
          <Button variant="outline" className="flex-1" onClick={handleReset}>
            重置
          </Button>
          <Button className="flex-1" onClick={handleApply}>
            确定
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
