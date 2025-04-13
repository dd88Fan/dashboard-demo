import React, { useState, useEffect, useRef } from 'react';
import { Card, Table, Tag, Form, Select, Button, notification } from 'antd';
import * as echarts from 'echarts';
import { WarningOutlined } from '@ant-design/icons';
import AnomalyDetector from './components/AnomalyDetector'
import generateMockData from './components/generateMockData'

const { Option } = Select;

const PerformanceMonitor = () => {
    const [data, setData] = useState(generateMockData());
    const [alerts, setAlerts] = useState([]);
    const [config, setConfig] = useState({
        method: 'zscore',
        zThreshold: 3,
        windowSize: 10
    });
    const detector = useRef(new AnomalyDetector(config.windowSize));
    const chartRef = useRef(null);

    // 初始化图表
    useEffect(() => {
        const chart = echarts.init(chartRef.current);

        const updateChart = () => {
            chart.setOption({
                title: { text: '模型性能趋势', left: 'center' },
                tooltip: { trigger: 'axis' },
                xAxis: { type: 'time' },
                yAxis: [
                    { type: 'value', name: '准确率' }
                ],
                series: [{
                    name: '准确率',
                    data: data.map(d => [d.timestamp, d.accuracy]),
                    type: 'line',
                    smooth: true,
                    markPoint: {
                        data: data.filter(d => d.isAnomaly).map(d => ({
                            name: '异常点',
                            coord: [d.timestamp, d.accuracy],
                            value: d.accuracy
                        }))
                    }
                }]
            });
        };

        updateChart();
        return () => chart.dispose();
    }, [data]);

    // 模拟实时数据更新
    useEffect(() => {
        const timer = setInterval(() => {
            const newValue = 0.85 + Math.random() * 0.05;

            const newDataPoint = {
                timestamp: new Date(),
                accuracy: newValue,
                latency: 100 + Math.random() * 50,
                isAnomaly: false
            };

            // 执行异常检测
            const isAnomaly = detector.current.detect(newValue, config.method);
            if (isAnomaly) {
                newDataPoint.isAnomaly = true;
                setAlerts(prev => [{
                    time: newDataPoint.timestamp,
                    value: newValue.toFixed(4),
                    method: config.method
                }, ...prev]);

                notification.warning({
                    message: '性能异常告警',
                    description: `检测到异常准确率: ${newValue.toFixed(4)}`,
                    icon: <WarningOutlined style={{ color: '#ff4d4f' }} />
                });
            }

            setData(prev => [...prev.slice(1), newDataPoint]);
        }, 6000);

        return () => clearInterval(timer);
    }, [config]);

    return (
        <div style={{ padding: 24 }}>
            <Card title="监控配置" style={{ marginBottom: 24 }}>
                <Form layout="inline">
                    <Form.Item label="检测算法">
                        <Select
                            value={config.method}
                            onChange={v => setConfig(c => ({ ...c, method: v }))}
                            style={{ width: 150 }}
                        >
                            <Option value="zscore">标准差检测</Option>
                            <Option value="moving_avg">移动平均检测</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item label="窗口大小">
                        <Select
                            value={config.windowSize}
                            onChange={v => {
                                detector.current.windowSize = v;
                                setConfig(c => ({ ...c, windowSize: v }));
                            }}
                            style={{ width: 100 }}
                        >
                            {[5, 10, 15, 20].map(n => (
                                <Option key={n} value={n}>{n}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Form>
            </Card>

            <Card title="性能趋势图">
                <div ref={chartRef} style={{ height: 400 }} />
            </Card>

            <Card title="告警记录" style={{ marginTop: 24 }}>
                <Table
                    columns={[
                        { title: '时间', dataIndex: 'time', render: t => t.toLocaleString() },
                        { title: '检测值', dataIndex: 'value' },
                        {
                            title: '检测方法',
                            dataIndex: 'method',
                            render: m => <Tag color="red">{m.toUpperCase()}</Tag>
                        }
                    ]}
                    dataSource={alerts}
                    pagination={{ pageSize: 5 }}
                    rowKey="time"
                />
            </Card>
        </div>
    );
};

export default PerformanceMonitor;
