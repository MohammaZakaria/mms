import React from 'react';
import { Container, Row } from 'react-bootstrap';
import Card from './Card';
// import './../../assets/css/about_us.css';
// import "../../assets/"

function Cards({ cardsArray }) {
    return (
        <Container fluid>
            <Row className="vision-mission-values flex-wrap justify-content-around flex-column flex-sm-column flex-md-row">
                {cardsArray.map((cardObj, index) => {
                    return (
                        <Card key={index} card={cardObj} />
                    )
                })}
            </Row>
        </Container>
    )
}

export default Cards
