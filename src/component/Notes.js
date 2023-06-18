import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContaxt from '../contaxt/notes/noteContaxt';
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';


const Notes = (props) => {
    let navigate = useNavigate();
    const context = useContext(noteContaxt);
    const { notes, getnote, editnote } = context;
    const [note, setNote] = useState({
        id: "",
        title: "",
        description: "",
        tag: "",
    });
    useEffect(() => {
        if (localStorage.getItem("token")) {
            getnote();
        } else {
            navigate("/login");
        }
        // eslint-disable-next-line
    }, []);
    const ref = useRef(null);
    const refClose = useRef(null);
    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({
            id: currentNote._id,
            title: currentNote.title,
            description: currentNote.description,
            tag: currentNote.tag,
        });
    };

    const onhandleclick = (e) => {
        editnote(note.id, note.title, note.description, note.tag);
        refClose.current.click();
        props.showAlert("update Succesfully", "success");

    }

    const onchange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });


    }

    return (
        <>
            <AddNote showAlert={props.showAlert} />

            <button ref={ref} type="button" className="d-none btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>


            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <h3>Edit Note here</h3>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="tag" name='tag' value={note.tag} onChange={onchange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="title" name='title' value={note.title} onChange={onchange} />

                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="description" name='description' value={note.description} onChange={onchange} />
                                </div>

                                <div className="modal-footer">
                                    <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button onClick={onhandleclick} disabled={note.title.length < 5 || note.description.length < 5}
                                        type="button" className="btn btn-primary"  >Update Note</button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div className='container row my-3'>
                <h3>Your Notes</h3>
                <div className="container">
                    {notes.length === 0 && 'No notes to display..'}
                </div>
                {notes.map((note) => {
                    return (
                        <NoteItem
                            key={note._id}
                            updateNote={updateNote}
                            note={note}
                            showAlert={props.showAlert}

                        />
                    );
                })}
            </div>
        </>


    )
}

export default Notes;