import React from 'react';

const NotesHeader = (props) => {
  return (
    <div>
      <div id="book-header">
        <img className="bookImg" src={props.imgURL} />
        <h2>{props.title}</h2>
      </div>
      <div className="note-row bold">
        <div>Loc</div>
        <div>Note</div>
        <div>Date</div>
      </div>
    </div>
  );
};

export default NotesHeader;
