import React from 'react';

const ShelfDetail = (props) => {
  return (
    <div>
      <button className="row">
        <span>
          <img src={props.img} alt="Shelf Cover" />
        </span>
        <span>{props.name}</span>
        <span>{props.bookCount}</span>
      </button>
    </div>
  );
};

export default ShelfDetail;
