import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
// import './../../assets/css/about_us.css';
// import "../../assets/"

function Cards({arrayOfCardObjects}) {
    return (
        <Container fluid>
            <Row className={arrayOfCardObjects.rowClasses}>
                {arrayOfCardObjects.map(cardObj => {
                    return (
                        <Col xs={12} sm={12} md={4} className="card">
                            {cardObj.image}
                            <h3>{cardObj.header}</h3>
                            <div className="text-center text-sm-center text-md-left">
                                {cardObj.text}
                            </div>
                        </Col>
                    )
                })}
            </Row>
        </Container>
    )
}

export default Cards
