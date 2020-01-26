import React,{useState} from 'react';
import {useHistory} from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import firebase from '../firebase/firebase';

const useStyles = makeStyles(theme => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: 200,
      },
      button: {
        margin: theme.spacing(1),
      },
    },
  }));



const Register = ({dispatch})=>{

    const [state, setState] = useState({ name: '', email: '', password: '' });
    const { name, email, password } = state; 
    let history = useHistory();
    const classes = useStyles();
    
 
    const handleInputChange = (event) => {
      const { target: { name, value } } = event;
      setState({...state, [name]: value });
    }
  
    const onSubmit = () => {
      const { name, email, password } = state; 
      firebase.register(name, email, password )
        .then(response => {
          history.push('/login');
        })
        .catch((err) => {
          // Set error message here
        })
    }
   
    return(
        <React.Fragment>
        <CssBaseline />
        <Container maxWidth="sm">
          <Typography component="div"  />
          <form className={classes.root} noValidate autoComplete="off">
      <div>
        <TextField
          id="standard-textarea"
          label='Enter Name'
          placeholder='Name'
          multiline
          onChange={handleInputChange}
          value={name}
          name="name"
        />
      </div>
      <div>
        <TextField
          id="standard-textarea"
          label="Enter Email"
          placeholder="Email"
          multiline
          onChange={handleInputChange}
          value={email}
          name="email"
        />
      </div>
      <div>
        <TextField
          id="standard-textarea"
          label="Enter Password"
          placeholder="Password"
          multiline
          onChange={handleInputChange}
          value={password}
          name="password"
        />
      </div>
    </form>
    <div>
    <Button
        variant="contained"
        color="primary"
        size="small"
        className={classes.button}
        startIcon={<SaveIcon />}
        onClick={onSubmit}
      >
        Register
      </Button>
 
    </div>
        </Container>
      </React.Fragment>
    )
}

export default Register;

