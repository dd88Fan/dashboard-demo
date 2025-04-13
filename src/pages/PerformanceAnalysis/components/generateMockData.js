// 生成模拟性能数据
const generateMockData = (count = 50, injectAnomaly = true) => {
    const data = [];
    let baseValue = 0.85;

    for (let i = 0; i < count; i++) {
        const timestamp = new Date(Date.now() - (count - i) * 60000);
        let value = baseValue + (Math.random() * 0.05 - 0.025);

        // 注入异常
        if (injectAnomaly && i % 15 === 0) {
            value = baseValue - 0.15 + Math.random() * 0.3;
        }

        data.push({
            timestamp,
            accuracy: Number(value.toFixed(4)),
            latency: 100 + Math.random() * 50,
            isAnomaly: false
        });

        baseValue += 0.0005;
    }

    return data;
};
export default generateMockData;