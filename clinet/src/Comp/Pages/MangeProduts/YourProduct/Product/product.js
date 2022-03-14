import { useContext, useEffect, useState } from "react";
import { Card,Col,ListGroup, ListGroupItem, Button, Modal, Image, Row } from "react-bootstrap";
import utils from "../../../../../utils";
import { sallerContext } from "../../sallerContext";
import UpdateProductCom from "./UpdateProduct/updateProduct";
import UpdateProductImagesCom from "./UpdateProduct/updateProductImages";

const ProductCom = (props) =>
{
    const {saller, setSaller} = useContext(sallerContext);
    const [product, setProduct] = useState(null)
    const [showImages, setShowImages] = useState(false);
    const [theImage, setTheImage] = useState("");
    const [showUpdate, setShowUpdate] = useState(false);
    const [images, setImages] = useState(false);


    useEffect(()=>{
        setProduct(props.p);
        setTheImage(props.p.Images[0]);
    },[])

    const deleteProduct = async () =>
    {
        try{
            let res = await utils.DeleteItem("http://localhost:5000/product/",props.p._id);
            setSaller(res.data.sallerUpdate);
        }
        catch(error)
        {
            alert(error.response.data.message);
        }
    }

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
                        <Card.Title>{product.Name}</Card.Title>
                        <Card.Text>
                         {product.Descrption}
                        </Card.Text>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroupItem>Price: {"$"+product.Price}</ListGroupItem>
                        <ListGroupItem><Button variant="primary" onClick={() => setShowImages(true)}>Images</Button></ListGroupItem>
                    </ListGroup>
                    <Card.Body>
                    <Button variant="primary" onClick={()=>{setShowUpdate(true)}}>Update</Button>
                    <Button variant="primary" onClick={deleteProduct}>Delete</Button>
                    </Card.Body>
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
                <Modal
                    size="lg"
                    show={showUpdate}
                    onHide={() => setShowUpdate(false)}
                    aria-labelledby="example-modal-sizes-title-lg"
                >
                    <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Update Product   <Button variant="primary" type="button" onClick={()=>{setImages(!images)}}>{images ? "Update Product":"Update Product Images"}</Button>
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {
                            images ?  <UpdateProductImagesCom product={product} updateProduct = {product => setProduct(product)}/>: 
                            <UpdateProductCom p={product} updateProduct = {product => setProduct(product)}/>
                        } 
                    </Modal.Body>
                    <Modal.Footer>
                       <Button variant="success" type="button" onClick={()=>{setShowUpdate(false); setImages(false)}}>Close</Button>
                      </Modal.Footer>
                </Modal>
                </>:null
                }

        </div>
    )
}
export default ProductCom