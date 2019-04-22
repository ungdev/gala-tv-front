import React from 'react'
import { connect } from 'react-redux'
import { Drawer, Form, Button, Input } from 'antd'
import { createNotification } from '../../../../modules/notification'

class NotificationDrawer extends React.Component {
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.createNotification(values.title, values.content)
        this.props.onClose()
        this.props.form.resetFields()
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Drawer
        title='Envoyer une notification'
        width={300}
        onClose={this.props.onClose}
        visible={this.props.visible}
      >
        <Form layout='vertical' onSubmit={this.handleSubmit}>
          <Form.Item label='Titre' style={{ marginBottom: 0 }}>
            {getFieldDecorator('title', {
              rules: [
                { required: true, message: 'Vous devez entrer un titre !' }
              ]
            })(<Input placeholder='Le titre de la notification' />)}
          </Form.Item>
          <Form.Item label='Contenu' style={{ marginBottom: 0 }}>
            {getFieldDecorator('content', {
              rules: [
                { required: true, message: 'Vous devez entrer un contenu !' }
              ]
            })(<Input placeholder='Le contenu de la notification' />)}
          </Form.Item>

          <Form.Item>
            <Button type='primary' htmlType='submit'>
              Envoyer
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
  createNotification: (title, content) =>
    dispatch(createNotification(title, content))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(NotificationDrawer))
