import React from 'react';

const ShelfDetail = (props) => {
  return (
    <div>
      <button className="row" onClick={() => props.handleClick(props.name)}>
        <span>
          <img src={props.img} alt="Shelf Cover" />
        </span>
        <span>{props.name}</span>
        <span>{`(${props.bookCount})`}</span>
      </button>
    </div>
  );
};

export default ShelfDetail;
