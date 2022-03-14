import { useContext, useEffect, useState } from "react"
import { Container, Form, Col, Row, Button } from "react-bootstrap";
import { useHistory } from "react-router";
import utils from "../../../../../utils";
import { sallerContext } from "../../sallerContext"

const CreateProductCom = () => {
    const { saller, setSaller } = useContext(sallerContext);
    const [newProduct, setNewProduct] = useState({ Category: "", Modal: "", Descrption: "", Available: true, sallerId: "", Price: 0, Link: "", PepoleLikede: [] });
    const [validated, setValidated] = useState(false);
    const [images, setImages] = useState([]);
    const history = useHistory();

    useEffect(() => {
        if (saller) {
            setNewProduct({ ...newProduct, sallerId: saller._id });
            console.log(newProduct.sallerId);
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
            createProduct();
        }

        setValidated(true);
    };

    const createProduct = async () => {

        try {
            let res = await utils.CreateItem("http://localhost:5000/product", fixTheData());
            setSaller(res.data.Saller);
            history.push('/mangeproduct/yourproduct');
        }
        catch (error) {
            alert(error.response.data.message);
        }
    }

    const fixTheData = () => {
        let bodyFormData = new FormData();
        bodyFormData.append("Category", newProduct.Category);
        bodyFormData.append("Modal", newProduct.Modal);
        bodyFormData.append("Descrption", newProduct.Descrption);
        bodyFormData.append("Available", newProduct.Available);
        bodyFormData.append("sallerId", newProduct.sallerId);
        bodyFormData.append("Price", newProduct.Price);
        for (const key of Object.keys(images)) {
            console.log(key);
            bodyFormData.append('ProductImage', images[key], images[key].name)
        }
        bodyFormData.append("Link", newProduct.Link);
        bodyFormData.append("PepoleLikede", newProduct.PepoleLikede);
        return bodyFormData;
    }

    const insertCategory = (e) => {
        if (e.target.value !== "") {
            setNewProduct({ ...newProduct, Category: e.target.value })
        }
    }

    return (
        <div>
            <Container>
                <div>
                    <h3 style={{ color: "yellowgreen", backgroundColor: "whitesmoke", padding: "10px" }}>Create Product</h3>
                </div>
                <Form style={{ textAlign: "left" }} noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column md="3">Select Category:</Form.Label>
                        <Col md={9}>
                            <Form.Select onChange={(e) => { setNewProduct({ ...newProduct, Category: e.target.value }) }}>
                                <option value="LapTop">LapTop</option>
                                <option value="SmartPhone">SmartPhone</option>
                                <option value="HeadPhones">HeadPhones</option>
                                <option value="SmartWatch">SmartWatch</option>
                            </Form.Select>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column md="3">Modal:</Form.Label>
                        <Col md={9}>
                            <Form.Control required placeholder="Enter Modal" onChange={(e) => { setNewProduct({ ...newProduct, Modal: e.target.value }) }} />
                            <Form.Control.Feedback type="invalid">
                                Please Enter Modal!
                            </Form.Control.Feedback>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column md="3">Descrption:</Form.Label>
                        <Col md={9}>
                            <Form.Control as="textarea" required placeholder="Enter Product Descrption" onChange={(e) => { setNewProduct({ ...newProduct, Descrption: e.target.value }) }} />
                            <Form.Control.Feedback type="invalid">
                                Please Enter Descrption!
                            </Form.Control.Feedback>
                        </Col>
                    </Form.Group>

                    <Form.Check style={{ paddingBottom: '10px' }} type="switch" label="Available In Israel" onChange={() => { setNewProduct({ ...newProduct, Available: !newProduct.Available }) }} />

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column md="2">Price:</Form.Label>
                        <Col md={4}>
                            <Form.Control type="number" required placeholder="Enter Product Price" onChange={(e) => { setNewProduct({ ...newProduct, Price: e.target.value }) }} />
                            <Form.Control.Feedback type="invalid">
                                Please Enter Product Price!
                            </Form.Control.Feedback>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column md="4">Select Product images:</Form.Label>
                        <Col md={8}>
                            <Form.Control required accept="image/*" type="file" multiple onChange={(e) => { setImages(e.target.files) }} />
                            <Form.Control.Feedback type="invalid">
                                Please Enter Product Images!
                            </Form.Control.Feedback>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column md="3">Link:</Form.Label>
                        <Col md={9}>
                            <Form.Control required placeholder="Enter Product Link" onChange={(e) => { setNewProduct({ ...newProduct, Link: e.target.value }) }} />
                            <Form.Control.Feedback type="invalid">
                                Please Enter Product Link!
                            </Form.Control.Feedback>
                        </Col>
                    </Form.Group>

                    <div style={{ paddingTop: "20px", textAlign: "right" }}>
                        <Button type="submit" variant="primary">
                            Submit
                        </Button>
                    </div>
                </Form>
            </Container>
        </div>
    )
}
export default CreateProductCom