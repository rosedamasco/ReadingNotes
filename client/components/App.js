import React, { useState, useEffect } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import Login from './Login';
import Shelves from './Shelves';
import Shelf from './Shelf';
import Book from './Book';
import About from './About';
import Search from './Search';
import Error from './Error';

const App = () => {
  const [isSignedIn, setSignedIn] = useState(false);

  useEffect(() => {
    const hasUserIdCookie = document.cookie.includes('userid');
    setSignedIn(hasUserIdCookie);
  }, []);

  const signout = () => {
    // delete cookie by setting expire date to past date
    document.cookie = 'userid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    setSignedIn(false);
  };

  const links = (
    <ul>
      {!isSignedIn && (
        <li>
          <Link to="/">Sign In</Link>
        </li>
      )}
      {isSignedIn && (
        <li>
          <Link to="/shelves">Shelves</Link>
        </li>
      )}
      <li>
        <Link to="/search">Search</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
      {isSignedIn && (
        <li>
          <Link to="/" onClick={signout}>
            Sign Out
          </Link>
        </li>
      )}
    </ul>
  );

  return (
    <div>
      <div id="header">
        <img src="../assets/img/logo.png" />
        <nav>{links}</nav>
      </div>
      <div id="below-header">
        <Switch>
          <Route component={Login} exact path="/" />
          <Route component={Shelves} path="/shelves" />
          <Route component={Shelf} path="/shelf" />
          <Route component={Book} path="/book" />
          <Route component={Search} path="/search" />
          <Route component={About} path="/about" />
          <Route component={Error} path="/" />
        </Switch>
      </div>
    </div>
  );
};

export default App;
