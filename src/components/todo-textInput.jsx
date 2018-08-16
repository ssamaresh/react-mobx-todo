import React from 'react'
import PropTypes from 'prop-types';
import { decorate, observable } from 'mobx';
import { observer } from 'mobx-react';

import TextField from '@material-ui/core/TextField';

const style = {
	display: 'flex'
};

class TextInput extends React.Component {

    title;
    constructor(props) {
        super(props);
        this.title = this.props.title || '';
    }

    handleSubmit = (e) => {
        const title = e.target.value.trim();
        if(e.which === 13) {
            this.props.onSave(title);
			this.title = '';
        }
    };

    handleChange = (e) => {
        this.title = e.target.value;
    };

    render() {
        const { placeholder } = this.props;
        return (
			<div style = { style }>
				<TextField
					helperText = { placeholder }
					fullWidth = { true }
                    value = { this.title }
					onChange = { this.handleChange }
					onKeyDown = { this.handleSubmit }
				>
				</TextField>
			</div>
		)
	}
};

const TodoTextInput = decorate(observer(TextInput), {
    title: observable
});

TodoTextInput.propTypes = {
    onSave: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    title: PropTypes.string
};

export default TodoTextInput;
