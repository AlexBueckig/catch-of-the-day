import React, { FC } from 'react';

interface IProps {
  authenticate: (provider: string) => void;
}

const Login: FC<IProps> = ({ authenticate }) => {
  return (
    <nav className="login">
      <h2>Inventory Login</h2>
      <p>Sign in to mangage you store's inventory.</p>
      <button
        className="twitter"
        onClick={() => {
          authenticate('Twitter');
        }}
      >
        Log In with Twitter
      </button>
      <button
        className="github"
        onClick={() => {
          authenticate('Github');
        }}
      >
        Log In with Github
      </button>
      <button
        className="google"
        onClick={() => {
          authenticate('Google');
        }}
      >
        Log In with Google
      </button>
    </nav>
  );
};

export default Login;
