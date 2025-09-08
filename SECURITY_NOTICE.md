# 🔒 安全注意事项

## ⚠️ 重要安全提醒

### 🚫 绝对不要提交的文件：
- `.env` - 包含真实的API密钥和Token
- 任何包含真实配置信息的文件

### ✅ 安全使用步骤：

1. **复制配置模板**：
   ```bash
   cp .env.example .env
   ```

2. **编辑 `.env` 文件**，填入你的真实配置：
   ```env
   WXPUSHER_APP_TOKEN=你的真实Token
   WXPUSHER_UID=你的真实UID
   TIANAPI_KEY=你的真实API密钥
   ```

3. **验证 `.gitignore`** 确保 `.env` 被忽略：
   ```bash
   git status  # 应该看不到 .env 文件
   ```

### 🛡️ 安全检查清单：

- [ ] `.env` 文件不在git跟踪中
- [ ] `.gitignore` 包含 `.env` 规则
- [ ] 只使用 `.env.example` 作为模板
- [ ] 真实密钥只存在于本地 `.env` 文件中

### 🚨 如果意外提交了密钥：

1. **立即更换所有密钥**
2. **从git历史中移除敏感文件**：
   ```bash
   git filter-branch --force --index-filter 'git rm --cached --ignore-unmatch .env' --prune-empty --tag-name-filter cat -- --all
   ```
3. **强制推送清理后的历史**

### 📞 安全联系

如发现安全问题，请立即：
1. 更换相关密钥
2. 检查访问日志
3. 联系相关服务提供商

---

**记住：安全第一！永远不要在公开仓库中暴露真实的API密钥。**