import React,{useContext,useState} from 'react';
import {FirebaseContext} from '../firebase/firebaseContext';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';


const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345,
    marginTop : 15,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const CarsList = ({el}) => {

  const  { brand, model, year, description,id,votes,comments} = el
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [state,setState] = useState({comment : ''})
  const {comment} = state
  

  const {user,firebase} = useContext(FirebaseContext)

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleInputChange = (event) => {
    const { target: { name, value } } = event;
    setState({...state, [name]: value });
  }
const newComment = () =>{
    firebase.createComment(id,user,comment)
    setState({comment : ""})
}
  return (
    <Card className={classes.card}>
      <CardHeader
        title={brand}
      />
      <CardContent>
        <Typography paragraph  color="textSecondary" >
        <p>Model : {model}</p>
        <p>Year: {year} </p>
        <p>Description: {description} </p>
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites"
        onClick={()=>{firebase.like(id,user)}}
        >
          <FavoriteIcon />
          <p> {votes.length} </p>
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        ><p>comments</p>
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
         {comments.map((el) =>{
             return  <Typography paragraph>
            {el.comment}
           </Typography>
         })}
        </CardContent>
      </Collapse>
      <div>
      <TextField
          id="outlined-textarea"
          label="NEW COMMENT"
          placeholder="comment"
          multiline
          variant="outlined"
          onChange={handleInputChange}
          name = 'comment'
          value={comment}
        />
         <Button
        variant="contained"
        color="primary"
        size="small"
        className={classes.button}
        startIcon={<SaveIcon />}
        onClick={newComment}
      >
        Save
      </Button>
      </div>
    </Card>
  );
}

export default CarsList;