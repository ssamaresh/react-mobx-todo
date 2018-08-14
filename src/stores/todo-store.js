import { decorate, observable, action, computed } from 'mobx';
import shortid from 'shortid';
import { ALL_TODOS, TODO_FILTERS } from '../constants';

class Store {

    filter = ALL_TODOS;
    todos;

    constructor(initialTodos = []) {
        this.todos = initialTodos;
    }

    addTodo = title => {
        const todo = {
            id: shortid.generate(),
            title,
           completed: false  
        };
        this.todos.push(todo);
        return todo;
    };

    findTodo = id => {
        return this.todos.find(todo => id === todo.id);
    };

    deleteTodo = id => {
        this.todos = this.todos.filter(todo => {
            return id !== todo.id;
        });
    };

    editTodo = (id, title) => {
        this.findTodo(id).title = title;
    };

    completeTodo = id => {
        const todo = this.findTodo(id);
        todo.completed = !todo.completed;
    };

    toggleAll = () => {
        this.todos.forEach(todo => todo.completed = true);
    };

    clearCompleted = () => {
        this.todos = this.todos.filter(todo => !todo.completed);
    };

    setFilter = filter => {
        this.filter = filter;
    };

    completeAll = () => {
        this.todos.forEach(todo => todo.completed = true);
    };

    get activeTodoCount() {
        return this.todos.reduce((acc, todo) => {
            return acc + (todo.completed ? 0 : 1); 
        }, 0);
    }
    
    get visibleTodos() {
        return this.todos.filter(TODO_FILTERS[this.filter]);
    }

    get completedTodoCount() {
        return this.todos.length - this.activeTodoCount;
    }
};

const TodoStore = decorate(Store, {
    todos: observable,
    filter: observable,
    activeTodoCount: computed,
    completeAll: action,
    visibleTodos: computed,
    completedTodoCount: computed

});

export default TodoStore;