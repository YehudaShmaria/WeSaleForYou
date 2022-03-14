import { useEffect, useState } from "react"
import { Col, Container, Row } from "react-bootstrap"
import utils from "../../../utils"
import ProductOne from './product'
import { useParams } from 'react-router-dom'

const ALlProductsCom = () => {
    let { category } = useParams();
    const [products, setProducts] = useState([]);
    const [filterProducts, setFilterProducts] = useState([]);
    useEffect(async () => {
        try {
            let res = await utils.GetAllItems("http://localhost:5000/product");
            setProducts(res.data.Products);
        }
        catch (error) {
            alert(error.response.data.message);
        }
    }, [])

    // useEffect(() => {
    //     if (category != "all") {
    //         let p = products.filter(x => x.Category == category);
    //         console.log(p);
    //         setFilterProducts(p);
    //         console.log(p);
    //     }
    //     else {
    //         setFilterProducts(products);
    //     }
    // }, [category])

    return (
        <div>
            <Container>
                <div style={{ color: "green", textAlign: "left", marginBottom: "50px" }}>
                    <h1><cite>Welcome To All Products Page!</cite></h1>
                </div>
                <Row>
                    {
                        products.map((item, index) => {
                            return <>
                                {
                                    item.Category == category ? <>
                                        <Col md={3} sm={3} xs={12}>
                                            <ProductOne p={item} />
                                        </Col>
                                    </> : null
                                }
                            </>
                        })
                    }
                    {
                        products.map((item, index) => {
                            return <>
                                {
                                    category == "all" ? <>
                                        <Col md={3} sm={3} xs={12}>
                                            <ProductOne p={item} />
                                        </Col>
                                    </> : null
                                }
                            </>
                        })
                    }
                </Row>
            </Container>

        </div>
    )
}
export default ALlProductsCom