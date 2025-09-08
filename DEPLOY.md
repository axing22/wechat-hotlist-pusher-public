# 🚀 完整部署指南

## 📋 部署概览

我们将使用以下组合实现完美的微信热搜推送系统：

- **Vercel** - 托管Web管理界面
- **GitHub Actions** - 执行定时推送任务
- **GitHub** - 代码仓库和自动化平台

## 🔧 部署步骤

### 第一步：创建GitHub仓库

1. **访问GitHub** - https://github.com
2. **创建新仓库** - 点击"New repository"
3. **仓库设置**：
   - 仓库名：`wechat-hotlist-pusher`
   - 设为Public（免费用户需要公开仓库才能使用Actions）
   - 不要初始化README（我们已有文件）

### 第二步：上传代码到GitHub

在当前目录执行以下命令：

```bash
# 初始化Git仓库
git init

# 添加所有文件
git add .

# 提交代码
git commit -m "初始化微信热搜推送项目"

# 添加远程仓库（替换为你的GitHub用户名）
git remote add origin https://github.com/你的用户名/wechat-hotlist-pusher.git

# 推送到GitHub
git push -u origin main
```

### 第三步：设置GitHub Secrets

在GitHub仓库页面：

1. **进入Settings** - 点击仓库的"Settings"标签
2. **找到Secrets** - 左侧菜单选择"Secrets and variables" → "Actions"
3. **添加以下Secrets**：

```
WXPUSHER_APP_TOKEN = 你的新WxPusher应用Token
WXPUSHER_UID = 你的WxPusher用户UID
TIANAPI_KEY = 你的新天行API密钥
```

### 第四步：部署到Vercel

#### 方法A：通过Vercel网站（推荐）

1. **访问Vercel** - https://vercel.com
2. **登录/注册** - 使用GitHub账号登录
3. **导入项目** - 点击"New Project"
4. **选择仓库** - 选择刚创建的`wechat-hotlist-pusher`仓库
5. **配置环境变量**：
   ```
   WXPUSHER_APP_TOKEN = AT_0Vto6XKRUoQbCX1RhC2OOoQoyTv1RL97
   WXPUSHER_UID = UID_EDLwNamjqKKwxWYQwZKO7hkVwi2s
   TIANAPI_KEY = f8ed3b4b4024a23fa3fd982afb0ea103
   TIANAPI_URL = https://apis.tianapi.com/wxhottopic/index
   PUSH_HOUR = 9
   PUSH_MINUTE = 0
   HOT_LIST_COUNT = 10
   ```
6. **部署** - 点击"Deploy"

#### 方法B：通过Vercel CLI

```bash
# 登录Vercel
vercel login

# 部署项目
vercel --prod

# 设置环境变量
vercel env add WXPUSHER_APP_TOKEN
vercel env add WXPUSHER_UID
vercel env add TIANAPI_KEY
```

### 第五步：启用GitHub Actions

1. **进入Actions** - 在GitHub仓库点击"Actions"标签
2. **启用工作流** - 如果提示启用，点击"I understand..."
3. **查看工作流** - 应该能看到"微信热搜榜定时推送"工作流

### 第六步：测试部署

#### 测试GitHub Actions
1. **手动触发** - 在Actions页面点击工作流，然后点击"Run workflow"
2. **查看日志** - 观察执行结果
3. **检查微信** - 确认收到推送消息

#### 测试Vercel部署
1. **访问网站** - 打开Vercel提供的URL
2. **测试功能** - 点击"测试推送"按钮
3. **检查界面** - 确认所有功能正常

## 🎯 部署完成后的功能

### 🤖 自动定时推送
- **时间**：每天北京时间上午9:00
- **内容**：前10条微信热搜
- **平台**：GitHub Actions执行
- **通知**：直接推送到你的微信

### 🌐 Web管理界面
- **访问**：通过Vercel提供的URL
- **功能**：手动推送、配置管理、实时热搜查看
- **优势**：随时随地访问和管理

### 📱 推送效果
- **格式**：HTML格式，美观易读
- **排名**：🥇🥈🥉前三名特殊标识
- **时间**：包含推送时间戳
- **来源**：标注数据来源

## 🔧 维护和管理

### 修改推送时间
1. **编辑文件**：`.github/workflows/push-hotlist.yml`
2. **修改cron**：`'0 1 * * *'` (UTC时间)
3. **提交更改**：推送到GitHub自动生效

### 修改推送内容
1. **编辑配置**：修改环境变量`HOT_LIST_COUNT`
2. **更新代码**：修改`pusher.js`中的格式化逻辑
3. **重新部署**：推送代码自动部署

### 查看运行日志
- **GitHub Actions**：在仓库的Actions页面查看
- **Vercel**：在Vercel Dashboard查看函数日志

## 🚨 故障排除

### 推送失败
1. **检查Secrets**：确认GitHub Secrets配置正确
2. **查看日志**：在Actions页面查看详细错误信息
3. **测试API**：确认WxPusher和天行API正常

### 网站无法访问
1. **检查部署**：在Vercel Dashboard查看部署状态
2. **查看日志**：检查构建和运行时日志
3. **重新部署**：尝试重新部署项目

## 🎉 恭喜！

部署完成后，你将拥有一个完全自动化的微信热搜推送系统：
- ⏰ 每天自动推送热搜
- 🌐 随时访问管理界面
- 📱 直接推送到微信
- ☁️ 完全云端运行，无需本地服务器

享受你的自动化热搜推送服务吧！ 🚀