import React, { Component } from 'react';
import './App.css';
import 'todomvc-app-css/index.css'
import TodoStore from './stores/todo-store';
import TodoApp from './components/todo-app';

const initialState = [];

var todoStore = new TodoStore(initialState);

class App extends Component {
  render() {
    return (
      <TodoApp todoStore = { todoStore }/>
    );
  }
}

export default App;
