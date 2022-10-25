import React from 'react'
import TodoItem from './TodoItem'

export default class TodoMain extends React.Component {
  render() {
    const { list, currentActive } = this.props
    // 不要修改从props里传过来的list
    let showList = []
    if (currentActive === 'active') {
      showList = list.filter((item) => !item.done)
    } else if (currentActive === 'completed') {
      showList = list.filter((item) => item.done)
    } else {
      showList = list
    }

    return (
      <section className="main">
        <input
          id="toggle-all"
          className="toggle-all"
          type="checkbox"
          // 没有放到state中，否则修改很麻烦
          checked={list.every((item) => item.done)}
          onChange={this.handleChecked}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <ul className="todo-list">
          {showList.map((item) => (
            <TodoItem {...this.props} item={item} key={item.id}></TodoItem>
          ))}
        </ul>
      </section>
    )
  }

  handleChecked = (e) => {
    this.props.checkAll(e.target.checked)
  }
}
