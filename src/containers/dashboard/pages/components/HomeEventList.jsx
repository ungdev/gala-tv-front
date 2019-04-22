import React from 'react'
import { connect } from 'react-redux'
import { Table, Icon } from 'antd'
import moment from 'moment'
import TimeModal from './TimeModal'
import { delayEvents } from '../../../../modules/event'

class HomeEventList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      date: moment().format(),
      timeModalVisible: false
    }
  }
  componentDidMount() {
    this.intervalID = setInterval(() => this.tick(), 1000)
  }
  tick() {
    this.setState({
      date: moment().format()
    })
  }
  componentWillUnmount() {
    clearInterval(this.intervalID)
  }
  addDelay = () => {
    const form = this.formRef.props.form
    form.validateFields((err, values) => {
      if (err) {
        return
      }

      this.props.delayEvents(values.time)
      form.resetFields()
      this.setState({ timeModalVisible: false })
    })
  }

  saveFormRef = formRef => {
    this.formRef = formRef
  }
  render() {
    const columns = [
      {
        dataIndex: 'name',
        title: 'Prochains événements'
      },
      {
        dataIndex: 'place'
      },
      {
        title: (
          <a onClick={() => this.setState({ timeModalVisible: true })}>
            <Icon type='clock-circle' /> Ajouter un retard
          </a>
        ),
        dataIndex: 'start',
        align: 'center',
        render: m =>
          moment(this.state.date).isBefore(m)
            ? moment(m).format('HH[h]mm')
            : 'En ce moment'
      }
    ]
    return (
      <React.Fragment>
        <TimeModal
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.timeModalVisible}
          onOk={this.addDelay}
          onCancel={() => this.setState({ timeModalVisible: false })}
        />
        <Table
          itemLayout='horizontal'
          style={{ width: '49%' }}
          dataSource={this.props.events
            .filter(event => moment(this.state.date).isBefore(event.end))
            .sort((a, b) => {
              //sort by start date
              if (moment(a.start).isAfter(b.start)) return 1
              if (moment(a.start).isBefore(b.start)) return -1
              return 0
            })}
          pagination={false}
          columns={columns}
          scroll={{ y: 200 }}
          rowKey='id'
        />
      </React.Fragment>
    )
  }
}
const mapStateToProps = state => ({
  events: state.socketio.events
})

const mapDispatchToProps = dispatch => ({
  delayEvents: time => dispatch(delayEvents(time))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeEventList)
