import React from 'react';
import {NavLink} from 'react-router-dom';

const Navigate = () =>{

const links = ['login','logout','mypage']

    return(
               <div>
                   {links.map((link)=>{
                   return <NavLink to={link} key={link} style={{ margin : '10px'}}>{link}</NavLink>
                   })}
               </div>
    )
}

export default Navigate;