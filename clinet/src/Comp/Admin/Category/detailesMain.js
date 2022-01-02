import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom"
import utils from "../../../utils";

const DetailesMainCom = (props) =>
{
    const {id} = useParams();
    const [mainCategory, setMainCategory] = useState(null);
    const [allCategory, setAllCategory] = useState([]);
    const history = useHistory();

    useEffect(async()=>
    {
        try{
            let res = await utils.GetItem("http://localhost:5000/maincategory/",id);
            setMainCategory(res.data);
        }
        catch(error){
            alert(error.response.data.message);
        }
    },[])

    useEffect(async()=>
    {
        if(mainCategory)
        {
            try{
                let res = await utils.GetItem("http://localhost:5000/category/getallinmain/",mainCategory.Name);
                setAllCategory(res.data);
            }
            catch(error){
                alert(error.response.data.message);
            }
        }
    },[mainCategory])
    return(
        <div>
            <h1>{mainCategory?.Name} Detailes</h1>
            {
                allCategory.length === 0 ? <>
                    <h1>There no Category in the Main Category!!</h1>
                </>:<>
                {
                     allCategory.map((item,index)=>
                     {
                         return<>
                             <h3>Name: {item.Name}, number of products: {item.Products.length}</h3>
                         </>
                     })   
                }
                </>
            }
            <Button onClick={()=>{history.push("/admin/homecategory/maincategory")}}>Go Back To All Category</Button>

        </div>
    )
}
export default DetailesMainCom