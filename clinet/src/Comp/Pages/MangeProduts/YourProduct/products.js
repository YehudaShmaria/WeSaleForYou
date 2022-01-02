import { useContext, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Link} from "react-router-dom";
import utils from "../../../../utils";
import { sallerContext } from "../sallerContext";
import ProductCom from "./Product/product";


const ProductsCom = () =>
{
    const [products, setProducts] = useState([]);
    const {saller, setSaller} = useContext(sallerContext);
    
    useEffect(async()=>
    {
        if(saller)
        {   
            try{
                let res = await utils.GetItem("http://localhost:5000/product/saller/",saller._id);
                setProducts(res.data.Products);
            }
            catch(error){
                alert(error.response.data.message);
            }
        }
    },[saller])
   
    return(
        <div>
            <Row>
                {
                    products.length === 0 ? <h5>You don't Have Products You need To <Link to="/mangeproduct/yourproduct/create">Create</Link> </h5>:
                    saller ?
                    products.map((item,index)=>
                    {
                        return<><Col sm={5} md={5}>
                                <ProductCom p = {item}/>
                            </Col>
                        </>
                    }):null
                }
            </Row>

        </div>
    )
}
export default ProductsCom