import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap';

const About = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    return (
        <Container className="min-h-100">
            About
        </Container>
    )
}

export default About
