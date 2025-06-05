"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"


export default function JobseekerFilterPage() {
  const router = useRouter()

  // 筛选条件状态
  const [selectedProvince, setSelectedProvince] = useState<string>("")
  const [selectedCity, setSelectedCity] = useState<string>("")
  const [selectedDistrict, setSelectedDistrict] = useState<string>("")
  const [location, setLocation] = useState<string[]>([])
  const [jobTypes, setJobTypes] = useState<string[]>([])
  const [salaryRange, setSalaryRange] = useState<[number, number]>([0, 50])
  const [employmentType, setEmploymentType] = useState<string>("unlimited")
  const [benefits, setBenefits] = useState<string[]>([])

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
    setSelectedProvince("")
    setSelectedCity("")
    setSelectedDistrict("")
    setLocation([])
    setJobTypes([])
    setSalaryRange([0, 50])
    setEmploymentType("unlimited")
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
    
    // 保存筛选条件到 localStorage
    localStorage.setItem('jobseeker_filters', JSON.stringify(filters))
    
    // 返回首页
    router.push('/')
  }

  // 格式化薪资显示
  const formatSalary = (value: number) => {
    if (value === 0) return "不限"
    if (value >= 50) return "50K+"
    return `${value}K`
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
            <h1 className="text-lg font-semibold">筛选职位</h1>
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

        {/* 职位类型筛选 */}
        <div className="bg-white rounded-2xl p-4 mb-4">
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

      {/* Fixed Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
        <Button className="w-full h-12 rounded-xl" onClick={handleApply}>
          确定
        </Button>
      </div>
    </div>
  )
}
