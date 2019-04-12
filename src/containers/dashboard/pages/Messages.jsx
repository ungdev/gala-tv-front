import React from 'react'
import { connect } from 'react-redux'
import { Input, List, Icon, Spin, Button } from 'antd'
import {
  createMessage,
  editMessage,
  deleteMessage
} from '../../../modules/message'
import { fetchUsers } from '../../../modules/admin'
import moment from 'moment'
import './styles/messages.css'

class Messages extends React.Component {
  constructor(props) {
    super(props)
    props.fetchUsers()
    this.state = {
      input: ''
    }
  }

  sendMessage = () => {
    const { messageToModify, input } = this.state
    if (input === '') return
    if (messageToModify)
      this.props.editMessage(messageToModify.id, {
        ...messageToModify,
        content: input
      })
    else this.props.createMessage(input)

    this.setState({ input: '', messageToModify: null })
  }

  getUser = id => {
    const { users } = this.props
    if (!users) return null
    const user = users.find(u => u.id === id)
    if (user) return `Envoyé par : ${user.full_name}`
    else return null
  }

  render() {
    let { messages } = this.props
    if (!messages) return <Spin />
    return (
      <React.Fragment>
        <Input
          className='messages-input'
          onChange={e => this.setState({ input: e.target.value })}
          value={this.state.input}
        />
        <Button type='primary' onClick={this.sendMessage}>
          {this.state.messageToModify ? 'Modifier' : 'Envoyer'}
        </Button>
        <List
          itemLayout='vertical'
          size='large'
          pagination={false}
          dataSource={messages}
          renderItem={item => (
            <List.Item
              key={item.id}
              actions={[
                <div
                  onClick={() => {
                    this.props.editMessage(item.id, {
                      ...item,
                      visible: !item.visible
                    })
                  }}
                >
                  <Icon type={item.visible ? 'eye-invisible' : 'eye'} />
                  <span> {item.visible ? 'Cacher' : 'Afficher'}</span>
                </div>,
                <div
                  onClick={() => {
                    this.setState({
                      input: item.content,
                      messageToModify: item
                    })
                  }}
                >
                  <Icon type='edit' />
                  <span> Modifier</span>
                </div>,
                <div
                  onClick={() => {
                    this.props.deleteMessage(item.id)
                  }}
                >
                  <Icon type='stop' />
                  <span> Supprimer</span>
                </div>
              ]}
              extra={moment(item.createdAt).format('DD/MM/YY HH:mm:ss')}
            >
              <List.Item.Meta
                title={item.content}
                description={this.getUser(item.userId)}
              />
              {item.visible
                ? 'Ce message est affiché sur les écrans'
                : "Ce message n'est pas affiché sur les écrans"}
            </List.Item>
          )}
        />
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  messages: state.socketio.messages,
  users: state.admin.users
})

const mapDispatchToProps = dispatch => ({
  fetchUsers: () => dispatch(fetchUsers()),
  editMessage: (id, message) => dispatch(editMessage(id, message)),
  deleteMessage: id => dispatch(deleteMessage(id)),
  createMessage: txt => dispatch(createMessage(txt))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Messages)
