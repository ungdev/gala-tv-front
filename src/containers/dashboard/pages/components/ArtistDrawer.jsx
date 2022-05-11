import React from "react";
import { connect } from "react-redux";
import { actions as notifActions } from "redux-notifications";
import {
  Drawer,
  Form,
  Button,
  Input,
  Checkbox,
  DatePicker,
  TimePicker,
  Select,
  Icon
} from "antd";
import moment from "moment";
import { createArtist, editArtist } from "../../../../modules/artist";
import { fetchArtists } from "../../../../modules/artist";
import "../styles/components.css";
import Uploader from "../../../../components/Uploader";

let id = 0;
const { Option } = Select;
class ArtistDrawer extends React.Component {
  constructor(props) {
    super(props);
    const { artist } = props;
    this.state = {
      artistVisible: artist ? artist.visible : true,
      image: artist ? artist.image : null,
      artist,
      links: artist ? artist.links : []
    };
    props.fetchArtists();
  }
  addImage = image => this.setState({ image });

  addLink = () => {
    const { links } = this.state;
    const nextLinks = links.concat({ key: id++, uri: "", type: null });
    this.setState({
      links: nextLinks
    });
  };

  remove = key => {
    const { links } = this.state;
    if (links.length === 1) {
      return;
    }
    this.setState({
      links: links.filter(link => link.key !== key)
    });
  };

  setType = (index, type) => {
    const { links } = this.state;
    links[index].type = type;
    this.setState({
      links
    });
  };
  setUri = (index, uri) => {
    const { links } = this.state;
    links[index].uri = uri;
    this.setState({
      links
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!this.state.image) {
        this.props.sendError();
        return;
      }
      if (!err) {
        let date = undefined;
        if (values.eventDate && values.eventTime) {
          date = moment(
            `${values.eventDate.format("YYYY-MM-DD")}T${values.eventTime.format(
              "HH:mm"
            )}`
          );
        }

        let artist = {
          name: values.name,
          description: values.description,
          links: JSON.stringify(
            this.state.links.map(link => ({
              uri: link.uri,
              type: link.type
            }))
          ),
          visible: this.state.artistVisible,
          image: this.state.image,
          eventDate: date,
          eventPlace: values.eventPlace
        };

        if (this.props.artist)
          this.props.editArtist(this.props.artist.id, artist);
        else this.props.createArtist(artist);
        this.props.onClose();
        this.props.form.resetFields();
      }
    });
  };

  static getDerivedStateFromProps(props, state) {
    if (
      props.artist &&
      (!state.artist || props.artist.id !== state.artist.id)
    ) {
      return {
        artist: props.artist,
        image: props.artist.image,
        artistVisible: props.artist.visible
      };
    }
    return null;
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { artist } = this.props;
    const { links } = this.state;

    const formItems = links.map(({ key, type, uri }, index) => (
      <div
        key={key}
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
          width: "100%"
        }}
      >
        <Form.Item
          name={[`links[${key}]`, "type"]}
          style={{ width: "50%" }}
          noStyle
          rules={[{ required: true, message: "Le type est nécessaire" }]}
        >
          <Select
            placeholder="Choisir un type"
            onChange={t => this.setType(index, t)}
            value={type}
          >
            <Option value="facebook">Facebook</Option>
            <Option value="twitter">Twitter</Option>
            <Option value="instagram">Instagram</Option>
            <Option value="youtube">Youtube</Option>
            <Option value="spotify">Spotify</Option>
            <Option value="web">Site web</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name={[`links[${key}]`, "uri"]}
          noStyle
          style={{ width: "50%" }}
          rules={[{ required: true, message: "Le lien est nécessaire" }]}
        >
          <Input
            placeholder="https://lien.fr/blabla"
            value={uri}
            onChange={e => this.setUri(index, e.target.value)}
          />
        </Form.Item>

        {links.length > 1 ? (
          <Icon
            className="dynamic-delete-button"
            type="minus-circle-o"
            onClick={() => this.remove(key)}
          />
        ) : null}
      </div>
    ));

    return (
      <Drawer
        title={artist ? "Modifier un artiste" : "Créer un artiste"}
        width={300}
        onClose={this.props.onClose}
        visible={this.props.visible}
      >
        <Form layout="vertical" onSubmit={this.handleSubmit} hideRequiredMark>
        <Form.Item label="Nom">
            {getFieldDecorator("name", {
              rules: [
                { required: true, message: "Vous devez entrer un nom !" }
              ],
              initialValue: artist ? artist.name : ""
            })(<Input placeholder="Le nom de l'artiste" />)}
          </Form.Item>
          <Form.Item label="Description">
            {getFieldDecorator("description", {
              rules: [
                { required: true, message: "Vous devez entrer une description !" }
              ],
              initialValue: artist ? artist.description : ""
            })(<Input placeholder="Le nom de l'artiste" />)}
          </Form.Item>
          <span>Liens de l'artiste</span>
          {formItems}
          <Form.Item>
            <Button
              type="dashed"
              onClick={this.addLink}
              style={{ width: "100%" }}
            >
              <Icon type="plus" /> Ajouter un lien
            </Button>
          </Form.Item>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center"
            }}
          >
            <span>Ajouter une image pour l'artiste : </span>
            <Uploader
              addImage={this.addImage}
              removeImage={() => this.setState({ image: null })}
              initialImage={artist && artist.image}
              buttonClickedTime={this.props.buttonClickedTime}
            />
          </div>
          <Form.Item label="Représentation">
            {getFieldDecorator("eventDate", {
              initialValue:
                artist && artist.eventDate
                  ? moment(artist.eventDate, "YYYY-MM-DDTHH:mm:ss.SSSSZ")
                  : undefined
            })(<DatePicker placeholder="Date" />)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("eventTime", {
              initialValue:
                artist && artist.eventDate
                  ? moment(artist.eventDate, "YYYY-MM-DDTHH:mm:ss.SSSSZ")
                  : undefined
            })(<TimePicker format="HH:mm" placeholder="Horaire" />)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("eventPlace", {
              initialValue: artist ? artist.eventPlace : ""
            })(<Input placeholder="Emplacement" />)}
          </Form.Item>
          <Form.Item>
            <Checkbox
              checked={this.state.artistVisible}
              onChange={() =>
                this.setState({ artistVisible: !this.state.artistVisible })
              }
            >
              {this.state.artistVisible ? "Visible" : "Caché"}
            </Checkbox>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {artist ? "Modifier" : "Créer"}
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  fetchArtists: () => dispatch(fetchArtists()),
  createArtist: params => dispatch(createArtist(params)),
  editArtist: (id, params) => dispatch(editArtist(id, params)),
  sendError: () =>
    dispatch(
      notifActions.notifSend({
        message: "Vous devez ajouter une image pour cet artiste",
        kind: "danger",
        dismissAfter: 2000
      })
    )
});

const ArtistDrawerForm = Form.create()(ArtistDrawer);
export default connect(
  null,
  mapDispatchToProps
)(ArtistDrawerForm);
