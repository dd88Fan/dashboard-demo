import React from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import Layout from '../pages/layout'
import Home from '../pages/Home'
import CostAnalysis from '../pages/CostAnalysis'

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
        path: 'costAnalysis',
        Component: CostAnalysis
      }
    ]
  }
]

export default createBrowserRouter(routes)
