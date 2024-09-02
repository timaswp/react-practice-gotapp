import React, {Component} from 'react';
import ItemList from '../itemList/itemList';
import ErrorMessage from '../errorMessage/errorMessage';
import GotService from '../../services/gotService';
import {Navigate} from 'react-router-dom';

export default class BooksPage extends Component {
    gotService = new GotService();

    state = {
        error: false,
        redirectTo: null
    }

    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    handleItemSelected = (itemId) => {
        this.setState({
            redirectTo: itemId
        });
    }

    render() {
        const { error, redirectTo } = this.state;

        if (error) {
            return <ErrorMessage />;
        }

        if (redirectTo) {
            return <Navigate to={redirectTo} />;
        }

        return (
            <ItemList
                onItemSelected={this.handleItemSelected}
                getData={this.gotService.getAllBooks}
                renderItem={({name}) => name}
            />
        );
    }
}