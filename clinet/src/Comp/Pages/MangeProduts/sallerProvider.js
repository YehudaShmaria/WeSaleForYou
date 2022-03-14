import { useState } from "react"
import MangeProductCom from "./mainSaller";
import { sallerContext } from "./sallerContext"

const SallerMainCom = () =>
{
    const [saller, setSaller] = useState(null);
    return(
        <div>
            <sallerContext.Provider value={{saller,setSaller}}>
                <MangeProductCom/>
            </sallerContext.Provider>
        </div>
    )
}

export default SallerMainCom