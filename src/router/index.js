import React from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import Layout from '../pages/layout'
import Home from '../pages/Home'
import CostAnalysis from '../pages/CostAnalysis'
import UserAnalysis from '../pages/UserAnalysis'
import PerformanceAnalysis from '../pages/PerformanceAnalysis'

const routes = [
  {
    path: '/',
    Component: Layout,
    children: [
      //重定向
      {
        path: '/',
        element: <Navigate to='home' replace />,
      },
      {
        path: 'home',
        Component: Home
      },
      {
        path: 'performanceAnalysis',
        Component: PerformanceAnalysis
      },
      {
        path: 'costAnalysis',
        Component: CostAnalysis
      },
      {
        path: 'userAnalysis',
        Component: UserAnalysis
      }
    ]
  }
]

export default createBrowserRouter(routes)
