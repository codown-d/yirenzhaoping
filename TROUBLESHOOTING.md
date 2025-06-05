# 故障排除指南

## 🐛 ChunkLoadError 解决方案

### 问题描述
```
ChunkLoadError
    at __webpack_require__.f.j (webpack.js:858:29)
    at Array.reduce (<anonymous>)
    at __webpack_require__.e (webpack.js:152:67)
    ...
```

这是一个常见的 Webpack 块加载错误，通常发生在开发环境中。

### 🔧 解决步骤

#### 1. 重启开发服务器
```bash
# 停止当前服务器 (Ctrl+C)
# 然后重新启动
npm run dev
```

#### 2. 清除 Next.js 缓存
```bash
# Windows PowerShell
Remove-Item -Recurse -Force .next

# macOS/Linux
rm -rf .next

# 然后重新启动
npm run dev
```

#### 3. 清除浏览器缓存
- 按 `Ctrl+Shift+R` (Windows) 或 `Cmd+Shift+R` (Mac) 强制刷新
- 或者在开发者工具中右键刷新按钮选择"清空缓存并硬性重新加载"

#### 4. 清除 npm 缓存（如果问题持续）
```bash
npm cache clean --force
```

#### 5. 重新安装依赖（最后手段）
```bash
# 删除 node_modules 和 package-lock.json
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json

# 重新安装
npm install
```

### 🚀 预防措施

#### 1. 避免在开发时频繁修改大量文件
- 一次只修改少量文件
- 保存后等待编译完成再继续修改

#### 2. 使用稳定的端口
在 `package.json` 中指定固定端口：
```json
{
  "scripts": {
    "dev": "next dev -p 3001"
  }
}
```

#### 3. 监控内存使用
如果项目较大，可以增加 Node.js 内存限制：
```json
{
  "scripts": {
    "dev": "node --max-old-space-size=4096 ./node_modules/.bin/next dev"
  }
}
```

### 📊 常见原因

1. **热重载冲突**：快速连续修改文件导致的模块加载冲突
2. **缓存问题**：过期的缓存文件导致的加载错误
3. **内存不足**：大型项目在开发时内存使用过高
4. **网络问题**：本地开发服务器的网络连接问题
5. **文件系统问题**：文件监听器的问题

### 🔍 调试技巧

#### 1. 检查控制台
打开浏览器开发者工具，查看 Console 和 Network 标签页的详细错误信息。

#### 2. 检查终端输出
观察 Next.js 开发服务器的终端输出，查找编译错误或警告。

#### 3. 逐步排查
如果问题持续存在：
1. 创建一个新的简单页面测试
2. 逐步添加组件和功能
3. 确定是哪个特定的更改导致了问题

### ✅ 验证修复

修复后，验证以下功能是否正常：

1. **首页加载**：`http://localhost:3001`
2. **筛选页面**：
   - `/filter/employer` - 招聘方筛选
   - `/filter/jobseeker` - 求职者筛选
3. **动态路由**：
   - `/job/1` - 职位详情
   - `/candidate/1` - 候选人详情
4. **个人中心**：
   - `/profile/employer` - 招聘方个人中心
   - `/profile/jobseeker` - 求职者个人中心

### 📞 获取帮助

如果问题仍然存在，请提供以下信息：

1. **错误的完整堆栈跟踪**
2. **浏览器和版本**
3. **Node.js 版本**：`node --version`
4. **npm 版本**：`npm --version`
5. **操作系统**
6. **最近的代码更改**

### 🎯 项目特定的解决方案

对于我们的艺人招聘平台项目：

#### 已知问题和解决方案

1. **Select 组件空值问题**
   - ✅ 已修复：将空字符串值替换为 "unlimited"

2. **三级联动状态管理**
   - ✅ 已优化：正确的状态重置和初始化

3. **静态导出配置**
   - ✅ 已配置：`generateStaticParams` 函数

#### 开发建议

1. **保存频率**：修改代码后等待编译完成再继续
2. **浏览器刷新**：如果页面显示异常，先尝试硬刷新
3. **终端监控**：始终关注开发服务器的输出信息

---

🔧 **记住：大多数 ChunkLoadError 都可以通过简单的重启和清除缓存来解决！**
