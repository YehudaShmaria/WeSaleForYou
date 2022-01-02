import { useContext, useEffect, useState } from 'react'
import utils from '../../../../utils';
import { userContext } from '../../../Auto/userContext'
import './message.css'
import ReactTimeAgo from 'react-time-ago'


const MessageCom = (props) =>
{
    const {user, setUser} = useContext(userContext);
    const [image,setImage] = useState("/Images/defaultProfileImages1.jpg");
    useEffect(async()=>
    {
        if(props.own && user)
        {
            if(user.Image !== "")
                setImage("http://localhost:5000/"+user.Image);
        }
        else
        {
            try{
                let res = await utils.GetItem("http://localhost:5000/user/",props.notUserId);
                if(res.data.Image !== "");
                    setImage("http://localhost:5000/"+res.data.Image);
            }
            catch(error){
                alert(error.response.data.message)
            }
        }
    },[user])

    return(
        <div className={props.own ? "message own" : "message"}>
            <div className="messageTop">
                {
                    props.own ? <>
                        <span onClick={()=>{props.delete(props.m._id)}}>Delete</span>
                    </>:null
                }
                <img className="messageImg" src={image} alt=""/>
                <p className="messageText">{props.m.Text}</p>
            </div>
            <div className="messageBottom"><ReactTimeAgo date={props.m.createdAt} locale="en-US"/></div>
        </div>
    )
}
export default MessageCom