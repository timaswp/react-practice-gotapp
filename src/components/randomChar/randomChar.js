import React, {Component} from 'react';
import styled from 'styled-components';
import GotService from '../../services/gotService';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/errorMessage';

const RandomBlock = styled.div`
    background-color: #fff;
    padding: 25px 25px 15px 25px;
    margin-bottom: 40px;
`;

const RandomBlockTitle = styled.h4`
    margin-bottom: 20px;
    text-align: center;
`;

const TermSpan = styled.span`
    font-weight: bold;
`;

export default class RandomChar extends Component {

    gotService = new GotService();
    state = {
        char: {},
        loading: true,
        error: false
    }

    componentDidMount() {
        this.updateCharacter();
        this.timerId = setInterval(this.updateCharacter, 3000);
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    onCharloaded = (char) => {
        this.setState({
            char,
            loading: false
        })
    }

    onError = (err) => {
        this.setState({
            error: true,
            loading: false
        })
    }

    updateCharacter = () => {
        const id = Math.floor(Math.random()*140 + 25);
        this.gotService.getCharacter(id)
            .then(this.onCharloaded)
            .catch(this.onError);
    }

    render() {
        const {char, loading, error} = this.state;
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? <View char={char}/> : null;

        return (
            <RandomBlock className="rounded">
                {errorMessage}
                {spinner}
                {content}
            </RandomBlock>
        );
    }
}

const View = ({char}) => {
    const {name, gender, born, died, culture} = char;

    return (
        <>
            <RandomBlockTitle>Random Character: {name}</RandomBlockTitle>
            <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                    <TermSpan>Gender </TermSpan>
                    <span>{gender}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <TermSpan>Born </TermSpan>
                    <span>{born}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <TermSpan>Died </TermSpan>
                    <span>{died}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <TermSpan>Culture </TermSpan>
                    <span>{culture}</span>
                </li>
            </ul>
        </>
    )
}