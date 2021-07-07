import React from 'react'
import { Container } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Figure } from 'react-bootstrap';

const services = ({ servicesImg, hightLighted, titleRest, textParts, isRevers, small }) => {
    return (
        <section className="services">
            <Container>
                <Row >
                    <Col md={12} lg={6, { order: `${isRevers ? 'last' : 'first'}` }}>
                        <Figure>
                            <Figure.Image
                                className={small && 'w-md'}
                                width={'100%'}
                                height={'100%'}
                                alt="171x180"
                                src={servicesImg}
                            />
                        </Figure>
                    </Col>
                    <Col md={12} lg={6}>
                        <h3 className="services-title"><span className="bg-dark light-colored">{hightLighted}</span> {titleRest} </h3>
                        {
                            textParts.length !== 0 && textParts.map((text, i) => {
                                return <p key={i} className="services-text">{text}</p>
                            })
                        }
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default services
