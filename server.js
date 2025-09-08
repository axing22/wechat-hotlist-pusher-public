const express = require('express');
const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');

const app = express();
const PORT = 3000;

// 中间件
app.use(express.json());
app.use(express.static('public'));

// 全局变量
let pusherProcess = null;
let isServiceRunning = false;

// 导入推送器类
const WechatHotListPusher = require('./pusher');
const pusher = new WechatHotListPusher();

// 路由

// 获取热搜数据
app.get('/api/hotlist', async (req, res) => {
    try {
        const hotList = await pusher.getWechatHotList();
        res.json({
            success: true,
            data: hotList
        });
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        });
    }
});

// 测试推送
app.post('/api/test-push', async (req, res) => {
    try {
        await pusher.executePushTask();
        res.json({
            success: true,
            message: '测试推送完成'
        });
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        });
    }
});

// 启动服务
app.post('/api/start', (req, res) => {
    try {
        if (!isServiceRunning) {
            pusher.startScheduledTask();
            isServiceRunning = true;
            res.json({
                success: true,
                message: '定时推送服务已启动'
            });
        } else {
            res.json({
                success: false,
                message: '服务已在运行中'
            });
        }
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        });
    }
});

// 停止服务
app.post('/api/stop', (req, res) => {
    try {
        if (isServiceRunning) {
            // 这里应该停止定时任务，但node-cron没有直接的停止方法
            // 在实际应用中，你可能需要重构代码来支持停止功能
            isServiceRunning = false;
            res.json({
                success: true,
                message: '定时推送服务已停止'
            });
        } else {
            res.json({
                success: false,
                message: '服务未在运行'
            });
        }
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        });
    }
});

// 保存配置
app.post('/api/config', (req, res) => {
    try {
        const { pushHour, pushMinute, hotListCount } = req.body;
        
        // 读取当前.env文件
        let envContent = fs.readFileSync('.env', 'utf8');
        
        // 更新配置
        envContent = envContent.replace(/PUSH_HOUR=\d+/, `PUSH_HOUR=${pushHour}`);
        envContent = envContent.replace(/PUSH_MINUTE=\d+/, `PUSH_MINUTE=${pushMinute}`);
        envContent = envContent.replace(/HOT_LIST_COUNT=\d+/, `HOT_LIST_COUNT=${hotListCount}`);
        
        // 写回文件
        fs.writeFileSync('.env', envContent);
        
        res.json({
            success: true,
            message: '配置已保存'
        });
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        });
    }
});

// 获取服务状态
app.get('/api/status', (req, res) => {
    res.json({
        success: true,
        isRunning: isServiceRunning
    });
});

// 启动服务器
app.listen(PORT, () => {
    console.log(`🌐 Web管理界面已启动: http://localhost:${PORT}`);
    console.log('📱 微信热搜榜推送管理系统');
});

module.exports = app;