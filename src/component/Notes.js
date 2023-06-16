import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContaxt from '../contaxt/notes/noteContaxt';
import NoteItem from './NoteItem';
import AddNote from './AddNote';


const Notes = () => {
    const context = useContext(noteContaxt);
    const { notes, getnote } = context;
    const [note, setNote] = useState({ etitle: "", edescription: "", etag: "" });
    useEffect(() => {
        getnote();
    }, []);
    const updateNote = (currentnote) => {
        ref.current.click();
        setNote({ etag: currentnote.tag, edescription: currentnote.description, etitle: currentnote.title });


    }
    const onhandleclick = (e) => {
        e.preventDefault();


    }
    const onchange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });

    }

    const ref = useRef(null)

    return (
        <>
            <AddNote />
            <button ref={ref} type="button" className=" d-none btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                Launch demo modal
            </button>


            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <h3>Add a Note</h3>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="tag" name='tag' value={note.etag} onChange={onchange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="title" name='title' value={note.etitle} onChange={onchange} />

                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="description" name='description' value={note.edescription} onChange={onchange} />
                                </div>
                                
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button onClick={onhandleclick} type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row my-3'>
                <h3>Your Notes</h3>
                {
                    notes.map(note => (
                        <NoteItem key={note._id} updateNote={updateNote} note={note} />
                    ))
                }

            </div>
        </>


    )
}

export default Notes;