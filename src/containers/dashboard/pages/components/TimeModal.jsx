import React from 'react'
import { connect } from 'react-redux'
import { Modal, Form, InputNumber } from 'antd'

class TimeModal extends React.Component {
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Modal
        title='Ajouter un retard'
        visible={this.props.visible}
        onOk={this.props.onOk}
        onCancel={this.props.onCancel}
      >
        <Form layout='vertical'>
          <Form.Item label='Minutes de retard'>
            {getFieldDecorator('time', {
              rules: [
                {
                  required: true,
                  message: 'Vous devez rentrer le nombre de minutes de retard'
                }
              ],
              initialValue: 5
            })(<InputNumber min={0} />)}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}
const mapStateToProps = state => ({
  events: state.socketio.events
})

const mapDispatchToProps = dispatch => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create({ name: 'time_modal_form' })(TimeModal))
