import React from 'react'
import PropTypes from 'prop-types';

import { observer } from 'mobx-react'

import TodoTextInput from './todo-textInput'

class TodoHeader extends React.Component {

    handleSave = title => {
        const { todoStore } = this.props;
        todoStore.addTodo(title);
    };

    render() {
        return(
            <header className = 'header'>
                <h1>Todos</h1>
                <TodoTextInput
                    newTodo
                    onSave = { this.handleSave }
                    placeholder = 'Enter New Todo Item'
                />
            </header>
        );
    }

};

TodoHeader.propTypes = {
    todoStore: PropTypes.object.isRequired
}

export default observer(TodoHeader);
