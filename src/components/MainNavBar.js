import React, { Component } from 'react';
import { Title, NavigationBar } from '@shoutem/ui';

class MainNavBar extends Component {
    render(){
        return (
            <NavigationBar
                centerComponent={<Title>{this.props.title}</Title>}
                styleName="inline"
                hasHistory={this.props.hasHistory}
                navigateBack={this.props.navigateBack}
                rightComponent={this.props.rightComponent}
            />
        );
    }
}

export default MainNavBar;