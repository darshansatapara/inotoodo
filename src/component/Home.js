import React, { useContext } from 'react'
import noteContaxt from '../contaxt/notes/noteContaxt';
const Home = () => {
  const context = useContext(noteContaxt);
  const {notes,setnotes} =context;
  return (
    <div className='container'>
      <form>
        <h2>Add a Note</h2>
        <div className="mb-3">
          <label for="Title" className="form-label">Title</label>
          <input type="text" className="form-control" id="Title" />

        </div>
        <div className="mb-3">
          <label for="Description" className="form-label">Description</label>
          <input type="text" className="form-control" id="Description" />
        </div>
        <button type="submit" className="btn btn-primary my-2">Add Note</button>
      </form>
        <h2>Your Notes</h2>
        {notes.map((note)=>{
            return note.title;
        })} 
    </div>
  )
}

export default Home