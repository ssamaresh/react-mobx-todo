import React from 'react'
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { decorate, observable } from 'mobx';
import { observer } from 'mobx-react';

class TextInput extends React.Component {

    title;

    constructor(props) {
        super(props);
        this.title = this.props.title || '';
    }

    handleBlur = (e) => {
        if(!this.props.newTodo) {
            this.props.onSave(e.target.value);
        }
    }

    handleSubmit = (e) => {
        const title = e.target.value.trim();
        if(e.which === 13) {
            this.props.onSave(title);
            if(this.props.newTodo) {
                this.title = '';
            }
        }
    };

    handleChange = (e) => {
        this.title = e.target.value;
    };

    render() {
        const { placeholder, editing, newTodo } = this.props;
        return (
            <input
                className = { classnames({
                    edit: editing,
                    'new-todo': newTodo
                }) }
                type = 'text'
                placeholder = { placeholder }
                autoFocus = 'true'
                value = { this.title }
                onBlur = { this.handleBlur }
                onChange = { this.handleChange }
                onKeyDown = { this.handleSubmit }
            />
        )
      }
};

const TodoTextInput = decorate(observer(TextInput), {
    title: observable
});

TodoTextInput.propTypes = {
    newTodo: PropTypes.bool,
    onSave: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    title: PropTypes.string,
    editing: PropTypes.bool
};

export default TodoTextInput;
