import React from 'react';

const BookDetail = (props) => {
  console.log(props);
  return (
    <div>
      <button className="row">
        <span>
          <img src={props.img} alt="Book Cover" />
        </span>
        <span>{props.title}</span>
      </button>
    </div>
  );
};

export default BookDetail;
