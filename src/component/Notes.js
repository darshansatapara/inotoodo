import React, { useContext } from 'react'
import noteContaxt from '../contaxt/notes/noteContaxt';
import NoteItem from './NoteItem';

const Notes=()=> {
    const context = useContext(noteContaxt);
    const { notes } = context;
   
    return (
        <div className='row my-3'>
            <h2>Your Notes</h2>
            {
                notes.map(note => (
                     <NoteItem key={note._id} note={note}/>
                ))
            }
            
        </div>


    )
}

export default Notes;