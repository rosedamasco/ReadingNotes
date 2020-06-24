import React, { useState, useEffect } from 'react';
import BookDetail from './BookDetail';

const Shelf = (props) => {
  const [booksOnShelf, setBooksOnShelf] = useState([]);

  useEffect(() => {
    fetch(`/getshelf/${props.name}`)
      .then((response) => response.json())
      .then(({ books }) => {
        const updatedBookshelf = [];
        books.forEach((book) => {
          console.log(book.title);
          updatedBookshelf.push(
            <BookDetail title={book.title} img={book.imgURL} handleClick={props.handleClickBook} />
          );
        });
        setBooksOnShelf(updatedBookshelf);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h1>{`${props.name} Bookshelf`}</h1>
      {booksOnShelf}
    </div>
  );
};

export default Shelf;
