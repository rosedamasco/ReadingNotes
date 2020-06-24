import React, { Component } from 'react';

class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <h1>Reading Notes</h1>
        <form method="GET" action="/goodreads">
          <input type="submit" value="Github" />
        </form>
      </div>
    );
  }
}

export default App;
