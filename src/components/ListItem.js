import React, { Component } from 'react';
import {
  TouchableOpacity
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { 
    View, 
    Image, 
    Subtitle, 
    Divider, 
    Icon, 
    Caption, 
    Button, 
    Row 
} from '@shoutem/ui';

import { connect } from 'react-redux';

class ListItem extends Component {

    onRowPress() {
        Actions.bookDetails({ book: this.props.book });
    }

    render() {
        const { book } = this.props;
        
        return(
            <TouchableOpacity onPress={this.onRowPress.bind(this)}>
                <Row>
                    <Image
                    styleName="small"
                    source={{ uri: book.imageCoverUrl }}
                    />
                    <View styleName="vertical">
                        <Subtitle>{book.name}</Subtitle>
                        <Caption styleName="space-between">{book.author}</Caption>
                    </View>
                    <Icon name="right-arrow" styleName="disclosure"/>
                </Row>
                <Divider styleName="line" />
            </TouchableOpacity>
        );
    }
}

export default ListItem;
