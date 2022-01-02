import { useEffect, useState} from "react"
import { Col, Form, Card, Row, Button, Container } from "react-bootstrap";
import utils from "../../../../../../utils";

const UpdateProductImagesCom = (props) =>
{
    const [images, setImages] = useState([]);
    const [newImage, setNewImage] = useState(null);

    useEffect(()=>{
        setImages(props.product.Images);
    },[props.product.Images])


    const deleteTheImage = async(image) =>
    {
        try{
            console.log(image);
            let res = await utils.UpdateItem("http://localhost:5000/product/deleteimage/",props.product._id,{Image:image});
            console.log(res.data);
            props.updateProduct(res.data.newProduct);
        }
        catch(error){
            alert(error.response.data.message);
        }
    }

    const addImage = async() =>
    {
        let bodyFormData = new FormData();
        bodyFormData.append("ProductImage",newImage, newImage.name);
        try{
            let res = await utils.UpdateItem("http://localhost:5000/product/addimage/",props.product._id,bodyFormData);
            console.log(res.data);
            setNewImage(null);
            props.updateProduct(res.data.newProduct);
        }
        catch(error){
            alert(error.response.data.message);
        }
    }

    return (
        <div>
            <Container>
                <div>
                    <h3 style={{color:"yellowgreen",backgroundColor:"whitesmoke",padding:"10px"}}>Upadte Product Images</h3>
                </div>
                <Form>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column md="4">Add image:</Form.Label>
                    <Col md={8}>
                        <Form.Control accept="image/*" type="file" onChange={(e)=>{setNewImage(e.target.files[0])}}/>
                    </Col>
                </Form.Group>
            </Form>
            {
                newImage ? <>
                <Button onClick={addImage}>Add Image</Button>
                </>:null
            }
                <Row>
                   
                    {
                images.map((item,index)=>{
                    return <> <Col><Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={'http://localhost:5000/'+item} />
                    <Card.Body>
                        <Card.Title>Image {index + 1}</Card.Title>
                        <Button onClick={()=>{deleteTheImage(item)}}>Delete Image</Button>
                    </Card.Body>
                    </Card>
                    </Col>
                    </> 
                })
            }   
                </Row>
            </Container>
        </div>
    )
}
export default UpdateProductImagesCom