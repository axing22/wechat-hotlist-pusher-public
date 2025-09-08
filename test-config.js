const axios = require('axios');
require('dotenv').config();

class ConfigTester {
    constructor() {
        this.wxpusherToken = process.env.WXPUSHER_APP_TOKEN;
        this.wxpusherUID = process.env.WXPUSHER_UID;
        this.tianapiKey = process.env.TIANAPI_KEY;
        this.tianapiUrl = process.env.TIANAPI_URL;
    }

    async testWxPusherConfig() {
        console.log('🧪 测试 WxPusher 配置...');
        
        // 检查配置是否为占位符
        if (!this.wxpusherToken || this.wxpusherToken.includes('你的')) {
            console.log('❌ WxPusher APP_TOKEN 未配置或为占位符');
            return false;
        }
        
        if (!this.wxpusherUID || this.wxpusherUID.includes('你的')) {
            console.log('❌ WxPusher UID 未配置或为占位符');
            return false;
        }

        try {
            // 测试获取用户列表
            const response = await axios.get(
                `https://wxpusher.zjiecode.com/api/fun/wxuser/v2?appToken=${this.wxpusherToken}`
            );

            if (response.data.success) {
                console.log('✅ WxPusher APP_TOKEN 有效');
                const users = response.data.data.records || response.data.data;
                console.log(`📊 应用关注用户数: ${users.length}`);
                
                const targetUser = users.find(user => user.uid === this.wxpusherUID);
                if (targetUser) {
                    console.log('✅ 找到目标用户:', targetUser.nickName || 'Unknown');
                    return true;
                } else {
                    console.log('❌ 未找到目标 UID:', this.wxpusherUID);
                    console.log('📝 可用的 UID 列表:');
                    users.forEach((user, index) => {
                        console.log(`   ${index + 1}. ${user.uid} (${user.nickName || 'Unknown'})`);
                    });
                    return false;
                }
            } else {
                console.log('❌ WxPusher 配置错误:', response.data.msg);
                return false;
            }
        } catch (error) {
            console.log('❌ WxPusher 连接失败:', error.response?.data?.msg || error.message);
            return false;
        }
    }

    async testTianApiConfig() {
        console.log('\n🧪 测试天行API配置...');
        
        if (!this.tianapiKey || this.tianapiKey.includes('你的')) {
            console.log('❌ 天行API KEY 未配置或为占位符');
            return false;
        }

        try {
            const params = new URLSearchParams();
            params.append('key', this.tianapiKey);
            
            const response = await axios.post(this.tianapiUrl, params, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

            if (response.data.code === 200) {
                console.log('✅ 天行API配置有效');
                console.log(`📊 获取到 ${response.data.result.list.length} 条热搜数据`);
                return true;
            } else {
                console.log('❌ 天行API错误:', response.data.msg);
                return false;
            }
        } catch (error) {
            console.log('❌ 天行API连接失败:', error.response?.data?.msg || error.message);
            return false;
        }
    }

    async sendTestMessage() {
        console.log('\n📤 发送测试推送消息...');
        
        try {
            const testContent = `🧪 配置测试成功！
            
时间: ${new Date().toLocaleString('zh-CN')}
状态: 推送功能正常工作

如果你收到这条消息，说明所有配置都正确！`;

            const response = await axios.post('https://wxpusher.zjiecode.com/api/send/message', {
                appToken: this.wxpusherToken,
                content: testContent,
                summary: '配置测试成功',
                contentType: 1,
                uids: [this.wxpusherUID]
            });

            if (response.data.success) {
                console.log('✅ 测试消息发送成功！请检查微信');
                return true;
            } else {
                console.log('❌ 测试消息发送失败:', response.data.msg);
                return false;
            }
        } catch (error) {
            console.log('❌ 发送测试消息失败:', error.response?.data?.msg || error.message);
            return false;
        }
    }

    async runFullTest() {
        console.log('🚀 开始完整配置测试...\n');
        
        const wxpusherOk = await this.testWxPusherConfig();
        const tianapiOk = await this.testTianApiConfig();
        
        if (wxpusherOk && tianapiOk) {
            console.log('\n🎉 所有配置测试通过！');
            await this.sendTestMessage();
            
            console.log('\n✅ 配置完成！现在可以运行以下命令:');
            console.log('   - 测试推送: node index.js --test');
            console.log('   - 启动定时任务: node index.js');
            console.log('   - 启动Web管理界面: npm start');
        } else {
            console.log('\n❌ 配置测试失败，请检查上述错误信息');
            console.log('💡 如需帮助，请运行: node setup-guide.js');
        }
    }
}

const tester = new ConfigTester();
tester.runFullTest();