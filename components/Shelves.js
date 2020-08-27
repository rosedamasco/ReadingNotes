import React, { useState, useEffect } from 'react';
import ShelfRow from './ShelfRow';

const Shelves = () => {
  const [shelfRows, setShelfRows] = useState([<h3>Loading...</h3>]);

  const tempShelf = [];
  useEffect(() => {
    fetch('/gr/shelves')
      .then((response) => response.json())
      .then(({ shelves }) => {
        shelves.forEach((shelf) => {
          tempShelf.push(
            <ShelfRow
              key={`shelf-${shelf.id}`}
              id={shelf.id}
              name={shelf.name}
              bookCount={shelf.bookCount}
            />
          );
        });
        setShelfRows(tempShelf);
      });
  }, []);

  return <div>{shelfRows}</div>;
};

export default Shelves;
