import React, { useRef, useEffect,useCallback } from 'react';
import { Card, Row, Col, Statistic, DatePicker,Button, Select,Flex } from 'antd';
import * as echarts from 'echarts';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

const { RangePicker } = DatePicker;
// 模拟数据
const mockData = {
  totalCost: 85640,
  monthlyTrend: [
    { month: 'Jan', cost: 12000 },
    { month: 'Feb', cost: 13500 },
    { month: 'Mar', cost: 15000 },
    { month: 'Apr', cost: 11000 },
    { month: 'May', cost: 18500 },
    { month: 'Jun', cost: 15600 }
  ],
  apiCostDistribution: [
    { name: '支付API', cost: 35000 },
    { name: '用户API', cost: 28000 },
    { name: '订单API', cost: 15640 },
    { name: '消息API', cost: 7000 }
  ],
  costCategories: [
    { name: '计算资源', value: 65 },
    { name: '数据存储', value: 20 },
    { name: '网络传输', value: 15 }
  ]
};

const CostAnalysis = () => {
  const trendChartRef = useRef(null);
  const distributionChartRef = useRef(null);
  const categoryChartRef = useRef(null);
  const handleResize = useCallback(() => {
    trendChartRef.current?.resize();
    distributionChartRef.current?.resize();
    categoryChartRef.current?.resize();
  }, []);
  
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);
  
  // 初始化趋势折线图
  useEffect(() => {
    const chart = echarts.init(trendChartRef.current);
    chart.setOption({
      title: { text: '月度成本趋势', left: 'center' },
      tooltip: { trigger: 'axis' },
      xAxis: {
        type: 'category',
        data: mockData.monthlyTrend.map(item => item.month)
      },
      yAxis: { type: 'value', name: '成本（RMB）' },
      series: [{
        data: mockData.monthlyTrend.map(item => item.cost),
        type: 'line',
        smooth: true,
        areaStyle: { opacity: 0.4 },
        lineStyle: { width: 3 }
      }]
    });
    return () => chart.dispose();
  }, []);

  useEffect(() => {
    const chart = echarts.init(distributionChartRef.current);
    chart.setOption({
      title: { text: 'API成本分布', left: 'center' },
      tooltip: { trigger: 'item' },
      xAxis: {
        type: 'category',
        data: mockData.apiCostDistribution.map(item => item.name)
      },
      yAxis: { type: 'value', name: '成本（RMB）' },
      series: [{
        data: mockData.apiCostDistribution.map(item => item.cost),
        type: 'bar',
        barWidth: '40%',
        itemStyle: { color: '#1890ff' }
      }]
    });
    return () => chart.dispose();
  }, []);

  // 初始化成本分类饼图
  useEffect(() => {
    const chart = echarts.init(categoryChartRef.current);
    chart.setOption({
      title: { text: '成本分类占比', left: 'center' },
      tooltip: { trigger: 'item' },
      series: [{
        type: 'pie',
        radius: ['40%', '70%'],
        data: mockData.costCategories.map(item => ({
          name: item.name,
          value: item.value
        })),
        emphasis: { itemStyle: { shadowBlur: 10 } }
      }]
    });
    return () => chart.dispose();
  }, []);

  return (
    <div className="page-style">
      <div className="query-style">
        <Row gutter={[16, 16]}>
          <Col className="gutter-row" xs={24} sm={12} md={12} lg={6} xl={6}>
            <Flex>
              <span style={{ display: "inline-block", width: "85px", lineHeight: '30px' }}>选择日期</span>
              <RangePicker placeholder={"请选择日期"}/>
            </Flex>
          </Col>
          <Col className="gutter-row" xs={24} sm={12} md={12} lg={6} xl={6}>
            <Flex>
              <span style={{ display: "inline-block", width: "85px", lineHeight: '30px' }}>选择API类型</span>
              <Select defaultValue="all" style={{ width: 120 }}
                options={[
                  {
                    value: 'all',
                    label: '全部API',
                  },
                  {
                    value: 'payment',
                    label: '支付API',
                  },
                  {
                    value: 'user',
                    label: '用户API',
                  },
                ]}>
              </Select>
            </Flex>
          </Col>
          <Col className="gutter-row" xs={24} sm={12} md={12} lg={6} xl={6}>
          <Button type="primary"  style={{marginRight:'10px'}}>查询</Button>
          <Button >重置</Button>
          </Col>
        </Row>
      </div>
      <div className="charts-style">
        <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
          <Col xs={24} sm={12} md={12} lg={8} xl={8}>
            <Card>
              <Statistic
                title="总成本"
                value={mockData.totalCost}
                precision={0}
                prefix="¥"
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={12} lg={8} xl={8}>
            <Card>
              <Statistic
                title="本月成本"
                value={'¥18500'}
                precision={0}
                valueStyle={{ color: '#cf1322' }}
                prefix={<ArrowUpOutlined />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={12} lg={8} xl={8}>
            <Card>
              <Statistic
                title="总调用次数"
                value={123456}
                precision={0}
                prefix={<ArrowDownOutlined />}
                suffix="次"
              />
            </Card>
          </Col>
        </Row>
        {/* 图表区域 */}
        <Row gutter={24}>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Card style={{ height: 400 }}>
              <div ref={trendChartRef} style={{ height: 350 }} />
            </Card>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Card style={{ height: 400 }}>
              <div ref={distributionChartRef} style={{ height: 350 }} />
            </Card>
          </Col>
        </Row>

        <Row style={{ marginTop: 24 }}>
          <Col span={24}>
            <Card style={{ height: 400 }}>
              <div ref={categoryChartRef} style={{ height: 350 }} />
            </Card>
          </Col>
        </Row>
      </div>

    </div>
  );
};

export default CostAnalysis;
