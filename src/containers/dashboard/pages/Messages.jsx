import React from 'react'
import { connect } from 'react-redux'
import { Input, List, Icon, Spin } from 'antd'
import { editMessage, deleteMessage } from '../../../modules/message'
import { fetchUser } from '../../../modules/user'
import moment from 'moment'

class Messages extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let { messages } = this.props
    if (!messages) return <Spin />
    return (
      <React.Fragment>
        <Input />
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
                      content: item.content,
                      visible: !item.visible
                    })
                  }}
                >
                  <Icon type={item.visible ? 'eye-invisible' : 'eye'} />
                  <span> {item.visible ? 'Cacher' : 'Afficher'}</span>
                </div>,
                <div
                  onClick={() => {
                    this.editMessage(item)
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
              <List.Item.Meta title={item.content} description={item.userId} />
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
  messages: state.socketio.messages
})

const mapDispatchToProps = dispatch => ({
  fetchUser: () => dispatch(fetchUser()),
  editMessage: (id, message) => dispatch(editMessage(id, message)),
  deleteMessage: id => dispatch(deleteMessage(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Messages)
