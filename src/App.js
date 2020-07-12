import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Todos from './components/Todos';
import AddTodo from './components/AddTodo';
import About from './components/pages/About';
import uuid from 'uuid';
// import axios from 'axios';

import './App.css';

class App extends Component {

  state = {
    todos: []
  };

  componentDidMount() {
    try {
      const mytodos = JSON.parse(localStorage.getItem('myDataTodos'));
      if (mytodos.length > 0) {
        this.setState({
          todos: mytodos
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  // Toggle Complete
  markComplete = id => {
    const mark = this.state.todos.map(todo => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    })
    this.setState({
      todos: mark
    });
    this.addtoStorage(mark);
  };

  // Delete Todo
  delTodo = id => {
    const delte = [...this.state.todos.filter(todo => todo.id !== id)]
    this.setState({
      todos: delte
    })
    this.addtoStorage(delte);

  };

  // Add Todo
  addTodo = title => {
    if (title != '' && title != null && title != undefined) {
      const addto = {
        id: uuid.v4(),
        title: title,
        completed: false,
      }

      const addarray = [...this.state.todos, addto]
      this.setState({ todos: addarray });

      this.addtoStorage(addarray);
    }

  };

  addtoStorage(addarray) {
    localStorage.setItem('myDataTodos', JSON.stringify(addarray))
  }

  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <Route exact path="/" component={About} />
            <Route
              path="/todos"
              render={props => (
                <React.Fragment>
                  <AddTodo addTodo={this.addTodo} />
                  {this.state.todos.length > 0 &&
                    <Todos
                      todos={this.state.todos}
                      markComplete={this.markComplete}
                      delTodo={this.delTodo}
                    />}
                </React.Fragment>
              )}
            />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
