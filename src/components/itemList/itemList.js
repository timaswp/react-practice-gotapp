import React from 'react';
import styled from 'styled-components';
import GotService from '../../services/gotService';
import withData from '../../services/withData';

const ItemListGroup = styled.ul`
    cursor: pointer;
`;

const ItemList = ({ data, renderItem, onItemSelected }) => {

    const renderItems = (arr) => {
        return arr.map(item => {
            const { id } = item;
            const label = renderItem(item);
            return (
                <li 
                    key={id}
                    className="list-group-item"
                    onClick={() => onItemSelected(id)}>
                    {label}
                </li>
            );
        });
    };
    
    const items = renderItems(data);

    return (
        <ItemListGroup className="item-list list-group">
            {items}
        </ItemListGroup>
    );
}

const { getAllCharacters, getAllBooks, getAllHouses } = new GotService();

const CharactersList = withData(ItemList, getAllCharacters);
const BooksList = withData(ItemList, getAllBooks);
const HousesList = withData(ItemList, getAllHouses);

export {
    CharactersList,
    BooksList,
    HousesList
};
