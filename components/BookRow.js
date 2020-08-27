import React from 'react';

const BookRow = (props) => {
  return (
    <a className="row" href={`/book/${props.id}`}>
      <div>
        <img className="bookImg" src={props.imgURL} />
      </div>
      <div>{props.title}</div>
      <div>
        <img src="../../assets/img/arrow.png" />
      </div>
    </a>
  );
};

export default BookRow;
