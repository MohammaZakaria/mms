import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import Card from './Card';
// import './../../assets/css/about_us.css';
// import "../../assets/"

function Cards({ cardsArray }) {
    console.log(cardsArray);
    return (
        <Container>
            <Row className="vision-mission-values flex-wrap justify-content-around flex-column flex-sm-column flex-md-row">
                {cardsArray.map(cardObj => {
                    return (
                        <Card card={cardObj} />
                    )
                })}
            </Row>
        </Container>
    )
}

export default Cards
