import { useContext, useEffect, useState } from "react"
import utils from "../../../utils";
import { userContext } from "../../Auto/userContext"
import { useHistory } from "react-router";
import LoginCom from "../../Auto/login";
import {Button, Container, Modal, Row, Col, Form, InputGroup} from 'react-bootstrap'

const BecomeSallerCom = () =>
{
    const {user,setUser} = useContext(userContext);
    const [saller, setSaller] = useState({Name:"",userId:"",PhoneNumber:"",Addres:""})
    const [showModel,setShowModel] = useState(true);
    const history = useHistory();
    const [validated, setValidated] = useState(false);

    useEffect(()=>
    {
        if(user)
        {
            setSaller({...saller,userId:user._id});
            setShowModel(false);
        }
    },[user])

    const createSaller = async() =>
    {
        try{
            let res = await utils.CreateItem("http://localhost:5000/saller",saller);
            if(res.data.saller != null)
                {
                    alert(res.data.message);
                    setUser({...user,Type:"Saller"});
                    history.push('/mangeproduct/saller')
                }
            else
                alert(res.data.message);
        }
        catch(error)
        {
            alert(error.response.data.message);
        }
    }

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) 
        {
          event.preventDefault();
          event.stopPropagation();
        }
        else
        {
            setValidated(true);
            event.preventDefault();
            createSaller();
        }
        setValidated(true);
      };

    return (
        <div>
            <Container>
                <div style={{color:"green",textAlign:"left",marginBottom:"50px"}}>
                    <h1><cite>Create Your Seller Account!</cite></h1>
                </div>
                <Row>
                    <Col md={6} sm={6} xs={12}>
                        <h2 style={{textAlign:"left",color:"GrayText",marginBottom:"20px"}}>Why become a Seller?</h2>
                    </Col>

                    <Col style={{textAlign:'left'}} md={6} sm={6} xs={12}>
                    <h3 style={{marginBottom:"50px"}}>Seller Infromation!</h3>
                            <Form  noValidate validated={validated} onSubmit={handleSubmit}> 
                            <Form.Group as={Row} className="mb-3">
                                    <Form.Label column md="4">Your Seller Name:</Form.Label>
                                    <Col md={8}>
                                        <Form.Control required placeholder="Enter User Name" onChange={(e)=>{setSaller({...saller,Name:e.target.value})}}/>
                                        <Form.Control.Feedback type="invalid">
                                            Please Enter Seller Name!
                                        </Form.Control.Feedback>
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label column sm ={4}>Phone Number:</Form.Label>
                                    <Col md={8}>
                                        <Form.Control required="true" type="tel" placeholder="Enter Phone Number"  onChange={(e)=>{setSaller({...saller,PhoneNumber:e.target.value})}}/>
                                        <Form.Control.Feedback type="invalid">
                                            Please Enter Phone Number!
                                        </Form.Control.Feedback>
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label column sm ={3}>Addres:</Form.Label>
                                    <Col md={9}>
                                        <Form.Control required="true" type="text" placeholder="Enter Addres"  onChange={(e)=>{setSaller({...saller,Addres:e.target.value})}}/>
                                        <Form.Control.Feedback type="invalid">
                                            Please Enter Addres!
                                        </Form.Control.Feedback>
                                    </Col>
                                </Form.Group>

                                <div style={{paddingTop:"20px", textAlign:"right"}}>
                                    <Button type="submit" variant="primary">
                                        Submit
                                    </Button>
                                </div>
                            </Form>
                    </Col>
                </Row>
                <Modal show={showModel}>
                        <Modal.Header>
                        <Modal.Title>You are not in the system!</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>You must Register or Login to become a Seller so please complete the process....</Modal.Body>
                        <Modal.Footer>
                       
                         <Button variant="success" type="button" onClick={()=>{history.push('/register')}}>
                                    Register</Button>
                            <Button variant="primary" type="button" onClick={()=>{history.push('/login')}}>
                            Login</Button>
                        </Modal.Footer>
                </Modal>
            </Container>
                
        </div>
    )
}

export default BecomeSallerCom