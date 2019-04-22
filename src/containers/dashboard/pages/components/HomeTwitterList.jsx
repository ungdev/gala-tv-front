import React from 'react'
import { connect } from 'react-redux'
import { Table, Icon } from 'antd'
import { editTweet } from '../../../../modules/tweet'
import moment from 'moment'

class HomeTwitterList extends React.Component {
  render() {
    const columns = [
      {
        title: 'Derniers Tweets',
        render: t => (
          <span style={{ color: t.visible ? null : 'red' }}>
            {t.text.length > 100 ? t.text.substr(0, 100) + '...' : t.text}
          </span>
        ),
        key: 'id'
      },
      {
        dataIndex: 'user',
        align: 'center',
        render: u => '@' + u
      },
      {
        dataIndex: 'createdAt',
        align: 'center',
        render: m => moment(m).format('HH:mm:ss')
      },
      {
        align: 'center',
        render: item => (
          <a
            onClick={() => {
              this.props.editTweet(item.id, {
                visible: !item.visible
              })
            }}
          >
            <Icon type={item.visible ? 'eye-invisible' : 'eye'} />
            <span> {item.visible ? 'Cacher' : 'Afficher'}</span>
          </a>
        )
      }
    ]
    return (
      <Table
        itemLayout='horizontal'
        style={{ width: '49%' }}
        dataSource={this.props.tweets}
        pagination={false}
        columns={columns}
        scroll={{ y: 300 }}
        rowKey='id'
      />
    )
  }
}
const mapStateToProps = state => ({
  tweets: state.socketio.tweets
})

const mapDispatchToProps = dispatch => ({
  editTweet: (id, params) => dispatch(editTweet(id, params))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeTwitterList)
