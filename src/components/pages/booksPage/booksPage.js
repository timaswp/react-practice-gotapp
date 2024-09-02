import React, {Component} from 'react';
import ItemList from '../../itemList/itemList';
import ItemDetails, {Field} from '../../itemDetails/itemDetails';
import ErrorMessage from '../../errorMessage/errorMessage';
import GotService from '../../../services/gotService';
import RowBlock from '../../rowBlock/rowBlock';

export default class BooksPage extends Component {
    gotService = new GotService();

    state = {
        selectedBook: 1,
        error: false
    }

    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    onItemSelected = (id) => {
        this.setState({
            selectedBook: id
        });
    }

    render() {
        if (this.state.error) {
            return <ErrorMessage/>
        }

        const itemList = (
            <ItemList
                onItemSelected={this.onItemSelected}
                getData={this.gotService.getAllBooks}
                renderItem={({name}) => name}/>
        )

        const itemDetails = (
            <ItemDetails
                itemId={this.state.selectedBook}
                getData={this.gotService.getBook}>
                <Field field="numberOfPages" label="Number of pages"/>
                <Field field="publisher" label="Publisher"/>
                <Field field="released" label="Released"/>
            </ItemDetails>
        )

        return (
            <RowBlock left={itemList} right={itemDetails}/>
        )
    }
}