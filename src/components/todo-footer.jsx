import React from 'react'
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { SortTwoTone } from '@material-ui/icons';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS, FILTER_TITLES} from '../constants';
import { decorate, observable } from 'mobx';

const toolbarStyle = {
    display: 'flex',
    justifyContent: 'space-between'
};

class TodoFooter extends React.Component {

    anchorEl = null;

    renderTodoCount = () => {
        const { todoStore } = this.props;
        const activeCount = todoStore.todos.length - todoStore.completedTodoCount;
        const itemWord = activeCount === 1 ? 'item ' : 'items ';
        return (
            <Typography>
                { activeCount > 0 ? `${ activeCount } ${ itemWord } left` : 'No item left' }
            </Typography>
        )
    };

    renderClearButton = () => {
        const { todoStore } = this.props;
        return (
            <Button
                variant = 'contained'
                color = 'secondary'
                disabled = { todoStore.completedTodoCount === 0 }
                onClick = { () => todoStore.clearCompleted() }
            >
                Clear Completed
            </Button>
        )
    };

    handleFilterChange = filter => {
        const { todoStore } = this.props;
        this.handleClose();
        todoStore.setFilter(filter);
    };

    handleMenu = event => {
        this.anchorEl = event.currentTarget;
    };

    handleClose = () => {
        this.anchorEl = null;
    };

    render() {
        const filters = [ ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS ];
        const open = Boolean(this.anchorEl);
        return(
            <footer className = 'footer'>
                <Toolbar style = { toolbarStyle }>
                    { this.renderTodoCount() }
                    <div style = { {'display': 'flex', 'flexDirection': 'row'} }>
                        <IconButton
                            aria-owns = { open ? 'menu-appbar' : null }
                            aria-haspopup = 'true'
                            onClick = { this.handleMenu }
                            color = 'inherit'
                        >
                            <SortTwoTone />
                        </IconButton>
                        <Menu
                            anchorEl = { this.anchorEl }
                            open = { open }
                            onClose = { this.handleClose }
                        >
                            { 
                                filters.map(filter => {
                                    return(
                                        <MenuItem
                                            key = { filter }
                                            onClick = { () => this.handleFilterChange(filter) }
                                        >
                                            { FILTER_TITLES[filter] }
                                        </MenuItem>
                                    );
                                })
                            }
                        </Menu>
                        { this.renderClearButton() }
                    </div>
                </Toolbar>
            </footer>
        );
    }
};

TodoFooter.propTypes = {
    todoStore: PropTypes.object.isRequired
};

export default decorate(observer(TodoFooter), {
    anchorEl: observable
});