import { useEffect, useState } from "react"
import { Container, Card, ListGroup, ListGroupItem, Row, Col } from "react-bootstrap";
import { useParams } from "react-router";
import utils from "../../../utils";
import SellerProductCom from "./sellerProduct";

const SellerProductsCom = () => {
    const { id } = useParams()
    const [products, setProducts] = useState([]);
    useEffect(async () => {
        try {
            let res = await utils.GetItem("http://localhost:5000/product/saller/", id);
            setProducts(res.data.Products);
        }
        catch (error) {
            alert(error.response.data.message)
        }
    }, [])
    return (
        <div>
            <Container>
                <Row>
                    {
                        products.length !== 0 ? <>
                            {
                                products.map((item, index) => {
                                    return <>
                                        <Col md={3} sm={3} xs={12}>
                                            <SellerProductCom p={item} />
                                        </Col>

                                    </>
                                })
                            }
                        </> : <>
                            <h1>The seller does not currently have any products to show you will come back later maybe there will be something to see</h1>
                        </>
                    }
                </Row>

            </Container>
        </div>
    )
}
export default SellerProductsCom