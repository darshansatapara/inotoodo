import React, { useContext } from "react";
import noteContaxt from "../contaxt/notes/noteContaxt";

const NoteItem = (props) => {
  const context = useContext(noteContaxt);
  const { deletenote } = context;
  const { note, updateNote } = props;
  return (
    <div className="col-md-3 my-2">
      <div className="card">
        <div className="card-body" key={note.id}>
          <h5 className="card-title">{note.tag}</h5>
          <div className="d-flex align-items-center">
            <h5 className="card-title">{note.title}</h5>
            <i
              className="far fa-trash-alt mx-2"
              onClick={() => {
                deletenote(note._id);
                props.showAlert("Deleted Succesfully", "success");
              }}
            ></i>
            <i
              className="fa-regular fa-pen-to-square mx-2"
              onClick={() => {
                updateNote(note);
              }}
            ></i>
          </div>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
