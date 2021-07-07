import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import CustomErrorMessage from './CustomErrorMessage'
import './../../assets/css/forms.css'
import isImageURL from 'valid-image-url';

const AddBranchForm = ({ postData, formType, initialValuesOnEdit }) => {
    const initial = initialValuesOnEdit ? initialValuesOnEdit : { branchName: '', branchLocation: '', branchAvatar: '' }
    return (
        <div className="custom-form">
            <h3 className="form-title"> {formType !== "edit" ? 'Add a new' : 'Update'} <span className="bg-dark light-colored">{formType !== "edit" ? 'Branch!' : `${initial.branchName}`}</span></h3>
            <Formik
                initialValues={initial}
                validate={async (values) => {
                    const errors = {};
                    const isImage = values.branchAvatar ? await isImageURL(values.branchAvatar) : false;
                    if (!isImage) {
                        errors.branchAvatar = "Empty Or invalid image";
                    }
                    if (!values.branchName || !values.branchLocation) {
                        if (!values.branchName) {
                            errors.branchName = "Required: Add the branche's name please.";
                        }
                        if (!values.branchLocation) {
                            errors.branchLocation = "Required: Add the branche's location please";
                        }
                    }
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        postData(values);
                        setSubmitting(false);
                    }, 400);
                }}
            >
                {({ isSubmitting }) => (
                    <Form className='flex  flex-col form-input add-branch'>
                        <div className="input-group-div">
                            <Field type="text" name="branchName" placeholder="Branches Name..." />
                            <ErrorMessage name="branchName" component={CustomErrorMessage} />
                        </div>
                        <div className="input-group-div">
                            <Field type="text" name="branchLocation" placeholder="Location: Istanbul/Fatih..." />
                            <ErrorMessage name="branchLocation" component={CustomErrorMessage} />
                        </div>
                        <div className="input-group-div">
                            <Field type="text" name="branchAvatar" placeholder="https://example/image.png..." />
                            <ErrorMessage name="branchAvatar" component={CustomErrorMessage} />
                        </div>
                        <button className="custom-btn-submit bg-dark" type="submit" disabled={isSubmitting}>
                            {formType !== "edit" ? 'Submit' : 'Update'}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>

    )
};

export default AddBranchForm;