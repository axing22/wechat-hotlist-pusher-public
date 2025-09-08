const axios = require('axios');
require('dotenv').config();

async function checkMessageDelivery() {
    const appToken = process.env.WXPUSHER_APP_TOKEN;
    
    // 检查最近的几条消息状态
    const messageIds = [
        '1711390597', // 最新的消息ID
        '1711388935',
        '1711364027',
        '1711362264',
        '1711361427'
    ];
    
    console.log('🔍 检查消息投递状态...\n');
    
    for (const messageId of messageIds) {
        try {
            const response = await axios.get(
                `https://wxpusher.zjiecode.com/api/send/query/${messageId}?appToken=${appToken}`
            );
            
            console.log(`📋 消息ID: ${messageId}`);
            console.log('状态详情:', JSON.stringify(response.data, null, 2));
            console.log('---\n');
            
        } catch (error) {
            console.error(`❌ 查询消息 ${messageId} 失败:`, error.response?.data || error.message);
        }
    }
}

checkMessageDelivery();