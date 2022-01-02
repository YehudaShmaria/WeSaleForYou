import { userContext } from "../../Auto/userContext";
import { useContext, useState, useEffect } from "react";
import utils from "../../../utils";
import UserInfoCom from "./userInfo";
import { Link } from "react-router-dom";
import { Alert, Container, Button } from "react-bootstrap";

const DeleteUserCom = () =>
{
    const {user,setUser} = useContext(userContext);

    const deleteUser = async() =>
    {
        let res = await utils.DeleteItem("http://localhost:5000/user/",user._id);
        try{
            if(res.data.message == "User Deleted!")
            {
                setUser(null);
            }
        }catch(error){
            alert(error.response.data.message);
        }
    }
    return(
        <div>
            <Container>
                <div style={{marginTop:"30px", paddingBottom:"30px"}}>
                    <h2 style={{color:"yellowgreen",backgroundColor:"whitesmoke", fontSize:"35px", padding:"10px"}}>Delete User</h2>
                </div>
                {
                  user.Type == "Saller" ? <> 
                  <h5 style={{color:"green"}}>You must first delete your seller account</h5>
                  <Link to="/mangeproduct/saller/delete">Delete Your Saller Account</Link>
                  </>:<>
                    <Alert variant="info">
                        <h5>If you delete your account you will not be able to see a history of your purchases, you will not be able to correspond with sellers or track products, and we will not be able to monitor the recommended products for you !!</h5>
                    </Alert>            

                    <Alert variant="danger">
                        <h5>Are you sure you want to delete?</h5>
                    </Alert>      
                    <Button onClick={deleteUser}>Delete User</Button>
                  </>
              }
            </Container>
              {/* <UserInfoCom/> */}
             
        </div>
    )
}
export default DeleteUserCom