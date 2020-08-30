import React, { useState, useEffect } from 'react';
import NoteRow from './NoteRow';
import BookNotesHeader from './BookNotesHeader';

const Book = () => {
  const id = window.location.pathname.split('/')[2];
  const [header, setHeaders] = useState([<h3>Loading Title...</h3>]);
  const [bookNotes, setBookNotes] = useState([<h3>Loading Notes...</h3>]);

  const [location, setLocation] = useState('');
  const [note, setNote] = useState('');

  const [locClass, setLocClass] = useState('');
  const [noteClass, setNoteClass] = useState('');

  useEffect(() => {
    fetch(`/gr/book/${id}`)
      .then((response) => response.json())
      .then(({ book, notes }) => {
        // add book header with image and title
        // and notes header (loc, note, date)
        setHeaders([
          <BookNotesHeader imgURL={book.imgURL} title={book.title} author={book.author} />,
        ]);
        // add notes
        const tempNotes = [];
        notes.forEach((oldNote) => {
          tempNotes.push(
            <NoteRow location={oldNote.location} note={oldNote.note} date={oldNote.date} />
          );
        });
        setBookNotes(tempNotes);
      });
  }, []);

  const updateLocation = (e) => {
    const tempLocation = e.target.value;
    setLocation(tempLocation);
  };

  const updateNote = (e) => {
    const tempNote = e.target.value;
    setNote(tempNote);
  };

  const saveNote = () => {
    // require location and note fields
    if (location === '') {
      setLocClass('missing-input');
      return;
    }
    if (note === '') {
      setNoteClass('missing-input');
      setLocClass('');
      return;
    }

    // update input fields to be clear and no red borders
    setLocClass('');
    setNoteClass('');
    setLocation('');
    setNote('');

    // add input to view
    const today = new Date();
    const date = `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`;
    const newNote = <NoteRow location={location} note={note} date={date} />;
    setBookNotes([...bookNotes, newNote]);

    // post new note to db
    fetch(`/gr/book`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, location, note, date }),
    });
  };

  return (
    <div>
      {header}
      <div id="notes">{bookNotes}</div>
      <div id="input-row">
        <input
          className={locClass}
          id="loc-input"
          type="number"
          placeholder="LOC"
          value={location}
          onChange={(e) => {
            updateLocation(e);
          }}
        />
        <textarea
          className={noteClass}
          type="text"
          placeholder="Your thoughts..."
          value={note}
          onChange={(e) => {
            updateNote(e);
          }}
        />
        <button onClick={saveNote}>Save</button>
      </div>
    </div>
  );
};

export default Book;
