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

interface EmployerFilterSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onApplyFilters: (filters: any) => void
}

export function EmployerFilterSheet({ open, onOpenChange, onApplyFilters }: EmployerFilterSheetProps) {
  // 筛选条件状态
  const [location, setLocation] = useState<string[]>([])
  const [gender, setGender] = useState<string>("")
  const [specialties, setSpecialties] = useState<string[]>([])
  const [ageRange, setAgeRange] = useState<[number, number]>([18, 45])
  const [experience, setExperience] = useState<string>("")
  const [education, setEducation] = useState<string[]>([])

  // 城市列表
  const cities = ["北京", "上海", "广州", "深圳", "成都", "杭州", "武汉", "西安", "南京", "重庆"]

  // 专业列表
  const specialtyOptions = [
    "古典舞",
    "民族舞",
    "芭蕾舞",
    "现代舞",
    "街舞",
    "武术",
    "杂技",
    "声乐",
    "器乐",
    "戏曲",
    "表演",
    "主持",
    "模特",
  ]

  // 学历列表
  const educationOptions = ["专科以下", "专科", "本科", "硕士", "博士"]

  // 处理城市选择
  const handleLocationChange = (city: string) => {
    if (location.includes(city)) {
      setLocation(location.filter((item) => item !== city))
    } else {
      setLocation([...location, city])
    }
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
    setLocation([])
    setGender("")
    setSpecialties([])
    setAgeRange([18, 45])
    setExperience("")
    setEducation([])
  }

  // 应用筛选条件
  const handleApply = () => {
    const filters = {
      location,
      gender,
      specialties,
      ageRange,
      experience,
      education,
    }
    onApplyFilters(filters)
    onOpenChange(false)
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] rounded-t-3xl px-0">
        <div className="px-6">
          <SheetHeader className="text-left border-b pb-4 mb-4">
            <SheetTitle className="text-xl">筛选求职者</SheetTitle>
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

          {/* 性别筛选 */}
          <div className="mb-6">
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

          {/* 专业筛选 */}
          <div className="mb-6">
            <h3 className="text-base font-medium mb-3">专业</h3>
            <div className="grid grid-cols-3 gap-2">
              {specialtyOptions.map((specialty) => (
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
          <div className="mb-6">
            <div className="flex justify-between mb-3">
              <h3 className="text-base font-medium">年龄</h3>
              <span className="text-sm text-gray-500">
                {ageRange[0]} - {ageRange[1]}岁
              </span>
            </div>
            <Slider
              defaultValue={[18, 45]}
              min={16}
              max={60}
              step={1}
              value={ageRange}
              onValueChange={(value) => setAgeRange(value as [number, number])}
              className="mb-6"
            />
          </div>

          {/* 经验筛选 */}
          <div className="mb-6">
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
          <div className="mb-6">
            <h3 className="text-base font-medium mb-3">学历要求</h3>
            <div className="flex flex-wrap gap-2">
              {educationOptions.map((edu) => (
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
