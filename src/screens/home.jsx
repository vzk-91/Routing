import React,{useState,useContext} from 'react';
import {useHistory} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import {FirebaseContext} from '../firebase/firebaseContext';
import CarsList from './carsList';
import { useEffect } from 'react';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper1: {
    height: 300,
    width: 400,
    border : '1px solid black',
    margin : 20,
  },
  paper: {
    minHeight: 250,
    width: 400,
    border : '1px solid black',
    margin : 20,
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const Home = ()=> {
 
  const {user,firebase} = useContext(FirebaseContext)
  const [spacing, setSpacing] = useState(2);
  const [cars,setCars] = useState([])
  const classes = useStyles();
  const example = { brand: '', model: '', year: '', description : '' }
  const [state, setState] = useState({ ...example});
    const { brand, model, year,description } = state; 
    let history = useHistory();

  
    useEffect(()=>{
        firebase.getCars().then(data => setCars(data) )
    },[])
 
    const handleInputChange = (event) => {
      const { target: { name, value } } = event;
      setState({...state, [name]: value });
    }
  
    
    const onSubmit = () => {
        const newCar = {
            brand,
            model,
            year,
            description,
          created: Date.now(),
          postedBy: {
            id: user.uid,
            displayName: user.displayName
          },
          comments: [],
          votes: []
        };
    
        firebase.db.collection('cars').add(newCar)
        .catch((err) => {
          console.log('ERROR WHILE CREATE CAR: ', err)
        })
        setState(example)
    }

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={spacing}>
        <Grid   className={classes.paper1}>
        <h4>Create Car</h4>
        <form className={classes.root} noValidate autoComplete="off">
      <div>
        <TextField
          id="standard-textarea"
          label='Car Brand'
          placeholder='Car'
          multiline
          onChange={handleInputChange}
          value={brand}
          name="brand"
        />
      </div>
      <div>
        <TextField
          id="standard-textarea"
          label="Car Model"
          placeholder="Model"
          multiline
          onChange={handleInputChange}
          value={model}
          name="model"
        />
      </div>
      <div>
        <TextField
          id="standard-textarea"
          label="Car Year"
          placeholder="Year"
          multiline
          onChange={handleInputChange}
          value={year}
          name="year"
        />
      </div>
      <div>
        <TextField
          id="standard-textarea"
          label="Description"
          placeholder="Description"
          multiline
          onChange={handleInputChange}
          value={description}
          name="description"
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
        Save
      </Button>
 
    </div>
            </Grid>
            <Grid item className={classes.paper}>
            { cars.map((el)=>{
              return <CarsList key={el.id} el={el}/>
            }) }
            </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Home;