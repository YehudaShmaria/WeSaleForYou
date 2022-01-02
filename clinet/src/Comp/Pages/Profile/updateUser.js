import { userContext } from "../../Auto/userContext";
import { useContext, useState, useEffect } from "react";
import utils from "../../../utils";
import {Form,Row,Col,Button,InputGroup, Container, Modal} from 'react-bootstrap'
import { useHistory } from "react-router";

const UpdateUserCom = () =>
{
    const {user,setUser} = useContext(userContext);
    const [updateUser, setUpdateUser] = useState({Favorit:[]});
    const [validated, setValidated] = useState(false);
    const [category, setCategory] = useState([]);
    const [showCategory, setShowCategory] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const history = useHistory();

    useEffect(async()=>
    {
        setUpdateUser(user)
    },[user])

    const getCategory = async() =>
    {
        let res = await utils.GetAllItems("http://localhost:5000/category");
        let set = []
        for (var i = 0; i < res.data.length; i++) {
            if(!updateUser.Favorit.includes(res.data[i].Name))
            set.push(res.data[i].Name);
        }
        setCategory(set);
    }

    const sendUser = async() =>
    {
        try{
            let res = await utils.UpdateItem("http://localhost:5000/user/",updateUser._id,updateUser);
            setUser(res.data.NewUser);
            history.push('/profile')
            
        }
        catch(error){
            alert("error.response.data.message")
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
            sendUser();
        }
        setValidated(true);
      };

    const addCategory = (e) =>
    {
        setUpdateUser({...updateUser,Favorit:[...updateUser.Favorit,e]});
        let newCategory = category;
        let getCategoryIndex = newCategory.findIndex(x => x === e);
        newCategory.splice(getCategoryIndex,1);
        setCategory(newCategory);
    }

    const removeCategory = (item) =>
    {
        setCategory([...category,item]);
        let newCategory = updateUser.Favorit;
        let getCategoryIndex = newCategory.findIndex(x => x == item);
        newCategory.splice(getCategoryIndex,1);
        setUpdateUser({...updateUser,Favorit:newCategory});
    }

    return(
        <div>
            <Container>
            <div style={{marginTop:"30px", paddingBottom:"30px"}}>
                <h2 style={{color:"yellowgreen",backgroundColor:"whitesmoke", fontSize:"35px", padding:"10px"}}>Update User</h2>
            </div>

            <Form style={{textAlign:"left"}} noValidate validated={validated} onSubmit={handleSubmit}> 
                       <Form.Group as={Row} className="mb-3">
                       <Form.Label column sm ={3}>Name:</Form.Label>
                            <Col md={9}>
                                <Form.Control required placeholder="Enter User Name" value={updateUser.Name} onChange={(e)=>{setUpdateUser({...updateUser,Name:e.target.value})}}/>
                                 <Form.Control.Feedback type="invalid">
                                      Please Enter User Name!
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm ={3}>Email address:</Form.Label>
                            <Col md={9}>
                                <Form.Control required="true" type="email" placeholder="Enter email" value={updateUser.Email}  onChange={(e)=>{setUpdateUser({...updateUser,Email:e.target.value})}}/>
                                <Form.Control.Feedback type="invalid">
                                      Please Enter Email!
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        {/* 
                        <Form.Group as={Row} className="mb-3" className="mb-3">
                            <Form.Label column md ="3">Profile Image:</Form.Label>
                            <Col md="9">
                                 <Form.Control type="file"  onChange={(e)=>{setProfileImage(e.target.files[0]); setUser({...user,ThereImage:true})}} />
                            </Col>
                        </Form.Group>  */}
                        <div style={{textAlign:"left", color:"green"}}>
                            <ul>
                                <h3>Favorit Category</h3>
                                {
                                    updateUser.Favorit.map((item,index)=>
                                    {
                                        return <>
                                        <li style={{color:"grey",marginLeft:"50px"}}><span key={index}>{item}</span></li></>
                                    })
                                
                                }
                            </ul>
                            <Button onClick={()=>{getCategory(); setShowCategory(true)}}>Edit Category</Button>
                            <Button style={{marginLeft:"50px"}} onClick={()=>{setShowPassword(true)}}>Edit Password</Button>
                        </div>
                      
                        <Modal size="lg" show={showCategory} onHide={() => setShowCategory(false)} aria-labelledby="example-modal-sizes-title-lg">
                            <Modal.Header closeButton>
                                <Modal.Title id="example-modal-sizes-title-lg">Edit Category</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {
                                showCategory ? <>
                                {   
                                    category.map((item,index) =>
                                    {
                                        return <p key={index} onClick={()=>{addCategory(item)}} value={item}>{item}</p>
                                        
                                    })
                                }
                        
                                {
                                    updateUser.Favorit.map((item,index)=>
                                    {
                                        return <><span onClick={()=>{removeCategory(item)}} key={index}>{item}</span><i class='fas fa-cut'></i></>
                                    })
                                
                                }
                        </>:null
                        }         
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={()=>{setShowCategory(false)}}>
                                    Close
                                </Button>
                            </Modal.Footer>
                    </Modal>

                       
                    <Modal size="lg" show={showPassword} onHide={() => setShowPassword(false)} aria-labelledby="example-modal-sizes-title-lg">
                            <Modal.Header closeButton>
                                <Modal.Title id="example-modal-sizes-title-lg">Edit Password</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <h2>Here You will Update Your Password!</h2>
                                    {/* <Form>
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

                                    </Form> */}
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={()=>{setShowPassword(false)}}>
                                    Close
                                </Button>
                            </Modal.Footer>
                    </Modal>

                        
                       
                    
                        <div style={{paddingTop:"20px", textAlign:"right"}}>

                            <Button type="submit" variant="primary">
                                Save
                            </Button>
                        </div>
                    </Form>

            </Container>
        </div>
    )
}
export default UpdateUserCom