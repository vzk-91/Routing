 import {NavLink} from 'react-router-dom';
import React,{useContext} from 'react';
import {useHistory} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import HomeIcon from '@material-ui/icons/Home';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import GrainIcon from '@material-ui/icons/Grain';
import {FirebaseContext} from '../firebase/firebaseContext';

const useStyles = makeStyles(theme => ({
  link: {
    display: 'flex',
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
  },
  div : {
      marginLeft : 100 ,
      marginTop : 30,
      
  }
}));



const  Navigate = () => {
  const classes = useStyles();
  const {user,firebase} = useContext(FirebaseContext)
  let history = useHistory();

  const logout = () => {
    firebase.logout()
      .then(() => {
        history.push("/login");
      })
      .catch(() => {
        // errors handling here
      });
  };
    
  return (
    <Breadcrumbs aria-label="breadcrumb" className={classes.div}>
      <Link color="inherit" 
       className={classes.link}
       component={NavLink}
        to='/home' >
        <HomeIcon className={classes.icon} />
        Home
      </Link>
      <Link
        color="inherit"
        className={classes.link}
        component={NavLink}
        to='/login'
      >
        <WhatshotIcon className={classes.icon} />
        Login
      </Link>
      <Link
        color="inherit"
        className={classes.link}
        component={NavLink}
        to='/registration'
      >
         <GrainIcon className={classes.icon} />
        Register
      </Link>
      <Link
        color="inherit"
        className={classes.link}
        onClick={logout}
      >
        Logout
      </Link>
    </Breadcrumbs>
  );
}

export default Navigate;