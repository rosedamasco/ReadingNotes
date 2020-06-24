import React from 'react';

const Shelves = () => {
  return (
    <div>
      <h1>Book Shelves</h1>
      <form method="GET" action="/shelf/read">
        <input type="submit" value="Get Books on Read Shelf" />
      </form>

      <form method="GET" action="/shelf/currently-reading">
        <input type="submit" value="Get Books on Currently Reading Shelf" />
      </form>

      <form method="GET" action="/shelf/to-read">
        <input type="submit" value="Get Books on To-Read Shelf" />
      </form>
    </div>
  );
};

export default Shelves;
