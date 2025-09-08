# 🚀 GitHub Actions 云端运行指南

## 📋 概述

本项目支持完全在GitHub云端运行，无需本地安装任何环境。通过GitHub Actions实现自动定时推送微信热搜榜。

## 🎯 快速开始

### 1️⃣ Fork 仓库
1. 访问：https://github.com/nancy4567891011/wechat-hotlist-pusher-public
2. 点击右上角 **"Fork"** 按钮
3. 选择你的账号，创建fork

### 2️⃣ 配置 Secrets
在你fork的仓库中：

1. 点击 **"Settings"** 标签页
2. 在左侧菜单选择 **"Secrets and variables"** → **"Actions"**
3. 点击 **"New repository secret"** 添加以下配置：

| Secret名称 | 值 | 说明 |
|------------|----|----|
| `WXPUSHER_APP_TOKEN` | `AT_xxxxxxxxxx` | WxPusher应用Token |
| `WXPUSHER_UID` | `UID_xxxxxxxxxx` | WxPusher用户UID |
| `TIANAPI_KEY` | `xxxxxxxxxx` | 天行API密钥 |

### 3️⃣ 启用并测试 Actions
1. 点击 **"Actions"** 标签页
2. 如果提示启用Actions，点击 **"I understand my workflows, go ahead and enable them"**
3. 选择 **"微信热搜榜定时推送"** workflow
4. 点击 **"Run workflow"** → 选择 **"test_mode: true"** → **"Run workflow"**

## ⏰ 自动运行时间

- **定时推送**: 每天北京时间上午 9:00 自动执行
- **手动触发**: 随时可以手动运行测试

## 🔧 配置说明

### Workflow 配置文件
- **文件位置**: `.github/workflows/push-hotlist.yml`
- **运行环境**: Ubuntu Latest
- **Node.js版本**: 18.x
- **时区**: Asia/Shanghai

### 环境变量
```yaml
WXPUSHER_APP_TOKEN: ${{ secrets.WXPUSHER_APP_TOKEN }}
WXPUSHER_UID: ${{ secrets.WXPUSHER_UID }}
TIANAPI_KEY: ${{ secrets.TIANAPI_KEY }}
TIANAPI_URL: https://apis.tianapi.com/wxhottopic/index
PUSH_HOUR: 9
PUSH_MINUTE: 0
HOT_LIST_COUNT: 30
TZ: Asia/Shanghai
```

## 📊 运行模式

### 🧪 测试模式
- **触发方式**: 手动运行时选择 `test_mode: true`
- **执行命令**: `node index.js --test`
- **功能**: 立即发送一次测试推送

### 🚀 正式模式
- **触发方式**: 定时任务或手动运行时选择 `test_mode: false`
- **执行命令**: `node index.js`
- **功能**: 启动定时推送服务

## 📝 查看运行结果

### 1. Actions 页面查看
- 进入 **"Actions"** 标签页
- 点击具体的运行记录
- 查看详细日志输出

### 2. 日志文件下载
- 运行完成后会自动上传日志文件
- 在运行记录页面的 **"Artifacts"** 部分下载

### 3. 微信接收确认
- 检查微信是否收到推送消息
- 确认推送内容格式是否正确

## 🔍 故障排除

### 常见问题

#### 1. Actions 运行失败
**可能原因**:
- Secrets 配置错误
- API密钥无效或过期
- 网络连接问题

**解决方案**:
```bash
# 检查 Secrets 配置是否正确
# 验证 API 密钥是否有效
# 查看详细错误日志
```

#### 2. 推送失败
**可能原因**:
- WxPusher Token 或 UID 错误
- 用户未关注 WxPusher 应用
- 天行API调用次数超限

**解决方案**:
- 重新获取正确的 WxPusher 配置
- 确认已关注对应的 WxPusher 应用
- 检查天行API余额和调用限制

#### 3. 定时任务不执行
**可能原因**:
- Actions 被禁用
- 仓库长时间无活动被暂停

**解决方案**:
- 确保 Actions 已启用
- 定期手动触发保持活跃

## 🛡️ 安全注意事项

### ✅ 安全措施
- **Secrets 加密存储**: GitHub自动加密保护
- **环境隔离**: 每次运行都是独立环境
- **日志脱敏**: 敏感信息不会出现在日志中

### ⚠️ 注意事项
- 不要在代码中硬编码任何密钥
- 定期更换 API 密钥
- 监控 Actions 运行日志

## 📈 高级配置

### 修改推送时间
编辑 `.github/workflows/push-hotlist.yml` 文件：
```yaml
schedule:
  # 修改 cron 表达式调整时间
  - cron: '0 1 * * *'  # UTC 1:00 = 北京时间 9:00
```

### 修改推送内容数量
在 workflow 文件中修改：
```yaml
HOT_LIST_COUNT: 30  # 修改为你想要的数量
```

### 添加多次推送
取消注释第二个 cron 表达式：
```yaml
schedule:
  - cron: '0 1 * * *'   # 上午9:00
  - cron: '0 10 * * *'  # 下午6:00
```

## 🎉 完成！

配置完成后，你的微信热搜榜推送服务将：
- ✅ 每天自动运行
- ✅ 完全在云端执行
- ✅ 安全管理密钥
- ✅ 提供详细日志

享受你的自动化微信热搜推送服务吧！ 🚀