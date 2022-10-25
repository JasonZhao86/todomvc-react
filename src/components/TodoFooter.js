import React from 'react'

export default class TodoFooter extends React.Component {
  render() {
    const { list, currentActive } = this.props
    // 没有任务时，不显示footer
    if (list.length === 0) {
      return null
    }
    const leftCount = list.filter((item) => !item.done).length
    const isShow = list.some((item) => item.done)
    return (
      <footer className="footer">
        <span className="todo-count">
          <strong>{leftCount}</strong> item left
        </span>
        <ul className="filters">
          <li>
            <a
              className={currentActive === 'all' ? 'selected' : ''}
              href="#/"
              onClick={() => this.handleClick('all')}
            >
              All
            </a>
          </li>
          <li>
            <a
              className={currentActive === 'active' ? 'selected' : ''}
              href="#/active"
              onClick={() => this.handleClick('active')}
            >
              Active
            </a>
          </li>
          <li>
            <a
              className={currentActive === 'completed' ? 'selected' : ''}
              href="#/completed"
              onClick={() => this.handleClick('completed')}
            >
              Completed
            </a>
          </li>
        </ul>
        {isShow && (
          <button className="clear-completed" onClick={this.clearDoneTask}>
            Clear completed
          </button>
        )}
      </footer>
    )
  }

  handleClick = (type) => {
    this.props.changetab(type)
  }

  clearDoneTask = () => {
    this.props.clearDoneTask()
  }
}
