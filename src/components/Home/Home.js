import React, { useEffect } from 'react'
import './../../assets/css/home.css'
import Hero from './Hero'
import Services from '../global/Services'
import CallToAction from './CallToAction'
import Branches from './Branches'
import servicesImg from './../../assets/images/services.svg';
import { Helmet } from "react-helmet";

const Home = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <main className="min-h-100">
            <Helmet>
                <meta name="description" content="MMS. This is best placed for managing you restaurant's branches" />
                <title>MMS | Home</title>
            </Helmet>
            <Hero />
            <Services
                servicesImg={servicesImg}
                isRevers={false}
                hightLighted=".Our Services"
                titleRest="for your restaurant"
                textParts={
                    ['Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto at quidem blanditiis minima assumenda molestias magni deserunt, accusamus accusantium quae hic. Facilis in est necessitatibus?',
                        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto at quidem blanditiis minima assumenda molestias magni deserunt, accusamus accusantium quae hic. Facilis in est necessitatibus?']
                }
            />
            <CallToAction />
            <Branches />
        </main>
    )
}

export default Home
