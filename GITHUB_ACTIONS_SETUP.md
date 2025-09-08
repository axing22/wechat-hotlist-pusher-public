# GitHub Actions 自动定时推送配置指南

## 📋 概述

本指南将帮助您在 GitHub Actions 中设置微信热榜的每日自动定时推送功能。

## 🔧 配置步骤

### 1. 设置 GitHub Secrets

在您的 GitHub 仓库中设置以下环境变量：

1. 进入您的 GitHub 仓库页面：https://github.com/nancy4567891011/wechat-hotlist-pusher-public
2. 点击 **Settings** 标签页
3. 在左侧菜单中选择 **Secrets and variables** → **Actions**
4. 点击 **New repository secret** 添加以下密钥：

#### 必需的 Secrets：

| Secret 名称 | 描述 | 获取方式 |
|------------|------|----------|
| `WXPUSHER_APP_TOKEN` | WxPusher 应用令牌 | 在 [WxPusher官网](https://wxpusher.zjiecode.com/) 创建应用获取 |
| `WXPUSHER_UID` | WxPusher 用户UID | 关注 WxPusher 应用后获取 |
| `TIANAPI_KEY` | 天行API密钥 | 在 [天行API](https://www.tianapi.com/) 注册获取 |

### 2. 工作流配置说明

当前的工作流配置包含以下特性：

#### ⏰ 定时执行
- **每天北京时间上午9:00** 自动执行推送
- 使用 cron 表达式：`'0 1 * * *'` (UTC时间1:00 = 北京时间9:00)
- 可以取消注释第二个 cron 来添加下午6:00的推送

#### 🎛️ 手动触发
- 支持在 GitHub Actions 页面手动触发
- 可以选择测试模式或正式模式
- 测试模式使用 `--test` 参数

#### 🔧 环境配置
- Node.js 18 环境
- 自动安装依赖
- 设置北京时区 (TZ: Asia/Shanghai)

### 3. 自定义推送时间

如果您想修改推送时间，编辑 `.github/workflows/push-hotlist.yml` 文件中的 cron 表达式：

```yaml
schedule:
  # 北京时间上午9:00 (UTC 1:00)
  - cron: '0 1 * * *'
  # 北京时间下午6:00 (UTC 10:00) - 可选
  - cron: '0 10 * * *'
```

#### Cron 表达式格式：
```
分钟 小时 日 月 星期
*    *   *  *  *
```

#### 常用时间对照表（北京时间 → UTC时间）：
| 北京时间 | UTC时间 | Cron表达式 |
|---------|---------|-----------|
| 08:00 | 00:00 | `'0 0 * * *'` |
| 09:00 | 01:00 | `'0 1 * * *'` |
| 12:00 | 04:00 | `'0 4 * * *'` |
| 18:00 | 10:00 | `'0 10 * * *'` |
| 21:00 | 13:00 | `'0 13 * * *'` |

### 4. 启用 GitHub Actions

1. 进入您的仓库页面
2. 点击 **Actions** 标签页
3. 如果是第一次使用，点击 **I understand my workflows, go ahead and enable them**
4. 您会看到 "微信热搜榜定时推送" 工作流

### 5. 测试工作流

#### 手动测试：
1. 进入 **Actions** 页面
2. 点击 "微信热搜榜定时推送" 工作流
3. 点击 **Run workflow** 按钮
4. 选择测试模式：`true`
5. 点击 **Run workflow** 开始执行

#### 查看执行结果：
1. 在 Actions 页面查看工作流运行状态
2. 点击具体的运行记录查看详细日志
3. 检查您的微信是否收到推送消息

### 6. 监控和维护

#### 查看执行历史：
- 在 Actions 页面可以看到所有执行记录
- 绿色✅表示成功，红色❌表示失败

#### 日志下载：
- 每次执行后会自动上传日志文件
- 在执行详情页面的 **Artifacts** 部分可以下载

#### 故障排除：
1. **推送失败**：检查 Secrets 配置是否正确
2. **API调用失败**：检查天行API密钥和调用次数
3. **时区问题**：确认 cron 时间计算正确

### 7. 高级配置

#### 多时段推送：
```yaml
schedule:
  - cron: '0 1 * * *'   # 上午9:00
  - cron: '0 10 * * *'  # 下午6:00
  - cron: '0 13 * * *'  # 晚上9:00
```

#### 工作日推送：
```yaml
schedule:
  # 仅工作日推送 (周一到周五)
  - cron: '0 1 * * 1-5'
```

#### 自定义推送内容：
修改环境变量中的 `HOT_LIST_COUNT` 来调整推送的热搜数量。

## 🚨 注意事项

1. **API限制**：天行API有调用次数限制，请合理设置推送频率
2. **时区转换**：GitHub Actions 使用UTC时间，需要正确转换为北京时间
3. **Secrets安全**：不要在代码中硬编码敏感信息，使用 GitHub Secrets
4. **测试先行**：正式启用前先进行手动测试确保配置正确

## 📞 技术支持

如果遇到问题，请检查：
1. GitHub Actions 执行日志
2. Secrets 配置是否正确
3. API服务是否正常
4. 网络连接状态

---

配置完成后，您的微信热榜推送工具将每天自动运行，为您推送最新的热搜信息！🎉