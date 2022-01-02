import { useContext, useEffect, useState } from "react"
import { Container, Form,Col, Row, Button } from "react-bootstrap";
import { useHistory } from "react-router";
import utils from "../../../../../../utils";
import { sallerContext } from "../../../sallerContext"

const UpdateProductCom = (props) =>
{
    const {saller, setSaller} = useContext(sallerContext);
    const [category, setCategory] = useState(null);
    const [updateProduct, setupdateProduct] = useState({});
    const [validated, setValidated] = useState(false);
    const history = useHistory();

    useEffect(()=>
    {   
        if(saller)
        {
            setupdateProduct(props.p);
            console.log(updateProduct);
        }
    },[saller])

    useEffect(async()=>
    {
        let res =  await utils.GetAllItems("http://localhost:5000/category");
        setCategory(res.data);    
    },[])


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
            sendProduct();
        }

        setValidated(true);
      };

    const sendProduct = async() =>
    {
        
        try{ 
            let res = await utils.UpdateItem("http://localhost:5000/product/",updateProduct._id,updateProduct);
            let newProduct = res.data.newProduct;
            props.updateProduct(newProduct);
            history.push('/mangeproduct/yourproduct');
        }
        catch(error)
        {
            alert(error.response.data.message);
        }
    }

    return(
        <div>
            <Container>
                <div>
                    <h3 style={{color:"yellowgreen",backgroundColor:"whitesmoke",padding:"10px"}}>Upadte Product</h3>
                </div>
                <Form  style={{textAlign:"left"}} noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column md="3">Product Name:</Form.Label>
                            <Col md={9}>
                                <Form.Control required placeholder="Enter Product Name" value={updateProduct.Name} onChange={(e)=>{setupdateProduct({...updateProduct,Name:e.target.value})}}/>
                                 <Form.Control.Feedback type="invalid">
                                      Please Enter Product Name!
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column md="3">Descrption:</Form.Label>
                            <Col md={9}>
                                <Form.Control as="textarea" required placeholder="Enter Product Descrption" value={updateProduct.Descrption} onChange={(e)=>{setupdateProduct({...updateProduct,Descrption:e.target.value})}}/>
                                 <Form.Control.Feedback type="invalid">
                                      Please Enter Descrption!
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column md="2">Price:</Form.Label>
                            <Col md={4}>
                                <Form.Control type="number" required placeholder="Enter Product Price" value={updateProduct.Price} onChange={(e)=>{setupdateProduct({...updateProduct,Price:e.target.value})}}/>
                                 <Form.Control.Feedback type="invalid">
                                      Please Enter Product Price!
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <Form.Group>
                            <Row>
                                <Col md={6}>
                                    <Form.Label>Type: {updateProduct.Type}</Form.Label>
                                    <Form.Select onChange={(e)=>{setupdateProduct({...updateProduct,Type:e.target.value})}}>
                                        <option value="Yad2">Yad 2</option>
                                        <option value="SRS">SRS</option>
                                        <option value="New">New Product</option>
                                    </Form.Select>
                                </Col>
                                <Col md={6}>
                                <Form.Label>Category: {updateProduct.Category}</Form.Label>
                                        {
                                            category ? <><Form.Select onChange={(e)=>{setupdateProduct({...updateProduct,Category:e.target.value})}}>
                                            {
                                                category.map((item,index)=>
                                                {
                                                    return<>
                                                    {
                                                      item !== updateProduct.Category ? 
                                                     <option key={index} value={item.Name}>{item.Name}</option>:null
                                                    } 
                                                    </> 
                                                })
                                            }
                                            </Form.Select></>:null
                                        }
                                </Col>
                            </Row>
                        </Form.Group>

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
export default UpdateProductCom