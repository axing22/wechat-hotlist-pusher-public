const axios = require('axios');
require('dotenv').config();

async function testWxPusher() {
    console.log('🧪 测试WxPusher配置...');
    console.log('APP_TOKEN:', process.env.WXPUSHER_APP_TOKEN);
    console.log('UID:', process.env.WXPUSHER_UID);
    
    try {
        const response = await axios.post('https://wxpusher.zjiecode.com/api/send/message', {
            appToken: process.env.WXPUSHER_APP_TOKEN,
            content: '<h2>🧪 WxPusher测试消息</h2><p>如果你收到这条消息，说明配置正确！</p><p>时间：' + new Date().toLocaleString() + '</p>',
            summary: 'WxPusher配置测试',
            contentType: 2, // HTML格式
            uids: [process.env.WXPUSHER_UID],
            verifyPay: false
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log('📤 发送结果:', JSON.stringify(response.data, null, 2));
        
        if (response.data.success) {
            console.log('✅ 消息发送成功！请检查微信');
            if (response.data.data && response.data.data.length > 0) {
                const result = response.data.data[0];
                console.log('📋 消息详情:');
                console.log('- 消息ID:', result.messageId);
                console.log('- 状态:', result.status);
                console.log('- 查看链接:', result.url);
            }
        } else {
            console.log('❌ 消息发送失败:', response.data.msg);
        }
    } catch (error) {
        console.error('🚨 请求失败:', error.message);
        if (error.response) {
            console.error('响应数据:', error.response.data);
        }
    }
}

testWxPusher();