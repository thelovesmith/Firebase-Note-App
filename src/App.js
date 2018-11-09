import React, { Component } from 'react';
import database from './firebase/firebase'


class App extends Component {
  state = {
    users: [], 
    notes: [],
    note: {
      title: '',
      body: ''
    }
  }
  // componentDidMount(){
  //   const note = {
  //     title: 'this is a note',
  //     body: 'this is text inside of my note'
  //   }
  //   this.setState({
  //     notes: [...this.state.notes, note]
  //   })
  //   database.ref('/notes').push(note).then(() => {
  //     console.log('data write success')
  //   }).catch((error) => {
  //     console.log(error)
  //   })
    // const user = {
    //   name: 'Avery',
    //   age: 26
    // }
    // this.setState({
    //   users: [...this.state.users, user]
    // })
    // database.ref('/users').push(user).then(() => {
    //   console.log('Data write success')
    // }).catch((error) => {
    //   console.log(error, 'this is errror')
    // })
    //This is cretaing a user in our databse on Firebase wjen the page loads
    // database.ref('/users').set(user).then(() => {
    //   console.log('data write success')
    // }).catch((error) => {
    //   console.log(error, 'this is the error')
    // })

  handleFormUpdate = (e) => {
    this.setState({
      note: {
        ...this.state.note, [e.currentTarget.name]: e.currentTarget.value
      }
    })
    // console.log(e.currentTarget)
  }
  handleFormSubmission = (e) => {
    e.preventDefault();
    const currentNote = this.state.note
    database.ref('/notes').push(currentNote).then(() => {
      alert('note has been added to firebase')
      this.setState({
        note: {
          title: '',
          body: ''
        }
      })
    }).catch((error)=> {
      console.log(error, 'ths is an error')
    })

  }
  //logging every time is updated 
  // componentDidUpdate(){
  //   console.log(this.state)
  // }
  componentDidMount(){
    // pulling down all the data from the database
    const notesRef = database.ref('notes')
    notesRef.on('value', (snapshot) => {
      const allNotes = snapshot.val()
    
      for(let i in allNotes){
        let note = {
          id: i,
          title: allNotes[i].title,
          body: allNotes[i].body
        } 
        this.setState({
          notes: [...this.state.notes, note]
        })   
      }
    })
  }
  render() {
    return (
      <div style={{textAlign: 'center'}}>
        <h1>Notes App</h1>
        <NoteForm 
        handleFormSubmission={this.handleFormSubmission}
        note={this.state.note} 
        handleFormUpdate={this.handleFormUpdate}
        />
        {
          this.state.notes.map((note, i) => (
            <div key={i}>
              <h5>
                {note.title}
              </h5>
              <p>
                {note.body}
              </p>
            </div>
          ))
        }
      </div>
    );
  }
}
  
  

const NoteForm = (props) => (
  <form onSubmit={props.handleFormSubmission}>
    <input type='text' name='title' value={props.note.title} onChange={props.handleFormUpdate} />
    <input type='text' name='body' value={props.note.body} onChange={props.handleFormUpdate} />
    <button type='Submit'>Submit</button>
  </form>
)

export default App;
