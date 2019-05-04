import React from 'react'
import { connect } from 'react-redux'
import { fetchArtists, deleteArtist, editArtist } from '../../../modules/artist'
import ArtistDrawer from './components/ArtistDrawer'
import { Button, List, Icon, Spin } from 'antd'
import moment from 'moment'

class Artists extends React.Component {
  constructor(props) {
    super(props)

    props.fetchArtists()
    this.state = {
      artist: null,
      visible: false
    }
  }

  editArtist = artist => {
    this.setState({
      artist,
      visible: true
    })
  }

  render() {
    let { artists } = this.props
    if (!artists) return <Spin />
    
    return (
      <React.Fragment>
        <Button
          type='primary'
          onClick={() =>
            this.setState({
              visible: true,
              artist: null,
              buttonClickedTime: moment()
            })
          }
        >
          <Icon type='plus' /> Ajouter un artiste
        </Button>
        <ArtistDrawer
          artist={this.state.artist}
          visible={this.state.visible}
          buttonClickedTime={this.state.buttonClickedTime}
          onClose={() => this.setState({ visible: false })}
        />
        <List
          itemLayout='vertical'
          size='large'
          pagination={false}
          dataSource={artists}
          renderItem={item => (
            <List.Item
              key={item.id}
              actions={[
                <div
                  onClick={() => {
                    this.props.editArtist(item.id, {
                      name: item.name,
                      link: item.link,
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
                    this.editArtist(item)
                  }}
                >
                  <Icon type='edit' />
                  <span> Modifier</span>
                </div>,
                <div
                  onClick={() => {
                    this.props.deleteArtist(item.id)
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
                description={(
                  <div>
                    Page de l'artiste : <a href={item.link}>{item.link}</a><br />
                    Représentation :
                      <strong>
                        {item.eventDate
                          ? <span> {moment(item.eventDate).format('DD/MM/YYYY [à] HH:mm')} ({item.eventPlace || <i>Aucun emplacement</i>})</span>
                          : <i> Aucune</i>
                        }
                      </strong>
                  </div>
                )}
              />
              {item.visible
                ? 'Cet artiste est affiché sur les écrans'
                : "Cet artiste n'est pas affiché sur les écrans"}
            </List.Item>
          )}
        />
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  artists: state.artist.artists
})

const mapDispatchToProps = dispatch => ({
  fetchArtists: () => dispatch(fetchArtists()),
  deleteArtist: id => dispatch(deleteArtist(id)),
  editArtist: (id, params) => dispatch(editArtist(id, params))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Artists)
