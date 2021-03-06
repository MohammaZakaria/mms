import React, { useState, useRef, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import CustomErrorMessage from './CustomErrorMessage'
import './../../assets/css/forms.css'
import isImageURL from 'valid-image-url';


function AddMealForm({ formType, editData, postData, initialValuesOnEdit }) {
    const formRef = useRef();
    const [ingredient, setIngredient] = useState('')
    const [ingredients, setIngredients] = useState([])
    const [step, setStep] = useState('');
    const [steps, setSteps] = useState([]);

    const initial = initialValuesOnEdit ? initialValuesOnEdit : {
        title: "",
        chef: "",
        mealUrl: "",
        ingredients: [],
        steps: [],
        priority: "",
        status: "to-cook",
    }

    useEffect(() => {
        setSteps(formRef.current.values?.steps);
    }, [])

    useEffect(() => {
        formRef.current.values.steps = steps;
    }, [steps])


    useEffect(() => {
        setIngredients(formRef.current.values?.ingredients);
    }, [])

    useEffect(() => {
        formRef.current.values.ingredients = ingredients;
    }, [ingredients])


    return (
        <div className="custom-form"> {/* custom class */}
            <h3 className="form-title"> {formType !== "edit" ? 'Add a new' : 'Update'} <span className="bg-dark light-colored">{formType !== "edit" ? 'Meal!' : `${initial.title}`}</span></h3>
            <Formik
                innerRef={formRef}
                initialValues={initial}
                validate={async (values) => {
                    const errors = {};
                    const isImage = values.mealUrl ? await isImageURL(values.mealUrl) : false
                    if (!isImage) {
                        errors.mealUrl = "Empty Or invalid image";
                    }
                    if (!values.title || !values.mealUrl || !values.chef || !values.priority || !values.mealUrl || values.ingredients.length === 0 || values.steps.length === 0) {
                        if (!values.title) {
                            errors.title = "Required.";
                        }
                        if (!values.chef) {
                            errors.chef = "Required.";
                        }
                        if (!values.priority) {
                            errors.priority = "Required.";
                        }

                        if (values.ingredients.length === 0) {
                            errors.ingredients = "Required.";
                        }
                        if (values.steps.length === 0) {
                            errors.steps = "Required.";
                        }
                    }
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        if (formType === 'add') {
                            postData(values);
                        } else if (formType === 'edit') {
                            editData(values);
                        }
                        setSubmitting(false);
                    }, 400);
                }}
            >
                {({ isSubmitting, values }) => (
                    <Form className='flex  flex-col form-input add-branch'>
                        <div className="input-group-div">
                            <Field type="text" name="title" placeholder="Branches Name..." />
                            <ErrorMessage name="title" component={CustomErrorMessage} />
                        </div>
                        <div className="input-group-div">
                            <Field type="text" name="chef" placeholder="Chef Name..." />
                            <ErrorMessage name="chef" component={CustomErrorMessage} />
                        </div>
                        <div className="input-group-div">
                            <div role="group" aria-labelledby="my-radio-group">
                                <label className="m5-right">
                                    <Field className="m5-right" type="radio" name="priority" value="High" />
                                    High
                                </label>
                                <label className="m5-right">
                                    <Field className="m5-right" type="radio" name="priority" value="Medium" />
                                    Medium
                                </label>
                                <label className="m5-right">
                                    <Field className="m5-right" type="radio" name="priority" value="Low" />
                                    Low
                                </label>
                            </div>
                            <ErrorMessage name="priority" component={CustomErrorMessage} />
                        </div>
                        <div className="input-group-div">
                            <Field type="text" name="mealUrl" placeholder="https://example/image.png..." />
                            <ErrorMessage name="mealUrl" component={CustomErrorMessage} />
                        </div>

                        <div className="flex align-center">

                            <div className="input-group-div with-list m5-right ">

                                <div className="flex align-center">
                                    <Field type="text" value={ingredient} onChange={e => setIngredient(e.target.value)} name="ingredient" placeholder="Add ingredient" />
                                    <button onClick={e => {
                                        e.preventDefault()
                                        if (ingredient !== '') {
                                            // setFormInputs({ ...formInputs, ingredients: [...formInputs.ingredients, ingredient] })
                                            setIngredients([...ingredients, ingredient])
                                            // console.log(formInputs)
                                            setIngredient('')
                                        }
                                    }}>+</button>
                                </div>
                                <ErrorMessage name="ingredients" component={CustomErrorMessage} />
                            </div>

                            <div className="input-group-div with-list m5-left ">

                                <div className="flex align-center">
                                    <Field type="text" value={step} onChange={e => setStep(e.target.value)} name="step" placeholder="Add step" />
                                    <button onClick={e => {
                                        e.preventDefault()
                                        if (step !== '') {
                                            // setFormInputs({ ...formInputs, ingredients: [...formInputs.ingredients, ingredient] })
                                            setSteps([...steps, step])

                                            // console.log(formInputs)
                                            setStep('')
                                        }
                                    }}>+</button>
                                </div>
                                <ErrorMessage name="steps" component={CustomErrorMessage} />
                            </div>
                        </div>


                        <div className="flex align-start justify-around">
                            <ol>
                                {
                                    ingredients.map((ing, i) => {
                                        return <li key={i}
                                            className="flex align-center justify-between list-in-form">
                                            <span>{ing}</span>
                                            <strong onClick={e => {
                                                const filteredAry = ingredients.filter(e => e !== ing)
                                                setIngredients(filteredAry)
                                            }}>X</strong></li>
                                    })
                                }
                            </ol>
                            <ol>
                                {
                                    steps.map((s, i) => {
                                        return <li key={i} className="flex align-center justify-between list-in-form">
                                            <span>{s}</span>
                                            <strong onClick={e => {
                                                const filteredAry = steps.filter(e => e !== s)
                                                setSteps(filteredAry)
                                            }
                                            }>X</strong></li>

                                    })
                                }
                            </ol>
                        </div>
                        <button className="custom-btn-submit bg-dark" type="submit" disabled={isSubmitting}>
                            {formType !== "edit" ? 'Submit' : 'Update'}
                        </button>
                    </Form>
                )}
            </Formik>
        </div >
    )
}

export default AddMealForm;