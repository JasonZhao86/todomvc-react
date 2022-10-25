import React from 'react'
import { createRoot } from 'react-dom/client'
import TodoMain from './components/TodoMain'
import TodoHeader from './components/TodoHeader'
import TodoFooter from './components/TodoFooter'
import './styles/base.css'
import './styles/index.css'

class APP extends React.Component {
  state = {
    list: [],
    // 有三个值  all  active  completed
    currentActive: 'all',
  }

  render() {
    return (
      <div>
        <section className="todoapp">
          <TodoHeader addtask={this.addtask}></TodoHeader>
          <TodoMain
            list={this.state.list}
            changeTaskDone={this.changeTaskDone}
            deleteTask={this.deleteTask}
            checkAll={this.checkAll}
            editTask={this.editTask}
            currentActive={this.state.currentActive}
          ></TodoMain>
          <TodoFooter
            list={this.state.list}
            changetab={this.changetab}
            currentActive={this.state.currentActive}
            clearDoneTask={this.clearDoneTask}
          ></TodoFooter>
        </section>
      </div>
    )
  }

  changeTaskDone = (value, task) => {
    /* 
      由于state状态不可变的特性，不能直接修改state中的list数组，包括数组中的每个元素（对象）中属性，
      必须要使用一个新的数量进行替换：一定要小心，不要改了原来state中的数据
    */
    this.setState({
      list: this.state.list.map((item) =>
        item.id === task.id ? { ...item, done: value } : item
      ),
    })
  }

  deleteTask = (id) => {
    this.setState({
      list: this.state.list.filter((item) => item.id !== id),
    })
  }

  checkAll = (checked) => {
    this.setState({
      // 箭头函数返回一个对象时，要用括号将返回的对象括起来，否则会被认为是函数的边界线
      list: this.state.list.map((item) => ({ ...item, done: checked })),
    })
  }

  changetab = (type) => {
    this.setState({
      currentActive: type,
    })
  }

  clearDoneTask = () => {
    this.setState({
      list: this.state.list.filter((item) => !item.done),
    })
  }

  addtask = (taskName) => {
    this.setState({
      list: [
        ...this.state.list,
        { id: Date.now(), name: taskName, done: false },
      ],
    })
  }

  editTask = (id, name) => {
    this.setState({
      list: this.state.list.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            name,
          }
        } else {
          return item
        }
      }),
    })
  }

  componentDidMount() {
    this.setState({
      list: JSON.parse(localStorage.getItem('todos')) || [],
    })
  }
  componentDidUpdate() {
    localStorage.setItem('todos', JSON.stringify(this.state.list))
  }
}

const root = createRoot(document.getElementById('root'))
root.render(<APP></APP>)
