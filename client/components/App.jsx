import React, { Component } from 'react';

function App() {
  return (
    <div>
      <h1>Reading Notes</h1>
      <form method="GET" action="/goodreads">
        <input type="submit" value="Login with GoodReads" />
      </form>

      <form method="GET" action="/shelves">
        <input type="submit" value="Get Shelves From GoodReads" />
      </form>

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
}

export default App;
