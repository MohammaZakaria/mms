import React, { useEffect } from 'react';
import { Container, Col } from 'react-bootstrap';
import "../../assets/css/about_us.css";
import { ReactComponent as Notification } from '../../assets/icons/notification.svg';
import { ReactComponent as Tasks } from '../../assets/icons/tasks.svg';
import CallToAction from "../Home/CallToAction";
import { Eye, Bullseye, Gem } from 'react-bootstrap-icons';

const About = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    return (
        <>
            <section className="min-h-89 img-layer">
                <div className="filter-layer min-h-89">
                    <div className="content">
                        <h2>Increase your kitchen's <b>efficiency.</b></h2>
                        <p>Let the chefs know <b style={{fontSize: "2rem"}}>what</b> to cook and <b style={{fontSize: "2rem"}}>when</b> to cook 
                        with our app.</p>
                    </div>
                </div>
            </section>
            <Container className="section">
                <Col xs={12} md={6}>
                    <Notification className="svg" />
                </Col>
                <Col xs={12} md={6} class="section-text">
                    <h2>Real time notifications.</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam convallis orci fringilla massa aliquam maximus. Nunc tempor tellus at turpis pharetra, id pellentesque purus aliquet. Donec malesuada nisl ac pharetra pellentesque. Quisque at pretium sapien. Vivamus eget ipsum id dolor luctus tempor quis non est. Ut mauris erat, bibendum et viverra quis, pretium sit amet eros. Proin sodales sagittis condimentum. Sed in ligula vel erat tincidunt eleifend. Cras eleifend porttitor lobortis. Duis in ante consectetur, volutpat nulla ut, porttitor leo. </p>
                </Col>
            </Container>
            {/* <hr/> */}
            <Container className="section">
                <Col xs={12} md={6} class="section-text">
                    <h2>Fast, efficient, clear.</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam convallis orci fringilla massa aliquam maximus. Nunc tempor tellus at turpis pharetra, id pellentesque purus aliquet. Donec malesuada nisl ac pharetra pellentesque. Quisque at pretium sapien. Vivamus eget ipsum id dolor luctus tempor quis non est. Ut mauris erat, bibendum et viverra quis, pretium sit amet eros. Proin sodales sagittis condimentum. Sed in ligula vel erat tincidunt eleifend. Cras eleifend porttitor lobortis. Duis in ante consectetur, volutpat nulla ut, porttitor leo. </p>
                </Col>
                <Col xs={12} md={6}>
                    <Tasks className="svg" />
                </Col>
            </Container>
            <CallToAction />

            <Container className="vision-mission-values d-flex justify-content-around">
                <Col xs={12} sm={12} md={4} className="vision card">
                    <Eye />
                    <h3>Vision</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque dui velit, pharetra non suscipit vitae, ornare et erat. Duis efficitur. </p>
                </Col>
                <Col xs={12} sm={12} md={4} className="misson card middle-card">
                    <div>

                    </div>
                        <Bullseye />
                    <h3>Mission</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque dui velit, pharetra non suscipit vitae, ornare et erat. Duis efficitur. </p>
                </Col>
                <Col xs={12} sm={12} md={4} className="values card">
                    <Gem />
                    <h3>Values</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque dui velit, pharetra non suscipit vitae, ornare et erat. Duis efficitur. </p>
                </Col>
            </Container>
        </>
    )
}

export default About
