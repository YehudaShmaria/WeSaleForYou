import { useEffect, useState } from "react"
import { Form, Button, Container, Col, Row, InputGroup, FormControl, Modal, Accordion, Image } from 'react-bootstrap'
import { useHistory } from "react-router";
import utils from "../../../utils";
import PasswordStrengthMeter from "./PasswordStrengthMeter";

const RegisterCom = () => {
    const history = useHistory();
    const [user, setUser] = useState({ Name: "", Email: "", Password: "", Favorit: [], Type: "", ThereImage: false });
    const [profileImage, setProfileImage] = useState(null);
    const [checkPassword, setCheckPassword] = useState({ConfirmPassword: "", statusPassword: false});
    const [passwordShown, setPasswordShown] = useState(false);
    const [show, setShow] = useState(false);
    const [validated, setValidated] = useState(false);
    const [TheEroor, setTheEroor] = useState(null);
    const [currentForm, setCurrentForm] = useState("First");
    const [imagePath, setImagePath] = useState('');

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        else {
            setValidated(true);
            event.preventDefault();
            sendUser();
        }
        setValidated(true);
    };

    const sendUser = async () => {
        if (user.Password == checkPassword.ConfirmPassword) // && checkPassword.statusPassword
        {
            var bodyFormData = new FormData();
            bodyFormData.append("Name", user.Name);
            bodyFormData.append("Password", user.Password);
            bodyFormData.append("Email", user.Email);
            bodyFormData.append("Favorit", user.Favorit);
            bodyFormData.append("Type", user.Type);
            bodyFormData.append("ThereImage", user.ThereImage);
            profileImage ? bodyFormData.append("ProfileImage", profileImage, profileImage.name) : console.log("No Image");
            try {
                let res = await utils.CreateItem("http://localhost:5000/user", bodyFormData);
                history.push('/login')
            }
            catch (error) {
                handleError(error.response.data.message)
            }

        }
        else
            handleError("The Password dosn't Match!!")
    }

    const handleError = (PastError) => {
        setTheEroor(PastError);
        setShow(true);
    }

    const handleImage = (e) => {
        setProfileImage(e.target.files[0]);
        setImagePath(URL.createObjectURL(e.target.files[0]));
        setUser({ ...user, ThereImage: true })
    }

    return (
        <div>
            <Container>
                <div style={{ color: "green", textAlign: "left", marginBottom: "50px" }}>
                    <h1><cite>Welcome To Register Page!</cite></h1>
                </div>
                <Row>
                    <Col style={{ textAlign: "left" }} md={6} sm={6} xs={12}>
                        <h2>Register Input!</h2>
                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                            <div>
                                {
                                    currentForm == "First" ?
                                        <><Form.Group as={Row} className="mb-3">
                                            <Form.Label column md="3">Your Name:</Form.Label>
                                            <Col md={9}>
                                                <Form.Control required placeholder="Enter User Name" value={user.Name} onChange={(e) => { setUser({ ...user, Name: e.target.value }) }} />
                                                <Form.Control.Feedback type="invalid">
                                                    Please Enter User Name!
                                                </Form.Control.Feedback>
                                            </Col>
                                        </Form.Group>

                                            <Form.Group as={Row} className="mb-3">
                                                <Form.Label column sm={3}>Email address:</Form.Label>
                                                <Col md={9}>
                                                    <Form.Control required="true" type="email" placeholder="Enter email" value={user.Email} onChange={(e) => { setUser({ ...user, Email: e.target.value }) }} />
                                                    <Form.Control.Feedback type="invalid">
                                                        Please Enter Email!
                                                    </Form.Control.Feedback>
                                                </Col>
                                            </Form.Group>
                                            <div style={{ textAlign: 'right' }}>
                                                <Button onClick={() => { setCurrentForm('Secund') }}>Next</Button>
                                            </div>
                                        </> :
                                        null
                                }
                            </div>
                            <div>
                                {
                                    currentForm == "Secund" ? <>
                                        <InputGroup className="mb-3">
                                            <Form.Label column md="2">Password:</Form.Label>
                                            <Form.Control required type={passwordShown ? "text" : "password"} placeholder="Password" value={user.Password} onChange={(e) => { setUser({ ...user, Password: e.target.value }) }} />
                                            <InputGroup.Text><i onMouseEnter={() => { setPasswordShown(true) }} onMouseLeave={() => { setPasswordShown(false) }} className="far fa-eye"></i></InputGroup.Text>
                                            <Form.Control.Feedback type="invalid">
                                                Please Enter Password!
                                            </Form.Control.Feedback>
                                        </InputGroup>

                                        <Form.Group as={Row} className="mb-3">
                                            <div style={{ paddingTop: "10px", textAlign: "right" }}>
                                                <PasswordStrengthMeter password={user.Password} setStatus={status => { setCheckPassword({ ...checkPassword, statusPassword: status }) }} />
                                            </div>
                                        </Form.Group>

                                        <Form.Group as={Row} className="mb-3">
                                            <Form.Label column md="4">Confirm Password:</Form.Label>

                                            <Col md="8">
                                                <Form.Control required type="password" placeholder="Password" value={checkPassword.ConfirmPassword} onChange={(e) => { setCheckPassword({ ...checkPassword, ConfirmPassword: e.target.value }) }} />
                                                <Form.Control.Feedback type="invalid">
                                                    Please Confirm Password
                                                </Form.Control.Feedback>
                                            </Col>
                                        </Form.Group>
                                        <Button onClick={() => { setCurrentForm('First') }}>Go Back</Button>
                                        <div style={{ textAlign: 'right', display: 'inline-block', paddingLeft: '100px' }}>
                                            <Button onClick={() => { setCurrentForm('Thord') }}>Next</Button>
                                        </div>
                                    </> : null
                                }
                            </div>

                            <div>
                                {
                                    currentForm == "Thord" ?
                                        <>
                                            <Form.Group as={Row} className="mb-3" className="mb-3">
                                                <Form.Label column md="3">Profile Image:</Form.Label>
                                                <Col md="9">
                                                    <Form.Control type="file" accept="image/*" onChange={handleImage} />
                                                </Col>
                                            </Form.Group>
                                            <Button onClick={() => { setCurrentForm('Secund') }}>Go Back</Button>
                                            <div style={{ paddingTop: "20px", textAlign: "right" }}>
                                                <Button type="submit" variant="primary">
                                                    Submit
                                                </Button>
                                            </div>
                                        </> :
                                        null
                                }
                            </div>
                        </Form>
                    </Col>

                    <Col style={{ textAlign: "left" }} md={6} sm={6} xs={12}>
                        <div style={{padding:'20px'}}>
                            <h3>Register Infromation!</h3>
                            <h4>Name: {user.Name}</h4>
                            <h4>Email: {user.Email}</h4>
                            <InputGroup className="mb-3">
                                <Form.Label column md="2">Password:</Form.Label>
                                <Form.Control required type={passwordShown ? "text" : "password"} placeholder="Password" value={user.Password}/>
                                <InputGroup.Text><i onMouseEnter={() => { setPasswordShown(true) }} onMouseLeave={() => { setPasswordShown(false) }} className="far fa-eye"></i></InputGroup.Text>
                            </InputGroup>


                            <div style={{ textAlign: 'center' }}>
                                <h4>Profile Image:</h4>
                                <Image rounded style={{ height: '150px', width: 'auto' }} src={imagePath} />
                            </div>
                        </div>
                    </Col>
                </Row>
                {
                    TheEroor ? <>
                        <Modal show={show} onHide={() => { setShow(false) }}>
                            <Modal.Header closeButton>
                                <Modal.Title>Error Handle</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>{TheEroor}</Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={() => { setShow(false) }}>
                                    Close
                                </Button>
                            </Modal.Footer>
                        </Modal></> : null
                }
            </Container>

        </div>
    )
}
export default RegisterCom