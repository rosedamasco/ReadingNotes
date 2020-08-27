import React, { useState, useEffect } from 'react';
import BookRow from './BookRow';

const Shelf = () => {
  const shelfName = window.location.pathname.split('/')[2];
  const [bookRows, setBookRows] = useState([<h3>Loading...</h3>]);

  const tempBook = [];
  useEffect(() => {
    fetch(`/gr/shelf/${shelfName}`)
      .then((response) => response.json())
      .then(({ shelfBooks }) => {
        shelfBooks.forEach((book) => {
          tempBook.push(
            <BookRow key={`book-${book.id}`} id={book.id} title={book.title} imgURL={book.imgURL} />
          );
        });
        setBookRows(tempBook);
      });
  }, []);

  return (
    <div>
      <h2>Shelf: {shelfName}</h2>
      {bookRows}
    </div>
  );
};

export default Shelf;
