import { useContext, useEffect,useState } from "react"
import { Col, Container, Modal, Row, Button } from "react-bootstrap";
import utils from "../../../utils";
import SellerCom from "./seller";
import { userContext } from "../../Auto/userContext"


const SallersCom = () =>
{
    const [sallers, setSallers] = useState([]);
    const {user, setUser} = useContext(userContext);
    const [show, setShow] = useState(false);
    const [newMessage, setNewMessage] = useState("");
    const [reciverId, setReciverId] = useState("");
    const [conversation, setConversation] = useState(null);
    const [members,setMembers] = useState([])

    useEffect(async()=>
    {
        try{
            let res = await utils.GetAllItems("http://localhost:5000/saller");
            setSallers(res.data);
        }
        catch(error){
            alert(error.response.data.message);
        }
    },[])

    useEffect(()=>
    {
        if(user)
        {
            setMembers([user._id,reciverId]);
        }
    },[reciverId,user])


    useEffect(()=>
    {
        sendMessage();
    },[conversation])

    const handleSubmit = async() =>
    {
        if(newMessage !== "")
        {
            try{
                let res = await utils.CreateItem("http://localhost:5000/conversation/getconversation",members);
                if(res.data.Conversation)
                {
                    setConversation(res.data.Conversation);
                }
                else
                    createConversation();
            }
            catch(error){
                alert(error.response.data.message)
            }
        }
        else
        {
            alert("You Need To write!")
        }
       
    }

    const createConversation = async()=>
    {
       try{
           let res = await utils.CreateItem("http://localhost:5000/conversation",members);
           if(res.data.message === "Conversation Created!")
           {
               setConversation(res.data.Conversation);
           }
       }
        catch(error){
            alert(error.response.data.message)
        }
    }

    const sendMessage = async() =>
    {
        if(user && conversation)
        {
            const message = {
                SenderId: user._id,
                Text: newMessage,
            }
            try{
                let res = await utils.CreateItem("http://localhost:5000/message/"+conversation._id,message);
                setNewMessage("");
                console.log(res.data);
            }
            catch(error){
                alert(error.response.data.message)
            }
        }
    }

    return(<div>
        <Container>
                <div style={{color:"green",textAlign:"left",marginBottom:"50px"}}>
                    <h1><cite>Welcome To Sellers Page!</cite></h1>
                </div>
                <Row>
                    {
                        sallers.map((item,index)=>
                        {
                            return<>
                            {
                                <>
                                    <>
                                    <Col sm={4} md={4} xs={12}>
                                        <SellerCom s={item} notMe ={item.userId !== user?._id} setShow = {s => setShow(s)} setReciver = {r => {setReciverId(r)}}></SellerCom>
                                    </Col>
                                </>
                                </>
                            }
                        </>
                        })
                    }
                </Row>
                <Modal show={show} onHide={() => setShow(false)}>
                    <Modal.Header closeButton>
                    <Modal.Title>Send Message To Seller</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="chatBoxBottom">
                            <textarea value={newMessage} onChange={(e)=>{setNewMessage(e.target.value)}} className="chatMessageInput" placeholder="Writh Something!">

                            </textarea>
                            <button onClick={handleSubmit} className="chatSubmitButton">Send</button>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>
                        Close
                    </Button>
                    </Modal.Footer>
                </Modal>
        </Container>
       
    </div>)
}

export default SallersCom