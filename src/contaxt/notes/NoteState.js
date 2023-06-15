import { useState } from "react";
import noteContaxt from "./noteContaxt";

const NoteState = (props) => {
  const host = "https://localhost:5000";
  const notesInitial = [];

  const [notes, setnotes] = useState(notesInitial);

  //getall  note
  const getnote = async () => {
    const response = await fetch(`${host}/api/notes/fatchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ4MzFjMTg0NGZhOTdhYzhkMjIxZWM0In0sImlhdCI6MTY4NjY2MTAxN30.kDb3C7fe72wnXMV05iEOWTax0_GZlm_nLshsDnz6KkM",
      },
    });
    const json = await response.json();
    setnotes(json);
  };
  //Add a note
  const addnote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ4MzFjMTg0NGZhOTdhYzhkMjIxZWM0In0sImlhdCI6MTY4NjY2MTAxN30.kDb3C7fe72wnXMV05iEOWTax0_GZlm_nLshsDnz6KkM",
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const note = {
      _id: "6489cd55ee4a274edbbe6668",
      user: "64831c1844fa97ac8d221ec4",
      title: title,
      description: description,
      tag: tag,
      __v: 0,
    };
    setnotes(notes.concat(note));
  };

  //Delet a note
  const deletenote = (id) => {
    //API call
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setnotes(newNotes);
  };

  //Edit a note
  const editnote = async (id, title, description, tag) => {
    //API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ4MzFjMTg0NGZhOTdhYzhkMjIxZWM0In0sImlhdCI6MTY4NjY2MTAxN30.kDb3C7fe72wnXMV05iEOWTax0_GZlm_nLshsDnz6KkM",
      },
      body: JSON.stringify({ title, description, tag }),
    });

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
      value={{ notes, setnotes, addnote, deletenote, editnote,getnote }}
    >
      {props.children}
    </noteContaxt.Provider>
  );
};

export default NoteState;
