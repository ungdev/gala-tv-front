import React from 'react'
import { connect } from 'react-redux'
import { fetchPartners, deletePartner, editPartner } from '../../../modules/partner'
import PartnerDrawer from './components/PartnerDrawer'
import { Button, List, Icon, Spin } from 'antd'
import moment from 'moment'

class Partners extends React.Component {
  constructor(props) {
    super(props)
    props.fetchPartners()
    this.state = {
      partner: null,
      visible: false
    }
  }

  editPartner = partner => {
    this.setState({
      partner,
      visible: true
    })
  }

  render() {
    let { partners } = this.props
    if (!partners) return <Spin />
    partners = partners.sort((a, b) => {
      if (a.name > b.name) return -1
      if (a.name < b.name) return 1
      return 0
    })
    return (
      <React.Fragment>
        <Button
          type='primary'
          onClick={() =>
            this.setState({
              visible: true,
              partner: null,
              buttonClickedTime: moment()
            })
          }
        >
          <Icon type='plus' /> Ajouter un partenaire
        </Button>
        <PartnerDrawer
          partner={this.state.partner}
          visible={this.state.visible}
          buttonClickedTime={this.state.buttonClickedTime}
          onClose={() => this.setState({ visible: false })}
        />
        <List
          itemLayout='vertical'
          size='large'
          pagination={false}
          dataSource={partners}
          renderItem={item => (
            <List.Item
              key={item.id}
              actions={[
                <div
                  onClick={() => {
                    this.props.editPartner(item.id, {
                      name: item.name,
                      url: item.url,
                      visible: !item.visible,
                      image: item.image
                    })
                  }}
                >
                  <Icon type={item.visible ? 'eye-invisible' : 'eye'} />
                  <span> {item.visible ? 'Cacher' : 'Afficher'}</span>
                </div>,
                <div
                  onClick={() => {
                    this.editPartner(item)
                  }}
                >
                  <Icon type='edit' />
                  <span> Modifier</span>
                </div>,
                <div
                  onClick={() => {
                    this.props.deletePartner(item.id)
                  }}
                >
                  <Icon type='stop' />
                  <span> Supprimer</span>
                </div>
              ]}
              extra={
                <img
                  width={272}
                  alt='logo'
                  src={process.env.REACT_APP_API + item.image}
                />
              }
            >
              <List.Item.Meta
                title={item.name}
                description={<a>{item.url}</a>}
              />
              {item.description} <br />
              <br />
              {item.visible
                ? 'Cet partnere est affiché sur les écrans'
                : "Cet partnere n'est pas affiché sur les écrans"}
            </List.Item>
          )}
        />
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  partners: state.partner.partners
})

const mapDispatchToProps = dispatch => ({
  fetchPartners: () => dispatch(fetchPartners()),
  deletePartner: id => dispatch(deletePartner(id)),
  editPartner: (id, params) => dispatch(editPartner(id, params))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Partners)
