import React, {Component} from 'react';
import ErrorMessage from '../errorMessage/errorMessage';
import GotService from '../../services/gotService';
import {Navigate} from 'react-router-dom';
import {BooksList} from '../itemList/itemList';

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
            <BooksList
                onItemSelected={this.handleItemSelected}
                getData={this.gotService.getAllBooks}
                renderItem={({name}) => name}
            />
        );
    }
}