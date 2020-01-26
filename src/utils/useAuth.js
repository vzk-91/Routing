import React from "react";
import firebase from '../firebase';

function useAuth() {
  const [authUser, setAuthUser] = React.useState(null); 
  React.useEffect(() => {
   const unsubscribe = firebase.auth.onAuthStateChanged(user => {
      if(user) {
        setAuthUser(user);
        localStorage.setItem('lp-user', JSON.stringify(user))
      } else {
        localStorage.removeItem('lp-user')
        setAuthUser(null);
      }
    })
    return () => unsubscribe();
  }, [])
  return authUser;
}

export default useAuth;