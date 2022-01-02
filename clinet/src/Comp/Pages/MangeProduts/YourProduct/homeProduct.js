import { Col, Container, Row, Nav } from "react-bootstrap";
import {Route, Switch } from "react-router-dom";
import { useRouteMatch } from "react-router";
import { LinkContainer } from "react-router-bootstrap";
import CreateProductCom from "./Product/createProduct";
import ProductsCom from "./products";
import BestCroductsCom from "./bestProducts";
import { useEffect } from "react";

const HomeProductCom = () =>
{
    const {path,url} = useRouteMatch();
    
    return(
        <div>
           <Container>
                <Row>
                    <Col md={2}>    
                        <Nav className="flex-column">
                            <LinkContainer to={`${url}`}>
                                <Nav.Link>Products </Nav.Link>
                            </LinkContainer>

                            <LinkContainer  to={`${url}/create`}>
                                <Nav.Link>Create Product</Nav.Link>
                            </LinkContainer>

                            <LinkContainer  to={`${url}/bestproduct`}>
                                <Nav.Link>Best Products</Nav.Link>
                            </LinkContainer>
                        </Nav>
                    </Col>

                    <Col md={10}>
                        <Switch>
                      
                            <Route exact path={`${path}`}>
                                   <ProductsCom/>
                            </Route>
                            <Route path={`${path}/create`}>
                                   <CreateProductCom/>
                            </Route>

                            <Route path={`${path}/bestproduct`}>
                                   <BestCroductsCom/>
                            </Route>

                      
                        </Switch>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
export default HomeProductCom