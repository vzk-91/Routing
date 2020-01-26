import app from 'firebase/app';
import 'firebase/auth'; // authentication
import 'firebase/firestore';
import firebaseConfig from './config';

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);
    
    this.auth = app.auth();
    this.db = app.firestore();
  }

  register = async (name, email, password) => {
    const newUser = await this.auth.createUserWithEmailAndPassword(email, password)
    return await newUser.user.updateProfile({ displayName: name })
  }

  login = async(email, password) => {
   return await this.auth.signInWithEmailAndPassword(email, password)
  }

  logout = async () => {
    return await this.auth.signOut()
  }

  resetPassword = async () => {
    await this.auth.sendPasswordResetEmail();
  }

  getCars = async () => {
  const snapshot = await this.db.collection('cars').get();
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    return data
  }

   like = async (id,user) => {
    const ref = this.db.collection("cars").doc(id);
    try {
      const doc = await ref.get();
      if (doc.exists) {
        const prevVotes = doc.data().votes;
        const newVote = {
          votedBy: user.displayName,
          id: user.uid
        };
       const find =  prevVotes.find(e =>{
         return e.id === newVote.id
        })
        if(!find){
          const updatedVotes = [...prevVotes, newVote];
          ref.update({ votes: updatedVotes });
        } else {
            const filterVotes = prevVotes.filter((el)=>{
              return el.id !== newVote.id 
            })
            ref.update({votes : [...filterVotes]})
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

 

  createComment = async (id,user,comment) =>{
    const ref = this.db.collection("cars").doc(id);
    try {
      const doc = await ref.get();
      if (doc.exists) {
        const prevComment = doc.data().comments;
        const newComents = {
          commentBy: user.displayName,
          id: user.uid,
          comment
        };
        const updatedComments = [...prevComment, newComents];
        ref.update({ comments: updatedComments });
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export default new Firebase();