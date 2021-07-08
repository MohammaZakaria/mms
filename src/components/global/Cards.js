import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';

function Cards({arrayOfCardObjects}) {
    return (
        <Container fluid>
            <Row className="vision-mission-values flex-wrap justify-content-around flex-column flex-sm-column flex-md-row">
                {arrayOfCardObjects.map(cardObj => {
                    return (
                        <Col xs={12} sm={12} md={4} className="card">
                            {cardObj.image}
                            <h3>{cardObj.header}</h3>
                            <p className="text-center text-sm-center">{cardObj.text}</p>
                        </Col>
                    )
                })}
            </Row>
        </Container>
    )
}

export default Cards
