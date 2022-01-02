import { useEffect, useState } from "react"
import { Col, Container, Row } from "react-bootstrap"
import utils from "../../../utils"
import ProductOne from './product'

const ALlProductsCom = () =>
{
    const [products,setProducts] = useState([])
    useEffect(async()=>
    { 
        try{
            let res = await utils.GetAllItems("http://localhost:5000/product");
            setProducts(res.data.Products);
        }
        catch(error)
        {
            alert(error.response.data.message);
        }
    },[])
    return(
        <div>
            <Container>
                    <div style={{color:"green",textAlign:"left",marginBottom:"50px"}}>
                        <h1><cite>Welcome To All Products Page!</cite></h1>
                    </div>
                <Row>
                    {
                        products.map((item,index)=>
                        {
                            return <>
                            <Col md={3} sm={3} xs={12}>
                                <ProductOne p={item}/>
                            </Col>
                            </>
                        })
                    }
                </Row>
            </Container>
           
        </div>
    )
}
export default ALlProductsCom