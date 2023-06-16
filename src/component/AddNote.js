import React,{useContext, useState} from 'react'
import noteContaxt from '../contaxt/notes/noteContaxt';


function AddNote() {
    const context = useContext(noteContaxt);
    const { addnote } = context;
    const [note, setNote] = useState({title:"", description:"", tag:""});
    const onhandleclick=(e)=>{
      e.preventDefault();
       addnote(note.title,note.description,note.tag);
       setNote({ title: "", tag: "", description: "" })
    }
    const onchange=(e)=>{
      setNote({ ...note, [e.target.name]: e.target.value });
    }
  return (
    <div>
        <div className='container'>
      <div className='container my-3'>
        <form>
          <h3>Add a Note</h3>
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
          <button type="submit" disabled={note.title.length < 5 || note.description.length < 5} className="btn btn-primary my-2" onClick={onhandleclick}>Add Note</button>
        </form>
      </div>      
    </div>
    </div>
  )
}

export default AddNote;