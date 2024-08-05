import React, { Component } from 'react';
import Task from './task';
import './App.css';

class TaskList extends Component {
  constructor(props) {
    super(props);
 
    console.log("TaskList Constructor Called");
    console.log("-----------------------")
    this.state = {
      taskList: []
    };
  }


  componentDidMount() {

    console.log("TaskList Component Did Mount");
    console.log("-----------------------")
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("TaskList Component Did Update");
    console.log("-----------------------")
    console.log("Previous State:", prevState);
    console.log("-----------------------")
    console.log("Current State:", this.state);
    console.log("-----------------------")
  }

  componentWillUnmount() {
    console.log("TaskList Component Will Unmount");
    console.log("-----------------------")
  }

  addTask = () => {
    const { inputText, taskList } = this.state;
    if (inputText.trim() !== '') {
      const newTask = { id: Date.now(), description: inputText };
      this.setState({
        taskList: [...taskList, newTask],
        
      });
    }
  }

  deleteTask = (id) => {
    this.setState({
      taskList: this.state.taskList.filter(task => task.id !== id)
    });
  }

  //controlled and uncontrolled components
  //modify this assignment
  getInput = (e) => {
    this.setState({ inputText: e.target.value });
  }

  render() {
    console.log("TaskList Render");
    return (
      <div className="task-list">
        <input 
          type="text" 
          value={this.state.inputText} 
          onChange={this.getInput} 
          placeholder="Add a task" 
        />
        <button onClick={this.addTask}>Add Task</button>
        <h1>To-Do List</h1>
        {this.state.taskList.map(task => (
          <Task
            key={task.id}
            id={task.id}
            description={task.description}
            deleteTask={() => this.deleteTask(task.id)}
          />
        ))}
      </div>
    );
  }
}

export default TaskList;
