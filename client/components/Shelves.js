import React, { useState, useEffect } from 'react';
import ShelfDetail from './ShelfDetail';

const Shelves = () => {
  const [bookshelves, setBookshelves] = useState([]);

  useEffect(() => {
    fetch('/getshelves')
      .then((response) => response.json())
      .then(({ shelves }) => {
        const updatedBookshelves = [];
        shelves.forEach((shelf) => {
          updatedBookshelves.push(
            <ShelfDetail
              img="https://i.ibb.co/Xbqx60N/book.png"
              name={shelf.name}
              bookCount={shelf.bookCount}
            />
          );
        });
        setBookshelves(updatedBookshelves);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h1>Bookshelves</h1>
      {bookshelves}
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

export default Shelves;
