import React from 'react'
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { observable, decorate } from 'mobx';
import { observer } from 'mobx-react';

import TodoTextInput from './todo-textInput';

class Item extends React.Component {

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

    handleLabelDoubleClick = () => {
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
        const { todo } = this.props;

        let element;
        if(this.editing) {
            element = (
                <TodoTextInput
                    editing = { this.editing }
                    onSave = { title => this.handleSave(todo.id, title) }
                    title = { todo.title }
                />
            );
        }
        else {
            element = (
                <div className = 'view'>
                    <input
                        className = 'toggle'
                        type = 'checkbox'
                        checked = { todo.completed }
                        onChange = { this.handleChange }
                    />
                    <label onDoubleClick = { this.handleLabelDoubleClick }>
                        { todo.title }
                    </label>
                    <button
                        className = 'destroy'
                        onClick = { this.handleTodoDestroy }
                    />
                </div>
            );
        }
        return(
            <li
                className = { classnames({
                    completed: todo.completed,
                    editing: this.editing
                }) }
            >
                { element }
            </li>
        )
    }
};

Item.propTypes = {
    todo: PropTypes.object.isRequired,
    todoStore: PropTypes.object.isRequired,
};

const TodoItem = observer(Item);

export default decorate(TodoItem, {
    editing: observable
});
