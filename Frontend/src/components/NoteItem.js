import React,{useContext} from "react";
import noteContext from "../context/notes/NoteContext";
const NoteItem = (props) => {
  const context = useContext(noteContext);
  const {  deleteNote } = context;
  const { note ,updateNote} = props;
  return (
    <div className="col-md-4 mb-4">
    <div className="card shadow-sm border-0 rounded-lg overflow-hidden">
      <div className="card-body">
        <h5 className="card-title text-primary fw-bold">{note.title}</h5>
        <p className="card-text text-muted">{note.description}</p>

        <div className="d-flex justify-content-end mt-3">
          <button 
            className="btn btn-outline-danger btn-sm me-2" 
            onClick={() => { deleteNote(note._id); props.showAlert("success", "Note Deleted Successfully!"); }}
          >
            <i className="fas fa-trash-alt"></i>
          </button>

          <button 
            className="btn btn-outline-primary btn-sm"
            onClick={() => updateNote(note)}
          >
            <i className="fas fa-edit"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
  );
};

export default NoteItem;
