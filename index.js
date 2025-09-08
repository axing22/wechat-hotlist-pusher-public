const axios = require('axios');
const cron = require('node-cron');
require('dotenv').config();

class WechatHotListPusher {
    constructor() {
        this.wxpusherToken = process.env.WXPUSHER_APP_TOKEN;
        this.wxpusherUID = process.env.WXPUSHER_UID;
        this.tianapiKey = process.env.TIANAPI_KEY;
        this.tianapiUrl = process.env.TIANAPI_URL;
        this.pushHour = process.env.PUSH_HOUR || 9;
        this.pushMinute = process.env.PUSH_MINUTE || 0;
        this.hotListCount = parseInt(process.env.HOT_LIST_COUNT) || 10;
    }

    /**
     * 获取微信热搜榜数据
     */
    async getWechatHotList() {
        try {
            console.log('正在获取微信热搜榜数据...');
            
            // 使用 URLSearchParams 来正确发送 form-urlencoded 数据
            const params = new URLSearchParams();
            params.append('key', this.tianapiKey);
            
            const response = await axios.post(this.tianapiUrl, params, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

            if (response.data.code === 200) {
                console.log('成功获取热搜榜数据');
                return response.data.result.list;
            } else {
                console.error('获取热搜榜失败:', response.data.msg);
                return [];
            }
        } catch (error) {
            console.error('请求热搜榜API失败:', error.message);
            return [];
        }
    }

    /**
     * 格式化热搜榜内容为HTML
     */
    formatHotListContent(hotList) {
        if (!hotList || hotList.length === 0) {
            return '<h2>📱 微信热搜榜</h2><p>暂无热搜数据</p>';
        }

        const currentTime = new Date().toLocaleString('zh-CN', {
            timeZone: 'Asia/Shanghai',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });

        let content = `<h2>📱 微信热搜榜 (${currentTime})</h2><br/>`;
        
        const topList = hotList.slice(0, this.hotListCount);
        
        topList.forEach((item, index) => {
            const rank = index + 1;
            let emoji = '';
            
            // 为前三名添加特殊标识
            if (rank === 1) emoji = '🥇';
            else if (rank === 2) emoji = '🥈';
            else if (rank === 3) emoji = '🥉';
            else emoji = `${rank}.`;
            
            content += `<p><strong>${emoji} ${item.word}</strong></p>`;
        });
        
        content += '<br/><p><small>数据来源：天行API</small></p>';
        
        return content;
    }

    /**
     * 使用WxPusher发送消息
     */
    async sendWxPusherMessage(content, summary = '微信热搜榜推送') {
        try {
            console.log('正在发送微信推送消息...');
            
            const response = await axios.post('https://wxpusher.zjiecode.com/api/send/message', {
                appToken: this.wxpusherToken,
                content: content,
                summary: summary,
                contentType: 2, // HTML格式
                uids: [this.wxpusherUID],
                verifyPay: false
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.data.success) {
                console.log('消息发送成功:', response.data);
                return true;
            } else {
                console.error('消息发送失败:', response.data.msg);
                return false;
            }
        } catch (error) {
            console.error('发送消息时出错:', error.message);
            return false;
        }
    }

    /**
     * 执行推送任务
     */
    async executePushTask() {
        console.log('开始执行热搜榜推送任务...');
        
        const hotList = await this.getWechatHotList();
        const content = this.formatHotListContent(hotList);
        const success = await this.sendWxPusherMessage(content);
        
        if (success) {
            console.log('热搜榜推送任务完成');
        } else {
            console.log('热搜榜推送任务失败');
        }
    }

    /**
     * 启动定时任务
     */
    startScheduledTask() {
        // 创建定时任务，每天指定时间执行
        const cronExpression = `${this.pushMinute} ${this.pushHour} * * *`;
        
        console.log(`定时任务已启动，将在每天 ${this.pushHour}:${String(this.pushMinute).padStart(2, '0')} 执行推送`);
        
        cron.schedule(cronExpression, () => {
            this.executePushTask();
        }, {
            timezone: 'Asia/Shanghai'
        });
    }

    /**
     * 测试推送功能
     */
    async testPush() {
        console.log('执行测试推送...');
        await this.executePushTask();
    }
}

// 主程序
async function main() {
    const pusher = new WechatHotListPusher();
    
    // 检查命令行参数
    const args = process.argv.slice(2);
    
    if (args.includes('--test')) {
        // 测试模式
        await pusher.testPush();
    } else {
        // 正常模式，启动定时任务
        pusher.startScheduledTask();
        
        console.log('微信热搜榜定时推送服务已启动');
        console.log('按 Ctrl+C 停止服务');
        
        // 保持程序运行
        process.on('SIGINT', () => {
            console.log('\n正在停止服务...');
            process.exit(0);
        });
    }
}

// 启动程序
main().catch(console.error);