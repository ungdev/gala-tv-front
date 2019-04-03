import React from 'react'
import { Layout, Menu, Icon } from 'antd'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../../modules/login'
import logo from './assets/logo.png'
const { Sider } = Layout

class LeftBar extends React.Component {
  constructor(props) {
    super(props)
    let current = 'home'
    let openKeys = []
    this.state = { current, openKeys, collapsed: false }
  }

  static getDerivedStateFromProps(props, state) {
    let tab = props.location.split('/admin/')
    if (tab[1] && state.current !== tab[1]) {
      const tab2 = tab[1].split('/')
      let openKeys = []
      if (tab2.length > 1) {
        openKeys.push(tab2[0])
      }
      return { current: tab[1], openKeys }
    }
    return null
  }
  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }

  handleClick = e => {
    this.setState({
      current: e.key
    })
  }
  render() {
    return (
      <Sider breakpoint='lg' collapsedWidth='0' width={250} theme='dark'>
        <Link to={'/'}>
          <img src={logo} style={{ width: '100%' }} />
        </Link>

        <Menu
          theme='dark'
          mode='inline'
          defaultSelectedKeys={[this.state.current]}
          defaultOpenKeys={this.state.openKeys}
          selectedKeys={[this.state.current]}
          onClick={this.handleClick}
        >
          <Menu.Item key='home'>
            <Link to={'/admin'}>
              <Icon type='appstore' />
              <span>Accueil</span>
            </Link>
          </Menu.Item>
          <Menu.Item key='events'>
            <Link to={'/admin/events'}>
              <Icon type='calendar' />
              <span>Événements</span>
            </Link>
          </Menu.Item>
          <Menu.Item key='logout' onClick={this.props.logout}>
            <Icon type='logout' />
            <span>Se déconnecter</span>
          </Menu.Item>
        </Menu>
      </Sider>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user.user,
  location: state.routing.location.pathname
})

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LeftBar)
