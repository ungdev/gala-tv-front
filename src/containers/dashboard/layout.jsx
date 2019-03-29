import React from 'react'
import { Layout } from 'antd'

const {
  Content,
} = Layout


const DashboardLayout = props => {
  return (
    <Layout style={{ width: '100%', height: '100%' }}>
      <Layout style={{ width: '100%', height: '100%' }}>
        <Content style={{ margin: 20, padding: 24, background: '#fff', minHeight: 360 }}>
          {props.component}
        </Content>
      </Layout>
    </Layout>
  )
}

export default DashboardLayout