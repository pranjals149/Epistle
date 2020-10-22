import React, { useEffect } from 'react';
import Imessage from './Components/Imessage/Imessage';
import { useDispatch, useSelector } from 'react-redux';
import Login from './Components/Login/Login';
import { selectUser, login, logout } from './features/userSlice';
import { auth } from './firebase';

import './App.css';

function App() {
  // Redux
  const user = useSelector(selectUser);

  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      if (authUser) {
        // user is logged in
        dispatch(login({
          uid: authUser.uid,
          photo: authUser.photoURL,
          email: authUser.email,
          displayName: authUser.displayName
        }))
      } else {
        // user is logged out
        dispatch(logout())
      }
    })
  }, [user])

  return (

    <div className="app">

      {user ? (
        <Imessage />
      ) : (
          <Login />
        )}

    </div>

  )
}

export default App;
