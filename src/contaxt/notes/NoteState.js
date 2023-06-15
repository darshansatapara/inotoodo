import { useState } from "react";
import noteContaxt from "./noteContaxt";


const NoteState= (props)=>{
    const notesInitial=[
        {
            "_id": "64881332e5d811b36e778e75",
            "user": "64831c1844fa97ac8d221ec4",
            "title": "my 2 title",
            "description": "hey this is is first time to wright. ",
            "tag": "1",
            "__v": 0
          },
        {
            "_id": "64881332e5d811b36e778e70",
            "user": "64831c1844fa97ac8d221ec4",
            "title": "my 2 title",
            "description": "hey this is is first time to wright. ",
            "tag": "1",
            "__v": 0
          },
        {
            "_id": "64881332e5d811b36e778e88",
            "user": "64831c1844fa97ac8d221ec4",
            "title": "my 2 title",
            "description": "hey this is is first time to wright. ",
            "tag": "1",
            "__v": 0
          },
          {
            "_id": "6489cd53ee4a274edbbe6665",
            "user": "64831c1844fa97ac8d221ec4",
            "title": "my 22 title",
            "description": "hey  i wish you all the best. ",
            "tag": "11",
            "__v": 0
          },
          {
            "_id": "6489cd55ee4a274edbbe6667",
            "user": "64831c1844fa97ac8d221ec4",
            "title": "my 22 title",
            "description": "hey  i wish you all the best. ",
            "tag": "11",
            "__v": 0
          },
    ]

    const [notes , setnotes] = useState(notesInitial);

    return(
            <noteContaxt.Provider value={{notes,setnotes}}>
                {props.children}
            </noteContaxt.Provider>
    )
}

export default NoteState;