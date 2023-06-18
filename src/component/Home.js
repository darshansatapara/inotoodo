

import React from 'react';
import Notes from './notes';

const Home = (props) => {

  return (
    <> 
    <Notes showAlert={props.showAlert} />
    </>
  )
}

export default Home