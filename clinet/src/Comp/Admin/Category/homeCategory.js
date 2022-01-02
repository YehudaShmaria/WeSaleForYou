import { useRouteMatch } from "react-router-dom";
import { Route, Switch } from "react-router-dom"
import CreateMainCategoryCom from "./createMainCategory";
import DetailesMainCom from "./detailesMain";
import EditMainCom from "./editMain";
import MainCategoryCom from "./mainCategory"

const HomeCategorycom = () =>
{
    const {path, url} = useRouteMatch();

    return(
        <div>
            <Switch>
                <Route path={`${path}/maincategory`}>
                    <MainCategoryCom/>
                </Route>
                <Route path={`${path}/create`}>
                    <CreateMainCategoryCom/>
                </Route>
                <Route path={`${path}/detailes/:id`}>
                    <DetailesMainCom/>
                </Route>
                <Route path={`${path}/edit/:id`}>
                    <EditMainCom/>
                </Route>
            </Switch>
        </div>
    )
}
export default HomeCategorycom