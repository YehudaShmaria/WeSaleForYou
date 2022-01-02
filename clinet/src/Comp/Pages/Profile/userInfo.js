import { userContext } from "../../Auto/userContext"
import { useContext, useState, useEffect } from "react";

const UserInfoCom = () =>
{
    const {user,setUser} = useContext(userContext);
    const [date,setDate] = useState({Creadte:"",Update:""})
    useEffect(()=>
    {
        setDate({Creadte:fixTheDate(user.createdAt),Update:fixTheDate(user.updatedAt)});
    },[])

    const fixTheDate = (convertDate) =>
    {
        const d = new Date(convertDate);
        let normalDate = d.getHours() + ":" + d.getMinutes() + ", " + d.toDateString();
        return normalDate;
    }

    return(
        <div>
            <div style={{marginTop:"30px", paddingBottom:"30px"}}>
                <h2 style={{color:"yellowgreen",backgroundColor:"whitesmoke", fontSize:"35px", padding:"10px"}}>User Infromation</h2>
            </div>
            <div>
                <div style={{textAlign:"left"}}>
                    <p> <b>Created At:</b> {date.Creadte}</p>
                    <p> <b>Updated At:</b> {date.Update}</p>
                </div>
               
               <div style={{textAlign:"left",marginLeft:"20px"}}>
                <h3>Name: {user.Name}</h3>
                <h3>Email: {user.Email}</h3>
                <h3>Number Of Followed: {user.Followed.length}</h3>
                    <h3>Type: {user.Type}</h3>
                    <ul>
                        <h3>Favorit</h3>
                    {
                        user.Favorit.map((item,index)=>
                        {
                            return <>
                                <li key={index}>{item}</li>
                            </>
                        })
                    }
                    </ul>
               </div>
            </div>
        </div>
    )
}
export default UserInfoCom