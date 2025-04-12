/* src/layout.js */
import React, { useState } from 'react'
import { Layout, theme } from 'antd'
import Aside from '../components/aside'
import MyHeader from '../components/header'
import { Outlet } from 'react-router-dom'

const { Content } = Layout

const MyLayout = () => {
  const [collapsed, setCollapsed] = useState(true)
  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken()
  return (
    <Layout className='main-container'>
      <Aside collapsed={collapsed} />
      <Layout>
        <MyHeader collapsed={collapsed} setCollapsed={setCollapsed} />
        <Content
          style={{
            margin: '24px 16px',
            padding: 12,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG
          }}
        >
          <Outlet/>
        </Content>
      </Layout>
    </Layout>
  )
}
export default MyLayout

