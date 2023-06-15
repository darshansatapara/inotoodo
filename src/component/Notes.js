import React, { useContext ,useEffect} from 'react'
import noteContaxt from '../contaxt/notes/noteContaxt';
import NoteItem from './NoteItem';
import AddNote from './AddNote';


const Notes=()=> {
    const context = useContext(noteContaxt);
    const { notes, getnote } = context;
    useEffect(() => {
        getnote();
    }, []);
   
    return (
        <>
        <AddNote/>
        <div className='row my-3'>
            <h2>Your Notes</h2>
            {
                notes.map(note => (
                     <NoteItem key={note._id} note={note}/>
                ))
            }
            
        </div>
        </>


    )
}

export default Notes;