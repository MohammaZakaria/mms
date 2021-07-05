import React, { useState } from 'react'
import VerticallyCenteredModal from './../global/VerticallyCenteredModal'
import AddMealForm from './../Forms/AddMealForm'
import { Row, Col, Button } from 'react-bootstrap';
import { useAlert } from 'react-alert'
import db from './../../firebaseConfig'
import { FileEarmarkPlus } from 'react-bootstrap-icons';
import { PencilSquare } from 'react-bootstrap-icons';
import { Trash } from 'react-bootstrap-icons';
import SweetAlert from "react-bootstrap-sweetalert";
import { useHistory } from "react-router-dom"

const ControlNav = ({ boardId, branchName }) => {
    const [modalShow, setModalShow] = useState(false);
    const [sweetAlert, setSweetAlert] = useState(false);
    const alert = useAlert()
    const history = useHistory()


    const handleSubmit = async (values) => {
        await db.collection('branches').doc(boardId).collection('meals').add(values)
        setModalShow(false)
        alert.success('Congrats you have added a new Meal successfully!')
    }


    const handleDeleteButtonClick = async (id) => {
        setSweetAlert(!sweetAlert)
    }

    const handleDeleteFunctionality = async () => {
        try {
            setModalShow(false)
            history.push(`/`)
            await db.collection('branches').doc(boardId).delete()
            alert.success(`Congrats you have deleted a ${branchName} successfully!`)
        } catch (error) {
            console.log('error :', error);

        }
    }

    return (
        <>
            <Row className="nav-bar-control">
                <Col className="flex align-center">
                    <Button className="bg-orange btn-custom" onClick={() => setModalShow(true)}>
                        <div>
                            <div className="flex align-center justify-center">
                                <FileEarmarkPlus className="add-icon-meal" /><span className="btn-text">Meal</span>

                            </div>
                        </div>
                    </Button>
                </Col>
                <Col className="text-right">
                    <Button className="bg-dark btn-custom">
                        <div>
                            <div className="flex align-center justify-center">
                                <PencilSquare /><span className="btn-text">{branchName}</span>
                            </div>
                        </div>
                    </Button> <Button onClick={e => handleDeleteButtonClick(boardId)} className="bg-dark btn-custom">        <div>
                        <div className="flex align-center justify-center">
                            <Trash onClick={e => handleDeleteButtonClick(boardId)} /> <span onClick={e => handleDeleteButtonClick(boardId)} className="btn-text">{branchName}</span>
                        </div>
                    </div></Button>
                </Col>
            </Row>
            <VerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                title="Add a new Branch"
            >
                <AddMealForm formType="add" postData={handleSubmit} />
            </VerticallyCenteredModal>
            {sweetAlert &&
                <SweetAlert
                    danger
                    showCancel
                    confirmBtnText="Yes, delete it!"
                    confirmBtnBsStyle="danger"
                    title="Are you sure?"
                    onConfirm={e => handleDeleteFunctionality()}
                    onCancel={handleDeleteButtonClick}
                    focusCancelBtn
                >
                    You will not be able to recover this imaginary file!
                </SweetAlert>
            }
        </>
    )
}

export default ControlNav
