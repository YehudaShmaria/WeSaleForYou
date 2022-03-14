import { useContext, useEffect, useState } from "react"
import { Container, Form, Col, Row, Button } from "react-bootstrap";
import { useHistory } from "react-router";
import utils from "../../../../../../utils";
import { sallerContext } from "../../../sallerContext"

const UpdateProductCom = (props) => {
    const { saller, setSaller } = useContext(sallerContext);
    const [updateProduct, setupdateProduct] = useState({});
    const [validated, setValidated] = useState(false);
    const history = useHistory();

    useEffect(() => {
        if (saller) {
            setupdateProduct(props.p);
            console.log(updateProduct);
        }
    }, [saller])


    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        else {
            setValidated(true);
            event.preventDefault();
            sendProduct();
        }

        setValidated(true);
    };

    const sendProduct = async () => {

        try {
            let res = await utils.UpdateItem("http://localhost:5000/product/", updateProduct._id, updateProduct);
            let newProduct = res.data.newProduct;
            props.updateProduct(newProduct);
            history.push('/mangeproduct/yourproduct');
        }
        catch (error) {
            alert(error.response.data.message);
        }
    }

    return (
        <div>
            <Container>
                <div>
                    <h3 style={{ color: "yellowgreen", backgroundColor: "whitesmoke", padding: "10px" }}>Upadte Product</h3>
                </div>
                <Form style={{ textAlign: "left" }} noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group as={Row} className="mb-3">
                            <Form.Label column md="3">Select Category:</Form.Label>
                            <Col md={9}>
                                <Form.Select value={updateProduct.Category} onChange={(e) => { setupdateProduct({ ...updateProduct, Category: e.target.value }) }}>
                                    <option value="LapTop">LapTop</option>
                                    <option value="SmartPhone">SmartPhone</option>
                                    <option value="HeadPhones">HeadPhones</option>
                                    <option value="SmartWatch">SmartWatch</option>
                                </Form.Select>
                            </Col>
                        </Form.Group>
                    
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column md="3">Product Modal:</Form.Label>
                        <Col md={9}>
                            <Form.Control required placeholder="Enter Product Modal" value={updateProduct.Modal} onChange={(e) => { setupdateProduct({ ...updateProduct, Modal: e.target.value }) }} />
                            <Form.Control.Feedback type="invalid">
                                Please Enter Product Modal!
                            </Form.Control.Feedback>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column md="3">Descrption:</Form.Label>
                        <Col md={9}>
                            <Form.Control as="textarea" required placeholder="Enter Product Descrption" value={updateProduct.Descrption} onChange={(e) => { setupdateProduct({ ...updateProduct, Descrption: e.target.value }) }} />
                            <Form.Control.Feedback type="invalid">
                                Please Enter Descrption!
                            </Form.Control.Feedback>
                        </Col>
                    </Form.Group>

                    <Form.Check style={{marginBottom:'10px'}} checked={updateProduct.Available} onChange={()=>{setupdateProduct({...updateProduct,Available:!updateProduct.Available})}} type="switch" label="Available Israel"/>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column md="2">Price:</Form.Label>
                        <Col md={4}>
                            <Form.Control type="number" required placeholder="Enter Product Price" value={updateProduct.Price} onChange={(e) => { setupdateProduct({ ...updateProduct, Price: e.target.value }) }} />
                            <Form.Control.Feedback type="invalid">
                                Please Enter Product Price!
                            </Form.Control.Feedback>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column md="3">Link:</Form.Label>
                        <Col md={9}>
                            <Form.Control required placeholder="Enter Product Link" value={updateProduct.Link} onChange={(e) => { setupdateProduct({ ...updateProduct, Link: e.target.value }) }} />
                            <Form.Control.Feedback type="invalid">
                                Please Enter Product Link!
                            </Form.Control.Feedback>
                        </Col>
                    </Form.Group>

                    <div style={{ paddingTop: "20px", textAlign: "right" }}>
                        <Button type="submit" variant="primary">
                            Save
                        </Button>
                    </div>
                </Form>
            </Container>
        </div>
    )
}
export default UpdateProductCom