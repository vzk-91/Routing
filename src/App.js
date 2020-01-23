import React,{useReducer} from 'react';
import './App.css';
import {BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";
import PrivateRoute from './utils/PrivateRoute'
import MyPage from './screens/myPage';
import Login from './screens/login';
import Logout from './screens/logout';
import Navigate from './screens/Navigate';



function App() {

const initialState = {
  user : false
}
const reducer = (state, action ) =>{
    switch(action.type){
      case "USER" :
        return{
          ...state,
          user : action.payload
        }
        default :
        return state
    }
}



const [state,dispatch] = useReducer(reducer,initialState)
const {user} = state;


  return (
      <BrowserRouter>
    <div className="App">
        <Navigate/>
        <Switch>
          <Route exact path="/login" render = {()=> < Login dispatch={dispatch}/>} />
          <Route exact path="/logout"  render = {()=> < Logout dispatch={dispatch}/>}/>
          <PrivateRoute authenticated={user} path="/mypage" component={MyPage} />
          {/* <PrivateRoute path="/mypage">
              <MyPage />
            </PrivateRoute> */}
        </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
