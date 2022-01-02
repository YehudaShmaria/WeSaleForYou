import { useContext, useEffect, useState } from 'react'
import utils from '../../../../utils';
import { userContext } from '../../../Auto/userContext'
import './conversation.css'
const ConversationCom = (props) =>
{
    const {user, setUser} = useContext(userContext);
    const [frindId, setFrindId] = useState(null); 
    const [frind, setFrind] = useState(null);
    useEffect(()=>
    {
        if(user)
        {
            const id = props.c.Members.find((m)=> m !== user._id);
            setFrindId(id);
        }
    },[user])

    useEffect(async()=>
    {
        if(frindId)
        {
            try{
                let res = await  utils.GetItem("http://localhost:5000/user/",frindId);
                setFrind(res.data);
            }
            catch(error){
                alert(error.response.data.message);
            }
        }
    },[frindId])
    return (
        <div className="conversation">
            {
                frind ? <>
                   <img className="conversationImg" src={frind.Image === "" ? "/Images/defaultProfileImages1.jpg" :"http://localhost:5000/"+frind.Image} alt=""/>
                   <span className="conversationName">{frind.Name}</span>
                </>:null
            }
         
        </div>
    )
}
export default ConversationCom