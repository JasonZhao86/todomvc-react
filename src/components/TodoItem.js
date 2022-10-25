import React from 'react'

export default class TodoItem extends React.Component {
  state = {
    // 当前双击的id
    currentId: '',
    // 当前双击的名字
    currentName: '',
  }

  inputRef = React.createRef()

  render() {
    const { item } = this.props
    return (
      // 拼接className="completed editing"的多个样式名
      <li
        className={`${item.done ? 'completed' : ''} ${
          this.state.currentId === item.id ? 'editing' : ''
        }`}
      >
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={item.done}
            onChange={(e) => this.handleChange(e, item)}
          />
          <label onDoubleClick={() => this.showEdit(item)}>{item.name}</label>
          <button
            className="destroy"
            onClick={() => this.destory(item.id)}
          ></button>
        </div>
        <input
          className="edit"
          value={this.state.currentName}
          onChange={(e) => this.setState({ currentName: e.target.value })}
          onKeyUp={this.handleKeyup}
          onBlur={() => this.setState({ currentId: '', currentName: '' })}
          ref={this.inputRef}
        />
      </li>
    )
  }

  componentDidUpdate() {
    this.inputRef.current.focus()
  }

  handleChange = (e, item) => {
    this.props.changeTaskDone(e.target.checked, item)
  }

  destory = (id) => {
    this.props.deleteTask(id)
  }

  showEdit = ({ id, name }) => {
    // 可以取代上面的componentDidUpdate
    // this.setState(
    //   {
    //     currentId: id,
    //     currentName: name,
    //   },
    //   () => {
    //     this.inputRef.current.focus()
    //   }
    // )
    this.setState({
      currentId: id,
      currentName: name,
    })
  }

  handleKeyup = (e) => {
    // 按了esc，取消修改
    if (e.keyCode === 27) {
      this.setState({
        currentId: '',
        currentName: '',
      })
    }
    // 按了enter，确认修改
    if (e.keyCode === 13) {
      this.props.editTask(this.state.currentId, this.state.currentName)
      // 清空当前选中的信息
      this.setState({
        currentId: '',
        currentName: '',
      })
    }
  }
}
