@echo off
echo 微信热搜榜定时推送工具
echo ========================

echo 正在安装依赖...
npm install

echo.
echo 正在测试推送功能...
node index.js --test

echo.
echo 测试完成！如果测试成功，按任意键启动定时服务...
pause

echo.
echo 启动定时推送服务...
node index.js

pause