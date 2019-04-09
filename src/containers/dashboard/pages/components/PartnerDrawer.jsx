import React from 'react'
import { connect } from 'react-redux'
import { actions as notifActions } from 'redux-notifications'
import { Drawer, Form, Button, Input, Checkbox } from 'antd'
import { createPartner, editPartner } from '../../../../modules/partner'
import { fetchPartners } from '../../../../modules/partner'
import './components.css'
import Uploader from '../../../../components/Uploader'

class PartnerDrawer extends React.Component {
  constructor(props) {
    super(props)
    const { partner } = props
    this.state = {
      partnerVisible: partner ? partner.visible : true,
      image: partner ? partner.image : null,
      partner
    }
    props.fetchPartners()
  }
  addImage = image => this.setState({ image })

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!this.state.image) {
        this.props.sendError()
        return
      }
      if (!err) {
        let partner = {
          name: values.name,
          url: values.url,
          description: values.description,
          visible: this.state.partnerVisible,
          image: this.state.image
        }
        if (this.props.partner)
          this.props.editPartner(this.props.partner.id, partner)
        else this.props.createPartner(partner)
        this.props.onClose()
        this.props.form.resetFields()
      }
    })
  }

  static getDerivedStateFromProps(props, state) {
    if (
      props.partner &&
      (!state.partner || props.partner.id !== state.partner.id)
    ) {
      return {
        partner: props.partner,
        image: props.partner.image,
        partnerVisible: props.partner.visible
      }
    }
    return null
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { partner } = this.props
    return (
      <Drawer
        title={partner ? 'Modifier un partenaire' : 'Créer un partenaire'}
        width={300}
        onClose={this.props.onClose}
        visible={this.props.visible}
      >
        <Form layout='vertical' onSubmit={this.handleSubmit} hideRequiredMark>
          <Form.Item label='Nom' style={{ marginBottom: 0 }}>
            {getFieldDecorator('name', {
              rules: [
                { required: true, message: 'Vous devez entrer un nom !' }
              ],
              initialValue: partner ? partner.name : ''
            })(<Input placeholder='Le nom du partenaire' />)}
          </Form.Item>
          <Form.Item label='Lien vers la page du partenaire'>
            {getFieldDecorator('url', {
              rules: [
                {
                  required: true,
                  message: 'Vous devez entrer un lien pour ce partenaire !'
                }
              ],
              initialValue: partner ? partner.url : ''
            })(<Input placeholder='https://monpartnaire.com' />)}
          </Form.Item>
          <Form.Item label='Description'>
            {getFieldDecorator('description', {
              initialValue: partner ? partner.description : ''
            })(<Input.TextArea placeholder='Description du partenaire...' />)}
          </Form.Item>
          <Form.Item>
            <Checkbox
              checked={this.state.partnerVisible}
              onChange={() =>
                this.setState({ partnerVisible: !this.state.partnerVisible })
              }
            >
              {this.state.partnerVisible ? 'Visible' : 'Caché'}
            </Checkbox>
          </Form.Item>
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <span>Ajouter une image pour le partenaire : </span>
            <Uploader
              addImage={this.addImage}
              removeImage={() => this.setState({ image: null })}
              initialImage={partner && partner.image}
              buttonClickedTime={this.props.buttonClickedTime}
            />
          </div>
          <Form.Item>
            <Button type='primary' htmlType='submit'>
              {partner ? 'Modifier' : 'Créer'}
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  fetchPartners: () => dispatch(fetchPartners()),
  createPartner: params => dispatch(createPartner(params)),
  editPartner: (id, params) => dispatch(editPartner(id, params)),
  sendError: () =>
    dispatch(
      notifActions.notifSend({
        message: 'Vous devez ajouter une image pour ce partenaire',
        kind: 'danger',
        dismissAfter: 2000
      })
    )
})

const PartnerDrawerForm = Form.create()(PartnerDrawer)
export default connect(
  null,
  mapDispatchToProps
)(PartnerDrawerForm)
