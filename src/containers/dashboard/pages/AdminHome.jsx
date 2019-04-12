import React from 'react'
import { connect } from 'react-redux'
import './styles/home.css'
import { Table, Icon } from 'antd'
import { editTweet } from '../../../modules/tweet'
import moment from 'moment'

class AdminHome extends React.Component {
  render() {
    const columns = [
      {
        title: 'Derniers Tweets',
        render: t => (
          <span style={{ color: t.visible ? null : 'red' }}>
            {t.text.length > 100 ? t.text.substr(0, 100) + '...' : t.text}
          </span>
        )
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
      <div className='admin-container'>
        <Table
          itemLayout='horizontal'
          style={{ width: '50%' }}
          dataSource={this.props.tweets}
          pagination={false}
          columns={columns}
          scroll={{ y: 400 }}
        />
      </div>
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
)(AdminHome)
