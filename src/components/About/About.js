import React, { useEffect } from 'react';
import "../../assets/css/about_us.css";
import notification from '../../assets/icons/notification.svg';
import tasks from '../../assets/icons/tasks.svg';
import CallToAction from "../Home/CallToAction";
import { Eye, Bullseye, Gem } from 'react-bootstrap-icons';
import Services from './../global/Services'
import Cards from '../global/Cards';
import './../../assets/css/about_us.css';

const cards = [
    {
        image: <Eye />,
        header: "Vision", // h3!
        textLines: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque dui velit, pharetra non suscipit vitae, ornare et erat. Duis efficitur"],
        rowClasses: "vision-mission-values flex-wrap justify-content-around flex-column flex-sm-column flex-md-row" // leave spaces!
    },
    {
        image: <Bullseye />,
        header: "Mission",
        textLines: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque dui velit, pharetra non suscipit vitae, ornare et erat. Duis efficitur"],
        rowClasses: "vision-mission-values flex-wrap justify-content-around flex-column flex-sm-column flex-md-row"
    },
    {
        image: <Gem />,
        header: "Values",
        textLines: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque dui velit, pharetra non suscipit vitae, ornare et erat. Duis efficitur"],
        rowClasses: "vision-mission-values flex-wrap justify-content-around flex-column flex-sm-column flex-md-row"
    },

]

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
                    [
                        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto at quidem blanditiis minima assumenda molestias magni deserunt, accusamus accusantium quae hic. Facilis in est necessitatibus?',
                        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto at quidem blanditiis minima assumenda molestias magni deserunt, accusamus accusantium quae hic. Facilis in est necessitatibus?'
                    ]
                }
            />
            <Services
                servicesImg={tasks}
                isRevers={true}
                hightLighted=".Our Services"
                small={true}
                titleRest="for your restaurant"
                textParts={
                    [
                        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto at quidem blanditiis minima assumenda molestias magni deserunt, accusamus accusantium quae hic. Facilis in est necessitatibus?',
                        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto at quidem blanditiis minima assumenda molestias magni deserunt, accusamus accusantium quae hic. Facilis in est necessitatibus?'
                    ]
                }
            />
            <CallToAction />
            <Cards
                cardsArray={cards}
            />
        </>
    )
}

export default About
