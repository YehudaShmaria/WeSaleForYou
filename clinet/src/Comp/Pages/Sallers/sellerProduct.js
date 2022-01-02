import { useEffect, useState } from "react"
import { Container, Button, Card,ListGroup,ListGroupItem, Col, Row,Image,Modal} from "react-bootstrap";
import { useParams } from "react-router";
import utils from "../../../utils";

const SellerProductCom = (props) =>
{
    const [showImages, setShowImages] = useState(false);
    const [theImage, setTheImage] = useState("");
    useEffect(()=>
    {
        setTheImage(props.p.Images[0]);
    },[])
    return(
        <div>
            <Container>
               
                    <Card style={{ width: '18rem' }}>
                    <Card.Header style={{display:'flex'}}>
                        <span>Type: {props.p.Type}</span>
                        <hr style={{borderBottom:'2px solid red', flex:'1'}}/>
                        <span>Category: {props.p.Category}</span>
                    </Card.Header>
                <Card.Img variant="top" src={`http://localhost:5000/${props.p.Images[0]}`} />
                    <Card.Body>
                        <Card.Title>{props.p.Name}</Card.Title>
                        <Card.Text>
                        {props.p.Descrption}
                        </Card.Text>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroupItem>Price: {"$"+props.p.Price}</ListGroupItem>
                        <ListGroupItem><Button variant="primary" onClick={() => setShowImages(true)}>Images</Button></ListGroupItem>
                    </ListGroup>
                </Card>
                <Modal
                    size="lg"
                    show={showImages}
                    onHide={() => setShowImages(false)}
                    aria-labelledby="example-modal-sizes-title-lg"
                >
                    <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        {props.p.Name +" Images"}
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col md={5} sm={5}>
                                {
                                    props.p.Images.map((item,index)=>{
                                        return <><Image rounded style={{height:"100px"}} src={'http://localhost:5000/'+item} onClick={()=>{setTheImage(item)}}></Image>
                                        </> 
                                    })
                                }
                            </Col>
                            <Col md={7} sm={7}>
                                <Image rounded style={{height:"250px"}} src={'http://localhost:5000/'+theImage}/>
                            </Col>
                        </Row>
                    </Modal.Body>
                </Modal>
                       
            </Container>
        </div>
    )
}
export default SellerProductCom