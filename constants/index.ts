// 常量数据统一管理文件

// ==================== 地理位置数据 ====================

export const LOCATION_DATA: Record<string, Record<string, string[]>> = {
  北京市: {
    北京市: [
      "东城区",
      "西城区",
      "朝阳区",
      "丰台区",
      "石景山区",
      "海淀区",
      "门头沟区",
      "房山区",
      "通州区",
      "顺义区",
      "昌平区",
      "大兴区",
      "怀柔区",
      "平谷区",
      "密云区",
      "延庆区",
    ],
  },
  上海市: {
    上海市: [
      "黄浦区",
      "徐汇区",
      "长宁区",
      "静安区",
      "普陀区",
      "虹口区",
      "杨浦区",
      "闵行区",
      "宝山区",
      "嘉定区",
      "浦东新区",
      "金山区",
      "松江区",
      "青浦区",
      "奉贤区",
      "崇明区",
    ],
  },
  广东省: {
    广州市: [
      "荔湾区",
      "越秀区",
      "海珠区",
      "天河区",
      "白云区",
      "黄埔区",
      "番禺区",
      "花都区",
      "南沙区",
      "从化区",
      "增城区",
    ],
    深圳市: [
      "罗湖区",
      "福田区",
      "南山区",
      "宝安区",
      "龙岗区",
      "盐田区",
      "龙华区",
      "坪山区",
      "光明区",
      "大鹏新区",
    ],
    珠海市: ["香洲区", "斗门区", "金湾区"],
    东莞市: [
      "东城街道",
      "南城街道",
      "万江街道",
      "莞城街道",
      "石碣镇",
      "石龙镇",
      "茶山镇",
      "石排镇",
    ],
  },
  江苏省: {
    南京市: [
      "玄武区",
      "秦淮区",
      "建邺区",
      "鼓楼区",
      "浦口区",
      "栖霞区",
      "雨花台区",
      "江宁区",
      "六合区",
      "溧水区",
      "高淳区",
    ],
    苏州市: [
      "虎丘区",
      "吴中区",
      "相城区",
      "姑苏区",
      "吴江区",
      "常熟市",
      "张家港市",
      "昆山市",
      "太仓市",
    ],
    无锡市: [
      "锡山区",
      "惠山区",
      "滨湖区",
      "梁溪区",
      "新吴区",
      "江阴市",
      "宜兴市",
    ],
  },
  浙江省: {
    杭州市: [
      "上城区",
      "拱墅区",
      "西湖区",
      "滨江区",
      "萧山区",
      "余杭区",
      "临平区",
      "钱塘区",
      "富阳区",
      "临安区",
      "桐庐县",
      "淳安县",
      "建德市",
    ],
    宁波市: [
      "海曙区",
      "江北区",
      "北仑区",
      "镇海区",
      "鄞州区",
      "奉化区",
      "象山县",
      "宁海县",
      "余姚市",
      "慈溪市",
    ],
    温州市: [
      "鹿城区",
      "龙湾区",
      "瓯海区",
      "洞头区",
      "永嘉县",
      "平阳县",
      "苍南县",
      "文成县",
      "泰顺县",
      "瑞安市",
      "乐清市",
    ],
  },
  四川省: {
    成都市: [
      "锦江区",
      "青羊区",
      "金牛区",
      "武侯区",
      "成华区",
      "龙泉驿区",
      "青白江区",
      "新都区",
      "温江区",
      "双流区",
      "郫都区",
      "新津区",
    ],
    绵阳市: [
      "涪城区",
      "游仙区",
      "安州区",
      "江油市",
      "三台县",
      "盐亭县",
      "梓潼县",
      "北川羌族自治县",
      "平武县",
    ],
  },
};

// 简化城市列表（用于简单筛选）
export const CITIES = [
  "北京",
  "上海",
  "广州",
  "深圳",
  "成都",
  "杭州",
  "武汉",
  "西安",
  "南京",
  "重庆",
];

// ==================== 职位/专业分类数据 ====================

// 前台职位类型（求职者筛选用）
export const FRONTEND_JOB_TYPES = [
  "舞蹈演员",
  "武术表演",
  "杂技演员",
  "声乐演员",
  "器乐演奏",
  "戏曲演员",
  "主持人",
  "模特",
];

// 后台职位类型（求职者筛选用）
export const BACKEND_JOB_TYPES = [
  "导演",
  "编剧",
  "制片人",
  "摄影师",
  "灯光师",
  "音响师",
  "舞美设计",
  "服装设计",
];

// 运营职位类型（求职者筛选用）
export const OPERATIONS_JOB_TYPES = [
  "票务",
  "接待",
  "客服",
  "安全",
  "营销",
  "运营",
  "活动策划",
  "媒体宣传",
  "商务合作",
  "财务管理",
  "人事管理",
  "行政管理",
];

// 前台专业列表（招聘方筛选用）
export const FRONTEND_SPECIALTIES = [
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
];

// 后台专业列表（招聘方筛选用）
export const BACKEND_SPECIALTIES = [
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
];

// 运营专业列表（招聘方筛选用）
export const OPERATIONS_SPECIALTIES = [
  "票务",
  "接待",
  "客服",
  "安全",
  "营销",
  "运营",
  "活动策划",
  "媒体宣传",
  "商务合作",
  "财务管理",
  "人事管理",
  "行政管理",
];

// 发布页面用的分类（更详细）
export const FRONTEND_POST_CATEGORIES = [
  "舞蹈表演",
  "戏曲表演",
  "武术表演",
  "杂技表演",
  "声乐表演",
  "器乐表演",
  "话剧表演",
  "音乐剧表演",
  "影视表演",
  "商业演出",
  "教学培训",
  "其他",
];

export const BACKEND_POST_CATEGORIES = [
  "导演",
  "副导演",
  "执行导演",
  "编剧",
  "制片人",
  "制片助理",
  "摄影师",
  "摄像师",
  "灯光师",
  "音响师",
  "舞美设计",
  "服装设计",
];

// ==================== 主页分类展示数据 ====================
export const Actor_List=['舞蹈类','表演类','武术类','杂技类','音乐类','模特类']
let Icon_List=['🎭','💃','🥋','🤹','🎵','🎪']
// 三级分类展示数据结构
export const ALL_CATEGORIES_DISPLAY = {
  frontend: {
    name: "台前",
    icon: "🎭",
    count: 312,
    categories: [
      {
        name: "演员",
        count: 156,
        icon: "💃",
        children: Actor_List.map((item,index)=>({ name:item, count: 56, icon:Icon_List[index] }))
      },
      {
        name: "主持/互动",
        count: 156,
        icon: "🎤",
        children: [
          { name: "驻场主持人", count: 56, icon: "🎤" },
          { name: "角色扮演互动员", count: 56, icon: "🎭" },
          { name: "古装NPC", count: 44, icon: "👘" },
        ],
      },
    ],
  },
  backend: {
    name: "幕后",
    icon: "🎬",
    count: 245,
    categories: [
      {
        name: "艺术创作",
        count: 15,
        icon: "🎨",
        children: [
          { name: "导演", count: 15, icon: "🎬" },
          { name: "分幕编剧", count: 12, icon: "✍️" },
          { name: "舞蹈编排师", count: 8, icon: "💃" },
          { name: "服装设计师", count: 22, icon: "👗" },
          { name: "道具造型师", count: 22, icon: "🎭" },
          { name: "舞美设计师", count: 22, icon: "🎨" },
          { name: "特效设计师", count: 22, icon: "✨" },
        ],
      },
      {
        name: "技术制作",
        count: 15,
        icon: "⚙️",
        children: [
          { name: "灯光控制师", count: 15, icon: "💡" },
          { name: "音响工程师", count: 12, icon: "🔊" },
          { name: "舞台机械操作员", count: 8, icon: "⚙️" },
          { name: "焰火控制员", count: 22, icon: "🎆" },
          { name: "水景特效师", count: 22, icon: "💧" },
          { name: "多媒体投影师", count: 22, icon: "📽️" },
          { name: "道具制作师", count: 22, icon: "🔨" },
          { name: "武器维护员", count: 22, icon: "⚔️" },
          { name: "动物演员驯导师", count: 22, icon: "🐎" },
        ],
      },
      {
        name: "支持保障",
        count: 15,
        icon: "🛡️",
        children: [
          { name: "舞台监督", count: 15, icon: "👨‍💼" },
          { name: "演出场记", count: 12, icon: "📋" },
          { name: "替补演员", count: 8, icon: "🎭" },
        ],
      },
    ],
  },
  operations: {
    name: "运营",
    icon: "📊",
    count: 180,
    categories: [
      {
        name: "游客服务",
        count: 45,
        icon: "🤝",
        children: [
          { name: "票务", count: 15, icon: "🎫" },
          { name: "接待", count: 12, icon: "🤝" },
          { name: "客户服务", count: 18, icon: "📞" },
        ],
      },
      {
        name: "安全管理",
        count: 27,
        icon: "🛡️",
        children: [
          { name: "紧急救护员", count: 15, icon: "🚑" },
          { name: "设备安全检查员", count: 12, icon: "🔍" },
        ],
      },
      {
        name: "市场营销",
        count: 35,
        icon: "📢",
        children: [
          { name: "宣传策划", count: 15, icon: "📝" },
          { name: "新媒体运营", count: 12, icon: "📱" },
          { name: "票务渠道营销", count: 8, icon: "🎫" },
        ],
      },
      {
        name: "综合支持",
        count: 73,
        icon: "⚙️",
        children: [
          { name: "产品开发", count: 15, icon: "💡" },
          { name: "广告招商", count: 12, icon: "💰" },
          { name: "数据运营", count: 8, icon: "📊" },
          { name: "人力资源", count: 8, icon: "👥" },
          { name: "后勤", count: 15, icon: "📦" },
          { name: "工程维修", count: 15, icon: "🔧" },
        ],
      },
    ],
  },
};

// 保持向后兼容的单独导出
export const FRONTEND_CATEGORIES_DISPLAY = ALL_CATEGORIES_DISPLAY.frontend.categories;

export const BACKEND_CATEGORIES_DISPLAY = ALL_CATEGORIES_DISPLAY.backend.categories;

export const OPERATIONS_CATEGORIES_DISPLAY = ALL_CATEGORIES_DISPLAY.operations.categories;

// 招聘方主页分类展示数据
export const EMPLOYER_FRONTEND_CATEGORIES = [
  { name: "舞蹈", count: 156, icon: "💃" },
  { name: "武术", count: 89, icon: "🥋" },
  { name: "杂技", count: 67, icon: "🤹" },
  { name: "声乐", count: 134, icon: "🎵" },
  { name: "器乐", count: 98, icon: "🎼" },
  { name: "戏曲", count: 76, icon: "🎭" },
];

export const EMPLOYER_BACKEND_CATEGORIES = [
  { name: "导演", count: 45, icon: "🎬" },
  { name: "编剧", count: 32, icon: "✍️" },
  { name: "制片", count: 28, icon: "📋" },
  { name: "摄影", count: 56, icon: "📷" },
  { name: "灯光", count: 41, icon: "💡" },
  { name: "音响", count: 38, icon: "🔊" },
];

export const EMPLOYER_OPERATIONS_CATEGORIES = [
  { name: "票务", count: 25, icon: "🎫" },
  { name: "接待", count: 18, icon: "🤝" },
  { name: "客服", count: 22, icon: "📞" },
  { name: "安全", count: 15, icon: "🛡️" },
  { name: "营销", count: 28, icon: "📢" },
  { name: "运营", count: 35, icon: "⚙️" },
];

// ==================== 工作相关选项 ====================

// 工作性质
export const WORK_TYPES = ["全职", "兼职", "临时", "合同制", "实习"];

// 经验要求选项
export const EXPERIENCE_OPTIONS = [
  "不限",
  "应届生",
  "1年以内",
  "1-3年",
  "3-5年",
  "5年以上",
];

// 求职者经验选项（不包含"不限"）
export const JOBSEEKER_EXPERIENCE_OPTIONS = [
  "应届生",
  "1年以内",
  "1-3年",
  "3-5年",
  "5年以上",
];

// 学历选项
export const EDUCATION_OPTIONS = ["专科以下", "专科", "本科", "硕士", "博士"];

// 招聘方学历选项（包含"不限"）
export const EMPLOYER_EDUCATION_OPTIONS = [
  "不限",
  "中专",
  "大专",
  "本科",
  "硕士",
  "博士",
];

// 求职者学历选项（不包含"不限"）
export const JOBSEEKER_EDUCATION_OPTIONS = [
  "中专",
  "大专",
  "本科",
  "硕士",
  "博士",
];

// 年龄段选项
export const AGE_GROUP_OPTIONS = [
  { value: "unlimited", label: "不限" },
  { value: "under18", label: "18岁以下" },
  { value: "18-35", label: "18-35岁" },
  { value: "over35", label: "35岁以上" },
];

// 到岗时间选项
export const AVAILABILITY_OPTIONS = [
  "立即到岗",
  "1周内",
  "2周内",
  "1个月内",
  "面议",
];

// ==================== 福利待遇选项 ====================

// 福利待遇列表
export const BENEFIT_OPTIONS = [
  "五险一金",
  "工作补贴",
  "提供住宿",
  "培训机会",
  "国内出差",
  "国际出差",
  "项目奖金",
  "灵活工作",
];

// 招聘方发布职位用的福利选项（更全面）
export const EMPLOYER_BENEFIT_OPTIONS = [
  "五险一金",
  "包食宿",
  "交通补贴",
  "话费补贴",
  "年终奖",
  "绩效奖金",
  "带薪年假",
  "节日福利",
  "培训机会",
  "晋升空间",
  "团建活动",
  "健康体检",
  "弹性工作",
  "免费工作餐",
  "住房补贴",
  "出国机会",
];

// ==================== 技能和要求选项 ====================

// 常用技能标签
export const COMMON_SKILLS = [
  "古典舞",
  "民族舞",
  "芭蕾舞",
  "现代舞",
  "爵士舞",
  "街舞",
  "京剧",
  "昆曲",
  "豫剧",
  "越剧",
  "黄梅戏",
  "评剧",
  "太极拳",
  "长拳",
  "南拳",
  "剑术",
  "刀术",
  "棍术",
  "杂技",
  "魔术",
  "小丑表演",
  "高空表演",
];

// 常用优势标签
export const COMMON_ADVANTAGES = [
  "形象气质佳",
  "舞台经验丰富",
  "专业院校毕业",
  "获奖经历",
  "团队合作能力强",
  "责任心强",
  "能适应出差",
  "英语流利",
  "创新能力强",
  "学习能力强",
  "抗压能力强",
  "沟通能力强",
];

// 招聘要求标签
export const COMMON_REQUIREMENTS = [
  "形象气质佳",
  "舞台经验丰富",
  "专业院校毕业",
  "获奖经历",
  "团队合作能力强",
  "责任心强",
  "能适应出差",
  "英语流利",
  "创新能力强",
  "学习能力强",
  "抗压能力强",
  "沟通能力强",
  "身高要求",
  "年龄要求",
  "性别要求",
  "体重要求",
];

// ==================== 工具函数 ====================

// 获取省份列表
export const getProvinces = () => Object.keys(LOCATION_DATA);

// 获取城市列表
export const getCities = (province: string) => {
  return province ? Object.keys(LOCATION_DATA[province] || {}) : [];
};

// 获取区县列表
export const getDistricts = (province: string, city: string) => {
  return province && city ? LOCATION_DATA[province]?.[city] || [] : [];
};

// 根据类别获取职位类型
export const getJobTypesByCategory = (categoryType: "frontend" | "backend" | "operations") => {
  switch (categoryType) {
    case "frontend":
      return FRONTEND_JOB_TYPES;
    case "backend":
      return BACKEND_JOB_TYPES;
    case "operations":
      return OPERATIONS_JOB_TYPES;
    default:
      return FRONTEND_JOB_TYPES;
  }
};

// 根据类别获取专业列表
export const getSpecialtiesByCategory = (
  categoryType: "frontend" | "backend" | "operations"
) => {
  switch (categoryType) {
    case "frontend":
      return FRONTEND_SPECIALTIES;
    case "backend":
      return BACKEND_SPECIALTIES;
    case "operations":
      return OPERATIONS_SPECIALTIES;
    default:
      return FRONTEND_SPECIALTIES;
  }
};

// 根据类别获取发布页面分类
export const getPostCategoriesByType = (
  categoryType: "frontend" | "backend"
) => {
  return categoryType === "frontend"
    ? FRONTEND_POST_CATEGORIES
    : BACKEND_POST_CATEGORIES;
};

// 根据类别获取主页展示分类（求职者）
export const getJobseekerCategoriesByType = (
  categoryType: "frontend" | "backend"
) => {
  return categoryType === "frontend"
    ? FRONTEND_CATEGORIES_DISPLAY
    : BACKEND_CATEGORIES_DISPLAY;
};

// 根据类别获取主页展示分类（招聘方）
export const getEmployerCategoriesByType = (
  categoryType: "frontend" | "backend"
) => {
  return categoryType === "frontend"
    ? EMPLOYER_FRONTEND_CATEGORIES
    : EMPLOYER_BACKEND_CATEGORIES;
};

// 获取三级分类数据
export const getThreeLevelCategories = (categoryType: "frontend" | "backend" | "operations") => {
  return ALL_CATEGORIES_DISPLAY[categoryType];
};

// 获取所有三级分类数据
export const getAllThreeLevelCategories = () => {
  return ALL_CATEGORIES_DISPLAY;
};

// 格式化经验显示
export const getExperienceText = (exp: string) => {
  switch (exp) {
    case "0-1":
      return "应届/1年以内";
    case "1-3":
      return "1-3年";
    case "3-5":
      return "3-5年";
    case "5+":
      return "5年以上";
    default:
      return "";
  }
};

// 格式化年龄段显示
export const getAgeGroupText = (ageGroup: string) => {
  switch (ageGroup) {
    case "unlimited":
      return "不限";
    case "under18":
      return "18岁以下";
    case "18-35":
      return "18-35岁";
    case "over35":
      return "35岁以上";
    default:
      return "";
  }
};

// 格式化薪资显示
export const formatSalary = (value: number) => {
  if (value === 0) return "不限";
  if (value >= 50) return "50K+";
  return `${value}K`;
};

// 格式化工作性质
export const getEmploymentTypeText = (type: string) => {
  switch (type) {
    case "full-time":
      return "全职";
    case "part-time":
      return "兼职";
    case "temporary":
      return "临时";
    case "contract":
      return "合同制";
    default:
      return "";
  }
};

// ==================== 示例数据 ====================

// 求职者主页 - 招聘职位示例数据
export const SAMPLE_JOB_OPPORTUNITIES = [
  {
    id: 1,
    title: "大型音乐剧《猫》舞蹈演员",
    company: "星光文化传媒",
    location: "北京",
    salary: "8000-12000",
    type: "全职",
    tags: ["五险一金", "工作补贴", "培训机会"],
    description:
      "招聘专业舞蹈演员，要求有扎实的舞蹈基础，形象气质佳，有团队合作精神。",
    posted: "2天前",
    urgent: true,
    requiredMajor: "舞蹈表演专业",
    startTime: "立即到岗",
  },
  {
    id: 2,
    title: "武术指导及表演",
    company: "东方影视",
    location: "上海",
    salary: "10000-15000",
    type: "合同制",
    tags: ["影视经验", "高薪", "知名导演"],
    description: "知名导演新片招聘武术指导，要求有丰富的武术表演和指导经验。",
    posted: "1天前",
    urgent: false,
    requiredMajor: "武术与民族传统体育",
    startTime: "1周内到岗",
  },
  {
    id: 3,
    title: "儿童剧表演演员",
    company: "童话王国剧团",
    location: "广州",
    salary: "6000-8000",
    type: "兼职",
    tags: ["周末工作", "儿童剧", "轻松愉快"],
    description: "招聘儿童剧表演演员，要求喜欢孩子，表演生动有趣，周末工作。",
    posted: "3天前",
    urgent: false,
    requiredMajor: "表演专业",
    startTime: "2周内到岗",
  },
];

// 招聘方主页 - 求职者示例数据
export const SAMPLE_PERFORMERS = [
  {
    id: 1,
    name: "李小华",
    age: 25,
    specialty: "古典舞",
    experience: "3年",
    location: "北京",
    rating: 4.8,
    avatar: "/placeholder.svg?height=60&width=60",
    tags: ["专业院校", "获奖经历", "团队合作"],
    price: "800-1200/天",
    description:
      "毕业于北京舞蹈学院，擅长古典舞和民族舞，有丰富的舞台表演经验。",
    school: "北京舞蹈学院",
    major: "舞蹈表演专业",
  },
  {
    id: 2,
    name: "王明",
    age: 28,
    specialty: "武术",
    experience: "5年",
    location: "上海",
    rating: 4.9,
    avatar: "/placeholder.svg?height=60&width=60",
    tags: ["武术冠军", "影视经验", "教学经验"],
    price: "1000-1500/天",
    description:
      "全国武术冠军，参与过多部影视作品拍摄，具有丰富的武术指导经验。",
    school: "上海体育学院",
    major: "武术与民族传统体育",
  },
  {
    id: 3,
    name: "张雅琪",
    age: 23,
    specialty: "声乐",
    experience: "2年",
    location: "广州",
    rating: 4.7,
    avatar: "/placeholder.svg?height=60&width=60",
    tags: ["音乐学院", "美声唱法", "多语种"],
    price: "600-1000/天",
    description: "毕业于星海音乐学院，擅长美声和民族唱法，能演唱多种语言歌曲。",
    school: "星海音乐学院",
    major: "声乐表演专业",
  },
];

// 求职者主页 - Banner轮播数据
export const JOBSEEKER_BANNER_SLIDES = [
  {
    id: 1,
    title: "发现招聘职位",
    subtitle: "专业求职者招聘平台",
    description: "汇聚全国优质招聘职位，为您的艺术才华找到最佳工作机会",
    image: "/placeholder.svg?height=200&width=400",
    buttonText: "立即查看",
    backgroundColor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  },
  {
    id: 2,
    title: "丰富职位类型",
    subtitle: "覆盖各类表演领域",
    description: "舞台剧、音乐剧、舞蹈表演、影视拍摄等多种职位等你来",
    image: "/placeholder.svg?height=200&width=400",
    buttonText: "浏览职位",
    backgroundColor: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  },
  {
    id: 3,
    title: "专业成长平台",
    subtitle: "提升艺术技能",
    description: "与知名导演合作，参与优质项目，让您的艺术生涯更上一层楼",
    image: "/placeholder.svg?height=200&width=400",
    buttonText: "开始申请",
    backgroundColor: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  },
];

// 招聘方主页 - Banner轮播数据
export const EMPLOYER_BANNER_SLIDES = [
  {
    id: 1,
    title: "寻找优秀求职者",
    subtitle: "专业求职者招聘平台",
    description: "汇聚全国优秀艺术求职者，为您的招聘需求找到最合适的人才",
    image: "/placeholder.svg?height=200&width=400",
    buttonText: "立即招聘",
    backgroundColor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  },
  {
    id: 2,
    title: "海量人才资源",
    subtitle: "覆盖各类表演艺术",
    description: "舞蹈、戏曲、武术、杂技等各类专业求职者应有尽有",
    image: "/placeholder.svg?height=200&width=400",
    buttonText: "浏览人才",
    backgroundColor: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  },
  {
    id: 3,
    title: "高效匹配系统",
    subtitle: "智能推荐合适人选",
    description: "基于招聘需求智能匹配，快速找到符合要求的求职者",
    image: "/placeholder.svg?height=200&width=400",
    buttonText: "开始匹配",
    backgroundColor: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  },
];

// ==================== 个人资料示例数据 ====================

// 求职者个人资料示例数据
export const SAMPLE_JOBSEEKER_PROFILE = {
  name: "李小华",
  avatar: "/placeholder.svg?height=120&width=120",
  title: "专业古典舞演员",
  location: "北京市朝阳区",
  phone: "138****8888",
  email: "lixiaohua@example.com",
  experience: "3年",
  education: "北京舞蹈学院",
  skills: ["古典舞", "民族舞", "芭蕾基础", "现代舞"],
  isVerified: true,
  verificationDate: "2024-01-10",
  vipStatus: {
    isVip: true,
    level: "白金会员",
    expireDate: "2024-11-30",
    remainingDays: 267,
  },
  profileViews: 156,
  profileLikes: 89,
  applications: 12,
  interviews: 5,
  profileCompletion: 85,
};

// 招聘方个人资料示例数据
export const SAMPLE_EMPLOYER_PROFILE = {
  name: "张总",
  avatar: "/placeholder.svg?height=120&width=120",
  title: "东方歌舞团 - 人事总监",
  company: "东方歌舞团",
  location: "北京市朝阳区",
  phone: "138****9999",
  email: "zhang@dongfang.com",
  establishedYear: "1952年",
  employeeCount: "200-500人",
  industry: "文艺表演",
  isVerified: true,
  verificationDate: "2024-01-15",
  vipStatus: {
    isVip: true,
    level: "黄金会员",
    expireDate: "2024-12-31",
    remainingDays: 298,
  },
};

// 求职者详情页面示例数据"frontend" | "backend" | "operations"
export const SAMPLE_CANDIDATE_DETAIL_Frontend_1 = {
  id: 1,
  name: "李小华(台前演员)",
  age: 24,
  gender: "女",
  type: "舞蹈类",
  height: "160cm",
  weight: "50kg",
  major: "古典舞",
  location: "北京市朝阳区",
  school: "北京舞蹈学院",
  avatar: "/placeholder.svg?height=120&width=120",
  skills: ["古典舞", "民族舞", "芭蕾基础", "现代舞"],
  phone: "138****8888",
  email: "lixiaohua@example.com",
  introduction:
    "我是一名专业的古典舞演员，毕业于北京舞蹈学院。有5年的舞台表演经验，擅长古典舞、民族舞，并具备芭蕾舞基础。曾参与多个大型舞蹈演出，希望能加入专业团队，展示自己的舞蹈才华。",
  experience: [
    {
      company: "东方歌舞团",
      position: "舞蹈演员",
      duration: "2021.06 - 2024.03",
      description: "参与团队的国内外巡演，主要表演民族舞和古典舞节目",
    },
    {
      company: "星光艺术团",
      position: "舞蹈演员",
      duration: "2019.08 - 2021.05",
      description: "参与各类商业演出和文艺晚会",
    },
  ],
  education: [
    {
      school: "北京舞蹈学院",
      major: "中国古典舞表演",
      degree: "学士学位",
      duration: "2015.09 - 2019.06",
      gpa: "3.8/4.0",
      honors: ["优秀毕业生", "专业第一名"],
    },
  ],
  awards: ["全国舞蹈比赛金奖", "亚洲青年舞蹈家大赛银奖"],
  performances: ["《丝路花雨》主要舞者", "《梁祝》独舞", "《春江花月夜》群舞"],
  expectedSalary: "8000-12000",
  workType: "全职",
  videos: [
    {
      title: "古典舞《洛神赋》片段",
      thumbnail: "/placeholder.svg?height=200&width=300",
      url: "#",
    },
    {
      title: "民族舞《茉莉花》",
      thumbnail: "/placeholder.svg?height=200&width=300",
      url: "#",
    },
    {
      title: "现代舞表演片段",
      thumbnail: "/placeholder.svg?height=200&width=300",
      url: "#",
    },
  ],
  images: {
    stage: [
      {
        url: "/placeholder.svg?height=300&width=400",
        title: "《洛神赋》舞台表演",
        description: "2023年国家大剧院演出",
      },
      {
        url: "/placeholder.svg?height=300&width=400",
        title: "民族舞《茉莉花》",
        description: "亚洲文化节表演",
      },
      {
        url: "/placeholder.svg?height=300&width=400",
        title: "古典舞独舞",
        description: "个人代表作品",
      },
      {
        url: "/placeholder.svg?height=300&width=400",
        title: "现代舞表演",
        description: "个人代表作品",
      },
    ],
    training: [
      {
        url: "/placeholder.svg?height=300&width=400",
        title: "日常训练",
        description: "基本功练习",
      },
      {
        url: "/placeholder.svg?height=300&width=400",
        title: "排练现场",
        description: "新剧目排练",
      },
    ],
    awards: [
      {
        url: "/placeholder.svg?height=300&width=400",
        title: "全国舞蹈比赛颁奖",
        description: "获得金奖",
      },
      {
        url: "/placeholder.svg?height=300&width=400",
        title: "亚洲青年舞蹈家大赛",
        description: "银奖获得者",
      },
    ],
  },
};
export const SAMPLE_CANDIDATE_DETAIL_Frontend_2 = {
  id: 2,
  name: "李小华(台前非演员)",
  age: 24,
  gender: "女",
  type: "主持/互动",
  experienceYears: '三年行业经验',
  major: "主持",
  location: "北京市朝阳区",
  school: "北京学院",
  avatar: "/placeholder.svg?height=120&width=120",
  skills: ["音乐主持",],
  phone: "138****8888",
  email: "lixiaohua@example.com",
  introduction:
    "我是一名专业的古典舞演员，毕业于北京舞蹈学院。有5年的舞台表演经验，擅长古典舞、民族舞，并具备芭蕾舞基础。曾参与多个大型舞蹈演出，希望能加入专业团队，展示自己的舞蹈才华。",
  experience: [
    {
      company: "东方歌舞团",
      position: "舞蹈演员",
      duration: "2021.06 - 2024.03",
      description: "参与团队的国内外巡演，主要表演民族舞和古典舞节目",
    },
    {
      company: "星光艺术团",
      position: "舞蹈演员",
      duration: "2019.08 - 2021.05",
      description: "参与各类商业演出和文艺晚会",
    },
  ],
  education: [
    {
      school: "北京舞蹈学院",
      major: "中国古典舞表演",
      degree: "学士学位",
      duration: "2015.09 - 2019.06",
      gpa: "3.8/4.0",
      honors: ["优秀毕业生", "专业第一名"],
    },
  ],
  awards: ["全国舞蹈比赛金奖", "亚洲青年舞蹈家大赛银奖"],
  performances: ["《丝路花雨》主要舞者", "《梁祝》独舞", "《春江花月夜》群舞"],
  expectedSalary: "8000-12000",
  workType: "全职",
  videos: [
    {
      title: "古典舞《洛神赋》片段",
      thumbnail: "/placeholder.svg?height=200&width=300",
      url: "#",
    },
    {
      title: "民族舞《茉莉花》",
      thumbnail: "/placeholder.svg?height=200&width=300",
      url: "#",
    },
    {
      title: "现代舞表演片段",
      thumbnail: "/placeholder.svg?height=200&width=300",
      url: "#",
    },
  ],
  images: {
    stage: [
      {
        url: "/placeholder.svg?height=300&width=400",
        title: "《洛神赋》舞台表演",
        description: "2023年国家大剧院演出",
      },
      {
        url: "/placeholder.svg?height=300&width=400",
        title: "民族舞《茉莉花》",
        description: "亚洲文化节表演",
      },
      {
        url: "/placeholder.svg?height=300&width=400",
        title: "古典舞独舞",
        description: "个人代表作品",
      },
      {
        url: "/placeholder.svg?height=300&width=400",
        title: "现代舞表演",
        description: "个人代表作品",
      },
    ],
    training: [
      {
        url: "/placeholder.svg?height=300&width=400",
        title: "日常训练",
        description: "基本功练习",
      },
      {
        url: "/placeholder.svg?height=300&width=400",
        title: "排练现场",
        description: "新剧目排练",
      },
    ],
    awards: [
      {
        url: "/placeholder.svg?height=300&width=400",
        title: "全国舞蹈比赛颁奖",
        description: "获得金奖",
      },
      {
        url: "/placeholder.svg?height=300&width=400",
        title: "亚洲青年舞蹈家大赛",
        description: "银奖获得者",
      },
    ],
  },
};
export const SAMPLE_CANDIDATE_DETAIL_Backend = {
  id: 3,
  name: "李小华(幕后)",
  age: 24,
  gender: "女",
  type: "艺术创作类",
  experienceYears: '三年行业经验',
  major: "导演",
  location: "北京市朝阳区",
  school: "北京舞蹈学院",
  avatar: "/placeholder.svg?height=120&width=120",
  skills: ['xxx','xxx','xxx'],
  phone: "138****8888",
  email: "lixiaohua@example.com",
  introduction:
    "我是一名专业的古典舞演员，毕业于北京舞蹈学院。有5年的舞台表演经验，擅长古典舞、民族舞，并具备芭蕾舞基础。曾参与多个大型舞蹈演出，希望能加入专业团队，展示自己的舞蹈才华。",
  experience: [
    {
      company: "东方歌舞团",
      position: "舞蹈演员",
      duration: "2021.06 - 2024.03",
      description: "参与团队的国内外巡演，主要表演民族舞和古典舞节目",
    },
    {
      company: "星光艺术团",
      position: "舞蹈演员",
      duration: "2019.08 - 2021.05",
      description: "参与各类商业演出和文艺晚会",
    },
  ],
  education: [
    {
      school: "北京舞蹈学院",
      major: "中国古典舞表演",
      degree: "学士学位",
      duration: "2015.09 - 2019.06",
      gpa: "3.8/4.0",
      honors: ["优秀毕业生", "专业第一名"],
    },
  ],
  awards: ["全国舞蹈比赛金奖", "亚洲青年舞蹈家大赛银奖"],
  performances: ["《丝路花雨》主要舞者", "《梁祝》独舞", "《春江花月夜》群舞"],
  expectedSalary: "8000-12000",
  workType: "全职",
  videos: [
    {
      title: "古典舞《洛神赋》片段",
      thumbnail: "/placeholder.svg?height=200&width=300",
      url: "#",
    },
    {
      title: "民族舞《茉莉花》",
      thumbnail: "/placeholder.svg?height=200&width=300",
      url: "#",
    },
    {
      title: "现代舞表演片段",
      thumbnail: "/placeholder.svg?height=200&width=300",
      url: "#",
    },
  ],
  images: {
    stage: [
      {
        url: "/placeholder.svg?height=300&width=400",
        title: "《洛神赋》舞台表演",
        description: "2023年国家大剧院演出",
      },
      {
        url: "/placeholder.svg?height=300&width=400",
        title: "民族舞《茉莉花》",
        description: "亚洲文化节表演",
      },
      {
        url: "/placeholder.svg?height=300&width=400",
        title: "古典舞独舞",
        description: "个人代表作品",
      },
      {
        url: "/placeholder.svg?height=300&width=400",
        title: "现代舞表演",
        description: "个人代表作品",
      },
    ],
    training: [
      {
        url: "/placeholder.svg?height=300&width=400",
        title: "日常训练",
        description: "基本功练习",
      },
      {
        url: "/placeholder.svg?height=300&width=400",
        title: "排练现场",
        description: "新剧目排练",
      },
    ],
    awards: [
      {
        url: "/placeholder.svg?height=300&width=400",
        title: "全国舞蹈比赛颁奖",
        description: "获得金奖",
      },
      {
        url: "/placeholder.svg?height=300&width=400",
        title: "亚洲青年舞蹈家大赛",
        description: "银奖获得者",
      },
    ],
  },
};
export const SAMPLE_CANDIDATE_DETAIL_Operations = {
  id: 4,
  name: "李小华(运营)",
  age: 24,
  gender: "女",
  type: "游客服务类",
  experienceYears: '三年行业经验',
  major: "票务",
  location: "北京市朝阳区",
  school: "北京舞蹈学院",
  avatar: "/placeholder.svg?height=120&width=120",
  skills: ['xxx','xxx','xxx','xxx'],
  phone: "138****8888",
  email: "lixiaohua@example.com",
  introduction:
    "我是一名专业的古典舞演员，毕业于北京舞蹈学院。有5年的舞台表演经验，擅长古典舞、民族舞，并具备芭蕾舞基础。曾参与多个大型舞蹈演出，希望能加入专业团队，展示自己的舞蹈才华。",
  experience: [
    {
      company: "东方歌舞团",
      position: "舞蹈演员",
      duration: "2021.06 - 2024.03",
      description: "参与团队的国内外巡演，主要表演民族舞和古典舞节目",
    },
    {
      company: "星光艺术团",
      position: "舞蹈演员",
      duration: "2019.08 - 2021.05",
      description: "参与各类商业演出和文艺晚会",
    },
  ],
  education: [
    {
      school: "北京舞蹈学院",
      major: "中国古典舞表演",
      degree: "学士学位",
      duration: "2015.09 - 2019.06",
      gpa: "3.8/4.0",
      honors: ["优秀毕业生", "专业第一名"],
    },
  ],
  awards: ["全国舞蹈比赛金奖", "亚洲青年舞蹈家大赛银奖"],
  performances: ["《丝路花雨》主要舞者", "《梁祝》独舞", "《春江花月夜》群舞"],
  expectedSalary: "8000-12000",
  workType: "全职",
  videos: [
    {
      title: "古典舞《洛神赋》片段",
      thumbnail: "/placeholder.svg?height=200&width=300",
      url: "#",
    },
    {
      title: "民族舞《茉莉花》",
      thumbnail: "/placeholder.svg?height=200&width=300",
      url: "#",
    },
    {
      title: "现代舞表演片段",
      thumbnail: "/placeholder.svg?height=200&width=300",
      url: "#",
    },
  ],
  images: {
    stage: [
      {
        url: "/placeholder.svg?height=300&width=400",
        title: "《洛神赋》舞台表演",
        description: "2023年国家大剧院演出",
      },
      {
        url: "/placeholder.svg?height=300&width=400",
        title: "民族舞《茉莉花》",
        description: "亚洲文化节表演",
      },
      {
        url: "/placeholder.svg?height=300&width=400",
        title: "古典舞独舞",
        description: "个人代表作品",
      },
      {
        url: "/placeholder.svg?height=300&width=400",
        title: "现代舞表演",
        description: "个人代表作品",
      },
    ],
    training: [
      {
        url: "/placeholder.svg?height=300&width=400",
        title: "日常训练",
        description: "基本功练习",
      },
      {
        url: "/placeholder.svg?height=300&width=400",
        title: "排练现场",
        description: "新剧目排练",
      },
    ],
    awards: [
      {
        url: "/placeholder.svg?height=300&width=400",
        title: "全国舞蹈比赛颁奖",
        description: "获得金奖",
      },
      {
        url: "/placeholder.svg?height=300&width=400",
        title: "亚洲青年舞蹈家大赛",
        description: "银奖获得者",
      },
    ],
  },
};

// 职位详情页面示例数据
export const SAMPLE_JOB_DETAIL = {
  id: 1,
  title: "民族舞演员",
  company: "东方歌舞团",
  salary: "8K-15K",
  location: "北京市海淀区",
  experience: "3-5年",
  education: "舞蹈相关专业",
  type: "全职",
  performanceType: "民族舞",
  startTime: "立即到岗",
  workSchedule: {
    workDays: "周一至周六",
    workHours: "9:00-18:00",
    rehearsalTime: "19:00-21:00",
    overtime: "演出期间需要",
    restDay: "周日",
    flexibleSchedule: true,
  },
  requirements: [
    "民族舞",
    "3年经验",
    "形象佳",
    "身高165cm以上",
    "有团队合作经验",
  ],
  benefits: ["五险一金", "演出补贴", "舞台机会多", "国内外巡演", "专业培训"],
  description: `我们正在寻找有经验的民族舞演员加入我们的团队。您将参与团队的常规演出和国内外巡演活动。

职责包括：
• 参与团队日常排练
• 出演各类民族舞蹈节目
• 参与国内外巡演和文艺演出
• 配合编导完成新节目的创作
• 参与团队宣传活动

工作时间安排：
• 工作日：周一至周六 9:00-18:00
• 晚间排练：19:00-21:00（根据演出安排）
• 休息日：周日（演出期间可能调整）
• 演出期间：根据演出时间安排，可能包含晚间和周末
• 巡演期间：根据行程安排，时间相对灵活

要求：
• 3年以上专业民族舞表演经验
• 舞蹈相关专业毕业
• 形象气质佳，身高165cm以上
• 有较强的舞台表现力和团队合作精神
• 能适应巡演生活和灵活的工作时间安排`,
  companyInfo: {
    name: "东方歌舞团",
    industry: "表演艺术",
    size: "50-100人",
    founded: "1995年",
    description:
      "东方歌舞团是一家专业的表演艺术团体，致力于中国传统舞蹈的传承与创新，常年在国内外进行巡演活动。",
    address: "北京市海淀区文化艺术中心",
    website: "www.dongfangdance.com",
  },
  upcomingProjects: [
    {
      name: "《锦绣中华》民族舞蹈专场",
      date: "2024-06-15",
      location: "北京国家大剧院",
    },
    {
      name: "亚洲文化艺术节巡演",
      date: "2024-07-20",
      location: "多个亚洲国家",
    },
  ],
  images: [
    "/placeholder.svg?height=200&width=300",
    "/placeholder.svg?height=200&width=300",
    "/placeholder.svg?height=200&width=300",
    "/placeholder.svg?height=200&width=300",
  ],
};

// ==================== 消息页面示例数据 ====================

// 聊天对话示例数据
export const SAMPLE_CONVERSATIONS = [
  {
    id: 1,
    name: "东方歌舞团",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "您好，我们对您的简历很感兴趣，希望能进一步沟通",
    time: "10:30",
    unread: 2,
    type: "employer",
    online: true,
  },
  {
    id: 2,
    name: "李小华",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "谢谢您的指导，我会继续努力练习的",
    time: "昨天",
    unread: 0,
    type: "performer",
    online: false,
  },
  {
    id: 3,
    name: "星光马戏团",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "面试时间定在明天下午2点，请准时参加",
    time: "昨天",
    unread: 1,
    type: "employer",
    online: true,
  },
];

// 系统消息示例数据
export const SAMPLE_SYSTEM_MESSAGES = [
  {
    id: 1,
    title: "简历被查看",
    content: "您的简历被东方歌舞团查看了",
    time: "2小时前",
    type: "view",
  },
  {
    id: 2,
    title: "新的职位推荐",
    content: "为您推荐了3个新的招聘职位",
    time: "1天前",
    type: "recommendation",
  },
  {
    id: 3,
    title: "面试邀请",
    content: "中央芭蕾舞团邀请您参加面试",
    time: "3小时前",
    type: "interview",
  },
  {
    id: 4,
    title: "简历更新提醒",
    content: "您的简历已超过30天未更新，建议及时更新",
    time: "2天前",
    type: "reminder",
  },
];

// ==================== 论坛页面示例数据 ====================

// 热门话题示例数据
export const SAMPLE_FORUM_TOPICS = [
  { id: 1, name: "舞蹈技巧", count: 234 },
  { id: 2, name: "招聘信息", count: 156 },
  { id: 3, name: "武术交流", count: 142 },
  { id: 4, name: "杂技表演", count: 89 },
  { id: 5, name: "音乐分享", count: 176 },
  { id: 6, name: "戏曲表演", count: 98 },
  { id: 7, name: "求职心得", count: 67 },
  { id: 8, name: "面试经验", count: 123 },
];

// 论坛帖子示例数据
export const SAMPLE_FORUM_POSTS = [
  {
    id: 1,
    author: {
      name: "舞蹈小王子",
      avatar: "/placeholder.svg?height=40&width=40",
      title: "古典舞演员",
    },
    content:
      "刚刚结束了一场大型演出，分享一下我的心得体会。这次演出是《丝路花雨》的重排版，我担任主要舞者之一。排练了两个月，每天8小时的高强度训练，但看到观众的反响，一切都值得了...",
    images: [
      "/placeholder.svg?height=150&width=200",
      "/placeholder.svg?height=150&width=200",
    ],
    topics: ["舞蹈技巧", "招聘信息"],
    likes: 128,
    comments: 45,
    shares: 12,
    time: "2小时前",
    isLiked: false,
  },
  {
    id: 2,
    author: {
      name: "武术达人",
      avatar: "/placeholder.svg?height=40&width=40",
      title: "武术求职者",
    },
    content:
      "给大家分享一个武术表演中的小技巧：如何在长拳表演中提高爆发力。我觉得最重要的是呼吸节奏和发力点的掌握，还有就是要保持身体的协调性...",
    topics: ["武术交流"],
    likes: 89,
    comments: 23,
    shares: 8,
    time: "4小时前",
    isLiked: true,
  },
  {
    id: 3,
    author: {
      name: "戏曲新人",
      avatar: "/placeholder.svg?height=40&width=40",
      title: "京剧学员",
    },
    content:
      "刚入门京剧不久，想请教一下各位前辈关于唱腔练习的问题。我在练习《贵妃醉酒》的时候总是感觉气息不够，有什么好的练习方法吗？",
    topics: ["戏曲表演", "求职心得"],
    likes: 56,
    comments: 18,
    shares: 5,
    time: "6小时前",
    isLiked: false,
  },
  {
    id: 4,
    author: {
      name: "杂技小能手",
      avatar: "/placeholder.svg?height=40&width=40",
      title: "杂技演员",
    },
    content:
      "今天成功完成了一个新的高难度动作！经过三个月的练习，终于可以稳定完成三层人塔了。感谢团队的支持和教练的指导。",
    images: ["/placeholder.svg?height=150&width=200"],
    topics: ["杂技表演"],
    likes: 92,
    comments: 31,
    shares: 15,
    time: "1天前",
    isLiked: false,
  },
];

// ==================== 个人中心页面示例数据 ====================

// 求职者个人中心完整数据
export const SAMPLE_JOBSEEKER_PROFILE_COMPLETE = {
  name: "李小华",
  avatar: "/placeholder.svg?height=120&width=120",
  title: "专业古典舞演员",
  location: "北京市朝阳区",
  phone: "138****8888",
  email: "lixiaohua@example.com",
  experience: "3年",
  education: "北京舞蹈学院",
  skills: ["古典舞", "民族舞", "芭蕾基础", "现代舞"],
  isVerified: true,
  verificationDate: "2024-01-10",
  vipStatus: {
    isVip: true,
    level: "白金会员",
    expireDate: "2024-11-30",
    remainingDays: 267,
  },
  profileViews: 156,
  profileLikes: 89,
  applications: 12,
  interviews: 5,
  profileCompletion: 85,
  recentActivities: [
    { type: "application", content: "申请了《梁祝》主演职位", time: "2小时前" },
    { type: "view", content: "东方歌舞团查看了您的简历", time: "5小时前" },
    { type: "like", content: "星光艺术团关注了您", time: "1天前" },
    { type: "update", content: "更新了个人作品集", time: "2天前" },
  ],
  savedJobs: [
    {
      id: 1,
      title: "古典舞演员",
      company: "东方歌舞团",
      location: "北京",
      salary: "8K-15K",
      posted: "2天前",
    },
    {
      id: 2,
      title: "舞蹈教师",
      company: "艺术培训中心",
      location: "上海",
      salary: "6K-10K",
      posted: "1周前",
    },
  ],
  myApplications: [
    {
      id: 1,
      title: "民族舞演员",
      company: "中央民族歌舞团",
      status: "面试中",
      appliedDate: "2024-01-15",
      statusColor: "bg-blue-500",
    },
    {
      id: 2,
      title: "古典舞独舞演员",
      company: "国家大剧院",
      status: "已投递",
      appliedDate: "2024-01-10",
      statusColor: "bg-yellow-500",
    },
  ],
  followedCompanies: [
    {
      id: 1,
      name: "东方歌舞团",
      logo: "/placeholder.svg?height=40&width=40",
      industry: "表演艺术",
      location: "北京",
      followDate: "2024-01-10",
      isActive: true,
      newJobs: 3,
    },
    {
      id: 2,
      name: "中央芭蕾舞团",
      logo: "/placeholder.svg?height=40&width=40",
      industry: "表演艺术",
      location: "北京",
      followDate: "2024-01-08",
      isActive: true,
      newJobs: 1,
    },
    {
      id: 3,
      name: "上海歌剧院",
      logo: "/placeholder.svg?height=40&width=40",
      industry: "表演艺术",
      location: "上海",
      followDate: "2024-01-05",
      isActive: false,
      newJobs: 0,
    },
  ],
  messages: [
    {
      id: 1,
      type: "system",
      title: "简历被查看",
      content: "您的简历被东方歌舞团查看了",
      time: "2024-01-20 14:30",
      isRead: false,
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 2,
      type: "interview",
      title: "面试邀请",
      content: "中央芭蕾舞团邀请您参加面试",
      time: "2024-01-19 10:15",
      isRead: false,
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 3,
      type: "system",
      title: "职位推荐",
      content: "为您推荐了3个匹配的职位",
      time: "2024-01-18 09:00",
      isRead: true,
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 4,
      type: "message",
      title: "私信消息",
      content: "某艺术团向您发送了私信",
      time: "2024-01-17 16:45",
      isRead: true,
      avatar: "/placeholder.svg?height=32&width=32",
    },
  ],
  collections: [
    {
      id: 1,
      type: "job",
      title: "民族舞演员",
      company: "东方歌舞团",
      location: "北京",
      salary: "8K-15K",
      collectedDate: "2024-01-15",
      status: "招聘中",
    },
    {
      id: 2,
      type: "job",
      title: "芭蕾舞演员",
      company: "中央芭蕾舞团",
      location: "北京",
      salary: "12K-20K",
      collectedDate: "2024-01-12",
      status: "招聘中",
    },
    {
      id: 3,
      type: "company",
      title: "上海歌剧院",
      description: "国际知名歌剧院",
      location: "上海",
      collectedDate: "2024-01-10",
      status: "活跃",
    },
  ],
  browsingHistory: [
    {
      id: 1,
      type: "job",
      title: "现代舞演员",
      company: "某现代舞团",
      location: "深圳",
      salary: "10K-18K",
      viewDate: "2024-01-20 15:30",
      viewCount: 3,
    },
    {
      id: 2,
      type: "job",
      title: "舞蹈编导",
      company: "艺术学院",
      location: "广州",
      salary: "15K-25K",
      viewDate: "2024-01-19 11:20",
      viewCount: 1,
    },
    {
      id: 3,
      type: "company",
      title: "北京现代舞团",
      description: "专业现代舞团体",
      location: "北京",
      viewDate: "2024-01-18 14:15",
      viewCount: 2,
    },
    {
      id: 4,
      type: "job",
      title: "音乐剧演员",
      company: "某音乐剧公司",
      location: "上海",
      salary: "12K-22K",
      viewDate: "2024-01-17 09:45",
      viewCount: 1,
    },
  ],
};

// 招聘方个人中心完整数据
export const SAMPLE_EMPLOYER_PROFILE_COMPLETE = {
  name: "张总",
  avatar: "/placeholder.svg?height=120&width=120",
  title: "东方歌舞团 - 人事总监",
  company: "东方歌舞团",
  location: "北京市朝阳区",
  phone: "138****9999",
  email: "zhang@dongfang.com",
  establishedYear: "1952年",
  employeeCount: "200-500人",
  industry: "文艺表演",
  isVerified: true,
  verificationDate: "2024-01-15",
  vipStatus: {
    isVip: true,
    level: "黄金会员",
    expireDate: "2024-12-31",
    remainingDays: 298,
  },
  profileViews: 234,
  jobViews: 1580,
  applications: 89,
  interviews: 23,
  profileCompletion: 92,
  recentActivities: [
    { type: "post", content: "发布了《梁祝》主演招聘", time: "1小时前" },
    { type: "view", content: "查看了李小华的简历", time: "3小时前" },
    { type: "interview", content: "安排了王明的面试", time: "5小时前" },
    { type: "update", content: "更新了公司介绍", time: "1天前" },
  ],
  activeJobs: [
    {
      id: 1,
      title: "古典舞演员",
      department: "表演部",
      applications: 15,
      views: 156,
      posted: "3天前",
      status: "招聘中",
      urgent: true,
    },
    {
      id: 2,
      title: "民族舞编导",
      department: "创作部",
      applications: 8,
      views: 89,
      posted: "1周前",
      status: "招聘中",
      urgent: false,
    },
  ],
  candidates: [
    {
      id: 1,
      name: "李小华",
      title: "古典舞演员",
      experience: "3年",
      education: "北京舞蹈学院",
      status: "待面试",
      appliedFor: "古典舞演员",
      appliedDate: "2024-01-15",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      name: "王明",
      title: "武术表演",
      experience: "5年",
      education: "上海戏剧学院",
      status: "已面试",
      appliedFor: "武术指导",
      appliedDate: "2024-01-12",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ],
  followedCandidates: [
    {
      id: 1,
      name: "李小华",
      title: "专业古典舞演员",
      avatar: "/placeholder.svg?height=40&width=40",
      experience: "3年",
      education: "北京舞蹈学院",
      location: "北京",
      followDate: "2024-01-10",
      isActive: true,
      lastActive: "2小时前",
    },
    {
      id: 2,
      name: "王明",
      title: "武术表演专家",
      avatar: "/placeholder.svg?height=40&width=40",
      experience: "5年",
      education: "上海戏剧学院",
      location: "上海",
      followDate: "2024-01-08",
      isActive: true,
      lastActive: "1天前",
    },
    {
      id: 3,
      name: "张丽",
      title: "民族舞编导",
      avatar: "/placeholder.svg?height=40&width=40",
      experience: "4年",
      education: "中央民族大学",
      location: "北京",
      followDate: "2024-01-05",
      isActive: false,
      lastActive: "1周前",
    },
  ],
  messages: [
    {
      id: 1,
      type: "application",
      title: "新的简历投递",
      content: "李小华申请了古典舞演员职位",
      time: "2024-01-20 14:30",
      isRead: false,
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 2,
      type: "system",
      title: "职位推广",
      content: "您的职位已被推荐给50位匹配候选人",
      time: "2024-01-19 10:15",
      isRead: false,
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 3,
      type: "interview",
      title: "面试提醒",
      content: "明天下午2点与王明的面试",
      time: "2024-01-18 09:00",
      isRead: true,
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 4,
      type: "message",
      title: "候选人咨询",
      content: "张丽询问了职位详情",
      time: "2024-01-17 16:45",
      isRead: true,
      avatar: "/placeholder.svg?height=32&width=32",
    },
  ],
  collections: [
    {
      id: 1,
      type: "candidate",
      name: "李小华",
      title: "专业古典舞演员",
      avatar: "/placeholder.svg?height=40&width=40",
      experience: "3年",
      education: "北京舞蹈学院",
      location: "北京",
      collectedDate: "2024-01-15",
      status: "求职中",
    },
    {
      id: 2,
      type: "candidate",
      name: "王明",
      title: "武术表演专家",
      avatar: "/placeholder.svg?height=40&width=40",
      experience: "5年",
      education: "上海戏剧学院",
      location: "上海",
      collectedDate: "2024-01-12",
      status: "求职中",
    },
    {
      id: 3,
      type: "template",
      title: "舞蹈演员招聘模板",
      description: "适用于各类舞蹈演员招聘",
      collectedDate: "2024-01-10",
      status: "可用",
    },
  ],
  browsingHistory: [
    {
      id: 1,
      type: "candidate",
      name: "张丽",
      title: "民族舞编导",
      avatar: "/placeholder.svg?height=40&width=40",
      experience: "4年",
      education: "中央民族大学",
      location: "北京",
      viewDate: "2024-01-20 15:30",
      viewCount: 2,
    },
    {
      id: 2,
      type: "candidate",
      name: "刘强",
      title: "现代舞演员",
      avatar: "/placeholder.svg?height=40&width=40",
      experience: "2年",
      education: "北京舞蹈学院",
      location: "北京",
      viewDate: "2024-01-19 11:20",
      viewCount: 1,
    },
    {
      id: 3,
      type: "template",
      title: "音乐剧演员招聘模板",
      description: "专业音乐剧演员招聘模板",
      viewDate: "2024-01-18 14:15",
      viewCount: 3,
    },
    {
      id: 4,
      type: "candidate",
      name: "陈美",
      title: "芭蕾舞演员",
      avatar: "/placeholder.svg?height=40&width=40",
      experience: "6年",
      education: "上海戏剧学院",
      location: "上海",
      viewDate: "2024-01-17 09:45",
      viewCount: 1,
    },
  ],
};
