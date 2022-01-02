import { useContext, useEffect, useRef, useState } from 'react'
import ChatOnlineCom from './ChatOnline/chatOnline'
import ConversationCom from './Conversation/conversation'
import MessageCom from './Message/message'
import './messenger.css'
import { userContext } from "../../Auto/userContext"
import utils from '../../../utils'

const MessengerCom = () =>
{
    const {user,setUser} = useContext(userContext);
    const [conversation, setConversation] = useState([]);
    const [curentChat, setCurentChat] = useState(null);
    const [messages, setMessages] = useState([])
    const [newMessage, setNesMessage] = useState("");
    const scrollRef = useRef()

    useEffect(async()=>
    {
        try{
            let res = await utils.GetItem("http://localhost:5000/conversation/",user._id);
            let newConversation = res.data;
            setConversation(newConversation);
            setCurentChat(newConversation[0]);
        }
        catch(error){
            alert(error.response.data.message)
        }
    },[user])

    useEffect(async()=>
    {
        try{
            if(curentChat)
            {
                setMessages(curentChat.Messages);
            }
        }
        catch(error){
            alert(error.response.data.message)
        }
    },[curentChat])

    useEffect(()=>
    {
        scrollRef.current?.scrollIntoView({behavior:"smooth"})
    },[messages])

    const handleSubmit = async(e) =>
    {
        e.preventDefault();
        const message = {
            SenderId: user._id,
            Text: newMessage,
        }
        try{
            let res = await utils.CreateItem("http://localhost:5000/message/"+curentChat._id,message);
            setMessages([...messages,res.data.Message]);
            setNesMessage("");
        }
        catch(error){
            alert(error.response.data.message)
        }
    }

    const deleteMessage = async(id) =>
    {
        try{
            let res = await utils.DeleteItem("http://localhost:5000/message/"+curentChat._id+"/",id);
            setCurentChat(res.data.Conversation);
        }
        catch(error){
            alert(error.response.data.message)
        }
    }



    return(
        <div style={{textAlign:"left"}}>
            <div className="messenger">
                <div className="chatMenu">
                    <div className="chatMenuWrapper">
                       <input placeholder="Search For Friends" className="chatMenuInput"/>
                      {
                          conversation.map((item,index)=>
                          {
                              return <>
                              <div onClick={()=>setCurentChat(item)}>
                                 <ConversationCom c = {item}/>
                              </div>
                              </>
                          })
                      }
                    </div>
                </div>
                <div className="chatBox">
                     <div className="chatboxWrapper">
                         {
                             curentChat ? <>
                                <div className="chatBoxTop">
                                {
                                    messages.map((item,index)=>
                                    {
                                        return <>
                                        <div ref={scrollRef }>
                                            <MessageCom m = {item} own = {item.SenderId === user._id} notUserId = {curentChat.Members.find(m=> m !== user._id)} delete = {id => deleteMessage(id)}/>
                                        </div> 
                                        </>
                                    })
                                }
                            </div>
                            <div className="chatBoxBottom">
                                <textarea value={newMessage} onChange={(e)=>{setNesMessage(e.target.value)}} className="chatMessageInput" placeholder="Writh Something!">

                                </textarea>
                                <button onClick={handleSubmit} className="chatSubmitButton">Send</button>
                            </div>
                             </>:<span className="noConversationText">Open A conversation To Start A Chat!</span>
                         }
                     
                     </div>
                </div>
                <div className="chatOnline">
                     <div className="onlineWrapper">
                        <ChatOnlineCom/>
                     </div>
                </div>
            </div>
        </div>
    )
}
export default MessengerCom