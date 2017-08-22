import _ from 'lodash';
import React, { Component } from 'react';
import { Spinner } from '@shoutem/ui';
import { connect } from 'react-redux';
import { View, ListView } from 'react-native';
import SearchBar from 'react-native-search-bar';

import { booksFetch, categoryFetch } from '../actions';

import ListItem from './ListItem';

class BooksList extends Component {

    componentWillMount() {
        this.setState({animating: true});

        this.props.booksFetch();
        this.props.categoryFetch();

        this.createDataSource(this.props);
        //console.log(this.props);
    }

    componentWillReceiveProps(nextProps){
        console.log("next props", nextProps);
        console.log(this.props)
        this.createDataSource(nextProps);
        this.setState({animating: false});
    }

    createDataSource({ books }) {
        //console.log("datasource", books);
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 != r2
        });
        
        this.setState({dataSource: ds.cloneWithRows(books)});
    }

    renderRow(book) {
        return <ListItem book={book}/>;
    }

    renderNavBar(){
        //console.log("router", this);

    }
    search(text){
        var re = new RegExp(text, 'gi');
        var filteredBookList = this.props.books.filter(book => ~book.name.search(re));
        this.createDataSource({books: filteredBookList});
    }
    
    render() {
        console.log("props-loading", this.state.animating);
        if(this.state.animating){
            return(
                <View style={styles.container}>
                    <Spinner animating={this.state.animating} 
                        style={styles.centering}/>
                </View>
            );
        }else{
            return (
                <View style={{flex: 1}}>
                <SearchBar
                    returnKeyType='search'
                    lightTheme
                    placeholder='Search...'
                    onChangeText={(text) => this.search(text)}
                    hideBackground={true}
                    textFieldBackgroundColor="#fff"
                />
                <ListView
                    enableEmptySections
                    initialListSize={20}
                    pageSize={20}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                />
                </View>
            );
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    console.log("mapStateToProps", state);
        console.log("ownProps", ownProps);
    const books = _.map(state.books, (val, uid) => {

        return { ...val, uid };
    });

    const categories = _.map(state.category, (val, uid) => {
        
                return { ...val, uid };
            });
    
    console.log("mapStateToProps - return", { books, categories });
    return { books, categories };
};

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    centering: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
        color: '#333333',
        size: 'large'
    }
};
// connect returns a function thats immediatly get called with LibraryList
export default connect(mapStateToProps, { booksFetch, categoryFetch })(BooksList);
