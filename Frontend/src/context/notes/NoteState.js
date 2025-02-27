import React, { useState } from "react";
import NoteContext from "./NoteContext";
const NoteState = (props) => {
  const host = "http://localhost:5000"
  const initialNotes = []
  const [notes, setNotes] = useState(initialNotes);
  //Get a Note
  const getNotes = async () => {
    //TODO : API call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
      // ...
    });
    const json =await response.json();
    setNotes(json)
  
  }
  //Add a Note
  const addNote = async (title, description, tag) => {
    //TODO : API call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag }),
      // ...
    });
    const note =await response.json();
    //Logic to edit in client

    setNotes(notes.concat(note))
    

  }

  //Delete a Note
  const deleteNote = async (id) => {
    //TODO : API call 
    await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "auth-token": localStorage.getItem('token'),
      },
      // ...
    });

    const newNotes = notes.filter((note) => { return note._id !== id })

    setNotes(newNotes)
  }

  //Edit a Note
  const editNote = async (id, title, description, tag) => {
    // API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag }),
      // ...
    });
    if(!response.ok){
      throw new Error("Failed to update note")
    }
    let newNotes=JSON.parse(JSON.stringify(notes));
    //Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index]._id = id;
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }

    }
    setNotes(newNotes);
  }
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote , getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}
export default NoteState;