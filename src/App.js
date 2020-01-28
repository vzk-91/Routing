import React from 'react';
import './App.css';
import {BrowserRouter,Switch,Route} from "react-router-dom";
import PrivateRoute from './utils/PrivateRoute'
import Home from './screens/home';
import Login from './screens/login';
import Navigate from './screens/Navigate';
import Register from './screens/registration';
import firebase, { FirebaseContext } from "./firebase";
import useAuth from './utils/useAuth';



function App() {

  const user = useAuth();


  return (
    <FirebaseContext.Provider value={{ user, firebase }}>
      <BrowserRouter>
         <div className="App">
            <Navigate/>
            <Switch>
              <Route exact path="/login" render = {()=> < Login />} />
              <Route exact path="/registration"  render = {()=> < Register />}/>
              <PrivateRoute authenticated={user} component={Home}  />
            </Switch>
         </div>
    </BrowserRouter>
    </FirebaseContext.Provider>
  );
}

export default App;
