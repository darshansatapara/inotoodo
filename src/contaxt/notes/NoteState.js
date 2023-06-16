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
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ4MzFjMTg0NGZhOTdhYzhkMjIxZWM0In0sImlhdCI6MTY4NjYzNTY5Mn0.ev8rWtAswBePCcOs8G4KCsDpG8Q5U9WI5T-X_sGUnCI",
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
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ4MzFjMTg0NGZhOTdhYzhkMjIxZWM0In0sImlhdCI6MTY4NjYzNTY5Mn0.ev8rWtAswBePCcOs8G4KCsDpG8Q5U9WI5T-X_sGUnCI",
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
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ4MzFjMTg0NGZhOTdhYzhkMjIxZWM0In0sImlhdCI6MTY4NjYzNTY5Mn0.ev8rWtAswBePCcOs8G4KCsDpG8Q5U9WI5T-X_sGUnCI",
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
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ4MzFjMTg0NGZhOTdhYzhkMjIxZWM0In0sImlhdCI6MTY4NjYzNTY5Mn0.ev8rWtAswBePCcOs8G4KCsDpG8Q5U9WI5T-X_sGUnCI",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
      setnotes(json);

    //logic for edtining
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
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
