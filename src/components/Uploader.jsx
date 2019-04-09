import React from 'react'
import { Upload, Icon, Modal } from 'antd'
import { connect } from 'react-redux'
import { actions as notifActions } from 'redux-notifications'
import { deleteTempImage } from '../modules/image'

class Uploader extends React.Component {
  constructor(props) {
    super(props)
    let fileList = []
    if (props.initialImage)
      fileList.push({
        uid: '-1',
        name: props.initialImage.split('/images/')[1],
        status: 'done',
        url: `${process.env.REACT_APP_API}${props.initialImage}`
      })
    this.state = {
      previewVisible: false,
      previewImage: '',
      fileList,
      initialImage: props.initialImage || 'none',
      buttonClickedTime: props.buttonClickedTime
    }
  }

  static getDerivedStateFromProps(props, state) {
    let fileList = []
    if (props.initialImage && props.initialImage !== state.initialImage) {
      fileList.push({
        uid: '-1',
        name: props.initialImage.split('/images/')[1],
        status: 'done',
        url: `${process.env.REACT_APP_API}${props.initialImage}`
      })
      return {
        initialImage: props.initialImage,
        fileList,
        buttonClickedTime: props.buttonClickedTime
      }
    }
    if (
      props.buttonClickedTime &&
      state.buttonClickedTime &&
      props.buttonClickedTime.format('x') !==
        state.buttonClickedTime.format('x')
    ) {
      return {
        buttonClickedTime: props.buttonClickedTime,
        fileList,
        initialImage: 'none'
      }
    }
    return null
  }
  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = file => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true
    })
  }

  handleChange = e => {
    if (e.file.status === 'removed') {
      this.props.removeImage()
      this.props.deleteImage(e.file.name)
      this.setState({ fileList: [], removing: true })
      return
    }
    if (e.file.status === 'uploading') {
      this.props.addImage(e.file.name)
    }
    this.setState({ fileList: e.fileList })
  }

  beforeUpload = file => {
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      this.props.sendError()
    }
    return isLt2M
  }

  render() {
    const { previewVisible, previewImage } = this.state
    let { fileList } = this.state
    const uploadButton = (
      <div>
        <Icon type='plus' />
        <div className='ant-upload-text'>Upload</div>
      </div>
    )
    return (
      <React.Fragment>
        <Upload
          action={`${process.env.REACT_APP_API}/images`}
          listType='picture-card'
          fileList={fileList}
          beforeUpload={this.beforeUpload}
          data={{ auth: `Basic ${this.props.auth}` }}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 1 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt='example' style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </React.Fragment>
    )
  }
}
const mapStateToProps = state => ({
  auth: state.login.token
})

const mapDispatchToProps = dispatch => ({
  deleteImage: name => dispatch(deleteTempImage(name)),
  sendError: () =>
    dispatch(
      notifActions.notifSend({
        message:
          "L'image choisit est trop grande, elle doit être inférieur à 2Mo",
        kind: 'danger',
        dismissAfter: 2000
      })
    )
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Uploader)
