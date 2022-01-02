import './chatOnline.css'

const ChatOnlineCom = () =>
{
    return (
        <div className="chatOnline">
            <div className="chatOnlineFriend">
                <div className="chatOnlineImgContiner">
                    <img className="chatOnlineImg" src={"/Images/defaultProfileImages1.jpg"}/>
                    <div className="chatOnlineBadge"></div>
                </div>
                <span className="chatOnlineName">Yehuda Shmaria</span>
            </div>
        </div>
    )
}
export default ChatOnlineCom