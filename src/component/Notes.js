import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContaxt from '../contaxt/notes/noteContaxt';
import NoteItem from './NoteItem';
import AddNote from './AddNote';


const Notes = () => {
    const context = useContext(noteContaxt);
    const { notes, getnote, editnote } = context;
    const [note, setNote] = useState({
        id: "",
        etitle: "",
        edescription: "",
        etag: "",
    });
    useEffect(() => {
        getnote();
    }, []);
    const ref = useRef(null);
    const refClose = useRef(null);
    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({
            id: currentNote._id,
            etitle: currentNote.title,
            edescription: currentNote.description,
            etag: currentNote.tag,
        });
    };
    const onhandleclick = (e) => {
        editnote(note.id, note.etitle, note.edescription, note.etag);
        refClose.current.click();


    }
    const onchange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });


    }

    return (
        <>
            <AddNote />
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
                                <h3>Add a Note</h3>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={onchange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name='etitle' value={note.etitle} onChange={onchange} />

                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name='edescription' value={note.edescription} onChange={onchange} />
                                </div>
 
                                <div className="modal-footer">
                                    <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button onClick={onhandleclick} disabled={note.etitle.length < 5 || note.edescription.length < 5}
                                        type="button" className="btn btn-primary" >Update Note</button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div className='row my-3'>
                <h3>Your Notes</h3>
                {notes.map((note) => {
                    return (
                        <NoteItem
                            key={note._id}
                            updateNote={updateNote}

                            note={note}
                        />
                    );
                })}
            </div>
        </>


    )
}

export default Notes;