import React, { useState, useEffect } from 'react';
import BookRow from './BookRow';

const Shelf = () => {
  const shelfName = window.location.pathname.split('/')[2];
  const [shelfPage, setShelfPage] = useState(1);
  const [bookRows, setBookRows] = useState([<h3>Loading...</h3>]);

  const tempBook = [];

  const fetchBooks = (newShelfPage) => {
    fetch(`/gr/shelf/${shelfName}/${newShelfPage}`)
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

  useEffect(() => fetchBooks(shelfPage), []);

  const prevPage = () => {
    if (shelfPage <= 1) return;
    fetchBooks(shelfPage - 1);
    setShelfPage(shelfPage - 1);
    return;
  };

  const nextPage = () => {
    if (bookRows.length < 10) return;
    fetchBooks(shelfPage + 1);
    setShelfPage(shelfPage + 1);
    return;
  };

  return (
    <div>
      <h2>Shelf: {shelfName}</h2>
      {bookRows}
      <div>
        <span onClick={prevPage}>{'<< Prev Page'}</span>
        <span onClick={nextPage}>{'NextPage >>'}</span>
      </div>
    </div>
  );
};

export default Shelf;
