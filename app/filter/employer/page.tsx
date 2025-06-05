"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"


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

  // 省市区数据
  const locationData: Record<string, Record<string, string[]>> = {
    "北京市": {
      "北京市": ["东城区", "西城区", "朝阳区", "丰台区", "石景山区", "海淀区", "门头沟区", "房山区", "通州区", "顺义区", "昌平区", "大兴区", "怀柔区", "平谷区", "密云区", "延庆区"]
    },
    "上海市": {
      "上海市": ["黄浦区", "徐汇区", "长宁区", "静安区", "普陀区", "虹口区", "杨浦区", "闵行区", "宝山区", "嘉定区", "浦东新区", "金山区", "松江区", "青浦区", "奉贤区", "崇明区"]
    },
    "广东省": {
      "广州市": ["荔湾区", "越秀区", "海珠区", "天河区", "白云区", "黄埔区", "番禺区", "花都区", "南沙区", "从化区", "增城区"],
      "深圳市": ["罗湖区", "福田区", "南山区", "宝安区", "龙岗区", "盐田区", "龙华区", "坪山区", "光明区", "大鹏新区"],
      "珠海市": ["香洲区", "斗门区", "金湾区"],
      "东莞市": ["东城街道", "南城街道", "万江街道", "莞城街道", "石碣镇", "石龙镇", "茶山镇", "石排镇"]
    },
    "江苏省": {
      "南京市": ["玄武区", "秦淮区", "建邺区", "鼓楼区", "浦口区", "栖霞区", "雨花台区", "江宁区", "六合区", "溧水区", "高淳区"],
      "苏州市": ["虎丘区", "吴中区", "相城区", "姑苏区", "吴江区", "常熟市", "张家港市", "昆山市", "太仓市"],
      "无锡市": ["锡山区", "惠山区", "滨湖区", "梁溪区", "新吴区", "江阴市", "宜兴市"]
    },
    "浙江省": {
      "杭州市": ["上城区", "拱墅区", "西湖区", "滨江区", "萧山区", "余杭区", "临平区", "钱塘区", "富阳区", "临安区", "桐庐县", "淳安县", "建德市"],
      "宁波市": ["海曙区", "江北区", "北仑区", "镇海区", "鄞州区", "奉化区", "象山县", "宁海县", "余姚市", "慈溪市"],
      "温州市": ["鹿城区", "龙湾区", "瓯海区", "洞头区", "永嘉县", "平阳县", "苍南县", "文成县", "泰顺县", "瑞安市", "乐清市"]
    },
    "四川省": {
      "成都市": ["锦江区", "青羊区", "金牛区", "武侯区", "成华区", "龙泉驿区", "青白江区", "新都区", "温江区", "双流区", "郫都区", "新津区"],
      "绵阳市": ["涪城区", "游仙区", "安州区", "江油市", "三台县", "盐亭县", "梓潼县", "北川羌族自治县", "平武县"]
    }
  }

  // 年龄段选项
  const ageGroupOptions = [
    { value: "unlimited", label: "不限" },
    { value: "under18", label: "18岁以下" },
    { value: "18-35", label: "18-35岁" },
    { value: "over35", label: "35岁以上" }
  ]

  // 前台专业列表
  const frontendSpecialties = [
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

  // 后台专业列表
  const backendSpecialties = [
    "导演",
    "编剧",
    "制片",
    "摄影",
    "灯光",
    "音响",
    "舞美设计",
    "服装设计",
    "化妆造型",
    "道具制作",
    "后期制作",
    "音效制作",
  ]

  // 根据当前选择的类别获取专业列表
  const getCurrentSpecialties = () => {
    return categoryType === 'frontend' ? frontendSpecialties : backendSpecialties
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

  // 学历列表
  const educationOptions = ["专科以下", "专科", "本科", "硕士", "博士"]

  // 获取省份列表
  const getProvinces = () => Object.keys(locationData)

  // 获取城市列表
  const getCities = (province: string) => {
    return province ? Object.keys(locationData[province] || {}) : []
  }

  // 获取区县列表
  const getDistricts = (province: string, city: string) => {
    return province && city ? locationData[province]?.[city] || [] : []
  }

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
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.back()}
              className="mr-2"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-lg font-semibold">筛选求职者</h1>
          </div>
          <Button variant="ghost" size="sm" onClick={handleReset}>
            重置
          </Button>
        </div>
      </div>

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
              前台
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
              后台
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
              {ageGroupOptions.map((option) => (
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

      {/* Fixed Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
        <Button className="w-full h-12 rounded-xl" onClick={handleApply}>
          确定
        </Button>
      </div>
    </div>
  )
}
