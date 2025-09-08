const axios = require('axios');
require('dotenv').config();

async function getCorrectUID() {
    const appToken = process.env.WXPUSHER_APP_TOKEN;
    
    try {
        console.log('🔍 获取所有关注用户的UID...\n');
        
        const response = await axios.get(
            `https://wxpusher.zjiecode.com/api/fun/wxuser/v2?appToken=${appToken}`
        );
        
        if (response.data.success) {
            const users = response.data.data.records;
            
            console.log('📋 所有关注用户列表:');
            users.forEach((user, index) => {
                console.log(`${index + 1}. 昵称: ${user.nickName || '未设置'}`);
                console.log(`   UID: ${user.uid}`);
                console.log(`   关注时间: ${new Date(user.createTime).toLocaleString('zh-CN')}`);
                console.log(`   状态: ${user.reject ? '已拒绝' : '正常'}`);
                console.log('---');
            });
            
            // 发送测试消息给所有用户
            console.log('\n🧪 向所有用户发送测试消息...');
            
            for (const user of users) {
                if (!user.reject) {
                    try {
                        const testResponse = await axios.post('https://wxpusher.zjiecode.com/api/send/message', {
                            appToken: appToken,
                            content: `🧪 UID测试消息\n\n你的UID: ${user.uid}\n昵称: ${user.nickName || '未设置'}\n时间: ${new Date().toLocaleString('zh-CN')}`,
                            summary: `UID测试 - ${user.nickName || 'Unknown'}`,
                            contentType: 1,
                            uids: [user.uid]
                        });
                        
                        console.log(`✅ 发送给 ${user.nickName || 'Unknown'} (${user.uid}): 成功`);
                    } catch (error) {
                        console.log(`❌ 发送给 ${user.nickName || 'Unknown'} (${user.uid}): 失败`);
                    }
                }
            }
        }
    } catch (error) {
        console.error('❌ 获取用户列表失败:', error.response?.data || error.message);
    }
}

getCorrectUID();