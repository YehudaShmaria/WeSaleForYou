import { useState,useContext } from "react"
import { useHistory } from "react-router"
import { userContext } from "./userContext";
import utils from "../../utils";
import { Col, Container, Row,Form,Button, Modal, Image} from "react-bootstrap";

const LoginCom = () =>
{
    const history = useHistory();
    const {user,setUser} = useContext(userContext);
    const [login, setLogin] = useState({Email:"",Password:""});
    const [remember, setRemember] = useState(true);
    const [TheEroor, setTheEroor] = useState(null);
    const [showModel, setShowModel] = useState(false);

    const checkValidInput = () =>
    {
        if(login.Email != "" && login.Password != "")
            return true;
        else
            return false;
    }
    
    const sendLogin = async() =>
    {
        if(checkValidInput())
        {
            try{
                let res = await utils.CreateItem("http://localhost:5000/auto",login)
                setUser(res.data.user);
                if(remember)
                {
                    localStorage.setItem('token',res.data.token);
                    localStorage.setItem('role',res.data.user.Type);
                }
                else
                    {
                        sessionStorage.setItem('token',res.data.token);
                        sessionStorage.setItem('role',res.data.user.Type);
                    }
                history.push('/')
            }catch (error){
                handleError(error.response.data.message)
            }
        }
        else
            handleError("Requires Email and password")
    }

    const handleError = (PastError) =>
    {
        setTheEroor(PastError);
        setShowModel(true);
    }
    
    return(
        <div>
            <Container>
                <div style={{color:"green",textAlign:"left",marginBottom:"50px"}}>
                    <h1><cite>Welcome To Login Page!</cite></h1>
                </div>
                <Row>
                <Col md={6} sm={6} xs={12}>
                   
                     <h3 style={{textAlign:"left", color:"GrayText"}}>It's Nice To Have You Back!</h3>
                     <div style={{padding:"15px"}}>
                     <Image thumbnail src={"https://drive.google.com/uc?export=view&id=1YM4X-0k3nSca2d07nQI9Q-EQsHkaSBsI"}></Image>
                    </div>
                </Col>
                    <Col style={{textAlign:'left'}} md={6} sm={6} xs={12}>
                        <h3>Login Infromation!</h3>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Email address:</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" onChange={(e)=>{setLogin({...login,Email:e.target.value})}} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Password:</Form.Label>
                                <Form.Control type="password" placeholder="Password" onChange={(e)=>{setLogin({...login,Password:e.target.value})}} />
                                <Form.Control.Feedback type="invalid">
                            Please choose a username.
                            </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                <Form.Check checked={remember} type="checkbox" label="Remember Me" onChange={()=>{setRemember(!remember)}}/>
                            </Form.Group>
                          
                          <Row>
                              <Col>
                              <Button variant="primary" type="button" onClick={sendLogin}>
                                Login
                                </Button>
                              </Col>
                              {/* <Col>
                              <span>Or Create account</span>
                              </Col> */}
                              <Col>
                              <Button variant="success" type="button" onClick={()=>{history.push('/register')}}>
                                    Register
                                </Button>
                              </Col>
                          </Row>
                    </Form>
                </Col>
            
                </Row>

                {
                    TheEroor ? <>
                      <Modal show={showModel} onHide={()=>{setShowModel(false)}}>
                        <Modal.Header closeButton>
                        <Modal.Title>Error Handle</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>{TheEroor}</Modal.Body>
                        <Modal.Footer>
                        {/* <Button style={{marginLeft:"177px"}} variant="success" type="button" onClick={()=>{history.push('/register')}}>
                                Register
                        </Button> */}
                        <Button variant="secondary" onClick={()=>{setShowModel(false)}}>
                            Close
                        </Button>
                        </Modal.Footer>
                    </Modal>
                    </>:null
                }
            </Container>
          
        </div>
    )
}
export default LoginCom