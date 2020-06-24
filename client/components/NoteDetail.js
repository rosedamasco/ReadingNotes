import React from 'react';

const NoteDetail = (props) => {
  return (
    <div>
      <span>{props.loc}</span>
      <span>{props.note}</span>
    </div>
  );
};

export default NoteDetail;
