import React, { useState } from 'react'
import VerticallyCenteredModal from './../global/VerticallyCenteredModal'
import AddMealForm from './../Forms/AddMealForm'
import AddBranchForm from './../Forms/AddBranchForm'
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
    const [modalWrap, setModalWrap] = useState({ operation: '', formType: '' });
    const [sweetAlert, setSweetAlert] = useState(false);
    const [branch, setBranch] = useState({});
    const alert = useAlert()
    const history = useHistory()


    const handleSubmit = async (values) => {
        await db.collection('branches').doc(boardId).collection('meals').add(values)
        setModalShow(false)
        alert.success('Congrats you have added a new Meal successfully!')
        setModalWrap({ operation: '', formType: '' })
    }


    const handleEditSubmit = async (values) => {
        await db.collection('branches').doc(boardId).collection('meals').doc(values.id).set(values)
        setModalShow(false)
        alert.success(`Congrats you have edited ${values.title} successfully!`)
        setModalWrap({ operation: '', formType: '' })
    }


    const handleEditBranchSubmit = async (values) => {
        await db.collection('branches').doc(boardId).set(values)
        setModalShow(false)
        alert.success(`Congrats you have edited ${values.branchName} successfully!`)
        setModalWrap({ operation: '', formType: '' })
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


    const handleModal = async (operation, formType) => {
        if (formType === 'branch') {
            const branchData = await db.collection('branches').doc(boardId).get();
            setBranch(branchData.data())
        }
        setModalWrap({ operation: operation, formType: formType })
        setModalShow(true)
    }

    return (
        <>
            <Row className="nav-bar-control">
                <Col className="flex align-center">
                    <Button className="bg-orange btn-custom" onClick={() => handleModal('add', 'meal')}>
                        <div>
                            <div className="flex align-center justify-center">
                                <FileEarmarkPlus className="add-icon-meal" /><span className="btn-text">Meal</span>

                            </div>
                        </div>
                    </Button>
                </Col>
                <Col className="text-right">
                    <Button className="bg-dark btn-custom" onClick={() => handleModal('edit', 'branch')}>
                        <div>
                            <div className="flex align-center justify-center">
                                <PencilSquare /><span className="btn-text">{branchName}</span>
                            </div>
                        </div>
                    </Button> <Button onClick={e => handleDeleteButtonClick(boardId)} className="bg-dark btn-custom"><div>
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
                {
                    modalWrap.formType === 'meal' ?
                        <AddMealForm formType={modalWrap.operation === 'edit' ?
                            modalWrap.operation : 'add'} editData={handleEditSubmit} postData={handleSubmit} />
                        : modalWrap.formType === 'branch' ?
                            <AddBranchForm initialValuesOnEdit={branch} formType={modalWrap.operation === 'edit' ?
                                modalWrap.operation : 'add'} editData={handleEditBranchSubmit} postData={handleSubmit} /> : null
                }
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
