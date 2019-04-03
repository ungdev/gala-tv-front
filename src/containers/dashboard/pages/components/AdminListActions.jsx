import React from 'react'
import { Icon, Tooltip, Modal } from 'antd'
import { connect } from 'react-redux'
import { setAdmin, removeAdmin } from '../../../../modules/admin'

const confirm = Modal.confirm

class AdminListActions extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false,
      alcool: true,
      bedroom: false
    }
  }

  handleClick = admin => {
    if (admin) {
      this.showConfirm(
        'Voulez-vous vraiment retirer les droits administrateurs ?',
        'Cette personne ne pourra plus accéder à cette application',
        () => this.props.removeAdmin(this.props.userId)
      )
    } else {
      this.showConfirm(
        'Voulez-vous vraiment donner les droits administrateurs ?',
        "Cette personne aura accès à toutes les fonctionnalités de l'application",
        () => this.props.setAdmin(this.props.userId)
      )
    }
  }
  showConfirm = (title, content, callback) => {
    confirm({
      title,
      content,
      onOk() {
        callback()
      },
      onCancel() {}
    })
  }

  render() {
    const { users, userId } = this.props
    const user = users.find(user => user.id === userId)
    const { admin } = user
    return (
      <React.Fragment>
        <Tooltip
          placement='top'
          title={
            admin
              ? 'Enlever les droits administrateurs'
              : 'Promouvoir administrateur'
          }
        >
          <a
            onClick={() => this.handleClick(admin)}
            style={{
              fontSize: '18px',
              marginLeft: '2px',
              color: admin ? 'red' : 'green'
            }}
          >
            {admin ? <Icon type='arrow-down' /> : <Icon type='arrow-up' />}
          </a>
        </Tooltip>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  users: state.admin.users
})

const mapDispatchToProps = dispatch => ({
  removeAdmin: id => dispatch(removeAdmin(id)),
  setAdmin: id => dispatch(setAdmin(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminListActions)
