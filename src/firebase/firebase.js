import * as firebase from 'firebase'


// Initialize Firebase
var config = {
  apiKey: `${process.env.REACT_APP_NOTE_APP_API_KEY}`,
  authDomain: "notes-app-8af0f.firebaseapp.com",
  databaseURL: "https://notes-app-8af0f.firebaseio.com",
  projectId: "notes-app-8af0f",
  storageBucket: "notes-app-8af0f.appspot.com",
  messagingSenderId: "211964558825"
};
firebase.initializeApp(config);

const database = firebase.database()

export default database;