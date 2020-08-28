import React, { useState, useEffect } from 'react';
import BookRow from './BookRow';

const Shelf = () => {
  const shelfName = window.location.pathname.split('/')[2];
  const [shelfPage, setShelfPage] = useState(1);
  const [bookRows, setBookRows] = useState([<h3>Loading...</h3>]);

  const tempBook = [];

  const fetchBooks = () => {
    fetch(`/gr/shelf/${shelfName}/${shelfPage}`)
      .then((response) => response.json())
      .then(({ shelfBooks }) => {
        shelfBooks.forEach((book) => {
          tempBook.push(
            <BookRow key={`book-${book.id}`} id={book.id} title={book.title} imgURL={book.imgURL} />
          );
        });
        setBookRows(tempBook);
      });
  };

  useEffect(fetchBooks, []);

  const prevPage = () => {
    if (shelfPage <= 1) return;
    setShelfPage(shelfPage - 1);
    return fetchBooks();
  };

  const nextPage = () => {
    if (bookRows.length < 10) return;
    setShelfPage(shelfPage + 1);
    return fetchBooks();
  };

  return (
    <div>
      <h2>
        Shelf: {shelfName} - {shelfPage}
      </h2>
      {bookRows}
      <div>
        <span onClick={prevPage}>{'<< Prev Page'}</span>
        <span onClick={nextPage}>{'NextPage >>'}</span>
      </div>
    </div>
  );
};

export default Shelf;
