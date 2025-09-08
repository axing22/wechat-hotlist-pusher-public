const fs = require('fs');
const path = require('path');

console.log('🚀 微信热榜推送配置向导\n');

console.log('📋 当前配置状态检查...');

// 检查 .env 文件
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    console.log('✅ .env 文件存在');
    
    // 检查配置是否为默认值
    const hasDefaultValues = envContent.includes('你的WxPusher应用Token') || 
                            envContent.includes('你的WxPusher用户UID') || 
                            envContent.includes('你的天行API密钥');
    
    if (hasDefaultValues) {
        console.log('⚠️  配置文件包含默认占位符，需要更新');
        console.log('\n📝 请按以下步骤获取配置信息：\n');
        
        console.log('🔸 步骤1: 获取 WxPusher 配置');
        console.log('   1. 访问: https://wxpusher.zjiecode.com/');
        console.log('   2. 微信扫码登录');
        console.log('   3. 点击"应用管理" -> "新建应用"');
        console.log('   4. 填写应用名称，获取 APP_TOKEN');
        console.log('   5. 微信关注你创建的应用');
        console.log('   6. 在"用户管理"中查看你的 UID\n');
        
        console.log('🔸 步骤2: 获取天行API配置');
        console.log('   1. 访问: https://www.tianapi.com/');
        console.log('   2. 注册并登录账号');
        console.log('   3. 在控制台获取 API KEY');
        console.log('   4. 确保有足够的调用次数\n');
        
        console.log('🔸 步骤3: 更新配置文件');
        console.log('   编辑 .env 文件，将占位符替换为真实配置：');
        console.log('   WXPUSHER_APP_TOKEN=你获取的真实Token');
        console.log('   WXPUSHER_UID=你获取的真实UID');
        console.log('   TIANAPI_KEY=你获取的真实API密钥\n');
        
        console.log('🔸 步骤4: 测试配置');
        console.log('   运行: node test-config.js\n');
        
    } else {
        console.log('✅ 配置文件看起来已更新');
    }
} else {
    console.log('❌ .env 文件不存在');
}

console.log('💡 提示: 如果你已经有了配置信息，可以直接运行 node test-config.js 进行测试');