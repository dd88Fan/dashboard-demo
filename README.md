# Getting Started with Create React App

## 功能介绍
存在四个菜单

### 首页
展示各个核心指标的echarts 图，展示柱状和折线图，热力图和雷达图
### 性能展示
页面展示通过标准差和移动平均值算法下数据展示情况，情况有异常echart图表该点颜色会有差异，并且该记录会记录到table中
### 成本分析
通过card展示数字和不同类型图
### 用户分析
实现了前端导出excel和pdf格式功能

首页写了websocket 的方法，由于没有后台数据， 所以只是写了些方法

## 运行方法

### 安装模块
npm install

### 本地运行
npm run start
