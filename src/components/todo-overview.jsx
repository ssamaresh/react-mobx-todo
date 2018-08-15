import React from 'react'
import PropTypes from 'prop-types';

import { observer } from 'mobx-react'

import TodoItem from './todo-item';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

class TodoOverview extends React.Component {
    render() {
        const { todoStore } = this.props;
        return(
            <List>
                { 
                    todoStore.visibleTodos.map(todo => {
                        console.log('inside', todo);
                        // return <TodoItem key = { todo.id } todo = { todo } todoStore = { todoStore } />;
                        return (
                            <ListItem key = { todo.id }>
                                <ListItemText primary = { todo.title } />
                            </ListItem>
                        )
                    })
                }
            </List>
        );        
    }
};

TodoOverview.propTypes = {
    todoStore: PropTypes.object.isRequired
};

export default observer(TodoOverview);