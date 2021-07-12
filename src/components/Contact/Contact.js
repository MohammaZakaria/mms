import React, { useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import { TelephoneForward, Envelope, ChatDots } from 'react-bootstrap-icons';
import Cards from '../global/Cards';
import '../../assets/css/about_us.css';
import '../../assets/css/contact_us.css';
import { Helmet } from "react-helmet";
import { Formik, Form, Field, ErrorMessage } from "formik";
import db from './../../firebaseConfig';
import CustomErrorMessage from '../Forms/CustomErrorMessage';
import { useAlert } from 'react-alert'

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
        textLines: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque.'],
        rowClasses: "vision-mission-values flex-wrap justify-content-around pt-5 flex-column flex-sm-column flex-md-row"
    }
]

let initialFormValues = { name: "", email: "", message: "" };

const Contact = () => {
    const alert = useAlert();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    return (
        <>
            <Container className="min-h-100" style={{ paddingTop: "110px" }}>
                <Helmet>
                    <meta name="description" content="MMS. This is best placed for managing you restaurant's branches" />
                    <title>MMS | Contact us</title>
                </Helmet>
                <Cards cardsArray={cards} />
                <Row className="contact-form align-items-center">
                    <Col lg="6" sm="12">
                        <h1>Contact Us</h1>
                        <p style={{ width: "50%" }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore perferendis praesentium quos reiciendis iusto itaque? Inventore, commodi?</p>
                    </Col>
                    <Col sm="12" lg="6">
                        <p>Great vision without great people is irrelevant.<br /> Let's work <span>together.</span></p>
                        <Formik
                            initialValues={initialFormValues}
                            validate={(values) => {
                                const errors = {};
                                if (!values.name) {
                                    errors.name = "Please type in your name."
                                }
                                if (!values.email) {
                                    errors.email = "Please type in your email."
                                }
                                if (!values.message) {
                                    errors.message = "Please type in your message."
                                }
                                return errors;
                            }}
                            onSubmit={(values, { setSubmitting, resetForm }) => {
                                setTimeout(() => {
                                    setSubmitting(false);
                                    db.collection("contacts").doc(values.name).set(values)
                                        .then(() => {
                                            setSubmitting(false);
                                            console.log("Congratulations! You have successfully submitted you contact form!")
                                        })
                                        .catch((error) => {
                                            setSubmitting(false);
                                            console.error("There's a problem happened on submit: ", error)
                                        })
                                    resetForm()
                                    alert.success(`Your message sent successfully!`)
                                }, 400);
                            }}
                        >
                            {({ isSubmitting, values }) => {
                                console.log(values)
                                return (
                                    <Form>
                                        <div className="input-group-div">
                                            <Field name="name" placeholder="Enter your Name" />
                                            <ErrorMessage name="name" component={CustomErrorMessage} />
                                        </div>
                                        <div className="input-group-div">

                                            <Field name="email" placeholder="Enter your Email" />
                                            <ErrorMessage name="email" component={CustomErrorMessage} />
                                        </div>
                                        <div className="input-group-div">

                                            <Field name="message" component="textarea" placeholder="Enter your Message" />
                                            <ErrorMessage name="message" component={CustomErrorMessage} />
                                        </div>
                                        <button type="submit" className="submit-btn" disabled={isSubmitting}>Submit</button>
                                    </Form>
                                )
                            }}
                        </Formik>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Contact
