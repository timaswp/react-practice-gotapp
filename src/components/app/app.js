import React, { Component } from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header/header';
import RandomChar from '../randomChar/randomChar';
import CharacterPage from '../pages/characterPage/characterPage';
import ErrorMessage from '../errorMessage/errorMessage';
import GotService from '../../services/gotService';
import BooksPage from '../pages/booksPage/booksPage';
import HousesPage from '../pages/housesPage/housesPage';

export default  class App extends Component {
    gotService = new GotService();

    state = {
        showRandomChar: true,
        error: false
    }

    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    toggleRandomChar = () => {
        this.setState(prevState => ({
            showRandomChar: !prevState.showRandomChar
        }));
    }

    render() {
        const randomCharContent = this.state.showRandomChar ? <RandomChar/> : null;

        if (this.state.error) {
            return <ErrorMessage/>
        }

        return (
            <> 
                <Container>
                    <Header />
                </Container>
                <Container>
                    <Row>
                        <Col lg={{size: 5, offset: 0}}>
                            {randomCharContent}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <button onClick={this.toggleRandomChar} className='btn btn-info mb-5'>
                                Toggle RandomChar
                            </button>
                        </Col>
                    </Row>
                    <CharacterPage/>
                    <BooksPage/>
                    <HousesPage/>
                </Container>
            </>
        );
    }
};