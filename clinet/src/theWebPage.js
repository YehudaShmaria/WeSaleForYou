import {Route, Switch, withRouter} from 'react-router-dom'
import LoginCom from './Comp/Auto/login';
import ALlProductsCom from './Comp/Pages/Products/aLlProducts';
import HomeCom from './Comp/Pages/Home/home';
import RegisterCom from './Comp/Auto/register';
import NavCom from './Comp/Layout/nav';
import FooterCom from './Comp/Layout/footer';
import ProfileCom from './Comp/Pages/Profile/profile';
import { useContext, useEffect, useState } from 'react';
import { userContext } from './Comp/Auto/userContext';
import axios from 'axios';
import BecomeSallerCom from './Comp/Pages/BecomeSaller/becomeSaller';
import SallerMainCom from './Comp/Pages/MangeProduts/mainSaller';
import MessengerCom from './Comp/Pages/Messages/messenger';
import MainSellerCom from './Comp/Pages/Sallers/mainseller';
import AdminHomeCom from './Comp/Admin/adminHome';

const WebPageCom = ()=>
{
    const {user,setUser} = useContext(userContext);
    const [type,setType] = useState(false);

    useEffect(async()=>
    {
        let token = localStorage.getItem("token");
        if(token)
        {
            let res = await axios.get("http://localhost:5000/auto",{headers:{
                "x-access-token":token
            }});
            setUser(res.data);
        }
    },[])

    useEffect(()=>
    {
        if(user)
        {
            user.Type == "Saller" ? setType(true) : setType(false);
        }
        else
            setType(false);
    },[user])

    return(
        <div className="App">
          <NavCom/>
                <Switch>
                   <Route exact path="/">
                         <HomeCom/>
                      </Route>
                      
                      <Route path="/login">
                        {
                            user ? null: <LoginCom/>
                        } 
                      </Route>
                      <Route path="/products">
                         <ALlProductsCom/>
                      </Route>
                      <Route path="/admin">
                         <AdminHomeCom/>
                      </Route>
                      <Route path="/register">
                          
                        {
                            user ? null : <RegisterCom/>
                        } 
                        
                      </Route>
                      <Route path="/profile">
                          {
                              user ? <ProfileCom/> : <LoginCom/>
                          }
                      </Route>
                      <Route path="/sallers">
                         <MainSellerCom/>
                      </Route>

                    <Route path="/messenger">
                    {
                        user ? <MessengerCom/> : <LoginCom/>
                    } 
                    </Route>
                    
                    {
                        type ? <>
                         <Route path="/mangeproduct">
                           <SallerMainCom/>
                        </Route></> : <Route path="/createsaller"><BecomeSallerCom/></Route>
                    }

                   
                </Switch>
      {/* <FooterCom/> */}
      </div>
    )
}
export default WebPageCom