import { combineReducers } from 'redux';
import BooksReducer from './BooksReducer';

export default combineReducers({
    books: BooksReducer,
});