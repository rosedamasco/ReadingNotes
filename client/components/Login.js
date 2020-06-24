import React from 'react';

const Login = () => {
  return (
    <div>
      <h1>Reading Notes</h1>
      <form method="GET" action="/goodreads">
        <input type="submit" value="Login with GoodReads" />
      </form>
      <form method="GET" action="/shelves">
        <input type="submit" value="Get Shelves From GoodReads" />
      </form>
    </div>
  );
};

export default Login;
