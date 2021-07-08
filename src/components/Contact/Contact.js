import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap';
import { TelephoneForward, Envelope, ChatDots } from 'react-bootstrap-icons';
import Cards from '../global/Cards';
import '../../assets/css/about_us.css';

const Contact = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    return (
        <>
            <Container className="min-h-100" style={{paddingTop: "110px"}}>
                <Cards 
                    arrayOfCardObjects={
                        [
                            {
                                image: <TelephoneForward />,
                                header: "Numbers", // h3!
                                text: [
                                    <p>Mohammad:</p>,
                                    <p>+90 536 065 19 67</p>,
                                    <p>Ali Riza:</p>,
                                    <p>+90 537 779 50 60</p>
                                ], 
                                rowClasses: "vision-mission-values flex-wrap justify-content-around flex-column flex-sm-column flex-md-row" // leave spaces!
                            },
                            {
                                image: <Envelope />,
                                header: "Emails",
                                text: [
                                    <p>Mohammad:</p>,
                                    <p>mohammed.alalaya@gmail.com</p>,
                                    <p>Ali Riza:</p>,
                                    <p>ars.lifestyle@hotmail.com</p>
                                ],
                                rowClasses: "vision-mission-values flex-wrap justify-content-around flex-column flex-sm-column flex-md-row"
                            },
                            {
                                image: <ChatDots />, 
                                header: "Values", 
                                text: [
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque dui velit, pharetra non suscipit vitae, ornare et erat. Duis efficitur.</p>
                                ],
                                rowClasses: "vision-mission-values flex-wrap justify-content-around pt-5 flex-column flex-sm-column flex-md-row"
                            },
                            
                        ]
                    } 
                />
            </Container>
        </>
    )
}

export default Contact
