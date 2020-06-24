import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';

import '../styles.css';

import Login from './Login';
import Shelves from './Shelves';
import Shelf from './Shelf';
import Book from './Book';
import Note from './Note';

const App = () => {
  return (
    <div>
      <Switch>
        <Route component={Shelves} path="/shelves" />
        <Route component={Shelf} path="/shelf" />
        <Route component={Book} path="/book" />
        <Route component={Note} path="/note" />
        <Route component={Login} path="/" />
      </Switch>
    </div>
  );
};

export default App;
