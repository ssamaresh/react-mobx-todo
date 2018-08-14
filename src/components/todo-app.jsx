import React from 'react';
import PropTypes from 'prop-types';

import { observer } from 'mobx-react';

import TodoHeader from './todo-header';
import TodoOverview from './todo-overview';
import TodoFooter from './todo-footer';

import DevTools from 'mobx-react-devtools';

class TodoApp extends React.Component {
    render() {
        const { todoStore } = this.props;
        return(
            <div>
                <DevTools />
                <TodoHeader todoStore = { todoStore } />
                <TodoOverview todoStore = { todoStore } />
                <br />
                { todoStore.todos.length ? <TodoFooter todoStore = { todoStore } /> : null }
            </div>
        );
    }
};

TodoApp.propTypes = {
    todoStore: PropTypes.object.isRequired
}

export default observer(TodoApp);
