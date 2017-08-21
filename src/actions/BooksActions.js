import firebase from 'firebase';
import _ from 'lodash';


import {
    BOOKS_FETCH_SUCCESS
} from './types';

export const booksFetch = () => {
    return (dispatch) => {
        
        firebase.database().ref(`/books/`)
        .once('value', snapshot => {
            console.log("reached once");
            dispatch({ type: BOOKS_FETCH_SUCCESS, payload: snapshot.val() })
        });
    }
};

