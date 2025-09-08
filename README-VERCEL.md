# Vercel部署指南

## 🚀 快速部署

### 方法1：通过Vercel CLI部署

1. **安装Vercel CLI**
```bash
npm install -g vercel
```

2. **登录Vercel**
```bash
vercel login
```

3. **部署项目**
```bash
vercel --prod
```

### 方法2：通过GitHub部署（推荐）

1. **将代码推送到GitHub**
2. **访问 https://vercel.com**
3. **连接GitHub仓库**
4. **自动部署**

## ⚙️ 环境变量配置

在Vercel Dashboard中设置以下环境变量：

```
WXPUSHER_APP_TOKEN=AT_0Vto6XKRUoQbCX1RhC2OOoQoyTv1RL97
WXPUSHER_UID=UID_EDLwNamjqKKwxWYQwZKO7hkVwi2s
TIANAPI_KEY=f8ed3b4b4024a23fa3fd982afb0ea103
TIANAPI_URL=https://apis.tianapi.com/wxhottopic/index
PUSH_HOUR=9
PUSH_MINUTE=0
HOT_LIST_COUNT=10
```

## 📝 注意事项

1. **Serverless限制**：Vercel是Serverless平台，定时任务可能需要外部触发
2. **替代方案**：可以使用GitHub Actions或其他CRON服务来触发定时推送
3. **Web界面**：部署后可以通过Vercel提供的URL访问Web管理界面

## 🔄 GitHub Actions定时推送

如果需要真正的定时推送，建议使用GitHub Actions：

```yaml
# .github/workflows/push-hotlist.yml
name: Push WeChat HotList
on:
  schedule:
    - cron: '0 1 * * *'  # 每天UTC 1:00 (北京时间9:00)
jobs:
  push:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '16'
      - run: npm install
      - run: node index.js --test
        env:
          WXPUSHER_APP_TOKEN: ${{ secrets.WXPUSHER_APP_TOKEN }}
          WXPUSHER_UID: ${{ secrets.WXPUSHER_UID }}
          TIANAPI_KEY: ${{ secrets.TIANAPI_KEY }}