import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import tasksReducer from '../reducers/tasks';
import categoriesReducer from '../reducers/categories'; 

const rootReducer = combineReducers({
  tasks: tasksReducer,
  categories: categoriesReducer, 
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;