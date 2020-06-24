import React from 'react';

const Book = (props) => {
  return (
    <div>
      <div>
        <img src={props.img} alt="Book Cover" />
        <h1>{props.title}</h1>
      </div>
      <div>
        <input type="number" />
        <textarea />
        <button>Save</button>
      </div>
    </div>
  );
};

export default Book;
