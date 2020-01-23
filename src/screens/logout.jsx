import React from 'react';
import {useHistory} from 'react-router-dom';

const Logout = ( {dispatch})=>{

    const history = useHistory();

    const logout = () =>{
        dispatch({type : "USER", payload : false})
        localStorage.removeItem('user');
        history.push('/login')
    }
    return(
        <div>
            <button onClick={logout}>logout</button>
            <p>logoutPage</p>
        </div>
    )
}

export default Logout;