import React,{useContext, useState} from 'react'
import noteContaxt from '../contaxt/notes/noteContaxt';


function AddNote() {
    const context = useContext(noteContaxt);
    const { addnote } = context;
    const [note, setNote] = useState({title:"", description:"", tag:""});
    const onhandleclick=(e)=>{
      e.preventDefault();
       addnote(note.title,note.description,note.tag);
    }
    const onchange=(e)=>{
      setNote({ ...note, [e.target.name]: e.target.value });
    }
  return (
    <div>
        <div className='container'>
      <div className='container my-3'>
        <form>
          <h2>Add a Note</h2>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" name='title' onChange={onchange} />

          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" className="form-control" id="description" name='description' onChange={onchange} />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input type="text" className="form-control" id="tag" name='tag' onChange={onchange} />
          </div>
          <button type="submit" className="btn btn-primary my-2" onClick={onhandleclick}>Add Note</button>
        </form>
      </div>      
    
    </div>
    </div>
  )
}

export default AddNote;