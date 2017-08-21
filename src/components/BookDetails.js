import React, { Component } from 'react';
import {ActionSheetIOS, UIManager} from 'react-native';
import { View, Title, Image, Caption, Subtitle, Heading, Button, Text, Tile, Icon } from '@shoutem/ui';
import StarRating from 'react-native-star-rating';
import EventEmitter from "react-native-eventemitter";

class BookDetails extends Component {

    componentWillMount(){
        EventEmitter.on("bookDetailsShareEvent", this.showShareActionSheet);
    }

    componentWillUnmount(){
        EventEmitter.removeAllListeners("bookDetailsShareEvent");
    }

    showShareActionSheet = () => {
            // Take the snapshot (returns a temp file uri)
        UIManager.takeSnapshot('window').then((uri) => {
        // Share image data
        ActionSheetIOS.showShareActionSheetWithOptions({
            url: uri,
            excludedActivityTypes: [
            'com.apple.UIKit.activity.PostToTwitter'
            ]
        },
        (error) => alert(error),
        (success, method) => {
            var text;
            if (success) {
            text = `Shared via ${method}`;
            } else {
            text = 'You didn\'t share';
            }
            this.setState({text});
        });
        }).catch((error) => alert(error));
    };
    
    render() {
        const { book } = this.props;

        return(
            <View style={{ flex:1, backgroundColor: '#FFFFFF' }}>
                
                <Tile styleName="text-centric">
                    <Image
                        styleName="medium"
                        source={{ uri: book.imageCoverUrl }}
                        />
                    <Title styleName="md-gutter-top">{book.name}</Title>
                    <Subtitle styleName="sm-gutter-top">
                        By {book.author}
                    </Subtitle>
                    <Caption>
                        ISBN: {book.isbn} 
                    </Caption>
                    <StarRating
                        disabled={true}
                        maxStars={5}
                        rating={book.rating}
                    />
                    <Caption>{book.description}</Caption>
                </Tile>
            </View>
        );
    }
}
export default BookDetails;