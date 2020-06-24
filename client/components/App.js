import React, { Component } from 'react';
import { Link, Switch, Route, Redirect } from 'react-router-dom';

import '../styles.css';

import Login from './Login';
import Shelves from './Shelves';
import Shelf from './Shelf';
import Book from './Book';
import Note from './Note';

// const App = () => {
//   return (
//     <div>
//       <Switch>
//         <Route component={Shelves} path="/shelves" />
//         <Route component={() => <Shelf name="read" />} path="/shelf" />
//         <Route component={Book} path="/book" />
//         <Route component={Note} path="/note" />
//         <Route component={Login} path="/" />}
//       </Switch>
//     </div>
//   );
// };

class App extends Component {
  constructor() {
    super();
    this.state = { shelf: '', book: { img: '', title: '' } };
    this.redirectShelf = false;
    this.redirectBook = false;
    this.handleClickShelf = this.handleClickShelf.bind(this);
    this.handleClickBook = this.handleClickBook.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(this.state.book);
    if (this.state.shelf !== prevState.shelf) {
      this.redirectShelf = true;
    }
    if (this.state.book.title !== prevState.book.title) {
      this.redirectBook = true;
    }
  }

  handleClickShelf(shelf) {
    this.setState({ shelf });
  }

  handleClickBook(book) {
    this.setState({ book });
  }

  render() {
    if (this.redirectShelf && !this.redirectBook) {
      this.redirectShelf = false;
      return <Shelf name={this.state.shelf} handleClickBook={this.handleClickBook} />;
    }

    if (this.redirectBook) {
      this.redirectBook = false;
      return <Book title={this.state.book.title} img={this.state.book.img} />;
    }
    return (
      <div>
        <Switch>
          <Route
            component={() => <Shelves handleClickShelf={this.handleClickShelf} />}
            path="/shelves"
          />
          <Route
            component={() => (
              <Shelf name={this.state.shelf} handleClickBook={this.handleClickBook} />
            )}
            path="/shelf"
          />
          <Route
            component={() => <Book title={this.state.book.title} img={this.state.book.img} />}
            path="/book"
          />
          <Route component={Note} path="/note" />
          <Route component={Login} path="/" />
        </Switch>
      </div>
    );
  }
}

export default App;
