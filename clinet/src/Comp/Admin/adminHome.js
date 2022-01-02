import { useRouteMatch } from "react-router-dom"
import { Route, Switch } from "react-router-dom"
import HomeCategorycom from "./Category/homeCategory";
import MainCategoryCom from "./Category/mainCategory";

const AdminHomeCom = () =>
{
    const {path, url} = useRouteMatch();
    return(
        <div>
            <h1>Admin Home</h1>
            <Switch>
                <Route path={`${path}/homecategory`}>
                    <HomeCategorycom/>
                </Route>
                <Route path={`${path}/allcategory`}>

                </Route>
            </Switch>
        </div>
    )
}
export default AdminHomeCom