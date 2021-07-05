import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap';

const Contact = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    return (
        <Container className="min-h-100">
            Contact
        </Container>
    )
}

export default Contact
