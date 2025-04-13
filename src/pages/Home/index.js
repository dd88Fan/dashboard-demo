import React, { useState, useEffect, useCallback } from 'react';
import { DatePicker, Button, Spin, Select, Col, Row, Flex } from 'antd';
import ReactECharts from 'echarts-for-react';
import dayjs from 'dayjs';
import './index.css'
import 'dayjs/locale/zh-cn';  // 引入中文语言包‌:ml-citation{ref="2,4" data="citationList"}
import {
  BarChartOutlined,
  RadarChartOutlined,
  PieChartOutlined,
  DotChartOutlined
} from '@ant-design/icons';

dayjs.locale('zh-cn');
const { RangePicker } = DatePicker;
const dateOptions = [
  { value: 'hour', label: "按小时展示" },
  { value: 'date', label: "按天展示" },
  { value: 'week', label: "按周展示" },
  { value: 'month', label: "按月展示" },
]

const platOptions = [
  { value: 'android', label: "安卓" },
  { value: 'ios', label: "iOS" },
  { value: 'windows', label: "Windows" },
  { value: 'mac', label: "Mac" },
  { value: 'all', label: "全平台" },
]

const hours = ['0点', '1点', '2点', '3点', '4点', '5点', '6点', '7点', '8点', '9点', '10点', '11点',
  '12点', '13点', '14点', '15点', '16点', '17点', '18点', '19点', '20点', '21点', '22点', '23点']
const days = [
  '周六', '周五', '周四',
  '周三', '周二', '周一', '周日'
]
const scatterData = [[0, 0, 5], [0, 1, 1], [0, 2, 0], [0, 3, 0], [0, 4, 0], [0, 5, 0], [0, 6, 0], [0, 7, 0], [0, 8, 0], [0, 9, 0], [0, 10, 0], [0, 11, 2], [0, 12, 4], [0, 13, 1], [0, 14, 1], [0, 15, 3], [0, 16, 4], [0, 17, 6], [0, 18, 4], [0, 19, 4], [0, 20, 3], [0, 21, 3], [0, 22, 2], [0, 23, 5], [1, 0, 7], [1, 1, 0], [1, 2, 0], [1, 3, 0], [1, 4, 0], [1, 5, 0], [1, 6, 0], [1, 7, 0], [1, 8, 0], [1, 9, 0], [1, 10, 5], [1, 11, 2], [1, 12, 2], [1, 13, 6], [1, 14, 9], [1, 15, 11], [1, 16, 6], [1, 17, 7], [1, 18, 8], [1, 19, 12], [1, 20, 5], [1, 21, 5], [1, 22, 7], [1, 23, 2], [2, 0, 1], [2, 1, 1], [2, 2, 0], [2, 3, 0], [2, 4, 0], [2, 5, 0], [2, 6, 0], [2, 7, 0], [2, 8, 0], [2, 9, 0], [2, 10, 3], [2, 11, 2], [2, 12, 1], [2, 13, 9], [2, 14, 8], [2, 15, 10], [2, 16, 6], [2, 17, 5], [2, 18, 5], [2, 19, 5], [2, 20, 7], [2, 21, 4], [2, 22, 2], [2, 23, 4], [3, 0, 7], [3, 1, 3], [3, 2, 0], [3, 3, 0], [3, 4, 0], [3, 5, 0], [3, 6, 0], [3, 7, 0], [3, 8, 1], [3, 9, 0], [3, 10, 5], [3, 11, 4], [3, 12, 7], [3, 13, 14], [3, 14, 13], [3, 15, 12], [3, 16, 9], [3, 17, 5], [3, 18, 5], [3, 19, 10], [3, 20, 6], [3, 21, 4], [3, 22, 4], [3, 23, 1], [4, 0, 1], [4, 1, 3], [4, 2, 0], [4, 3, 0], [4, 4, 0], [4, 5, 1], [4, 6, 0], [4, 7, 0], [4, 8, 0], [4, 9, 2], [4, 10, 4], [4, 11, 4], [4, 12, 2], [4, 13, 4], [4, 14, 4], [4, 15, 14], [4, 16, 12], [4, 17, 1], [4, 18, 8], [4, 19, 5], [4, 20, 3], [4, 21, 7], [4, 22, 3], [4, 23, 0], [5, 0, 2], [5, 1, 1], [5, 2, 0], [5, 3, 3], [5, 4, 0], [5, 5, 0], [5, 6, 0], [5, 7, 0], [5, 8, 2], [5, 9, 0], [5, 10, 4], [5, 11, 1], [5, 12, 5], [5, 13, 10], [5, 14, 5], [5, 15, 7], [5, 16, 11], [5, 17, 6], [5, 18, 0], [5, 19, 5], [5, 20, 3], [5, 21, 4], [5, 22, 2], [5, 23, 0], [6, 0, 1], [6, 1, 0], [6, 2, 0], [6, 3, 0], [6, 4, 0], [6, 5, 0], [6, 6, 0], [6, 7, 0], [6, 8, 0], [6, 9, 0], [6, 10, 1], [6, 11, 0], [6, 12, 2], [6, 13, 1], [6, 14, 3], [6, 15, 4], [6, 16, 0], [6, 17, 0], [6, 18, 0], [6, 19, 0], [6, 20, 1], [6, 21, 2], [6, 22, 2], [6, 23, 6]]
  .map(function (item) {
    return [item[1], item[0], item[2]];
  });
const ChartDashboard = () => {
  const [timeRange, setTimeRange] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ws, setWs] = useState(null);
  const [dateSelectedValue, setDateSelectedValue] = useState('hour');
  const [platSelectedValue, setPlatSelectedValue] = useState('hour');
  const [hour, setHour] = useState(dayjs());
  const [date, setDate] = useState([dayjs().subtract(6, 'day'), dayjs().endOf('day')]);
  const [week, setWeek] = useState([dayjs().subtract(4, 'weeks').startOf('week'), dayjs().endOf('week')]);
  const [month, setMonth] = useState([dayjs().subtract(12, 'months').startOf('month'), dayjs().endOf('month')]);
  const disabledDate = (current) => {
    return current > dayjs().endOf('day');
  };
  // 获取历史数据
  const fetchHistoryData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/data.json');
      //模拟数据，未封装，没有传递参数
      const data = await response.json();
      // 假设堆叠图中的响应数量已经减去了错误数量，如果没有需要在这里处理下，否则堆叠展示数据异常
      setChartData(data[dateSelectedValue].chartData);
      setPieData(data[dateSelectedValue].pieData)
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  }, []);
  //初始化调用
  useEffect(() => {
    fetchHistoryData();
  }, [fetchHistoryData]); // 显式声明依赖项
  // 初始化WebSocket连接
  const initWebSocket = useCallback((start, end) => {
    const websocket = new WebSocket(`wss://localhost:3000?start=${start}&end=${end}`);

    websocket.onmessage = (event) => {
      const newChartData = JSON.parse(event.data)[dateSelectedValue].chartData;
      const newPieData = JSON.parse(event.data)[dateSelectedValue].pieData;
      setChartData(prev => [...prev.slice(-100), ...newChartData]); // 保留最近100条数据
      setPieData(prev => [...prev.slice(-100), ...newPieData]); // 保留最近100条数据
    };

    websocket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    setWs(websocket);
    return websocket;
  }, []);

  // 处理时间范围变化
  useEffect(() => {
    if (timeRange.length === 2) {
      const [start, end] = timeRange.map(t => t.valueOf());
      fetchHistoryData(start, end);
      const websocket = initWebSocket(start, end);

      return () => {
        websocket?.close();
      };
    }
  }, [timeRange, , platSelectedValue, fetchHistoryData, initWebSocket]);

  // 图表配置
  const getOption = () => ({
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
        label: {
          show: false
        }
      },
      formatter: (param) => {
        let title = `<div><h4>当前接口响应情况</h4>`
        title += `<hr/>`
        title += `<p style="font-size:12px">${param[0].seriesName}:${param[0].value[1]}条</p>`
        title += `<p style="font-size:12px">${param[1].seriesName}:${param[1].value[2]}条</p>`
        title += `<p style="font-size:12px">响应错误率:${((param[0].value[2] / (param[0].value[1] + param[0].value[2]) * 100)).toFixed()}%</p>`
        title += `<p style="font-size:12px">${param[2].seriesName}:${param[2].value[3]}秒</p>`
        return title + `</div>`
      }
    },
    legend: {
      data: ['应用调用量', '错误量', '响应时间'],
      show: true
    },
    xAxis: {
      type: dateSelectedValue === 'hour' ? 'category' : 'time',
      axisTick: {
        alignWithLabel: true
      },
      boundaryGap: false
    },
    yAxis: [
      {
        type: 'value',
        name: '数量（条）'
      },
      {
        type: 'value',
        name: '响应时间（s）'
      }
    ],
    dataset: {
      source: chartData
    },
    series: [
      {
        name: '应用调用量',
        type: 'bar',
        stack: 'total',
        encode: {
          x: 0,
          y: 1
        }
      },
      {
        name: '错误量',
        type: 'bar',
        stack: 'total',
        encode: {
          x: 0,
          y: 2
        }
      },
      {
        name: '响应时间',
        type: 'line',
        yAxisIndex: 1,
        encode: {
          x: 0,
          y: 3
        }
      }
    ]
  });
  const getPieOption = () => ({
    tooltip: {
      trigger: 'item',
      formatter: (param) => {
        return `<div>该时间段内调用${param.data.name}接口${param.data.value}次</div>`
      }
    },
    legend: {
      left: 'center'
    },
    series: [{
      type: 'pie',
      data: pieData,
      emphasis: { itemStyle: { shadowBlur: 10 } },
      label: { show: true, formatter: '{b}: {d}%' }
    }]
  })
  const getScatterOption = () => ({
    legend: {
      data: ['登陆人数'],
      left: 'right'
    },
    tooltip: {
      position: 'top',
      formatter: function (params) {
        return (
          days[params.value[1]] + '的' +
          hours[params.value[0]] + '同时有' +
          params.value[2] * 100 + '用户登陆'
        );
      }
    },
    grid: {
      left: 2,
      bottom: 10,
      right: 10,
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: hours,
      boundaryGap: false,
      splitLine: {
        show: true
      },
      axisLine: {
        show: false
      }
    },
    yAxis: {
      type: 'category',
      data: days,
      axisLine: {
        show: false
      }
    },
    series: [
      {
        type: 'scatter',
        symbolSize: function (val) {
          return val[2] * 2;
        },
        data: scatterData,
        animationDelay: function (idx) {
          return idx * 5;
        }
      }
    ]
  })
  const getRadarOption = () => ({
    legend: {
      data: ['app-A', 'app-B']
    },
    radar: {
      // shape: 'circle',
      indicator: [
        { name: '响应时间', max: 300 },
        { name: '成 功 率', max: 100 },
        { name: '质量评分', max: 100 },
        { name: '使用数量', max: 3800 },
        { name: '外观评分', max: 100 },
      ]
    },
    tooltip: {
      // trigger: 'axis',
      show: true,
      // formatter: (param) => {
      //   console.log(param)
      // }
    },
    series: [
      {
        name: '性能差异',
        type: 'radar',
        data: [
          {
            value: [200, 80, 75, 3500, 43],
            name: 'app-A'
          },
          {
            value: [150, 90, 54, 2600, 65],
            name: 'app-B'
          }
        ]
      }
    ]
  })
  const handleChangeDate = (value) => {
    setDateSelectedValue(value)
  }
  const handleChangePlat = (value) => {
    setPlatSelectedValue(value)
  }
  const changeRange = (date) => {
    if (dateSelectedValue === 'date') {
      setDate(date)
    } else if (dateSelectedValue === 'week') {
      setWeek(date)
    } else if (dateSelectedValue === 'month') {
      setMonth(date)
    }
    // setTimeRange(date)
  }
  const changeDate = (date) => {
    setHour(date)
    setTimeRange([date, date])
  }
  return (
    <div className="page-style">
      <div className="query-style">
        <Row gutter={[16, 16]}>
          <Col className="gutter-row" xs={24} sm={12} md={12} lg={6} xl={6}>
            <Flex>
              <span style={{ display: "inline-block", width: "85px", lineHeight: '30px' }}>选择维度</span>
              <Select
                style={{ width: '100%' }}
                onChange={handleChangeDate}
                options={dateOptions}
                defaultValue="hour"
              />
            </Flex>
          </Col>
          <Col className="gutter-row" xs={24} sm={12} md={12} lg={6} xl={6}>
            <div>
              {
                dateSelectedValue === 'hour' ? (
                  <DatePicker
                    value={hour}
                    disabledDate={disabledDate}
                    onChange={(date) => { changeDate(date) }}
                  />
                ) : (
                  <RangePicker
                    picker={dateSelectedValue}
                    key={dateSelectedValue}
                    disabledDate={disabledDate}
                    dropdownClassName={dateSelectedValue === 'month' ? 'highlight-month' : ''}
                    onChange={(date) => {
                      changeRange(date)
                    }}
                    defaultValue={
                      dateSelectedValue === 'date' ? date :
                        dateSelectedValue === 'week' ? week :
                          dateSelectedValue === 'month' ? month : null
                    }
                  />
                )
              }
            </div>
          </Col>
          <Col className="gutter-row" xs={24} sm={12} md={12} lg={6} xl={6}>
            <Flex>
              <span style={{ display: "inline-block", width: "85px", lineHeight: '30px' }}>选择平台</span>
              <Select
                style={{ width: '100%' }}
                onChange={handleChangePlat}
                options={platOptions}
                defaultValue={'all'}
              />
            </Flex>
          </Col>
          <Col className="gutter-row" xs={24} sm={12} md={12} lg={6} xl={6}>
            <Button type="primary" onClick={fetchHistoryData}>获取数据</Button>
          </Col>
        </Row>

      </div>
      <div className="charts-style">
        <Spin spinning={loading}>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              <div className="chart-list">
                <h2><BarChartOutlined style={{ color: '#9BD348', marginRight: '5px' }} />接口响应情况</h2>
                <ReactECharts
                  option={getOption()}
                  style={{ height: '400px', width: '80%', margin: '0 auto' }}
                  notMerge={true}
                />
              </div>
            </Col>
            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              <div className="chart-list">
                <h2><RadarChartOutlined style={{ color: '#00A8A0', marginRight: '5px' }} />性能差异</h2>
                <ReactECharts
                  option={getRadarOption()}
                  style={{ height: '400px', width: '80%', margin: '0 auto' }}
                />
              </div>
            </Col>
            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              <div className="chart-list">
                <h2><PieChartOutlined style={{ color: '#0f73FF', marginRight: '5px' }} />接口调用情况</h2>
                <ReactECharts
                  option={getPieOption()}
                  style={{ height: '400px', width: '80%', margin: '0 auto' }}
                />
              </div>
            </Col>
            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              <div className="chart-list">
                <h2><DotChartOutlined style={{ color: '#FFA202', marginRight: '5px' }} />用户一周在线情况</h2>
                <ReactECharts
                  option={getScatterOption()}
                  style={{ height: '400px', width: '80%', margin: '0 auto' }}
                />
              </div>
            </Col>
          </Row>
        </Spin>
      </div>
    </div>
  );
};

export default ChartDashboard;
