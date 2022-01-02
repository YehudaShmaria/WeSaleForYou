import { useEffect, useState } from "react"
import {Form,Button, Container, Col, Row, InputGroup, FormControl, Modal, Accordion, Image} from 'react-bootstrap'
import { useHistory } from "react-router";
import utils from "../../utils";
import PasswordStrengthMeter from "./PasswordStrengthMeter";

const RegisterCom = () =>
{
    const history = useHistory();
    const [user,setUser] = useState({Name:"", Email:"",Password:"",Favorit:[],Type:"",ThereImage:false});
    const [profileImage, setProfileImage] = useState(null);
    const [checkPassword, setCheckPassword] = useState({ConfirmPassword:"", statusPassword:false});
    const [passwordShown, setPasswordShown] = useState(false);
    const [show, setShow] = useState(false);
    const [category, setCategory] = useState([]);
    const [validated, setValidated] = useState(false);
    const [TheEroor, setTheEroor] = useState(null);
    
    useEffect(async()=>
    {
        let res = await utils.GetAllItems("http://localhost:5000/category");
        let set = res.data.map(x => x.Name);
        setCategory(set);
    },[]);

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
            sendUser();
        }
        setValidated(true);
      };
    

    const sendUser = async() =>
    {
        if(user.Password == checkPassword.ConfirmPassword) // && checkPassword.statusPassword
        {
            var bodyFormData = new FormData();
            bodyFormData.append("Name",user.Name);
            bodyFormData.append("Password",user.Password);
            bodyFormData.append("Email",user.Email);
            bodyFormData.append("Favorit",user.Favorit);
            bodyFormData.append("Type",user.Type);
            bodyFormData.append("ThereImage",user.ThereImage);
            profileImage ? bodyFormData.append("ProfileImage",profileImage, profileImage.name) : console.log("No Image"); 
            try{
                let res = await utils.CreateItem("http://localhost:5000/user",bodyFormData);
                history.push('/login') 
            }
            catch (error){
                handleError(error.response.data.message)
            }
            
        }
        else
            handleError("The Password dosn't Match!!")
    }

    const handleError = (PastError) =>
    {
        setTheEroor(PastError);
        setShow(true);
    }

    const addCategory = (e) =>
    {
        // if(category.length != 0 && user.Favorit.length < 4)
        // {
            console.log(e.target.value)
            setUser({...user,Favorit:[...user.Favorit,e.target.value]});
            let newCategory = category;
            let getCategoryIndex = newCategory.findIndex(x => x === e.target.value);
            newCategory.splice(getCategoryIndex,1);
            setCategory(newCategory);
        // }
    }

    const removeCategory = (item) =>
    {
        setCategory([...category,item]);
        let newCategory = user.Favorit;
        console.log(newCategory);
        let getCategoryIndex = newCategory.findIndex(x => x == item);
        console.log(getCategoryIndex);
        newCategory.splice(getCategoryIndex,1);
        setUser({...user,Favorit:newCategory});
    }

    return(
        <div>
            <Container>
            <div style={{color:"green",textAlign:"left",marginBottom:"50px"}}>
                    <h1><cite>Welcome To Register Page!</cite></h1>
                </div>
                <Row>
                    <Col md={6} sm={6} xs={12}>
                        <h2 style={{textAlign:"left",color:"GrayText",marginBottom:"20px"}}>Why become a user?</h2>
                       
                        {/* <Image style={{width:'200px',display:"inline-block"}} thumbnail src={"https://drive.google.com/uc?export=view&id=1kOFLs80GCELx8L_d21m4qTP9NYNDENWT"}></Image> */}
                       
                        <Accordion>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>Get information that works best for you</Accordion.Header>
                                <Accordion.Body>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                                velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                                cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                                est laborum.
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                                <Accordion.Header>Possibility to correspond with sellers</Accordion.Header>
                                <Accordion.Body>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                                velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                                cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                                est laborum.
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="2">
                                <Accordion.Header>Option to track products and sellers</Accordion.Header>
                                <Accordion.Body>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                                velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                                cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                                est laborum.
                                </Accordion.Body>
                            </Accordion.Item>
                            </Accordion>
                    </Col>
                <Col style={{textAlign:"left"}} md={6} sm={6} xs={12}>
                    <h2>Register Infromation!</h2>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}> 
                       <Form.Group as={Row} className="mb-3">
                            <Form.Label column md="3">Your Name:</Form.Label>
                            <Col md={9}>
                                <Form.Control required placeholder="Enter User Name" onChange={(e)=>{setUser({...user,Name:e.target.value})}}/>
                                 <Form.Control.Feedback type="invalid">
                                      Please Enter User Name!
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm ={3}>Email address:</Form.Label>
                            <Col md={9}>
                                <Form.Control required="true" type="email" placeholder="Enter email"  onChange={(e)=>{setUser({...user,Email:e.target.value})}}/>
                                <Form.Control.Feedback type="invalid">
                                      Please Enter Email!
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <InputGroup className="mb-3">
                            <Form.Label column md ="2">Password:</Form.Label>
                            <Form.Control required type={passwordShown ? "text" : "password"} placeholder="Password" onChange={(e)=>{setUser({...user,Password:e.target.value})}} />
                            <InputGroup.Text><i onMouseEnter={()=>{setPasswordShown(true)}} onMouseLeave ={()=>{setPasswordShown(false)}} className="far fa-eye"></i></InputGroup.Text>
                            <Form.Control.Feedback type="invalid">
                                      Please Enter Password!
                                </Form.Control.Feedback>
                        </InputGroup>

                        <Form.Group as={Row} className="mb-3">
                             <div  style={{paddingTop:"10px",textAlign:"right"}}>
                                 <PasswordStrengthMeter password={user.Password} setStatus = {status=>{setCheckPassword({...checkPassword,statusPassword:status})}}/>
                             </div>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column md ="4">Confirm Password:</Form.Label>

                            <Col md="8">
                                <Form.Control required type="password" placeholder="Password" onChange={(e)=>{setCheckPassword({...checkPassword,ConfirmPassword:e.target.value})}} />
                                <Form.Control.Feedback type="invalid">
                                      Please Confirm Password
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" className="mb-3">
                            <Form.Label column md ="3">Profile Image:</Form.Label>
                            <Col md="9">
                                 <Form.Control type="file" accept="image/*" onChange={(e)=>{setProfileImage(e.target.files[0]); setUser({...user,ThereImage:true})}} />
                            </Col>
                        </Form.Group>

                        <Form.Select aria-label="Default select example" onChange={addCategory}>
                            <option>Open this select menu</option>
                            {
                                category.map((item,index) =>
                                {
                                    return <>
                                      <option key={index} value={item}>{item}</option>
                                    </>
                                })
                            }
                        </Form.Select>
                        {
                            user.Favorit.map((item,index)=>
                            {
                                return <><span onClick={()=>{removeCategory(item)}} key={index}>{item}</span><i class='fas fa-cut'></i></>
                            })
                        }
                        <div style={{paddingTop:"20px", textAlign:"right"}}>
                            <Button type="submit" variant="primary">
                                Submit
                            </Button>
                        </div>
                    </Form>
                </Col>
                </Row>
               {
                   TheEroor ? <>
                    <Modal show={show} onHide={()=>{setShow(false)}}>
                        <Modal.Header closeButton>
                        <Modal.Title>Error Handle</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>{TheEroor}</Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={()=>{setShow(false)}}>
                            Close
                        </Button>
                        </Modal.Footer>
                    </Modal></>:null
               }
            </Container>
           
        </div>
    )
}
export default RegisterCom