import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap';
import { TelephoneForward, Envelope, ChatDots } from 'react-bootstrap-icons';
import Cards from '../global/Cards';
import '../../assets/css/about_us.css';

const cards = [
    {
        image: <TelephoneForward />,
        header: "Numbers", // h3!
        textLines: ['+90 536 065 19 67', '+90 537 779 50 60'],
        rowClasses: "vision-mission-values flex-wrap justify-content-around flex-column flex-sm-column flex-md-row" // leave spaces!
    },
    {
        image: <Envelope />,
        header: "Emails",
        textLines: ['mohammed.alalaya@gmail.com', 'ars.lifestyle@hotmail.com'],
        rowClasses: "vision-mission-values flex-wrap justify-content-around flex-column flex-sm-column flex-md-row"
    },
    {
        image: <ChatDots />,
        header: "Live Chat",
        textLines: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque dui velit, pharetra non suscipit.'],
        rowClasses: "vision-mission-values flex-wrap justify-content-around pt-5 flex-column flex-sm-column flex-md-row"
    }
]


const Contact = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    return (
        <>
            <Container className="min-h-100" style={{ paddingTop: "110px" }}>
                <Cards cardsArray={cards} />
            </Container>
        </>
    )
}

export default Contact
