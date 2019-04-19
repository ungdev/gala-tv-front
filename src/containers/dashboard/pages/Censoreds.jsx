import React from 'react'
import { connect } from 'react-redux'
import { Input, Tag, Icon, Checkbox } from 'antd'
import {
  createCensored,
  editCensored,
  deleteCensored
} from '../../../modules/censored'
import { TweenOneGroup } from 'rc-tween-one'

class Censoreds extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      inputVisible: false,
      inputValue: '',
      checked: false
    }
  }

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus())
  }

  handleInputChange = e => {
    this.setState({ inputValue: e.target.value })
  }

  handleInputConfirm = () => {
    const { inputValue, checked } = this.state
    let { censoreds } = this.props
    if (
      inputValue &&
      !censoreds.find(
        censored =>
          censored.word.toLowerCase().search(inputValue.toLowerCase()) !== -1
      )
    ) {
      this.props.createCensored({
        word: inputValue.toLowerCase(),
        level: checked ? 1 : 0
      })
      this.setState({
        inputVisible: false,
        inputValue: ''
      })
    }
  }

  saveInputRef = input => (this.input = input)

  forMap = tag => {
    const tagElem = (
      <Tag
        color={tag.level > 0 ? 'red' : 'geekblue'}
        closable
        onClose={e => {
          e.preventDefault()
          this.props.deleteCensored(tag.id)
        }}
      >
        {tag.word}
      </Tag>
    )
    return (
      <span key={tag.id} style={{ display: 'inline-block' }}>
        {tagElem}
      </span>
    )
  }

  render() {
    const { inputVisible, inputValue } = this.state
    const tagChild = this.props.censoreds.map(this.forMap)
    return (
      <div>
        <h1>Liste des mots censurés</h1>
        <div style={{ marginBottom: 16 }}>
          <TweenOneGroup
            enter={{
              scale: 0.8,
              opacity: 0,
              type: 'from',
              duration: 100,
              onComplete: e => {
                e.target.style = ''
              }
            }}
            leave={{ opacity: 0, width: 0, scale: 0, duration: 200 }}
            appear={false}
          >
            {tagChild}
          </TweenOneGroup>
        </div>
        {inputVisible && (
          <Input
            ref={this.saveInputRef}
            type='text'
            size='small'
            style={{ width: 114, marginRight: '10px' }}
            value={inputValue}
            onChange={this.handleInputChange}
            onBlur={this.handleInputConfirm}
            onPressEnter={this.handleInputConfirm}
          />
        )}
        {!inputVisible && (
          <Tag
            onClick={this.showInput}
            style={{
              background: '#fff',
              borderStyle: 'dashed',
              marginRight: '10px'
            }}
          >
            <Icon type='plus' /> Ajouter un mot
          </Tag>
        )}
        <Checkbox
          checked={this.state.checked}
          onChange={() => this.setState({ checked: !this.state.checked })}
        >
          Ne pas afficher le tweet si le mot apparaît
        </Checkbox>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  censoreds: state.socketio.censoreds
})

const mapDispatchToProps = dispatch => ({
  editCensored: (id, params) => dispatch(editCensored(id, params)),
  deleteCensored: id => dispatch(deleteCensored(id)),
  createCensored: params => dispatch(createCensored(params))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Censoreds)
