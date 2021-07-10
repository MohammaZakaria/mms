import React from 'react'
import { Col } from 'react-bootstrap';

const Card = ({ card }) => {
    return (
        <Col md={12} lg={4} className={`card`} >
            {card.image}
            < h3 > {card.header}</h3 >
            <div className="text-center">
                {card.textLines.map((line, index) => (
                    <p key={index}>{line}</p>
                ))}
            </div>
        </Col>
    )
}

export default Card
