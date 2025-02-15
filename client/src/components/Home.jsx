import React from "react";

function Home({setScreen}) {
  const handleSignupClick = () => {
    setScreen("signup");
  };

  const handleLoginClick = () => {
    setScreen("login");
  };

  return (
    <div>
        <h1>Hello World!</h1>

        <button onClick={handleSignupClick}>Sign up</button>
        <button onClick={handleLoginClick}>Login</button>
      </div>
    );
  }

  export default Home;
