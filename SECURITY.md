# 🔐 安全指南

## ⚠️ 重要安全提醒

### 密钥安全
- **永远不要**将API密钥、Token等敏感信息直接写在代码中
- **永远不要**将包含真实密钥的文件推送到公开仓库
- **定期更换**API密钥和Token

### 正确的密钥管理方式

#### 1. 本地开发
- 使用 `.env` 文件存储密钥（已在.gitignore中排除）
- 参考 `.env.example` 文件格式

#### 2. GitHub Actions
- 使用 GitHub Secrets 存储敏感信息
- 在仓库 Settings → Secrets and variables → Actions 中添加

#### 3. Vercel部署
- 在Vercel Dashboard中设置环境变量
- 不要在vercel.json中硬编码密钥

### 如果密钥泄露了怎么办？

1. **立即更换所有相关密钥**
2. **检查是否有异常使用**
3. **更新所有使用该密钥的地方**
4. **从Git历史中清除敏感信息**

### 最佳实践

- 使用环境变量存储敏感信息
- 定期轮换API密钥
- 监控API使用情况
- 使用最小权限原则