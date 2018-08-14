export const ALL_TODOS = 'all';
export const ACTIVE_TODOS = 'active';
export const COMPLETED_TODOS = 'completed';

export const TODO_FILTERS = {
    [ALL_TODOS]: todo => todo,
    [ACTIVE_TODOS]: todo => !todo.completed,
    [COMPLETED_TODOS] : todo => todo.completed
};

export const FILTER_TITLES = {
    [ALL_TODOS]: 'All',
    [ACTIVE_TODOS]: 'Active',
    [COMPLETED_TODOS]: 'Completed'
};

