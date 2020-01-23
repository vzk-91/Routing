import React from 'react';
import {
    Route,
    Redirect,
  } from "react-router-dom";

const  PrivateRoute =  ({component: Component, authenticated, ...rest}) => {
    return (
      <Route
        {...rest}
        render={(props) => authenticated
          ? <Component {...props} />
          : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
      />
    )
  }

//   const PrivateRoute = ({ children, isAuth, ...rest }) => {
//     return (
//       <Route
//         {...rest}
//         render={({ location }) =>
//         localStorage.getItem('user') ? (
//             children
//           ) : (
//             <Redirect
//               to={{
//                 pathname: "/login",
//                 state: { from: location }
//               }}
//             />
//           )
//         }
//       />
//     );
//   }

  export default PrivateRoute;