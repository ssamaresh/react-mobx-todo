import React from 'react'
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { observer } from 'mobx-react';

import { ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS, FILTER_TITLES } from '../constants';

class TodoFooter extends React.Component {

    renderTodoCount = () => {
        const { todoStore } = this.props;
        const activeCount = todoStore.todos.length - todoStore.completedTodoCount;
        const itemWord = activeCount === 1 ? 'item ' : 'items ';
        return (
            <span className = 'todo-count'>
                <strong>{ activeCount || 'No ' } { itemWord } left</strong>
            </span>
        );
    };

    renderFilterLink = filter => {
        const { todoStore } = this.props;
        const title = FILTER_TITLES[filter];
        return (
            <a
                className = { classnames({ selected: filter ===  todoStore.filter }) }
                style = { { cursor: 'pointer' } }
                onClick = { () =>  todoStore.setFilter(filter) }
            >
                { title }
            </a>
        )
    };

    renderClearButton = () => {
        const { todoStore } = this.props;
        if (todoStore.completedCount > 0) {
            return (
                <button
                    className = 'clear-completed'
                    onClick = { () => todoStore.clearCompleted() }
                >
                    Clear completed
                </button>
            )
        }
    };

    render() {
        const filters = [ ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS ];
        return(
            <footer className = 'footer'>
                { this.renderTodoCount() }
                <ul className = 'filters'>
                    { 
                        filters.map(filter => {
                            return(
                                <li key = { filter }>
                                    { this.renderFilterLink(filter) }
                                </li>
                            )
                        })
                    }
                </ul>
                { this.renderClearButton() }
            </footer>
        );
    }
};

TodoFooter.propTypes = {
    todoStore: PropTypes.object.isRequired
};

export default observer(TodoFooter);