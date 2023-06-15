import Notes from './Notes';
import React from 'react';

const Home = () => {

  return (
    <div className='container'>
      <div className='container my-3'>
        <form>
          <h2>Add a Note</h2>
          <div className="mb-3">
            <label htmlFor="Title" className="form-label">Title</label>
            <input type="text" className="form-control" id="Title" />

          </div>
          <div className="mb-3">
            <label htmlFor="Description" className="form-label">Description</label>
            <input type="text" className="form-control" id="Description" />
          </div>
          <button type="submit" className="btn btn-primary my-2">Add Note</button>
        </form>
      </div>      
    <Notes/>
    </div>
  )
}

export default Home