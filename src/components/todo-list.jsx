import React from 'react'
import PropTypes from 'prop-types';

import List from '@material-ui/core/List';

import { observer } from 'mobx-react'

import TodoItem from './todo-item';

class TodoList extends React.Component {

    editing = false;

    handleSave = (id, title)  => {
        const { todoStore } = this.props;
        if (title.length === 0) {
            todoStore.deleteTodo(id)
        }
        else {
            todoStore.editTodo(id, title)
        }
        this.editing = false
    };

    handleTodoEdit = () => {
        this.editing = true;
    };

    handleChange = () => {
        const { todo, todoStore } = this.props;
        return todoStore.completeTodo(todo.id);
    };

    handleTodoDestroy = () => {
        const { todo, todoStore } = this.props;
        todoStore.deleteTodo(todo.id)
    };

    render() {
        const { todoStore } = this.props;
        return(
            <List>
                { 
                    todoStore.visibleTodos.map(todo => {
                        return <TodoItem key = { todo.id } todo = { todo } todoStore = { todoStore } />;
                    })
                }
            </List>
        );        
    }
};

TodoList.propTypes = {
    todoStore: PropTypes.object.isRequired
};

export default observer(TodoList);