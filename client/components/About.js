import React from 'react';

const About = () => {
  return (
    <div id="about">
      <h2>About Reading Notes</h2>
      <p>
        Hello there! Thank you for coming to Reading Notes, a GoodReads companion application to jot
        down private notes about the books you're reading.
      </p>
      <br />
      <p>
        GoodReads does allow you to add private notes for each book on your shelf, but sometimes 512
        characters just isn't enough. I read so many books, so I personally like to jot down notes
        as I'm reading to remind myself later on if I loved a book by an author or not. This way, if
        I come across a fun synopsis, I can check real quick if I've enjoyed the writing style by
        that same author before.
      </p>
      <br />
      <p>
        Sign in via your GoodReads account and see all of your shelves and books. Pick a book and
        start noting your thoughts. Are you loving how the author describes the room so vividly that
        you can actually see it? Is the main character TSTL? Note any and all things you want to
        remember for later.
      </p>

      <h2>Future features:</h2>
      <ul>
        <li>View author name in book notes page</li>
        <li>Delete notes from a book</li>
        <li>Search for books on your bookshelf</li>
        <li>Search for authors on your bookshelf</li>
        <li>Rate the book from the book notes page</li>
        <li>Change the book's shelf</li>
      </ul>
      <br />
    </div>
  );
};

export default About;
