import React, { useState, useEffect } from 'react';
// import { Button } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import './../../assets/css/board.css'
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import db from './../../firebaseConfig'
import ControlNav from './ControlNav';
import AddMealForm from './../Forms/AddMealForm'
import VerticallyCenteredModal from './../global/VerticallyCenteredModal'
import SweetAlert from "react-bootstrap-sweetalert";
import { useAlert } from 'react-alert'
import { Helmet } from "react-helmet";


const Board = (props) => {
    const [meals, setMeals] = useState([])
    const [modalShow, setModalShow] = useState(false);
    const [item, setItem] = useState({});
    const [sweetAlert, setSweetAlert] = useState(false);
    const [mealId, setMealId] = useState('');
    const [branchNameState, setBranchNameState] = useState('');
    const alert = useAlert()

    const docId = props.match.params.id; // this is the id of the branch

    useEffect(() => {
        fetchItems()
        fetchBoardsName()
        window.scrollTo(0, 0);
    }, [])


    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])



    const handleEditSubmit = async (values) => {
        await db.collection('branches').doc(docId).collection('meals').doc(values.id).set(values)
        setModalShow(false)
        alert.success(`Congrats you have edited ${values.title} successfully!`)
    }

    const fetchItems = async () => {
        db.collection("branches").doc(docId).collection('meals')
            .onSnapshot((snapshot) => {
                const mealsArray = snapshot.docs.map(doc => {
                    return { id: doc.id, ...doc.data() }
                })
                setMeals(mealsArray)
            })
    }

    const fetchBoardsName = async () => {
        const branch = await db.collection("branches").doc(docId).onSnapshot((snapshot) => setBranchNameState(snapshot.data()?.branchName))
    }
    const columnsFromBackend = {
        'to-cook': {
            name: "To Cook",
            items: meals.filter(meal => meal.status === 'to-cook')
        },
        'cooking': {
            name: "Cooking",
            items: meals.filter(meal => meal.status === 'cooking')
        },
        'cooked': {
            name: "Cooked",
            items: meals.filter(meal => meal.status === 'cooked')
        }
    };
    const [columns, setColumns] = useState(columnsFromBackend);

    useEffect(() => {
        setColumns(columnsFromBackend);
    }, [meals])
    // branches(collection).branch(document).meals(collection)


    const onDragEnd = async (result, columns, setColumns) => {

        if (!result.destination) return;
        const { source, destination } = result;

        if (source.droppableId !== destination.droppableId) { // change the server data
            const sourceColumn = columns[source.droppableId];
            const destColumn = columns[destination.droppableId];
            const sourceItems = [...sourceColumn.items];
            const destItems = [...destColumn.items];
            const [removed] = sourceItems.splice(source.index, 1);
            destItems.splice(destination.index, 0, removed);
            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...sourceColumn,
                    items: sourceItems
                },
                [destination.droppableId]: {
                    ...destColumn,
                    items: destItems
                }
            });
            const newObj = {
                ...removed,
                status: destination.droppableId
            }
            await db.collection('branches').doc(docId).collection('meals').doc(removed.id).set(newObj)


        } else { // change the server data
            const column = columns[source.droppableId];
            const copiedItems = [...column.items];
            const [removed] = copiedItems.splice(source.index, 1);
            copiedItems.splice(destination.index, 0, removed);
            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...column,
                    items: copiedItems
                }
            });
        }
    };


    const editItem = async (id) => {
        const res = await db.collection('branches').doc(docId).collection('meals').doc(id).get()
        setItem({ id: res.id, ...res.data() })
        setModalShow(true)
    }

    const handleDeleteButtonClick = async (id) => {
        if (id) {
            setMealId(id)
        } else {
            setMealId('')
        }
        setSweetAlert(!sweetAlert)
    }

    const handleDeleteFunctionality = async (id) => {
        setSweetAlert(false)
        await db.collection('branches').doc(docId).collection("meals").doc(id).delete()
        alert.success('Congrats you have deleted the meal successfully!')
    }

    return (
        <main className="board">
            <Helmet>
                <meta name="description" content="MMS. This is best placed for managing you restaurant's branches" />
                <title>MMS | {branchNameState}'s Board</title>
            </Helmet>
            <Container className="mt-100px min-h-100">
                <ControlNav branchName={branchNameState} boardId={docId} />
                <Row>
                    <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
                        <DragDropContext
                            onDragEnd={result => onDragEnd(result, columns, setColumns)}
                        >
                            {Object.entries(columns).map(([columnId, column], index) => {
                                return (
                                    <Col lg={4} md={12} className="to-do "
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                        }}
                                        key={columnId}
                                    >
                                        <h2 className="column-title">{column.name}</h2>
                                        <div style={{ margin: 8, height: '100%' }}>
                                            <Droppable className="parent" droppableId={columnId} key={columnId}>
                                                {(provided, snapshot) => {
                                                    return (
                                                        <div
                                                            {...provided.droppableProps}
                                                            ref={provided.innerRef}
                                                            style={{
                                                                background: snapshot.isDraggingOver
                                                                    ? "rgb(232, 244, 255)"
                                                                    : "#f3f3f3",
                                                                padding: 6,
                                                                minWidth: 330,
                                                                height: "100%"
                                                            }}
                                                            className="field-column field-body "
                                                        >
                                                            {column.items.map((item, index) => {
                                                                return (
                                                                    <Draggable
                                                                        key={item.id}
                                                                        draggableId={item.id}
                                                                        index={index}
                                                                    >
                                                                        {(provided, snapshot) => {
                                                                            return (
                                                                                <div
                                                                                    ref={provided.innerRef}
                                                                                    {...provided.draggableProps}
                                                                                    {...provided.dragHandleProps}
                                                                                    style={{
                                                                                        userSelect: "none",
                                                                                        // padding: 16,

                                                                                        borderRadius: '5px',
                                                                                        border: ' 1px solid rgba(0, 63, 146, 0.514)',
                                                                                        margin: "0 0 8px 0",
                                                                                        minHeight: "50px",
                                                                                        backgroundColor: snapshot.isDragging
                                                                                            ? "#f3f3f3af"
                                                                                            : "white",
                                                                                        color: "gray",
                                                                                        ...provided.draggableProps.style
                                                                                    }}
                                                                                >

                                                                                    <div className='flex flex-col'>
                                                                                        <div className="item-image">
                                                                                            <button className="item-top-button" onClick={e => handleDeleteButtonClick(item.id)}>
                                                                                                <svg onClick={e => handleDeleteButtonClick(item.id)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash custom-bi-trash" viewBox="0 0 16 16">
                                                                                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                                                                                    <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                                                                                </svg>
                                                                                            </button>
                                                                                            <small className={`batch ${item.status === 'to-cook' ? 'high-pri' : item.status === 'cooking' ? 'low-pri' : 'md-pri'}`}> {item.status}</small>
                                                                                            <img loading="lazy" className="pointer" onClick={e => editItem(item.id)} src={item.mealUrl} alt={item.title} />
                                                                                        </div>
                                                                                        <div className='item-body'>
                                                                                            <h2 onClick={e => editItem(item.id)} className="item-title">
                                                                                                {item.title}
                                                                                            </h2>
                                                                                            <p className="meta-data"> {item.steps.length} {item.steps.length > 1 ? 'STEPS' : 'STEP'}</p>
                                                                                            <p className="meta-data">{item.ingredients.length} {item.ingredients.length > 1 ? 'INGREDIENTS' : 'INGREDIENT'}</p>
                                                                                        </div>
                                                                                        <div className="divider"></div>
                                                                                        <div className='flex align-center justify-between item-footer'>
                                                                                            <small onClick={e => editItem(item.id)} className="pointer chef-name">
                                                                                                {item.chef}
                                                                                            </small>
                                                                                            <small onClick={e => editItem(item.id)} className={`item-priority pointer ${item.priority === 'High' ? 'high-pri' : item.priority === 'Medium' ? 'md-pri' : 'low-pri'}`} >
                                                                                                {item.priority}
                                                                                            </small>
                                                                                            {/* <small className={`item-priority md-pri`}>
                                                                                                {item.priority}
                                                                                            </small>
                                                                                            <small className={`item-priority low-pri`}>
                                                                                                {item.priority}
                                                                                            </small> */}
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            );
                                                                        }}
                                                                    </Draggable>
                                                                );
                                                            })}
                                                            {provided.placeholder}
                                                        </div>
                                                    );
                                                }}
                                            </Droppable>
                                        </div>
                                    </Col>
                                );
                            })}
                        </DragDropContext>
                    </div>
                </Row>

                {/* <Row className="fields">
                    <Col lg={4} md={12} className="to-do">
                        <div className="col-body-field field-body">
                            1
                        </div>
                    </Col>
                    <Col lg={4} md={12} className="doing">
                        <div className="col-body-field field-body">
                            2
                        </div>
                    </Col>
                    <Col lg={4} md={12} className="did">
                        <div className="col-body-field field-body">
                            3
                        </div>
                    </Col>
                </Row> */}
            </Container>
            <VerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                title="Add a new Branch"
            >
                <AddMealForm editData={handleEditSubmit} formType="edit" initialValuesOnEdit={item} />
            </VerticallyCenteredModal>
            {sweetAlert &&
                <SweetAlert
                    danger
                    showCancel
                    confirmBtnText="Yes, delete it!"
                    confirmBtnBsStyle="danger"
                    title="Are you sure?"
                    onConfirm={e => handleDeleteFunctionality(mealId)}
                    onCancel={handleDeleteButtonClick}
                    focusCancelBtn
                >
                    You will not be able to recover this imaginary file!
                </SweetAlert>
            }
        </main >
    )
}

export default Board


