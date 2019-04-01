import React from 'react'
import { Layout } from 'antd'
import LeftBar from './LeftBar'

const { Content } = Layout

const DashboardLayout = props => {
  return (
    <Layout style={{ width: '100%', height: '100%' }}>
        <LeftBar/>
        <Content style={{ margin: 10, padding: 15, background: '#fff', minHeight: 360 }}>
          {props.component}
        </Content>
      </Layout>
  )
}

export default DashboardLayout
