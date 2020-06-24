import React, { useState, useEffect } from 'react';
import BookDetail from './BookDetail';

const Shelf = () => {
  const [bookshelf, setBookshelf] = useState([]);
  useEffect(() => {
    fetch('/shelf/to-read')
      .then((response) => response.json())
      .then(({ books }) => {
        const updatedBookshelf = [];
        books.forEach((book) => {
          console.log(book.title);
          updatedBookshelf.push(<BookDetail title={book.title} img={book.imgURL} />);
        });
        setBookshelf(updatedBookshelf);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <h1>Bookshelf</h1>
      {bookshelf}
      {/* <h1>Book Shelves</h1>
        <form method="GET" action="/shelf/read">
          <input type="submit" value="Get Books on Read Shelf" />
        </form>

        <form method="GET" action="/shelf/currently-reading">
          <input type="submit" value="Get Books on Currently Reading Shelf" />
        </form>

        <form method="GET" action="/shelf/to-read">
          <input type="submit" value="Get Books on To-Read Shelf" />
        </form> */}
    </div>
  );
};

export default Shelf;
