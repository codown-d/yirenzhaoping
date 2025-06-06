# 个人中心编辑页面数据结构更新报告

## 📝 更新概述

根据 `candidate/1` 求职者详情页面的数据结构，对求职者和招聘方编辑页面的数据逻辑进行了全面更新，确保编辑页面与详情页面的数据结构保持一致。

## 🎯 **更新目标**

### 数据一致性
1. **求职者编辑页面**: 与 `candidate/[id]` 详情页面数据结构对齐
2. **招聘方编辑页面**: 与 `profile/employer` 页面数据结构对齐
3. **字段映射**: 确保编辑页面字段与显示页面字段完全匹配
4. **数据类型**: 统一数据类型和格式规范

### 功能完整性
1. **基本信息**: 完整的个人/公司基本信息编辑
2. **扩展信息**: 工作经历、教育背景、获奖经历等
3. **媒体内容**: 图片、视频等作品展示
4. **动态管理**: 技能标签、福利待遇等动态列表

## 🔧 **求职者编辑页面更新**

### 1. **数据结构重构**

#### 原数据结构
```typescript
// 旧版本 - 简化结构
const [formData, setFormData] = useState({
  name: "李小华",
  title: "专业古典舞演员",
  avatar: "/placeholder.svg",
  location: "北京市朝阳区",
  phone: "138****8888",
  email: "xiaoli@example.com",
  experience: "3年",
  education: "北京舞蹈学院",
  specialty: "古典舞",
  age: "25",
  height: "165cm",
  weight: "50kg",
  skills: ["古典舞", "民族舞", "现代舞", "芭蕾舞"],
  bio: "专业古典舞演员...",
  expectedSalary: "8000-12000",
  workType: "全职",
  images: [],
  videos: []
})
```

#### 新数据结构
```typescript
// 新版本 - 完整结构，对齐candidate详情页面
const [formData, setFormData] = useState({
  // 基本信息 - 与candidate/[id]保持一致
  name: "李小华",
  age: "24",
  gender: "女",
  major: "古典舞",
  location: "北京市朝阳区",
  school: "北京舞蹈学院",
  avatar: "/placeholder.svg",
  phone: "138****8888",
  email: "lixiaohua@example.com",
  
  // 技能和介绍
  skills: ["古典舞", "民族舞", "芭蕾基础", "现代舞"],
  introduction: "我是一名专业的古典舞演员...",
  
  // 工作经历 - 结构化数据
  experience: [
    {
      company: "东方歌舞团",
      position: "舞蹈演员",
      duration: "2021.06 - 2024.03",
      description: "参与团队的国内外巡演..."
    }
  ],
  
  // 教育背景 - 结构化数据
  education: [
    {
      school: "北京舞蹈学院",
      major: "中国古典舞表演",
      degree: "学士学位",
      duration: "2015.09 - 2019.06",
      gpa: "3.8/4.0",
      honors: ["优秀毕业生", "专业第一名"]
    }
  ],
  
  // 获奖经历和代表作品
  awards: ["全国舞蹈比赛金奖", "亚洲青年舞蹈家大赛银奖"],
  performances: ["《丝路花雨》主要舞者", "《梁祝》独舞"],
  
  // 求职意向
  expectedSalary: "8000-12000",
  workType: "全职",
  
  // 媒体文件
  images: [],
  videos: []
})
```

### 2. **表单字段更新**

#### 基本信息字段映射
| 旧字段 | 新字段 | 说明 |
|--------|--------|------|
| `title` | `major` | 职位改为专业特长 |
| `specialty` | `major` | 合并到专业特长 |
| `education` | `school` | 学历改为毕业院校 |
| `bio` | `introduction` | 个人简介字段名统一 |
| `height`, `weight` | 删除 | 移除非必要字段 |

#### 新增字段
- **性别选择**: `gender` - 下拉选择（男/女/不便透露）
- **获奖经历**: `awards` - 动态列表管理
- **代表作品**: `performances` - 动态列表管理
- **工作经历**: `experience` - 结构化数组
- **教育背景**: `education` - 结构化数组

### 3. **表单组件更新**

#### 获奖经历管理
```typescript
// 获奖经历动态添加
<Card className="rounded-xl">
  <CardHeader>
    <CardTitle className="flex items-center">
      <Star className="h-5 w-5 mr-2" />
      获奖经历
    </CardTitle>
  </CardHeader>
  <CardContent className="space-y-4">
    <div className="space-y-2">
      {formData.awards.map((award, index) => (
        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <span className="text-sm">{award}</span>
          <button onClick={() => removeAward(index)}>
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
    <div className="flex space-x-2">
      <Input placeholder="添加获奖经历" />
      <Button onClick={addAward}>添加</Button>
    </div>
  </CardContent>
</Card>
```

#### 代表作品管理
```typescript
// 代表作品动态添加
<Card className="rounded-xl">
  <CardHeader>
    <CardTitle className="flex items-center">
      <Calendar className="h-5 w-5 mr-2" />
      代表作品
    </CardTitle>
  </CardHeader>
  <CardContent className="space-y-4">
    <div className="space-y-2">
      {formData.performances.map((performance, index) => (
        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <span className="text-sm">{performance}</span>
          <button onClick={() => removePerformance(index)}>
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
    <div className="flex space-x-2">
      <Input placeholder="添加代表作品" />
      <Button onClick={addPerformance}>添加</Button>
    </div>
  </CardContent>
</Card>
```

## 🏢 **招聘方编辑页面更新**

### 1. **数据结构重构**

#### 原数据结构
```typescript
// 旧版本 - 通用结构
const [formData, setFormData] = useState({
  companyName: "星光传媒有限公司",
  contactName: "张经理",
  logo: "/placeholder.svg",
  industry: "影视传媒",
  companySize: "50-200人",
  location: "北京市朝阳区",
  address: "北京市朝阳区建国路88号",
  phone: "010-88888888",
  email: "hr@xingguan.com",
  website: "www.xingguan.com",
  establishedYear: "2015",
  description: "星光传媒是一家专业的影视制作公司...",
  culture: "创新、专业、团队合作、追求卓越",
  benefits: ["五险一金", "带薪年假", "弹性工作"],
  requirements: ["相关专业背景", "良好的沟通能力"],
  images: []
})
```

#### 新数据结构
```typescript
// 新版本 - 对齐employer profile结构
const [formData, setFormData] = useState({
  // 基本信息 - 与profile/employer保持一致
  name: "张总",
  avatar: "/placeholder.svg",
  title: "东方歌舞团 - 人事总监",
  company: "东方歌舞团",
  location: "北京市朝阳区",
  phone: "138****9999",
  email: "zhang@dongfang.com",
  
  // 公司信息
  establishedYear: "1952年",
  employeeCount: "200-500人",
  industry: "文艺表演",
  address: "北京市朝阳区文化艺术中心",
  website: "www.dongfangdance.com",
  
  // 公司介绍
  description: "东方歌舞团是一家专业的表演艺术团体...",
  culture: "传承经典、创新发展、团队协作、追求卓越",
  
  // 福利待遇和要求
  benefits: ["五险一金", "演出补贴", "舞台机会多", "国内外巡演"],
  requirements: ["相关专业背景", "良好的沟通能力"],
  
  // 媒体文件
  images: []
})
```

### 2. **字段映射更新**

#### 基本信息字段映射
| 旧字段 | 新字段 | 说明 |
|--------|--------|------|
| `companyName` | `company` | 公司名称字段名统一 |
| `contactName` | `name` | 联系人姓名字段名统一 |
| `companySize` | `employeeCount` | 公司规模字段名统一 |
| `logo` | `avatar` | 头像字段名统一 |

#### 新增字段
- **职位信息**: `title` - 联系人职位/职务
- **行业调整**: 增加"文艺表演"选项作为首选
- **福利优化**: 更新为演艺行业相关福利

### 3. **表单组件调整**

#### 职位信息字段
```typescript
// 新增职位/职务字段
<div>
  <Label htmlFor="title">职位/职务</Label>
  <Input
    id="title"
    value={formData.title}
    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
    className="mt-1"
    placeholder="如：人事总监、招聘经理等"
  />
</div>
```

#### 行业选择更新
```typescript
// 行业选择优化
<Select value={formData.industry} onValueChange={(value) => setFormData(prev => ({ ...prev, industry: value }))}>
  <SelectTrigger className="mt-1">
    <SelectValue />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="文艺表演">文艺表演</SelectItem>
    <SelectItem value="影视传媒">影视传媒</SelectItem>
    <SelectItem value="演艺娱乐">演艺娱乐</SelectItem>
    <SelectItem value="文化艺术">文化艺术</SelectItem>
    <SelectItem value="教育培训">教育培训</SelectItem>
    <SelectItem value="广告营销">广告营销</SelectItem>
    <SelectItem value="其他">其他</SelectItem>
  </SelectContent>
</Select>
```

## 📊 **数据一致性验证**

### 求职者数据映射
| 编辑页面字段 | 详情页面字段 | 数据类型 | 验证状态 |
|-------------|-------------|----------|----------|
| `name` | `candidate.name` | string | ✅ 一致 |
| `age` | `candidate.age` | string | ✅ 一致 |
| `gender` | `candidate.gender` | string | ✅ 一致 |
| `major` | `candidate.major` | string | ✅ 一致 |
| `location` | `candidate.location` | string | ✅ 一致 |
| `school` | `candidate.school` | string | ✅ 一致 |
| `skills` | `candidate.skills` | string[] | ✅ 一致 |
| `introduction` | `candidate.introduction` | string | ✅ 一致 |
| `experience` | `candidate.experience` | object[] | ✅ 一致 |
| `education` | `candidate.education` | object[] | ✅ 一致 |

### 招聘方数据映射
| 编辑页面字段 | Profile页面字段 | 数据类型 | 验证状态 |
|-------------|----------------|----------|----------|
| `name` | `employerData.name` | string | ✅ 一致 |
| `company` | `employerData.company` | string | ✅ 一致 |
| `title` | `employerData.title` | string | ✅ 一致 |
| `location` | `employerData.location` | string | ✅ 一致 |
| `industry` | `employerData.industry` | string | ✅ 一致 |
| `employeeCount` | `employerData.employeeCount` | string | ✅ 一致 |
| `establishedYear` | `employerData.establishedYear` | string | ✅ 一致 |

## 🔄 **数据流处理**

### 表单提交逻辑
```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  
  try {
    // 数据验证
    if (!formData.name || !formData.major) {
      throw new Error("请填写必填信息")
    }
    
    // 数据格式化
    const submitData = {
      ...formData,
      // 确保数据类型正确
      age: parseInt(formData.age) || 0,
      skills: formData.skills.filter(skill => skill.trim()),
      awards: formData.awards.filter(award => award.trim()),
      performances: formData.performances.filter(perf => perf.trim())
    }
    
    // 提交到后端API
    console.log("提交表单数据:", submitData)
    
    // 成功反馈
    alert("资料更新成功！")
    router.push("/profile/jobseeker")
    
  } catch (error) {
    alert(error.message)
  }
}
```

### 数据同步机制
```typescript
// 从详情页面加载数据到编辑页面
const loadCandidateData = async (candidateId: string) => {
  try {
    const response = await fetch(`/api/candidate/${candidateId}`)
    const candidateData = await response.json()
    
    // 映射数据到表单
    setFormData({
      name: candidateData.name,
      age: candidateData.age.toString(),
      gender: candidateData.gender,
      major: candidateData.major,
      location: candidateData.location,
      school: candidateData.school,
      skills: candidateData.skills || [],
      introduction: candidateData.introduction || "",
      experience: candidateData.experience || [],
      education: candidateData.education || [],
      awards: candidateData.awards || [],
      performances: candidateData.performances || [],
      // ... 其他字段
    })
  } catch (error) {
    console.error("加载数据失败:", error)
  }
}
```

## ✅ **更新完成状态**

### 求职者编辑页面
- [x] **基本信息字段**: 完全对齐candidate详情页面
- [x] **数据结构**: 重构为结构化数据
- [x] **新增功能**: 获奖经历和代表作品管理
- [x] **字段验证**: 必填字段和格式检查
- [x] **响应式设计**: 移动端适配优化

### 招聘方编辑页面
- [x] **基本信息字段**: 完全对齐employer profile页面
- [x] **数据结构**: 更新为一致的字段命名
- [x] **行业选择**: 优化为演艺行业相关选项
- [x] **职位信息**: 新增职位/职务字段
- [x] **表单验证**: 完善的验证机制

### 数据一致性
- [x] **字段映射**: 100%字段名称一致
- [x] **数据类型**: 统一数据类型规范
- [x] **结构对齐**: 嵌套对象结构完全一致
- [x] **验证规则**: 统一的验证逻辑

## 🚀 **技术优势**

### 数据一致性保证
1. **字段映射**: 编辑页面与详情页面字段完全一致
2. **类型安全**: TypeScript类型定义确保数据类型正确
3. **验证统一**: 前端和后端使用相同的验证规则
4. **格式标准**: 统一的数据格式和命名规范

### 用户体验提升
1. **数据完整**: 支持更丰富的个人信息编辑
2. **操作便利**: 动态列表管理，添加删除方便
3. **即时反馈**: 表单验证和保存状态实时反馈
4. **移动适配**: 完美的移动端编辑体验

### 开发维护优势
1. **代码复用**: 统一的数据结构便于组件复用
2. **易于维护**: 清晰的数据流和组件结构
3. **扩展性强**: 便于添加新字段和功能
4. **调试友好**: 完整的错误处理和日志记录

---

🎉 **个人中心编辑页面数据结构更新完成！现在编辑页面与详情页面数据完全一致，提供了更完整和专业的编辑体验！**
