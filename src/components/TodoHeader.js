import React from 'react'

export default class TodoHeader extends React.Component {
  state = {
    taskName: '',
  }
  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          value={this.state.taskName}
          onChange={this.handleChange}
          onKeyUp={this.handleKeyUp}
        />
      </header>
    )
  }

  handleChange = (e) => {
    this.setState({
      taskName: e.target.value,
    })
  }

  handleKeyUp = (e) => {
    // 按下的是enter建
    if (e.keyCode === 13) {
      if (!this.state.taskName.trim()) {
        return alert('名称不能为空')
      }
      this.props.addtask(this.state.taskName)
      this.setState({
        taskName: '',
      })
    }
  }
}
