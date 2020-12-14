import React, { useState } from 'react';

const Login = () => {
  const [buttonClicked, setButtonClicked] = useState(false);

  const login = () => {
    setButtonClicked(true);
    fetch('/oauth/login')
      .then((response) => response.json())
      .then((url) => {
        window.location = url;
      });
  };

  return (
    <div>
      <div>
        <h2>READING NOTES IS UNDER CONSTRUCTION</h2>
        <p>
          **Goodreads API is being retired, and developer keys are no longer being issued. Steps are
          being taken to refactor this application with this new information. Thank you for your
          patience.**
        </p>
      </div>
      {!buttonClicked && (
        <button id="login" onClick={login}>
          <img
            id="goodreadsLogo"
            src="https://s.gr-assets.com/assets/press/thumbnail_logo-a0e66b2e27d2b52773b0ddab4e10ea4a.jpg"
          />
        </button>
      )}
      {buttonClicked && <h3>Loading...</h3>}
    </div>
  );
};

export default Login;
