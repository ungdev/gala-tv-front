import React from 'react'
import { connect } from 'react-redux'
import NotificationDrawer from './components/NotificationDrawer'
import { Button, Icon } from 'antd'

class Notifications extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  render() {
    return (
      <React.Fragment>
        <h1>Notifications</h1>
        <Button
          type='primary'
          onClick={() =>
            this.setState({
              visible: true
            })
          }
        >
          <Icon type='plus' /> Créer une notification
        </Button>
        <NotificationDrawer
          visible={this.state.visible}
          onClose={() => this.setState({ visible: false })}
        />
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notifications)
