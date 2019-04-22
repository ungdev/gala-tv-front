import React from 'react'
import { connect } from 'react-redux'
import { List, Icon, Input, Button } from 'antd'
import {
  createMessage,
  editMessage,
  deleteMessage
} from '../../../../modules/message'

class HomeMessageList extends React.Component {
  constructor(props) {
    super(props)
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
  render() {
    let { messages } = this.props
    return (
      <div style={{ width: '49%' }}>
        <h1>Liste des messages</h1>
        <Input
          className='messages-input'
          onChange={e => this.setState({ input: e.target.value })}
          value={this.state.input}
          placeholder='ajouter un message'
        />
        <Button type='primary' onClick={this.sendMessage}>
          Envoyer
        </Button>
        <List
          itemLayout='vertical'
          size='small'
          pagination={false}
          dataSource={messages}
          renderItem={item => (
            <List.Item
              key={item.id}
              extra={
                <div>
                  <a
                    style={{ marginRight: '10px' }}
                    onClick={() => {
                      this.props.editMessage(item.id, {
                        ...item,
                        visible: !item.visible
                      })
                    }}
                  >
                    <Icon type={item.visible ? 'eye-invisible' : 'eye'} />
                    <span> {item.visible ? 'Cacher' : 'Afficher'}</span>
                  </a>
                  <a
                    onClick={() => {
                      this.props.deleteMessage(item.id)
                    }}
                  >
                    <Icon type='stop' />
                    <span> Supprimer</span>
                  </a>
                </div>
              }
            >
              <List.Item.Meta title={item.content} />
            </List.Item>
          )}
        />
      </div>
    )
  }
}
const mapStateToProps = state => ({
  messages: state.socketio.messages
})

const mapDispatchToProps = dispatch => ({
  editMessage: (id, message) => dispatch(editMessage(id, message)),
  deleteMessage: id => dispatch(deleteMessage(id)),
  createMessage: txt => dispatch(createMessage(txt))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeMessageList)
