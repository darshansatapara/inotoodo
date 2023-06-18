import { useState } from "react";
import noteContaxt from "./noteContaxt";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];

  const [notes, setnotes] = useState(notesInitial);

  //getall  note---------------------------------------------
  const getnote = async () => {
    const response = await fetch(`${host}/api/notes/fatchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem("token"),
      },
      
    });
    const json = await response.json();
    setnotes(json);
  };
  //Add a note-----------------------------------------
  const addnote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    setnotes(notes.concat(json));
  };

  //Delet a note-----------------------------------------------
  const deletenote = async(id) => {
    //API call
   
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            localStorage.getItem("token"),
        },
      });
      const json = await response.json();
      setnotes(json);
      
      const newNotes = notes.filter((note) => {
        return note._id !== id;
      });
      setnotes(newNotes);
};

  //Edit a note--------------------
  const editnote = async (id, title, description, tag) => {
    //API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
      setnotes(json);

      //copy of notes for editing 
      let newNotes=JSON.parse(JSON.stringify(notes))
    //logic for edtining
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setnotes(newNotes)
  };

  return (
    <noteContaxt.Provider
      value={{ notes, setnotes, addnote, deletenote, editnote, getnote }}
    >
      {props.children}
    </noteContaxt.Provider>
  );
};

export default NoteState;
