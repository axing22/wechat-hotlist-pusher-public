# 微信热搜榜定时推送工具

这是一个基于 Node.js 的微信热搜榜定时推送工具，使用天行API获取热搜数据，通过WxPusher推送到微信。

## ✨ 功能特点

- 🕒 **定时推送**：每天指定时间自动推送热搜榜
- 📱 **微信接收**：通过WxPusher直接推送到微信
- 🎯 **可配置**：支持自定义推送时间和热搜数量
- 🚀 **简单易用**：一键启动，自动运行
- 🛠️ **完善测试**：提供多种测试工具确保功能正常
- 🌐 **Web管理**：内置Web界面管理推送服务

## 🚀 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

项目已自动创建 `.env` 文件，请编辑并填入你的配置信息：

```env
# WxPusher配置
WXPUSHER_APP_TOKEN=你的WxPusher应用Token
WXPUSHER_UID=你的WxPusher用户UID

# 天行API配置
TIANAPI_KEY=你的天行API密钥
TIANAPI_URL=https://apis.tianapi.com/wxhottopic/index

# 推送配置
PUSH_HOUR=9          # 推送时间（小时）
PUSH_MINUTE=0        # 推送时间（分钟）
HOT_LIST_COUNT=10    # 推送热搜数量
```

### 3. 获取配置信息

如果你不知道如何获取配置信息，运行配置向导：

```bash
node setup-guide.js
```

### 4. 测试配置

验证配置是否正确：

```bash
node test-config.js
```

### 5. 启动服务

```bash
# 测试推送
npm run test

# 启动定时服务
npm start

# 启动Web管理界面
npm run web
```

## 📋 配置说明

### WxPusher配置

1. 访问 [WxPusher官网](https://wxpusher.zjiecode.com/)
2. 微信扫码登录
3. 点击"应用管理" → "新建应用"
4. 填写应用名称，获取 `APP_TOKEN`
5. 微信关注你创建的应用
6. 在"用户管理"中查看你的 `UID`

### 天行API配置

1. 访问 [天行API](https://www.tianapi.com/)
2. 注册账号并实名认证
3. 在控制台获取 `API_KEY`
4. 确保有足够的调用次数

## 🛠️ 使用方法

### 命令行模式

```bash
# 测试模式（立即推送一次）
node index.js --test

# 正常运行（启动定时任务）
node index.js

# 测试代码逻辑
node test-logic.js

# 诊断WxPusher连接
node diagnose-wxpusher.js
```

### Web管理界面

```bash
# 启动Web服务（端口3000）
npm run web
```

访问 `http://localhost:3000` 进行可视化管理。

### PM2管理（推荐生产环境）

```bash
# 安装PM2
npm install -g pm2

# 启动服务
pm2 start index.js --name "wechat-hotlist"

# 查看状态
pm2 status

# 查看日志
pm2 logs wechat-hotlist

# 停止服务
pm2 stop wechat-hotlist
```

## 📁 项目结构

```
wechat-hotlist-pusher/
├── index.js              # 主程序文件
├── pusher.js             # 推送器类（优化版）
├── server.js             # Web服务器
├── package.json          # 项目配置
├── .env                  # 环境变量配置
├── .env.example          # 配置示例
├── README.md             # 使用说明
├── TEST_REPORT.md        # 测试报告
├── 测试工具/
│   ├── setup-guide.js    # 配置获取向导
│   ├── test-config.js    # 配置验证测试
│   ├── test-logic.js     # 代码逻辑测试
│   ├── test-wxpusher.js  # WxPusher测试
│   ├── diagnose-wxpusher.js # WxPusher诊断
│   ├── check-message-delivery.js # 消息投递检查
│   └── get-correct-uid.js # UID获取工具
├── public/               # Web界面静态资源
├── src/                  # 前端源码
└── dist/                 # 构建输出
```

## 🧪 测试工具

项目提供了完整的测试工具集：

| 工具 | 命令 | 功能 |
|------|------|------|
| 配置向导 | `node setup-guide.js` | 查看配置获取步骤 |
| 配置测试 | `node test-config.js` | 验证所有配置是否正确 |
| 逻辑测试 | `node test-logic.js` | 测试代码逻辑和格式化 |
| WxPusher测试 | `node test-wxpusher.js` | 测试WxPusher连接 |
| 完整诊断 | `node diagnose-wxpusher.js` | WxPusher完整诊断 |
| 消息检查 | `node check-message-delivery.js` | 检查消息投递状态 |
| UID获取 | `node get-correct-uid.js` | 获取正确的用户UID |

## 🔧 最新修复

### ✅ 已修复的问题（2025/9/8）

1. **依赖包缺失** - 已安装所有必要的npm包
2. **配置文件缺失** - 已创建.env配置文件
3. **API请求格式错误** - 修复了天行API的请求方式
4. **缺少配置验证** - 添加了配置完整性检查
5. **错误处理不完善** - 改进了日志和错误提示

### 🧪 测试结果

- **代码逻辑测试**: ✅ 通过
- **内容格式化**: ✅ 正常工作
- **定时任务**: ✅ 表达式正确
- **错误处理**: ✅ 完善

## 📊 推送示例

推送到微信的内容格式：

```
📱 微信热搜榜 (2025/09/08 09:00)

🥇 热搜标题1
🥈 热搜标题2  
🥉 热搜标题3
4. 热搜标题4
5. 热搜标题5
...

数据来源：天行API
```

## ⚠️ 注意事项

1. **网络要求**：确保能够访问天行API和WxPusher服务
2. **API限制**：天行API有调用次数限制，请合理设置推送频率
3. **安全性**：保护好API密钥和Token，不要泄露给他人
4. **稳定性**：建议使用PM2等进程管理工具保证服务稳定运行
5. **时区设置**：定时任务使用Asia/Shanghai时区

## 🔍 故障排除

### 常见问题及解决方案

#### 1. 推送失败
```bash
# 运行完整诊断
node diagnose-wxpusher.js

# 检查配置
node test-config.js
```

**可能原因**：
- APP_TOKEN或UID不正确
- 网络连接问题
- 用户未关注WxPusher应用

#### 2. 获取数据失败
```bash
# 测试天行API连接
node test-config.js
```

**可能原因**：
- API_KEY无效或过期
- API调用次数超限
- 网络连接问题

#### 3. 定时任务不执行
**检查项目**：
- 时区设置（Asia/Shanghai）
- cron表达式格式
- 系统时间准确性

### 错误代码说明

| 错误代码 | 含义 | 解决方案 |
|----------|------|----------|
| 1001 | appToken不正确 | 检查WxPusher配置 |
| 1002 | UID不存在 | 确认用户已关注应用 |
| 200 | 天行API成功 | 正常状态 |
| 其他 | API错误 | 查看具体错误信息 |

## 🌐 Web管理界面

启动Web服务后，可以通过浏览器进行管理：

- **实时监控**：查看服务运行状态
- **手动推送**：立即发送测试推送
- **配置管理**：修改推送时间和数量
- **历史记录**：查看推送历史

## 📈 性能优化

- 使用连接池优化HTTP请求
- 实现请求重试机制
- 添加缓存减少API调用
- 优化错误处理和日志记录

## 🤝 贡献指南

欢迎提交Issue和Pull Request！

1. Fork本项目
2. 创建特性分支
3. 提交更改
4. 推送到分支
5. 创建Pull Request

## 📄 许可证

本项目基于 MIT 许可证开源。

## 📞 技术支持

如遇问题，请：

1. 查看 `TEST_REPORT.md` 了解已知问题
2. 运行相应的测试工具进行诊断
3. 检查控制台输出的错误信息
4. 提交Issue描述具体问题

## 🔗 相关链接

- [WxPusher官网](https://wxpusher.zjiecode.com/)
- [天行API](https://www.tianapi.com/)
- [项目GitHub](https://github.com/your-username/wechat-hotlist-pusher)

---

**最后更新**: 2025/9/8  
**版本**: v1.1.0 (已修复推送失败问题)