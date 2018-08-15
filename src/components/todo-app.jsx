import React from 'react';
import PropTypes from 'prop-types';

import { observer } from 'mobx-react';

import TodoHeader from './todo-header';
import TodoList from './todo-list';
import TodoFooter from './todo-footer';

import DevTools from 'mobx-react-devtools';
import Paper from '@material-ui/core/Paper';

const style = {
    margin: '20px auto',
    width: '80%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 20
};


class TodoApp extends React.Component {
    render() {
        const { todoStore } = this.props;
        return(
            <Paper style = { style } elevation = { 2 }>
                <DevTools />
                <TodoHeader todoStore = { todoStore } />
                <TodoList todoStore = { todoStore } />
                { todoStore.todos.length ? <TodoFooter todoStore = { todoStore } /> : null }
            </Paper>
        );
    }
};

TodoApp.propTypes = {
    todoStore: PropTypes.object.isRequired
}

export default observer(TodoApp);
