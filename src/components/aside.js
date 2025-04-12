import React, { useState } from 'react'
import * as Icon from '@ant-design/icons'
import { Layout, Menu } from 'antd'
import menuList from '../config'
import { useNavigate } from 'react-router-dom'
import './aside.css'

const { Sider } = Layout

const Aside = props => {
  let navigate = useNavigate();
  const { collapsed } = props
  const clickMenu = e => {
    navigate(e.key)
  }
  //动态获取icon
  const iconToElement = name => React.createElement(Icon[name])

  //菜单数据处理
  const getItems = (items, list = []) => {
    items.map(item => {
      list.push({
        key: item.path,
        ...(item.icon ? { icon: iconToElement(item?.icon) } : []),
        label: item.label,
        ...(item.children ? { children: getItems(item.children) } : [])
      })
    })
    return list
  }

  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <h3 className='app-name'>Dify</h3>
      <Menu
        theme='dark'
        mode='inline'
        defaultSelectedKeys={['/home']}
        items={getItems(menuList)}
        style={{
          height: '100%'
        }}
        onClick={clickMenu}
      />
    </Sider>
  )
}
export default Aside
