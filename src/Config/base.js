import firebase from 'firebase'
import Rebase from 're-base'

const config ={
  apiKey: "AIzaSyCKShbDSrPyRgR_F2CvQNzQpjab52yroHk",
  authDomain: "appointme-17cfe.firebaseapp.com",
  databaseURL: "https://appointme-17cfe.firebaseio.com",
  projectId: "appointme-17cfe",
  storageBucket: "appointme-17cfe.appspot.com",
  messagingSenderId: "943454746154",
  appId: "1:943454746154:web:6b66405a0ceb69b002b553",
  measurementId: "G-MKHTWVNP9H"
}
const app = firebase.initializeApp(config)
const base = Rebase.createClass(app.database())
const facebookProvider = new  firebase.auth.FacebookAuthProvider()

export {app,base,facebookProvider}