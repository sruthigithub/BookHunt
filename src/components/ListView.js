import _ from 'lodash';
import React, { Component } from 'react';
import { Spinner } from '@shoutem/ui';
import { connect } from 'react-redux';
import { View, ListView } from 'react-native';
import SearchBar from 'react-native-search-bar';

import { booksFetch } from '../actions';

import ListItem from './ListItem';

class BooksList extends Component {

    componentWillMount() {
        this.setState({animating: true, searchTerm: ""});
        this.props.booksFetch();
        this.createDataSource(this.props);
    }

    componentWillReceiveProps(nextProps){
        console.log("next props", nextProps);
        this.createDataSource(nextProps);
        this.setState({animating: false});
    }

    createDataSource({ books }) {
        console.log("datasource", books);
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 != r2
        });

        this.dataSource = ds.cloneWithRows(books);
    }

    renderRow(book) {
        return <ListItem book={book}/>;
    }

    renderNavBar(){
        //console.log("router", this);

    }
    search(){
        var searchText = this.state.searchTerm;
        var filteredBookList = this.props.books.filter(book => ~book.name.indexOf(searchText))


        //this.dataSource = filteredBookList;
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
                    onChangeText={(text) => this.setState({searchTerm: text})}
                    onSearchButtonPress={this.search.bind(this)}
                />
                <ListView
                    enableEmptySections
                    initialListSize={20}
                    pageSize={20}
                    dataSource={this.dataSource}
                    renderRow={this.renderRow}
                />
                </View>
            );
        }
    }
}

const mapStateToProps = state => {

    const books = _.map(state.books, (val, uid) => {

        return { ...val, uid };
    });
    //console.log("mapsStateToProps", books);
    return { books };
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
export default connect(mapStateToProps, { booksFetch })(BooksList);
