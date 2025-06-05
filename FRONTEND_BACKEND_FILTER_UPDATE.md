# 前台后台筛选功能更新说明

## 📋 更新概述

我们为求职者筛选页面和招聘方筛选页面都添加了前台后台的层级筛选功能，让用户可以更精确地筛选相关职位和人才。

## 🎯 求职者筛选页面更新 (`/filter/jobseeker`)

### 新增功能

1. **前台后台选择组件**
   - 添加了前台/后台切换按钮
   - 默认选择前台
   - 切换时自动清空已选择的职位类型

2. **动态职位类型列表**
   - **前台职位类型**：舞蹈演员、武术表演、杂技演员、声乐演员、器乐演奏、戏曲演员、主持人、模特
   - **后台职位类型**：导演、编剧、制片人、摄影师、灯光师、音响师、舞美设计、服装设计

3. **筛选条件管理**
   - 新增 `categoryType` 字段到筛选条件中
   - 支持保存和加载前台后台选择
   - 重置功能包含前台后台选择

### 技术实现

```typescript
// 状态管理
const [categoryType, setCategoryType] = useState<'frontend' | 'backend'>('frontend')

// 动态获取职位类型
const getCurrentJobTypes = () => {
  return categoryType === 'frontend' ? frontendJobTypes : backendJobTypes
}

// 筛选条件保存
const filters = {
  location,
  categoryType,
  jobTypes,
  salaryRange,
  employmentType,
  benefits,
}
```

## 🏢 招聘方筛选页面更新 (`/filter/employer`)

### 新增功能

1. **求职者类别选择组件**
   - 添加了前台/后台切换按钮
   - 默认选择前台
   - 切换时自动清空已选择的专业

2. **动态专业列表**
   - **前台专业**：古典舞、民族舞、芭蕾舞、现代舞、街舞、武术、杂技、声乐、器乐、戏曲、表演、主持、模特
   - **后台专业**：导演、编剧、制片、摄影、灯光、音响、舞美设计、服装设计、化妆造型、道具制作、后期制作、音效制作

3. **筛选条件管理**
   - 新增 `categoryType` 字段到筛选条件中
   - 支持保存和加载前台后台选择
   - 重置功能包含前台后台选择

### 技术实现

```typescript
// 状态管理
const [categoryType, setCategoryType] = useState<'frontend' | 'backend'>('frontend')

// 动态获取专业列表
const getCurrentSpecialties = () => {
  return categoryType === 'frontend' ? frontendSpecialties : backendSpecialties
}

// 筛选条件保存
const filters = {
  location,
  gender,
  categoryType,
  specialties,
  ageGroup,
  experience,
  education,
}
```

## 🏠 主页面更新

### 求职者主页面 (`/jobseeker`)

1. **筛选条件检查更新**
   - `hasActiveFilters()` 函数包含 `categoryType` 检查
   - 筛选条件计数包含前台后台选择

2. **已选条件显示**
   - 显示当前选择的前台/后台类别
   - 支持点击清除前台后台筛选

3. **清除筛选功能**
   - 新增 `categoryType` 清除逻辑
   - 清除时重置为前台

### 招聘方主页面 (`/employer`)

1. **筛选条件检查更新**
   - `hasActiveFilters()` 函数包含 `categoryType` 检查
   - 将 `ageRange` 更新为 `ageGroup` 以匹配筛选页面

2. **已选条件显示**
   - 显示当前选择的前台/后台类别
   - 支持点击清除前台后台筛选

3. **清除筛选功能**
   - 新增 `categoryType` 清除逻辑
   - 新增 `getAgeGroupText()` 函数格式化年龄段显示

## 🔄 数据兼容性

### 向后兼容
- 原有筛选数据结构保持不变
- 新增字段不影响现有功能

### 新增字段
- `categoryType`: 'frontend' | 'backend'
- 默认值为 'frontend'

### 存储格式
```json
{
  "location": ["北京-北京市-朝阳区"],
  "categoryType": "frontend",
  "jobTypes": ["舞蹈演员", "声乐演员"],
  "salaryRange": [10, 30],
  "employmentType": "full-time",
  "benefits": ["五险一金", "工作补贴"]
}
```

## 🎨 UI/UX 改进

### 切换按钮设计
- 使用灰色背景的切换容器
- 选中状态显示白色背景和阴影
- 悬停效果增强用户体验

### 交互逻辑
- 切换前台后台时自动清空相关选择
- 避免用户混淆不同类别的选项

### 响应式设计
- 切换按钮在移动端和桌面端都有良好的显示效果
- 保持与现有设计风格的一致性

## 🚀 使用方法

### 求职者使用流程
1. 进入求职者筛选页面
2. 选择前台或后台类别
3. 根据选择的类别选择相应的职位类型
4. 设置其他筛选条件
5. 点击确定应用筛选

### 招聘方使用流程
1. 进入招聘方筛选页面
2. 选择前台或后台类别
3. 根据选择的类别选择相应的专业
4. 设置其他筛选条件（性别、年龄段、经验、学历等）
5. 点击确定应用筛选

## 🔧 技术细节

### 状态管理
- 使用 React useState 管理前台后台选择
- 通过 useEffect 从 localStorage 加载保存的筛选条件

### 数据持久化
- 筛选条件保存到 localStorage
- 页面刷新后保持用户的选择

### 类型安全
- 使用 TypeScript 确保类型安全
- 定义明确的 'frontend' | 'backend' 联合类型

## ✅ 测试建议

1. **功能测试**
   - 测试前台后台切换功能
   - 验证职位类型/专业列表的动态更新
   - 确认筛选条件的保存和加载

2. **用户体验测试**
   - 测试切换时的清空逻辑
   - 验证筛选条件的显示和清除
   - 确认响应式设计在不同设备上的表现

3. **数据一致性测试**
   - 验证新旧数据格式的兼容性
   - 测试筛选条件的正确保存和读取

---

🎉 **更新完成！用户现在可以享受更精确的前台后台分类筛选功能！**
