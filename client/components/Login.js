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
