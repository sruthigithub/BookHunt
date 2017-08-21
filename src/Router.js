import React, { Component } from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import { NavigationBar, Title, Button, Icon } from '@shoutem/ui';
import BooksList from './components/ListView';
import BookDetails from './components/BookDetails';
import MainNavBar from './components/MainNavBar';
import EventEmitter from "react-native-eventemitter";

class RouterComponent extends Component {

    onBooksDetailsSharePress(){
        EventEmitter.emit("bookDetailsShareEvent", {});
    }

    render(){
        return (
            <Router sceneStyle={{ paddingTop: 65 }} navBar={MainNavBar}>
                <Scene key="main">
                    <Scene
                        key="booksList"
                        component={BooksList}
                        title="Books"
                        hasHistory={false}
                    />
                    <Scene 
                        key="bookDetails" 
                        component={BookDetails} 
                        title="Book Details"
                        hasHistory={true}
                        navigateBack={Actions.pop}
                        rightComponent={(
                            <Button styleName="tight clear" onPress={this.onBooksDetailsSharePress}>
                                <Icon name="share" />
                            </Button>
                        )}                      
                    />
                </Scene>
            </Router>
        );
    }
}

export default RouterComponent;
