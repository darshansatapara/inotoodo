import React,{useContext} from 'react'
import noteContaxt from '../contaxt/notes/noteContaxt';


const NoteItem = (props) => {
    const context = useContext(noteContaxt);
    const { deletenote } = context;
    const { note } = props;
    return (
        <div className='col-md-3 my-2'>
            <div className="card" >
                <div className="card-body" key={note.id}>

                    <div className="d-flex align-items-center">
                    <h5 className="card-title">{note.title}</h5>
                    <i className="fa-solid fa-trash-can mx-2" onClick={()=>{deletenote(note._id)} } ></i>
                    <i className="fa-regular fa-pen-to-square mx-2"></i>
                    </div>
                    <p className="card-text">{note.description}</p>
                </div>
            </div>
        </div>
    )
}

export default NoteItem