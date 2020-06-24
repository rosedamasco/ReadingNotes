import React, { useState, useEffect } from 'react';
import NoteDetail from './NoteDetail';

const Book = (props) => {
  const [savedNotes, setSavedNotes] = useState([]);
  // const []
  // const [note, setNote] = useState([]);

  const handleSave = () => {
    const note = document.getElementById('newNote').value;
    const loc = document.getElementById('newLoc').value;
    const newSavedNotes = [...savedNotes, { note, loc }];
    setSavedNotes(newSavedNotes);
  };

  const notes = [];
  for (let i = 0; i < savedNotes.length; i += 1) {
    notes.push(<NoteDetail loc={savedNotes[i].loc} note={savedNotes[i].note} />);
  }
  return (
    <div>
      <div className="imgAndText">
        <img src={props.img} alt="Book Cover" />
        <h1>{props.title}</h1>
      </div>
      <div>{notes}</div>
      <div>
        <input id="newLoc" type="number" />
        <textarea id="newNote" />
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default Book;
