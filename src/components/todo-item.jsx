import React from 'react'
import PropTypes from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox'
import { DeleteTwoTone, EditTwoTone } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { blueGrey800, red600, grey800 } from '@material-ui/core/colors';

import { observable, decorate } from 'mobx';
import { observer } from 'mobx-react';

import TodoTextInput from './todo-textInput';

const listElementStyles = {
	color: blueGrey800,
	fontSize: 18,
	lineHeight: '24px',
}

const listElementCheckedStyles = {
	...listElementStyles,
	textDecoration: 'line-through',
}

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
        
        const { todo } = this.props;
        const listStyles = !todo.completed ? listElementStyles: listElementCheckedStyles;
        let element;
        // if(this.editing) {
        //     console.log('IF TODO', todo);
        //     element = (
        //         <ListItem>
        //             <TodoTextInput
        //                 editing = { this.editing }
        //                 onSave = { title => this.handleSave(todo.id, title) }
        //                 title = { todo.title }
        //             />
        //         </ListItem>
        //     );
        // }
        // else {
        //     console.log('ELSE TODO', todo);
        //     element = (
        //         <ListItem key = { todo.id }>
        //             <Checkbox
        //                 checked = { todo.completed }
        //                 onChange = { this.handleChange }
        //             />
        //             <ListItemText primary = { todo.title } style = { listStyles } />
        //             <ListItemSecondaryAction>
        //                 <IconButton
        //                     aria-label = 'Edit Todo'
        //                     onClick = { this.handleTodoEdit }
        //                     // className = { classes.editIcon }
        //                 >
        //                     <EditTwoTone />
        //                 </IconButton>
        //                 <IconButton
        //                     aria-label = 'Delete Todo'
        //                     onClick = { this.handleTodoDestroy }
        //                     // className = { classes.deleteIcon }
        //                 >
        //                     <DeleteTwoTone />
        //                 </IconButton>
        //             </ListItemSecondaryAction>
        //         </ListItem>
        //     );
        // }
        return(
            <ListItem key = { todo.id }>
                <Checkbox
                    checked = { todo.completed }
                    onChange = { this.handleChange }
                />
                <ListItemText primary = { todo.title } style = { listStyles } />
                <ListItemSecondaryAction>
                    <IconButton
                        aria-label = 'Edit Todo'
                        onClick = { this.handleTodoEdit }
                    >
                        <EditTwoTone />
                    </IconButton>
                    <IconButton
                        aria-label = 'Delete Todo'
                        onClick = { this.handleTodoDestroy }
                    >
                        <DeleteTwoTone />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
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
