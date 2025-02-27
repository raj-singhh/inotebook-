import React ,{useContext, useState} from 'react'
import noteContext from "../context/notes/NoteContext";
const AddNote = (props) => {
    const context = useContext(noteContext);
    const {  addNote } = context;
    const [note, setNote] = useState({title:"" , description:"", tag:""})
    const handleClick = (e)=>{
        e.preventDefault()
        if (note.title.trim().length < 3) {
            props.showAlert("info", "Title must be at least 3 characters long!");
            return;
          }
        if (note.description.trim().length < 5) {
            props.showAlert("info", "Description must be at least 5 characters long!");
            return;
        }
        

        

        addNote(note.title, note.description, note.tag );
        props.showAlert("success", "Note added successfully!");
        setNote({title:"" , description:"", tag:""})
        
        
    }
    const onChange=(e)=>{
        setNote({...note, [e.target.name ]:e.target.value})
    }
    return (
        <div className="container " style={{marginTop:"122px"}} >
          <div className="card shadow-lg border-0 rounded-4 p-4" >
            <h2 className="text-center text-primary fw-bold mb-3">📝 Add a New Note</h2>
      
            <form>
              {/* Title Field */}
              <div className="form-floating mb-3">
                <input 
                  type="text" 
                  className="form-control shadow-sm" 
                  id="title" 
                  name="title" 
                  value={note.title} 
                  onChange={onChange} 
                  placeholder="Enter note title"
                />
                <label htmlFor="title">Title</label>
              </div>
      
              {/* Description Field */}
              <div className="form-floating mb-3">
                <textarea 
                  className="form-control shadow-sm" 
                  id="description" 
                  name="description" 
                  rows="3"
                  onChange={onChange} 
                  value={note.description} 
                  placeholder="Enter note description"
                ></textarea>
                <label htmlFor="description">Description</label>
              </div>
      
              {/* Tag Field */}
              <div className="form-floating mb-3">
                <input 
                  type="text" 
                  className="form-control shadow-sm" 
                  id="tag" 
                  name="tag" 
                  onChange={onChange} 
                  value={note.tag} 
                  placeholder="Enter tag (optional)"
                />
                <label htmlFor="tag">Tag</label>
              </div>
      
              {/* Add Note Button */}
              <button 
                type="submit" 
                className="btn btn-primary w-100 fw-bold shadow-sm d-flex align-items-center justify-content-center gap-2"
                onClick={handleClick}
              >
                <i className="fas fa-plus"></i> Add Note
              </button>
            </form>
          </div>
        </div>
      );
      
      
}

export default AddNote
