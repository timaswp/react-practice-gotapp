import React, { Component } from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header/header';
import RandomChar from '../randomChar/randomChar';
import {CharacterPage, BooksPage, HousesPage, BooksItem} from '../pages';
import ErrorMessage from '../errorMessage/errorMessage';
import GotService from '../../services/gotService';
import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom';

import './app.css';

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

    BooksItemWrapper = () => {
        const { id } = useParams();
        return <BooksItem bookId={id} />;
      };

    render() {
        const randomCharContent = this.state.showRandomChar ? <RandomChar/> : null;

        if (this.state.error) {
            return <ErrorMessage/>
        }

        return (
            <Router>
                <div className='app'> 
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

                        <Routes>
                            <Route path='/characters' Component={CharacterPage}/>
                            <Route path='/books' Component={BooksPage}/>
                            <Route path='/books/:id' element={<this.BooksItemWrapper/>}/>
                            <Route path='/houses' Component={HousesPage}/>
                            {/* <Route path='/books/:id' Component={BooksItem}/> */}
                        </Routes>
                        
                    </Container>
                </div>
            </Router>
        );
    }
};