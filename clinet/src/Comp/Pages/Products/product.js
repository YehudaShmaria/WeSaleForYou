import {useEffect, useState } from "react";
import { Card,Col,ListGroup, ListGroupItem, Button, Modal, Image, Row } from "react-bootstrap";

const ProductCom = (props) =>
{
    const [product, setProduct] = useState(null)
    const [showImages, setShowImages] = useState(false);
    const [theImage, setTheImage] = useState("");


    useEffect(()=>{
        setProduct(props.p);
        setTheImage(props.p.Images[0]);
    },[])

    return(
        <div>
            {
            product ? <>
            <Card style={{ width: '18rem' }}>
                <Card.Header style={{display:'flex',alignItems:'center'}}>
                <span>Category: {product.Category}</span>
                </Card.Header>
                <Card.Img variant="top" src={`http://localhost:5000/${product.Images[0]}`} />
                    <Card.Body>
                        <Card.Title>{product.Modal}</Card.Title>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroupItem>Price: {"$"+product.Price} <Button variant="primary" onClick={() => setShowImages(true)}>Images</Button></ListGroupItem>
                    </ListGroup>
                    <Button href={product.Link} target="_blank">Watch Product</Button>
                </Card>
                <Modal
                    size="lg"
                    show={showImages}
                    onHide={() => setShowImages(false)}
                    aria-labelledby="example-modal-sizes-title-lg"
                >
                    <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        {product.Name +" Images"}
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col md={5} sm={5}>
                                {
                                    product.Images.map((item,index)=>{
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
                </>:null
                }

        </div>
    )
}
export default ProductCom