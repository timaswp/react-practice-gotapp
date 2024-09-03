import React, {Component} from 'react';
import ItemDetails, {Field} from '../itemDetails/itemDetails';
import ErrorMessage from '../errorMessage/errorMessage';
import GotService from '../../services/gotService';
import RowBlock from '../rowBlock/rowBlock';
import {HousesList} from '../itemList/itemList';

export default class HousesPage extends Component {
    gotService = new GotService();

    state = {
        selectedHouse: 1,
        error: false
    }

    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    onItemSelected = (id) => {
        this.setState({
            selectedHouse: id
        });
    }

    render() {
        if (this.state.error) {
            return <ErrorMessage/>
        }

        const itemList = (
            <HousesList
                onItemSelected={this.onItemSelected}
                getData={this.gotService.getAllHouses}
                renderItem={({name}) => name}/>
        )

        const itemDetails = (
            <ItemDetails
                itemId={this.state.selectedHouse}
                getData={this.gotService.getHouse}>
                <Field field='region' label='Region'/>
                <Field field='words' label='Words'/>
                <Field field='titles' label='Titles'/>
                <Field field='ancestralWeapons' label='Ancestral Weapons'/>
            </ItemDetails>
        )

        return (
            <RowBlock left={itemList} right={itemDetails}/>
        )
    }
}