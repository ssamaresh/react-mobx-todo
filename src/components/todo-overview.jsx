import React from 'react'
import PropTypes from 'prop-types';

import { observer } from 'mobx-react'

import TodoItem from './todo-item';

const ToggleAll = props =>
    <input
        className = 'toggle-all'
        type = 'checkbox'
        checked = { props.todoStore.completedTodoCount === props.todoStore.todos.length }
        onChange = { () => props.todoStore.completeAll() }
    />

const ToggleAllCheckBox = observer(ToggleAll);

class TodoOverview extends React.Component {
    render() {
        const { todoStore } = this.props;
        return(
            <section className = 'main'>
                { todoStore.todos.length ? <ToggleAllCheckBox todoStore = { todoStore } /> : null }
                <ul className = 'todo-list'>
                    { 
                        todoStore.visibleTodos.map(todo =>
                            <TodoItem key = { todo.id } todo = { todo } todoStore = { todoStore } />
                        )
                    }
                </ul>
            </section>
        );        
    }
};

TodoOverview.propTypes = {
    todoStore: PropTypes.object.isRequired
};

export default observer(TodoOverview);