import React from 'react';

const BookDetail = (props) => {
  console.log(props);
  return (
    <div>
      <button
        className="row"
        onClick={() => props.handleClick({ title: props.title, img: props.img })}
      >
        <span>
          <img src={props.img} alt="Book Cover" />
        </span>
        <span>{props.title}</span>
      </button>
    </div>
  );
};

export default BookDetail;
