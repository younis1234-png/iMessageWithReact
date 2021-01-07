import React, {useEffect} from 'react';
import './App.css';
import Imessage from "./component/Imessage"
import Login from "./component/login//Login"
import { selectUser, login, logout} from "./features/userSlice"
import { useSelector, useDispatch } from "react-redux"
import { auth } from "./firebase"

function App ()
{
  const user = useSelector( selectUser )
  // this is gonna allow us to go and get the changes we want from our reducer redux
  const dispatch = useDispatch()
  
  useEffect( () =>
  {// listen for an auth change, when any change accores go ahed and use authUser
    auth.onAuthStateChanged( authUser =>
    {
      if(authUser){
        // User is logged in
        dispatch( login( {
          // we go and ge these things
          uid: authUser.uid,
          photo: authUser.photoURL,
          email: authUser.email,
          displayName: authUser.displayName
        }))
      }else{
        // user is logged out
        dispatch(logout())
      }
    })
  },[] )
  

  return (
    <div className="app">
      
      {/*  if the user exit thn we gon render the app */ }
      {user ? <Imessage /> :
        
        // then you need to login
        <Login />
      }      

    </div>
  );
}

export default App;
