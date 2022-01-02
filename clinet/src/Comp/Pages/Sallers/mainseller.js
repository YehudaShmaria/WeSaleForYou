import { Container } from "react-bootstrap";
import {Route, useRouteMatch } from "react-router";
import {Switch} from 'react-router-dom'
import SallersCom from "./Sallers";
import SellerProductsCom from "./sellerProducts";


const MainSellerCom = () =>
{
    const {path, url} = useRouteMatch()
    return (
       
        <div>
            <Container>
                <Switch>
                    <Route exact path={`${path}/`}>
                        <SallersCom/>
                    </Route>
                    <Route path={`${path}/products/:id`}>
                        <SellerProductsCom/>
                    </Route>
                </Switch>
            </Container>
         
        </div>
    )
}
export default MainSellerCom