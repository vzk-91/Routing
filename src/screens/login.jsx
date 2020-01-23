import React from 'react';
import {useHistory} from 'react-router-dom';


const Login = ({dispatch})=>{

    const history = useHistory();
  
    const login = () =>{
        dispatch({type : "USER", payload : true})
        localStorage.setItem( 'user', JSON.stringify( "user" ));
        history.push('/mypage')
    }
    return(
        <div>
            <button onClick={login}>login</button>
            <p>loginPage</p>
        </div>
    )
}

export default Login;
