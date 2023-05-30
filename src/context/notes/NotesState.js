import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000"
    const initialNotes = []
      const [notes, setNotes] = useState(initialNotes);

      //Get all Notes
      const getNotes = async () => {
        //TODO:API Calls
        const response = await fetch(`${host}/api/notes/fetchallnotes`,{
          method:"GET",
          headers:{
            "Content-type" : "application/json",
            "auth-token" : localStorage.getItem('token')
          }
        })
        const json = await response.json();
        setNotes(json);
      }



      //Add a note
      const addNote = async (title, description, tag) => {
        //TODO:API Calls
        const response = await fetch(`${host}/api/notes/addnote`,{
          method:"POST",
          headers:{
            "Content-type" : "application/json",
            "auth-token" : localStorage.getItem('token')
          },
          body: JSON.stringify({title, description, tag})
        })
        
        const note = await response.json();
        setNotes(notes.concat(note));
      }


      //Delete a note
      const deleteNote = async (id) => {
        //TODO:API Calls
        const response = await fetch(`${host}/api/notes/deletenote/${id}`,{
          method:"DELETE",
          headers:{
            "Content-Type" : "application/json",
            "auth-token" : localStorage.getItem('token')
          }
        })
        const json = await response.json()
        console.log(json);
        const newNote = notes.filter((note)=>{return note._id!==id})
        setNotes(newNote); 
      }



      //Edit a note
      const editNote = async (id, title, description, tag) => {
        //API Call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`,{
          method:"PUT",
          headers:{
            "Content-Type" : "application/json",
            "auth-token" : localStorage.getItem('token')
          },
          body: JSON.stringify({title, description, tag})
        })
        const json = await response.json()
        console.log(json)

        let newNotes = JSON.parse(JSON.stringify(notes))   
        //Logic to edit in client side
        for(let i=0; i<newNotes.length; i++){
          const element = notes[i];
          if(element._id===id){
            newNotes[i].title=title;
            newNotes[i].description=description;
            newNotes[i].tag=tag;
            break;
          }
        }
        setNotes(newNotes);
      }
    return (
        <NoteContext.Provider value={{notes,  deleteNote, editNote, addNote, getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState;