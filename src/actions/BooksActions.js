import firebase from 'firebase';
import _ from 'lodash';


import {
    BOOKS_FETCH_SUCCESS,
    CATEGORY_FETCH_SUCCESS
} from './types';

export const booksFetch = () => {
    return (dispatch) => {
        
        firebase.database().ref(`/books/`)
        .once('value', snapshot => {
            dispatch({ type: BOOKS_FETCH_SUCCESS, payload: snapshot.val() })
        });
    }
};

export const categoryFetch = () => {
    return (dispatch) => {
        firebase.database().ref('/category/')
        .once('value', snapshot => {
            dispatch({ type: CATEGORY_FETCH_SUCCESS, payload: snapshot.val() })
        })
    }
}
