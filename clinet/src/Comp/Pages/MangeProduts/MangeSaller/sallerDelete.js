import { useContext } from "react";
import { Alert, Container, Button } from "react-bootstrap";
import { useHistory } from "react-router";
import utils from "../../../../utils";
import { userContext } from "../../../Auto/userContext";
import { sallerContext } from "../sallerContext";

const SallerDeleteCom = () =>
{
    const history = useHistory();
    const {user,setUser} = useContext(userContext);
    const {saller,setSaller} = useContext(sallerContext)
    
    const deleteSaller = async() =>
    {
        try{
            let resSeller = await utils.DeleteItem("http://localhost:5000/saller/",saller._id);
            if(resSeller.data.Seller)
            {
                deleteSellerProducts();
            }       
        }
        catch(error){
            alert(error.response.data.message);
        }

    }
    const deleteSellerProducts = async() =>
    {
        try{
            let resSellerProducts = await utils.DeleteItem("http://localhost:5000/product/saller/",saller._id);
            if(resSellerProducts.data.message === "Deleted All Items!")
            {
                setUser({...user,Type:"User"});
                history.push('/');

            }
        }
        catch(error){
           alert(error.response.data.message);
        }
    }
    return(
        <div>
             <Container>
                <div>
                    <h3 style={{color:"yellowgreen",backgroundColor:"whitesmoke",padding:"10px"}}>Delete Seller</h3>
                </div>
                <Alert variant="danger">
                        <h5>If you delete your account you will not be able to see a history of your purchases, you will not be able to correspond with sellers or track products, and we will not be able to monitor the recommended products for you !!</h5>
                    </Alert>            

                    <Alert variant="info">
                        <h5>Are you sure you want to delete?<Button variant="danger" style={{marginLeft:"20px"}} onClick={deleteSaller}>Delete Seller</Button></h5>
                    </Alert>      
            </Container>
        </div>
    )
}
export default SallerDeleteCom