import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { actions as notifActions } from 'redux-notifications'
import {
  Drawer,
  Form,
  Button,
  Icon,
  Input,
  Select,
  DatePicker,
  TimePicker,
  Checkbox,
  Spin,
  Tooltip
} from 'antd'
import { createEvent, deleteEvent, editEvent } from '../../../../modules/event'
import { fetchArtists } from '../../../../modules/artist'
import { fetchPartners } from '../../../../modules/partner'
import '../styles/components.css'
import Uploader from '../../../../components/Uploader'
import ArtistDrawer from './ArtistDrawer'
import PartnerDrawer from './PartnerDrawer'
const { Option } = Select

class EventDrawer extends React.Component {
  constructor(props) {
    super(props)
    const { event } = props
    this.state = {
      eventVisible: event ? event.visible : true,
      image: event ? event.image : null,
      event,
      artistDrawerVisible: false,
      partnerDrawerVisible: false
    }
    props.fetchArtists()
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
        let event = {
          name: values.name,
          description: values.description,
          place: values.place,
          artist: values.artist,
          partner: values.partner,
          visible: this.state.eventVisible,
          image: this.state.image,
          start:
            values.startDate.format().split('T')[0] +
            'T' +
            values.startHour.format().split('T')[1],
          end:
            values.endDate.format().split('T')[0] +
            'T' +
            values.endHour.format().split('T')[1]
        }
        if (this.props.event) this.props.editEvent(this.props.event.id, event)
        else this.props.createEvent(event)
        this.props.onClose()
        this.props.form.resetFields()
      }
    })
  }

  static getDerivedStateFromProps(props, state) {
    if (props.event && (!state.event || props.event.id !== state.event.id)) {
      return {
        event: props.event,
        image: props.event.image,
        eventVisible: props.event.visible
      }
    }
    return null
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { user, event, artists, partners } = this.props
    if (!user) return <Spin />
    return (
      <Drawer
        title={event ? 'Modifier un événement' : 'Créer un évenement'}
        width={300}
        onClose={this.props.onClose}
        visible={this.props.visible}
      >
        <ArtistDrawer
          visible={this.state.artistDrawerVisible}
          buttonClickedTime={this.state.buttonArtistClickedTime}
          onClose={() => this.setState({ artistDrawerVisible: false })}
        />
        <PartnerDrawer
          visible={this.state.partnerDrawerVisible}
          buttonClickedTime={this.state.buttonPartnerClickedTime}
          onClose={() => this.setState({ partnerDrawerVisible: false })}
        />
        <Form layout='vertical' onSubmit={this.handleSubmit} hideRequiredMark>
          <Form.Item label='Nom' style={{ marginBottom: 0 }}>
            {getFieldDecorator('name', {
              rules: [
                { required: true, message: 'Vous devez entrer un nom !' }
              ],
              initialValue: event ? event.name : ''
            })(<Input placeholder="Le nom de l'événement" />)}
          </Form.Item>
          <Form.Item label='Lieu'>
            {getFieldDecorator('place', {
              initialValue: event ? event.place : ''
            })(<Input placeholder="Le lieu de l'événement" />)}
          </Form.Item>
          <Form.Item label='Date de début'>
            <Form.Item
              style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
            >
              {getFieldDecorator('startDate', {
                rules: [
                  {
                    required: true,
                    message: 'Vous devez entrer une date de début'
                  }
                ],
                initialValue: event ? moment(event.start) : null
              })(<DatePicker placeholder='Date' />)}
            </Form.Item>
            <span
              style={{
                display: 'inline-block',
                width: '24px',
                textAlign: 'center'
              }}
            >
              -
            </span>
            <Form.Item
              style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
            >
              {getFieldDecorator('startHour', {
                rules: [
                  {
                    required: true,
                    message: 'Vous devez entrer une heure de début'
                  }
                ],
                initialValue: event ? moment(event.start) : null
              })(<TimePicker format='HH:mm' placeholder='Heure' />)}
            </Form.Item>
          </Form.Item>
          <Form.Item label='Date de fin'>
            <Form.Item
              style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
            >
              {getFieldDecorator('endDate', {
                rules: [
                  {
                    required: true,
                    message: 'Vous devez entrer une date de fin'
                  }
                ],
                initialValue: event ? moment(event.end) : null
              })(<DatePicker placeholder='Date' />)}
            </Form.Item>
            <span
              style={{
                display: 'inline-block',
                width: '24px',
                textAlign: 'center'
              }}
            >
              -
            </span>
            <Form.Item
              style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
            >
              {getFieldDecorator('endHour', {
                rules: [
                  {
                    required: true,
                    message: 'Vous devez entrer une heure de fin'
                  }
                ],
                initialValue: event ? moment(event.end) : null
              })(<TimePicker format='HH:mm' placeholder='Heure' />)}
            </Form.Item>
          </Form.Item>
          {artists && (
            <Form.Item
              label={
                <span>
                  Artiste{' '}
                  <Tooltip placement='top' title='Ajouter un artiste'>
                    <a
                      onClick={() =>
                        this.setState({
                          artistDrawerVisible: true,
                          buttonArtistClickedTime: moment()
                        })
                      }
                      style={{ fontSize: '14px' }}
                    >
                      <Icon type='plus-circle' />
                    </a>
                  </Tooltip>
                </span>
              }
            >
              {getFieldDecorator('artist', {
                initialValue: event ? event.artistId : null
              })(
                <Select
                  showSearch
                  notFoundContent='Aucun artiste'
                  placeholder='Sélectionnez un Artiste'
                  optionFilterProp='children'
                  filterOption={(input, option) => {
                    const artist = artists.find(
                      a => a.id === option.props.value
                    )
                    if (!artist) return false
                    return (
                      artist.name.toLowerCase().indexOf(input.toLowerCase()) >=
                      0
                    )
                  }}
                >
                  {artists.map(artist => (
                    <Option key={artist.id} value={artist.id}>
                      {artist.name}
                    </Option>
                  ))}
                </Select>
              )}
            </Form.Item>
          )}
          {partners && (
            <Form.Item
              label={
                <span>
                  Partenaire{' '}
                  <Tooltip placement='top' title='Ajouter un partenaire'>
                    <a
                      onClick={() =>
                        this.setState({
                          partnerDrawerVisible: true,
                          buttonPartnerClickedTime: moment()
                        })
                      }
                      style={{ fontSize: '14px' }}
                    >
                      <Icon type='plus-circle' />
                    </a>
                  </Tooltip>
                </span>
              }
            >
              {getFieldDecorator('partner', {
                initialValue: event ? event.partnerId : null
              })(
                <Select
                  showSearch
                  notFoundContent='Aucun partenaire'
                  placeholder='Sélectionnez un Partenaire'
                  optionFilterProp='children'
                  filterOption={(input, option) => {
                    const partner = partners.find(
                      p => p.id === option.props.value
                    )
                    if (!partner) return false
                    return (
                      partner.name.toLowerCase().indexOf(input.toLowerCase()) >=
                      0
                    )
                  }}
                >
                  {partners.map(partner => (
                    <Option key={partner.id} value={partner.id}>
                      {partner.name}
                    </Option>
                  ))}
                </Select>
              )}
            </Form.Item>
          )}
          <Form.Item label='Description'>
            {getFieldDecorator('description', {
              initialValue: event ? event.description : ''
            })(<Input.TextArea placeholder="Description de l'événement" />)}
          </Form.Item>
          <Form.Item>
            <Checkbox
              checked={this.state.eventVisible}
              onChange={() =>
                this.setState({ eventVisible: !this.state.eventVisible })
              }
            >
              {this.state.eventVisible ? 'Visible' : 'Caché'}
            </Checkbox>
          </Form.Item>
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <span>Ajouter une image pour l'événement : </span>
            <Uploader
              addImage={this.addImage}
              removeImage={() => this.setState({ image: null })}
              initialImage={event && event.image}
              buttonClickedTime={this.props.buttonClickedTime}
            />
          </div>
          <Form.Item>
            <Button type='primary' htmlType='submit'>
              {event ? 'Modifier' : 'Créer'}
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    )
  }
}

const mapStateToProps = state => ({
  artists: state.artist.artists,
  partners: state.partner.partners,
  user: state.user.user
})

const mapDispatchToProps = dispatch => ({
  fetchArtists: () => dispatch(fetchArtists()),
  fetchPartners: () => dispatch(fetchPartners()),
  createEvent: params => dispatch(createEvent(params)),
  editEvent: (id, params) => dispatch(editEvent(id, params)),
  deleteEvent: id => dispatch(deleteEvent(id)),
  sendError: () =>
    dispatch(
      notifActions.notifSend({
        message: 'Vous devez ajouter une image pour cet événement',
        kind: 'danger',
        dismissAfter: 2000
      })
    )
})

const EventDrawerForm = Form.create()(EventDrawer)
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventDrawerForm)
