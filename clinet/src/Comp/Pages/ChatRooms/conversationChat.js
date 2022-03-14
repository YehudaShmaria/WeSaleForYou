import React, { useContext, useEffect, useState } from 'react';
import MessageChatCom from './messageChat';
import { userContext } from "../../Auto/userContext"
import utils from '../../../utils';
import ScrollableFeed from 'react-scrollable-feed'

function ConversationChatCom(props) {
    const { user, setUser } = useContext(userContext);
    const [newMassege, setNewMessage] = useState({});
    useEffect(() => {
        if (user) {
            setNewMessage({ ...newMassege, sender: user._id });
        }
        else {
            setNewMessage({ ...newMassege, sender: "anonymous" });
        }
    }, [])
    const addMessage = async () => {
        try {
            let res = await utils.UpdateItem("http://localhost:5000/chat/", props.chat._id, newMassege);
            console.log(res.data);
        }
        catch (error) {
            alert(error.response.data.message)
        }
    }
    return (
        <div>
            <div>
                <h5>Subject: {props.chat.Subject}</h5>
                <hr />

                <div>
                    <ScrollableFeed>
                        {
                            props.chat.Messages.map((item, index) => {
                                return <>
                                    <MessageChatCom m={item.Text} f={item.sender} o={user ? item.sender == user._id : null} />
                                </>
                            })
                        }
                    </ScrollableFeed>
                </div>


                <div className="chatBoxBottom">
                    <textarea onChange={(e) => { setNewMessage({ ...newMassege, Text: e.target.value }) }} className="chatMessageInput" placeholder="Writh Something!">
                    </textarea>
                    <button className="chatSubmitButton" onClick={addMessage}>Send</button>
                </div>
            </div>
        </div>
    );
}

export default ConversationChatCom;