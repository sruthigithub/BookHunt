import React, { Component } from 'react';
import { View } from 'react-native';
import { connect, Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import Router from './Router';

class App extends Component {

    componentWillMount() {
        // Initialize Firebase
        var config = {
            apiKey: "AIzaSyBMN5mq9RjwPM1exhetWyw803052TIszso",
            authDomain: "books-48f4a.firebaseapp.com",
            databaseURL: "https://books-48f4a.firebaseio.com",
            projectId: "books-48f4a",
            storageBucket: "books-48f4a.appspot.com",
            messagingSenderId: "326426227531"
        };

        firebase.initializeApp(config);
    }
    render() {
        const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
        return (
            <Provider store={store}>
                <Router />
            </Provider>
        );
    }
}



export default App;