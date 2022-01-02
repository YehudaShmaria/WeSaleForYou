import { useEffect,useState,useContext } from "react";
import utils from "../../../utils";
import { userContext } from "../../Auto/userContext";
import { Container, Nav, Image, Row, Col } from "react-bootstrap";
import { Route, Switch, useRouteMatch } from "react-router";
import HomeSallerCom from "./MangeSaller/homeSaller";
import { LinkContainer } from "react-router-bootstrap";
import BeBeeterHomeCom from "./BeBetter/beBeeterHome";
import HomeProductCom from "./YourProduct/homeProduct";
import {sallerContext} from "./sallerContext";


const MangeProductCom = () =>
{
    const {user,setUser} = useContext(userContext);
    const {path,url} = useRouteMatch();
    const {saller,setSaller} = useContext(sallerContext);

    useEffect(async()=>
    {
        if(user && user.Type === "Saller")
        {
            if(!saller)
            {
                try{
                    let res = await utils.GetItem("http://localhost:5000/saller/userid/",user._id);
                    setSaller(res.data);
                }
                catch(error)
                {
                    alert(error.response.data.message);
                }
            }
        }
     },[user,saller])
    return(
        <div>
            <Container>
                <div style={{color:"green",textAlign:"left", marginBottom:"20px"}}>
                        <h1><cite>Mange Saller Account</cite></h1>
                        {
                            user.Image !="" ? <Image style={{height:"80px"}} roundedCircle src={"http://localhost:5000/"+user.Image}></Image>:
                            <>
                                <Image style={{height:"100px"}} roundedCircle src={"/Images/defaultProfileImages1.jpg"}></Image>
                            </>
                        }
                        <h4 style={{textAlign:"right", color:"black", marginLeft:"10px", display:"inline"}}>{saller ? saller.Name:null}</h4>
                </div>
                <Row>
                    <Col sm={2} md={2} xs={12}>
                        {
                            saller ? <>
                            <p>Num Of Products: {saller.Products.length}</p>
                            <p>Num Of Followers: {saller.Followers.length}</p>
                            </>:null
                        }
                        
                    </Col> 
                    <Col sm={10} md={10} xs={12}>
                        <Nav variant="tabs">
                            <Nav.Item>
                                <LinkContainer to={`${url}/saller`}>
                                    <Nav.Link>Mange Your Saller Account</Nav.Link>
                                </LinkContainer>
                            </Nav.Item>

                            <Nav.Item>
                            <LinkContainer to={`${url}/yourproduct`}>
                                <Nav.Link>Mange Your Products</Nav.Link>
                                </LinkContainer>
                            </Nav.Item>

                            <Nav.Item>
                            <LinkContainer to={`${url}/bebetter`}>
                                <Nav.Link>How To Be Better</Nav.Link>
                                </LinkContainer>
                            </Nav.Item>
                        </Nav>

                    <Switch>
                        <Route path={`${path}/saller`}> 
                            <HomeSallerCom/>
                        </Route>
                        <Route path={`${path}/yourproduct`}> 
                            <HomeProductCom/>
                        </Route>
                        <Route  path={`${path}/bebetter`}> 
                            <BeBeeterHomeCom/>
                        </Route>
                    </Switch>
                    </Col>   
                </Row>
               
            </Container>

           
            
        </div>
    )
}
export default MangeProductCom