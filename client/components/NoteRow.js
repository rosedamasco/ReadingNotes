import React from 'react';

const NoteRow = (props) => {
  return (
    <div className="note-row">
      <div>{props.location}</div>
      <div className="wrap-note">{props.note}</div>
      <div>{props.date}</div>
    </div>
  );
};

export default NoteRow;
