const WechatHotListPusher = require('./pusher');

// 模拟测试数据
const mockHotListData = [
    { word: "测试热搜1" },
    { word: "测试热搜2" },
    { word: "测试热搜3" },
    { word: "测试热搜4" },
    { word: "测试热搜5" },
    { word: "测试热搜6" },
    { word: "测试热搜7" },
    { word: "测试热搜8" },
    { word: "测试热搜9" },
    { word: "测试热搜10" }
];

console.log('🧪 测试推送逻辑...\n');

// 测试内容格式化功能
console.log('📝 测试内容格式化功能:');
try {
    // 创建一个临时的推送器实例（不会验证配置）
    const tempPusher = Object.create(WechatHotListPusher.prototype);
    tempPusher.hotListCount = 10;
    
    const formattedContent = tempPusher.formatHotListContent(mockHotListData);
    console.log('✅ 内容格式化成功');
    console.log('📄 格式化后的内容:');
    console.log(formattedContent);
    console.log('\n' + '='.repeat(50) + '\n');
    
} catch (error) {
    console.log('❌ 内容格式化失败:', error.message);
}

// 测试空数据处理
console.log('📝 测试空数据处理:');
try {
    const tempPusher = Object.create(WechatHotListPusher.prototype);
    tempPusher.hotListCount = 10;
    
    const emptyContent = tempPusher.formatHotListContent([]);
    console.log('✅ 空数据处理成功');
    console.log('📄 空数据内容:');
    console.log(emptyContent);
    console.log('\n' + '='.repeat(50) + '\n');
    
} catch (error) {
    console.log('❌ 空数据处理失败:', error.message);
}

// 测试定时任务表达式
console.log('📝 测试定时任务表达式:');
const testHours = [9, 12, 18];
const testMinutes = [0, 30];

testHours.forEach(hour => {
    testMinutes.forEach(minute => {
        const cronExpression = `${minute} ${hour} * * *`;
        console.log(`✅ ${hour}:${String(minute).padStart(2, '0')} -> ${cronExpression}`);
    });
});

console.log('\n🎉 逻辑测试完成！');
console.log('\n💡 下一步:');
console.log('   1. 如果你有真实的配置信息，运行: node test-config.js');
console.log('   2. 如果需要获取配置信息，运行: node setup-guide.js');
console.log('   3. 配置完成后，运行: node index.js --test 进行完整测试');