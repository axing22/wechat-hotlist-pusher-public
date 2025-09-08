const axios = require('axios');
require('dotenv').config();

class WxPusherDiagnostic {
    constructor() {
        this.appToken = process.env.WXPUSHER_APP_TOKEN;
        this.uid = process.env.WXPUSHER_UID;
    }

    async checkAppInfo() {
        console.log('🔍 检查应用信息...');
        try {
            const response = await axios.get(`https://wxpusher.zjiecode.com/api/fun/wxuser/v2?appToken=${this.appToken}`);
            console.log('应用信息响应:', JSON.stringify(response.data, null, 2));
            
            if (response.data.success) {
                const users = response.data.data.records || response.data.data;
                console.log(`📊 应用关注用户数: ${users.length}`);
                
                const targetUser = users.find(user => user.uid === this.uid);
                if (targetUser) {
                    console.log('✅ 找到目标用户:', {
                        uid: targetUser.uid,
                        nickname: targetUser.nickName,
                        headImg: targetUser.headImg,
                        subscribeTime: new Date(targetUser.subscribeTime).toLocaleString('zh-CN')
                    });
                } else {
                    console.log('❌ 未找到目标用户 UID:', this.uid);
                    console.log('📝 所有用户列表:');
                    users.forEach((user, index) => {
                        console.log(`  ${index + 1}. UID: ${user.uid}, 昵称: ${user.nickName}`);
                    });
                }
            }
        } catch (error) {
            console.error('❌ 获取应用信息失败:', error.response?.data || error.message);
        }
    }

    async sendTestMessage() {
        console.log('\n📤 发送测试消息...');
        try {
            const testData = {
                appToken: this.appToken,
                content: `🧪 WxPusher 连接测试\n\n时间: ${new Date().toLocaleString('zh-CN')}\n\n如果你收到这条消息，说明推送功能正常！`,
                summary: 'WxPusher 测试消息',
                contentType: 1,
                uids: [this.uid]
            };

            console.log('发送数据:', JSON.stringify(testData, null, 2));

            const response = await axios.post('https://wxpusher.zjiecode.com/api/send/message', testData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log('发送响应:', JSON.stringify(response.data, null, 2));

            if (response.data.success) {
                console.log('✅ 消息发送成功！');
                if (response.data.data && response.data.data.length > 0) {
                    const result = response.data.data[0];
                    console.log(`📋 消息详情:`);
                    console.log(`   消息ID: ${result.messageId}`);
                    console.log(`   状态: ${result.status}`);
                    console.log(`   查看链接: ${result.url}`);
                }
            } else {
                console.log('❌ 消息发送失败:', response.data.msg);
            }
        } catch (error) {
            console.error('❌ 发送测试消息失败:', error.response?.data || error.message);
        }
    }

    async checkMessageStatus(messageId) {
        console.log(`\n📊 检查消息状态 (ID: ${messageId})...`);
        try {
            const response = await axios.get(`https://wxpusher.zjiecode.com/api/send/query/${messageId}?appToken=${this.appToken}`);
            console.log('消息状态响应:', JSON.stringify(response.data, null, 2));
        } catch (error) {
            console.error('❌ 查询消息状态失败:', error.response?.data || error.message);
        }
    }

    async runFullDiagnostic() {
        console.log('🚀 开始 WxPusher 完整诊断...\n');
        
        console.log('📋 配置信息:');
        console.log(`   APP_TOKEN: ${this.appToken ? this.appToken.substring(0, 10) + '...' : '未配置'}`);
        console.log(`   UID: ${this.uid || '未配置'}\n`);

        if (!this.appToken || !this.uid) {
            console.log('❌ 配置信息不完整，请检查 .env 文件');
            return;
        }

        await this.checkAppInfo();
        await this.sendTestMessage();
        
        console.log('\n📝 诊断完成！');
        console.log('\n💡 如果仍然收不到消息，请检查:');
        console.log('   1. 是否已关注 WxPusher 应用');
        console.log('   2. 微信是否开启了消息通知');
        console.log('   3. 是否在微信的"服务通知"中');
        console.log('   4. 网络连接是否正常');
    }
}

const diagnostic = new WxPusherDiagnostic();
diagnostic.runFullDiagnostic();