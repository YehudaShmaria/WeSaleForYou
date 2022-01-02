import { useContext, useEffect, useState } from "react"
import { Container, Form,Col, Row, Button } from "react-bootstrap";
import { useHistory } from "react-router";
import utils from "../../../../../utils";
import { sallerContext } from "../../sallerContext"

const CreateProductCom = () =>
{
    const {saller, setSaller} = useContext(sallerContext);
    const [category, setCategory] = useState(null);
    const [newProduct, setNewProduct] = useState({Name:"",Descrption:"",Category:"",sallerId:"",Price:0,Type:"New"});
    const [validated, setValidated] = useState(false);
    const [images, setImages] = useState([]);
    const history = useHistory();

    useEffect(()=>
    {   
        if(saller)
        {
            setNewProduct({...newProduct,sallerId:saller._id});
            console.log(newProduct.sallerId);
        }
    },[saller])

    useEffect(async()=>
    {
        let res =  await utils.GetAllItems("http://localhost:5000/category");
        setCategory(res.data);     
    },[])

    useEffect(()=>
    {
        if(category)
        {
            setNewProduct({...newProduct,Category:category[0].Name})
        }
    },[category])

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
            createProduct();
        }

        setValidated(true);
      };

    const createProduct = async() =>
    {
        
        try{
         
        let res = await utils.CreateItem("http://localhost:5000/product",fixTheData());
        setSaller(res.data.Saller);
        history.push('/mangeproduct/yourproduct');
        }
        catch(error)
        {
            alert(error.response.data.message);
        }
    }

    const fixTheData = () =>
    {
        let bodyFormData = new FormData();
        for (const key of Object.keys(images)) {
            console.log(key);
            bodyFormData.append('ProductImage', images[key],images[key].name)
        }
        bodyFormData.append("Name",newProduct.Name);
        bodyFormData.append("Descrption",newProduct.Descrption);
        bodyFormData.append("Price",newProduct.Price);
        bodyFormData.append("Category",newProduct.Category);
        bodyFormData.append("Type",newProduct.Type);
        bodyFormData.append("sallerId",newProduct.sallerId);
        return bodyFormData;
    }

    return(
        <div>
            <Container>
                <div>
                    <h3 style={{color:"yellowgreen",backgroundColor:"whitesmoke",padding:"10px"}}>Create Product</h3>
                </div>
                <Form  style={{textAlign:"left"}} noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column md="3">Product Name:</Form.Label>
                            <Col md={9}>
                                <Form.Control required placeholder="Enter Product Name" onChange={(e)=>{setNewProduct({...newProduct,Name:e.target.value})}}/>
                                 <Form.Control.Feedback type="invalid">
                                      Please Enter Product Name!
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column md="3">Descrption:</Form.Label>
                            <Col md={9}>
                                <Form.Control as="textarea" required placeholder="Enter Product Descrption" onChange={(e)=>{setNewProduct({...newProduct,Descrption:e.target.value})}}/>
                                 <Form.Control.Feedback type="invalid">
                                      Please Enter Descrption!
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column md="2">Price:</Form.Label>
                            <Col md={4}>
                                <Form.Control type="number" required placeholder="Enter Product Price" onChange={(e)=>{setNewProduct({...newProduct,Price:e.target.value})}}/>
                                 <Form.Control.Feedback type="invalid">
                                      Please Enter Product Price!
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column md="4">Select Product images:</Form.Label>
                            <Col md={8}>
                             <Form.Control required accept="image/*" type="file" multiple onChange={(e)=>{setImages(e.target.files)}}/>
                             <Form.Control.Feedback type="invalid">
                                      Please Enter Product Images!
                                </Form.Control.Feedback>
                            </Col>
                           
                        </Form.Group>

                        <Form.Group>
                            <Row>
                                <Col md={6}>
                                    <Form.Label>Type:</Form.Label>
                                    <Form.Select onChange={(e)=>{setNewProduct({...newProduct,Type:e.target.value})}}>
                                        <option value="Yad2">Yad 2</option>
                                        <option value="SRS">SRS</option>
                                        <option value="New">New Product</option>
                                    </Form.Select>
                                </Col>
                                <Col md={6}>
                                <Form.Label>Category:</Form.Label>
                                        {
                                            category ? <><Form.Select onChange={(e)=>{setNewProduct({...newProduct,Category:e.target.value})}}>
                                            {
                                                category.map((item,index)=>
                                                {
                                                    return <option key={index} value={item.Name}>{item.Name}</option>
                                                })
                                            }
                                            </Form.Select></>:null
                                        }
                                </Col>
                            </Row>
                        </Form.Group>

                        <div style={{paddingTop:"20px", textAlign:"right"}}>
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