import './App.css';
import {useState } from 'react';
import WebPageCom from './theWebPage';
import { userContext } from './Comp/Auto/userContext';


function App() {
  const [user,setUser] = useState(null);
  return (
    <div className="App">
        <userContext.Provider value={{user,setUser}}>
         <WebPageCom/>
      </userContext.Provider>
    </div>
  );
}

export default App;
