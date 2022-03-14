import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row, Modal, Form } from 'react-bootstrap';
import ConversationChatCom from './conversationChat';
import NavChatCom from './navChat';
import OnlineFrindsCom from './onlineFrinds';
import SubjectChatCom from './subjectChat';
import utils from './../../../utils'
import { useParams } from 'react-router-dom';

function MainChatCom(props) {
    let { category } = useParams();
    const [chats, setChats] = useState([]);
    const [chat, setChat] = useState(null);
    const [show, setShow] = useState(false);
    const [validated, setValidated] = useState(false);
    const [newChat, setNewChat] = useState({ Category:"", Subject: ""});

    useEffect(async () => {
        try {
            let res = await utils.GetAllItems("http://localhost:5000/chat");
            setChats(res.data.AllChat);

        }
        catch (error) {
            alert(error.response.data.message)
        }
    }, [])

    useEffect(() => {
        setChat(null);
        setNewChat({...newChat,Category:category})
    }, [category])

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        else {
            setValidated(true);
            event.preventDefault();
            createNewChat();
        }

        setValidated(true);
    };

    const createNewChat = async () => {
        console.log(newChat);
        try {
            let res = await utils.CreateItem("http://localhost:5000/chat", newChat);
            console.log(res.data);
        }
        catch (error) {
            alert(error.response.data.message);
        }
    }

    return (
        <div>
            <Container fluid>
                {/* <NavChatCom /> */}
                <Row>
                    <Col md={3}>
                        <input placeholder="Search For Subject" className="chatMenuInput" />
                        <div style={{ paddingTop: '10px', textAlign: 'left', paddingLeft: '10px' }}>
                            <Button on onClick={() => { setShow(true) }} size='sm'>New Subject</Button>
                        </div>
                        {
                            chats.map((item, index) => {
                                return <>
                                    {
                                        item.Category == category ? <>
                                            <div onClick={() => { setChat(item) }}>
                                                <SubjectChatCom Name={item.Subject} />
                                            </div>
                                        </> : null
                                    }
                                </>
                            })
                        }
                    </Col>
                    <Col md={7}>
                        {
                            chat ? <>
                                <ConversationChatCom chat={chat} />
                            </> : null
                        }
                    </Col>
                    <Col md={2}>
                        <OnlineFrindsCom />
                    </Col>
                </Row>

                <Modal show={show} onHide={() => setShow(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>New Subject</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form style={{ textAlign: "left" }} noValidate validated={validated} onSubmit={handleSubmit}>
                            <Form.Group as={Row} className="mb-3">
                                <h3>Room: {newChat.Category}</h3>
                                {/* <Col md={6}>
                                    <Form.Select onChange={(e) => {setNewChat({ ...newChat, Category: e.target.value }) }}>
                                        <option value="LapTop">LapTop</option>
                                        <option value="SmartPhone">SmartPhone</option>
                                        <option value="HeadPhones">HeadPhones</option>
                                        <option value="SmartWatch">SmartWatch</option>
                                    </Form.Select>
                                </Col> */}
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column md="3">Subject:</Form.Label>
                                <Col md={9}>
                                    <Form.Control required placeholder="Enter Subject" onChange={(e) => { setNewChat({ ...newChat, Subject: e.target.value }) }} />
                                    <Form.Control.Feedback type="invalid">
                                        Please Enter Subject!
                                    </Form.Control.Feedback>
                                </Col>
                            </Form.Group>

                            {/* <Form.Group as={Row} className="mb-3">
                                <Form.Label column md="4">First Message:</Form.Label>
                                <Col md={8}>
                                    <Form.Control as="textarea" required placeholder="Enter Message" onChange={(e) => { setNewChat({ ...newChat, Messages: [e.target.value] }) }} />
                                    <Form.Control.Feedback type="invalid">
                                        Please Enter Message!
                                    </Form.Control.Feedback>
                                </Col>
                            </Form.Group> */}
                            <div style={{ paddingTop: "10px", textAlign: "right" }}>
                                <Button type="submit" variant="primary">
                                    Submit
                                </Button>
                            </div>
                        </Form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShow(false)}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>

        </div >
    );
}

export default MainChatCom;