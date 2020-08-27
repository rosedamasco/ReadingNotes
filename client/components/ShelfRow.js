import React from 'react';

const ShelfRow = (props) => {
  return (
    <a className="row" href={`/shelf/${props.name}`}>
      <div>
        <img src="../../assets/img/shelf.png" />
      </div>
      <div>{props.name}</div>
      <div>({props.bookCount})</div>
    </a>
  );
};

export default ShelfRow;
