import React, { Component } from 'react';
import './App.css';

// stateless components , change the assignment into pure componenets
class Task extends Component {
  constructor(props) {
    super(props);
    console.log("Task Constructor Called");
    console.log("-----------------------")
  }

  componentDidMount() {
    console.log("Task Component Did Mount");
    console.log("-----------------------")
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("Task Component Did Update");
    console.log("Previous Props:", prevProps);
    console.log("Current Props:", this.props);
    console.log("-----------------------")
  }

  componentWillUnmount() {
    console.log("Task Component Will Unmount");
    console.log("-----------------------")
  }

  render() {
    console.log("Task Render");
    console.log("-----------------------");
    
    const { description, deleteTask } = this.props;
    
    return (
      <div className="task">
        <h1>{description}</h1>
        <button onClick={deleteTask}>Delete Task</button>
      </div>
    );
  }
}

export default Task;
