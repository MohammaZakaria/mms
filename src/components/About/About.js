import React, { useEffect } from 'react';
import { Container, Col } from 'react-bootstrap';
import "../../assets/css/about_us.css";
import notification from '../../assets/icons/notification.svg';
import tasks from '../../assets/icons/tasks.svg';
import CallToAction from "../Home/CallToAction";
import { Eye, Bullseye, Gem } from 'react-bootstrap-icons';
import Services from './../global/Services'
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
                        <p>Let the chefs know <b style={{ fontSize: "2rem" }}>what</b> to cook and <b style={{ fontSize: "2rem" }}>when</b> to cook
                            with our app.</p>
                    </div>
                </div>
            </section>
            <Services
                servicesImg={notification}
                isRevers={false}
                hightLighted=".Our Services"
                titleRest="for your restaurant"
                small={true}
                textParts={
                    ['Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto at quidem blanditiis minima assumenda molestias magni deserunt, accusamus accusantium quae hic. Facilis in est necessitatibus?',
                        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto at quidem blanditiis minima assumenda molestias magni deserunt, accusamus accusantium quae hic. Facilis in est necessitatibus?']
                }
            />
            <Services
                servicesImg={tasks}
                isRevers={true}
                hightLighted=".Our Services"
                small={true}
                titleRest="for your restaurant"
                textParts={
                    ['Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto at quidem blanditiis minima assumenda molestias magni deserunt, accusamus accusantium quae hic. Facilis in est necessitatibus?',
                        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto at quidem blanditiis minima assumenda molestias magni deserunt, accusamus accusantium quae hic. Facilis in est necessitatibus?']
                }
            />
            <CallToAction />
            {/* to make this happen \|/ */}
            {/* <Cards array={[card1, card2, card3]} /> */}
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
