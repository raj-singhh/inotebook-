import React, { useContext, useEffect, useRef, useState } from 'react';
import noteContext from "../context/notes/NoteContext";
import NoteItem from './NoteItem';
import AddNote from "./AddNote";
import { useNavigate } from 'react-router-dom';



const Notes = (props) => {
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('token'))
      getNotes();
    else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, [])
  const ref = useRef(null)
  const refClose = useRef(null)

  const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
      id: currentNote._id
    })
  }
  const handleClick = (e) => {
    e.preventDefault()
    if (note.etitle.trim().length < 3) {
      props.showAlert("info", "Title must be at least 3 characters long!");
      return;
    }
    if (note.edescription.trim().length < 5) {
      props.showAlert("info", "Description must be at least 5 characters long!");
      return;
    }
    editNote(note.id, note.etitle, note.edescription, note.etag)
    ref.current.click()
    props.showAlert("success", "Note Updated Successfully!");


  }
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }
  return (
    <>
      <AddNote showAlert={props.showAlert} />
      <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch
      </button>
      <div className="modal fade my-5" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {/* Form--> start*/}
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label ">Title</label>
                  <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="titleHelp" value={note.etitle} onChange={onChange} />

                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                </div>
              </form>
              {/* Form-->end */}




            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
            </div>
          </div>
        </div>
      </div>


      <div className="container my-5">
        <h2>Your Notes</h2>

        {notes.length === 0 ? (
          <div className="text-center my-5">
            <i className="fas fa-folder-open fa-3x text-muted"></i>
            <p className="text-muted mt-3">No notes available. Start by adding a new note!</p>
          </div>
        ) : (
          <div className="row">
            {notes.map((note) => (
              <NoteItem key={note._id} note={note} updateNote={updateNote} showAlert={props.showAlert}/>
            ))}
          </div>
        )}
      </div>

    </>
  )
}

export default Notes
