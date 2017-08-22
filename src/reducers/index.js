import { combineReducers } from 'redux';
import BooksReducer from './BooksReducer';
import CategoryReducer from './CategoryReducer';

export default combineReducers({
    books: BooksReducer,
    category: CategoryReducer
});