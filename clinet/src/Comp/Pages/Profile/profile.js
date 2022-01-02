import { useContext, useState} from "react"
import { Container, Row, Col, Image, Modal, Button } from "react-bootstrap";
import { Route, Switch, useRouteMatch } from "react-router";
import utils from "../../../utils";
import { userContext } from "../../Auto/userContext"
import DeleteUserCom from "./deleteUser";
import NavProfileCom from "./NavProfile";
import UpdateUserCom from "./updateUser";
import UserInfoCom from "./userInfo";

const ProfileCom = () =>
{
    const {user,setUser} = useContext(userContext);
    const {path, url} = useRouteMatch();
    const [profileImage, setProfileImage] = useState(null);
    const [showEdiImage, setShowEditImage] = useState(false)

    const deleteProfileImage = async() =>
    {
        try{
            let res = await utils.GetItem("http://localhost:5000/user/deleteimage/",user._id);
            setUser({...user,Image:""});
            setProfileImage(null);
            setShowEditImage(false);
        }
        catch(error)
        {
            alert(error.response.data.message)
        }
    }

    const updateProfileImage = async() =>
    {
        let bodyFormData = new FormData();
        bodyFormData.append("ProfileImage",profileImage, profileImage.name);
        try{
            let res = await utils.CreateItem(`http://localhost:5000/user/updateimage/${user._id}`,bodyFormData)
            setUser({...user,Image:res.data.newImage})
            setProfileImage(null);
            setShowEditImage(false);
        }
        catch(error)
        {
            alert(error.response.data.message);
        }
    }

    return(
        <div>
            <Container>
                <Row>
                    <Col md={6}>
                    <div style={{color:"green",textAlign:"left"}}>
                        <h1><cite>Welcome To Profile Page!</cite></h1>
                        {
                            user.Image !="" ? <Image style={{height:"100px"}} roundedCircle src={"http://localhost:5000/"+user.Image}></Image>:
                            <>
                                <Image style={{height:"100px"}} roundedCircle src={"/Images/defaultProfileImages1.jpg"}></Image>
                            </>
                        }
                        <h4 style={{textAlign:"right", color:"black", marginLeft:"10px", display:"inline"}}>{user.Name}</h4>
                        <br/>
                        <a onClick={()=>{setShowEditImage(true)}}>Edit Profile Image:</a>
                       
                    </div>

                    <Modal show={showEdiImage} onHide={()=>{setShowEditImage(false);setProfileImage(null)}}>
                        <Modal.Header closeButton>
                        <Modal.Title>Profile Image</Modal.Title>
                        </Modal.Header>
                            <Modal.Body> 
                                <label>Edit Profile Image: </label>
                                <input style={{marginLeft:"10px"}} type="file" accept="image/*" onChange={(e)=>{setProfileImage(e.target.files[0])}} />
                            </Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={()=>{setShowEditImage(false);setProfileImage(null)}}>
                            Close
                        </Button>
                        {
                             profileImage ? <Button variant="secondary" onClick={updateProfileImage}>
                             Save
                            </Button>:null
                        }
                        {
                            user.Image !="" ? <Button variant="secondary" onClick={deleteProfileImage}>
                             Delete Image
                            </Button>:null
                        }
                        
                        </Modal.Footer>
                    </Modal>
                     <NavProfileCom type={user.Type}/>
                    </Col>
                    <Col md={6}>
                        <Switch>
                            <Route exact path={`${path}`}>
                                <UserInfoCom/>
                            </Route>
                            <Route path={`${path}/update`}>
                                <UpdateUserCom/>
                            </Route>
                            <Route path={`${path}/delete`}>
                                <DeleteUserCom/>
                            </Route>
                        </Switch>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
export default ProfileCom