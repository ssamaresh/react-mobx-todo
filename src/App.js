import React, { Component } from 'react';
// import 'todomvc-app-css/index.css'
import TodoStore from './stores/todo-store';
import TodoApp from './components/todo-app';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const initialState = [];
const todoStore = new TodoStore(initialState);

const theme = createMuiTheme({
	palette: {
		type: 'light',
	}
});

class App extends Component {
	render() {
		return (
			<MuiThemeProvider theme = { theme }>
				<TodoApp todoStore = { todoStore }/>
			</MuiThemeProvider>
		);
	}
}

export default App;
