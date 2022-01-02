import { useContext, useEffect,useState } from "react"
import { Container, Card, ListGroup, Modal, ListGroupItem, Button } from "react-bootstrap";
import { useHistory, useRouteMatch } from "react-router";
import { userContext } from "../../Auto/userContext";



const SellerCom = (props) =>
{
    const {user, setUser} = useContext(userContext);
    const {path, url} = useRouteMatch()
    const [saller, setSaller] = useState(null);
    const [showModel,setShowModel] = useState(false);
    const history = useHistory();

    useEffect(async()=>
    {
        setSaller(props.s);
    },[])

    const handleSendMessage = () =>
    {
        if(user)
        {
            props.setShow(true); 
            props.setReciver(saller.userId)
        }
        else
            setShowModel(true);
    }

    return(<div>
        <Container>
            {
                saller ? <>
                <Card style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title>{saller.Name}</Card.Title>
                        <Card.Text>
                          Here the seller wrote some interesting things about himself
                        </Card.Text>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroupItem>Number Of Products: {saller.Products.length}</ListGroupItem>
                        <ListGroupItem>Number Of Followers: {saller.Followers.length}</ListGroupItem>
                        <ListGroupItem>Number of sales: 0</ListGroupItem>
                    </ListGroup>
                    <Card.Body>
                        <Button onClick={()=>{history.push(`${url}/products/${saller._id}`)}}>Products</Button>
                        {
                            props.notMe ? <>
                                <Button onClick={handleSendMessage}>Send Message</Button>
                            </>:<span>You Can't send message to your account</span>
                        }
                        
                    </Card.Body>
                    </Card>
                </>:null
            }   

        <Modal show={showModel} onHide={() => setShowModel(false)}>
            <Modal.Header closeButton>
            <Modal.Title>You are not in the system!</Modal.Title>
            </Modal.Header>
            <Modal.Body>You must Register or Login If you want to have a conversation with a seller....</Modal.Body>
            <Modal.Footer>
        
            <Button variant="success" type="button" onClick={()=>{history.push('/register')}}>
                        Register</Button>
                <Button variant="primary" type="button" onClick={()=>{history.push('/login')}}>
                Login</Button>
            </Modal.Footer>
        </Modal>
            
        </Container>
    </div>)
}

export default SellerCom