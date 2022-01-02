import { useContext} from "react"
import { userContext } from "../../Auto/userContext"

const HomeCom = () =>
{
    const {user,setUser} = useContext(userContext);
    return(
        <div>
            <h1>We Sale For You</h1>
            {user ? user.Name : null}
        </div>
    )
}
export default HomeCom