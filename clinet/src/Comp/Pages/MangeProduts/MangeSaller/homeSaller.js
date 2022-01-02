import { Col, Container, Row, Nav } from "react-bootstrap";
import {Route, Switch } from "react-router-dom";
import { useRouteMatch } from "react-router";
import { LinkContainer } from "react-router-bootstrap";
import SallerDeleteCom from "./sallerDelete";
import SallerInfromationCom from "./sallerInfromation";
import SallerUpdateCom from "./sallerUpdate";


const HomeSallerCom = (props) =>
{
    const {path,url} = useRouteMatch()
    return( 
        <div>
            <Container>
                <Row>
                    <Col md={2}>    
                        <Nav className="flex-column">
                            <LinkContainer to={`${url}`}>
                                <Nav.Link >Saller Information</Nav.Link>
                            </LinkContainer>

                            <LinkContainer to={`${url}/update`}>
                                <Nav.Link>Update Saller</Nav.Link>
                            </LinkContainer>

                            <LinkContainer to={`${url}/delete`}>
                                <Nav.Link>Delete Saller</Nav.Link>
                            </LinkContainer>
                        </Nav>
                    </Col>

                    <Col md={10}>
                        <Switch>
                            <Route exact path={`${path}/`}>
                                    <SallerInfromationCom/>
                                </Route>
                            <Route path={`${path}/update`}>
                                    <SallerUpdateCom/>
                            </Route>
                            <Route path={`${path}/delete`}>
                                    <SallerDeleteCom/>
                            </Route>
                        </Switch>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
export default HomeSallerCom