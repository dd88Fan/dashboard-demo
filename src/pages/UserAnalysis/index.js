import React, { useState, useEffect } from 'react';
import { Table, Form, Button, Input, DatePicker, Select } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './index.css'
// 模拟数据
const mockData = Array.from({ length: 50 }, (_, i) => ({
    key: i,
    name: `用户 ${i}`,
    action: ['点击', '浏览', '购买'][i % 3],
    page: `页面 ${i % 5}`,
    time: `2025-04-${String(i % 30 + 1).padStart(2, '0')} 12:30`,
    duration: `${Math.floor(Math.random() * 60)}分钟`,
    rate: `${Math.floor(Math.random() * 100)}%`,
}));

const InteractionReport = () => {
    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0
    });

    // 列配置
    const columns = [
        { title: '用户名', dataIndex: 'name' },
        { title: '交互行为', dataIndex: 'action' },
        { title: '所在页面', dataIndex: 'page' },
        { title: '发生时间', dataIndex: 'time' },
        { title: '停留时长', dataIndex: 'duration' },
        { title: '满意度', dataIndex: 'rate' }
    ];

    // 初始化加载数据
    useEffect(() => {
        setData(mockData);
        setFilteredData(mockData);
        setPagination(prev => ({ ...prev, total: mockData.length }));
    }, []);

    // 处理查询
    const handleSearch = values => {
        let filtered = [...data];

        if (values.name) {
            filtered = filtered.filter(item =>
                item.name.toLowerCase().includes(values.name.toLowerCase())
            );
        }

        if (values.action) {
            filtered = filtered.filter(item => item.action === values.action);
        }

        if (values.dateRange) {
            const [start, end] = values.dateRange;
            filtered = filtered.filter(item => {
                const date = new Date(item.time);
                return date >= start && date <= end;
            });
        }

        setFilteredData(filtered);
        setPagination(prev => ({ ...prev, total: filtered.length }));
    };

    // 导出Excel
    const exportExcel = () => {
        let data = JSON.parse(JSON.stringify(filteredData));
        let slicedArray = data.slice((pagination.current - 1) * pagination.pageSize, pagination.current * pagination.pageSize)
        const worksheet = XLSX.utils.json_to_sheet(slicedArray);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "交互数据");
        XLSX.writeFile(workbook, "用户交互数据与满意度.xlsx");
    };

    // 导出PDF
    const exportPDF = (tableId, fileName) => {
        const input = document.getElementById(tableId);
        html2canvas(input, { scale: 2 }).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('landscape', 'mm', 'a4');
            const imgWidth = 280; // A4 纸宽度
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
            pdf.save(`${fileName}.pdf`);
        });
        };

        // 筛选表单
        const FilterForm = () => (
            <Form
                form={form}
                layout="inline"
                onFinish={handleSearch}
                initialValues={{ action: 'all' }}
            >
                <Form.Item label="用户名" name="name">
                    <Input placeholder="输入用户名" allowClear />
                </Form.Item>

                <Form.Item label="行为类型" name="action">
                    <Select style={{ width: 120 }}>
                        <Select.Option value="all">全部行为</Select.Option>
                        <Select.Option value="点击">点击</Select.Option>
                        <Select.Option value="浏览">浏览</Select.Option>
                        <Select.Option value="购买">购买</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item label="时间范围" name="dateRange">
                    <DatePicker.RangePicker showTime placeholder="选择时间" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">查询</Button>
                    <Button style={{ marginLeft: 8 }} onClick={() => form.resetFields()}>
                        重置
                    </Button>
                </Form.Item>
            </Form>
        );

        return (
            <div className="page-style">
                <div className="query-style">
                    <FilterForm />
                </div>
                <div className="table-style">
                    <div style={{ textAlign: 'right', marginBottom: 16 }}>
                        <Button
                            type="primary"
                            icon={<DownloadOutlined />}
                            onClick={exportExcel}
                            style={{ marginRight: 8 }}
                        >
                            导出Excel
                        </Button>
                        <Button
                            type="primary"
                            icon={<DownloadOutlined />}
                            onClick={() => exportPDF('myTable', '用户交互数据与满意度')}
                        >
                            导出PDF
                        </Button>
                    </div>

                    <Table
                        columns={columns}
                        dataSource={filteredData}
                        id="myTable"
                        pagination={{
                            ...pagination,
                            showSizeChanger: true,
                            pageSizeOptions: ['10', '20', '50'],
                            onChange: (page, pageSize) => {
                                setPagination({ current: page, pageSize, total: filteredData.length });
                            }
                        }}
                        bordered
                        scroll={{ x: true }}
                    />
                </div>
            </div>
        );
    };

    export default InteractionReport;
