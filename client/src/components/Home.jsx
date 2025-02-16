import React, { useEffect, useRef } from "react";
import { FaFacebookF, FaInstagram, FaTelegramPlane, FaGithub } from 'react-icons/fa';
import Typed from "typed.js";

function Home({ setScreen }) {
  const handleSignupClick = () => {
    setScreen("signup");
  };

  const handleLoginClick = () => {
    setScreen("login");
  };

  // Create a reference for the element where the typed effect will happen
  const typedEl = useRef(null);

  useEffect(() => {
    // Initialize Typed.js when the component mounts
    const typed = new Typed(typedEl.current, {
      strings: ['Geeks Hacking <3', 'print(Hello World)', 'cat /flag.txt', 'Join the Geeks Hacking Community!', 'Meetups are waiting!'],
      typeSpeed: 100,
      backSpeed: 100,
      backDelay: 500,
      startDelay: 300,
      loop: true,  // Optional: this makes the text repeat after it finishes
    });

    // Cleanup the typed instance when the component unmounts
    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <div className="home-page" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <div className="auth-container" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        {/* Use the ref here to apply the Typed.js animation */}
        <h1>
          <span ref={typedEl} />
        </h1>
        <button className="signup-btn" onClick={handleSignupClick} style={{ width: "200px", height: "50px", marginBottom: "20px" }}>Sign up</button>
        <button className="login-btn" onClick={handleLoginClick} style={{ width: "200px", height: "50px" }}>Login</button>
      </div>

      {/* Social Media Icons in Bottom Left */}
      <div className="social-icons-container" style={{ position: "absolute", bottom: "20px", left: "20px" }}>
        <a href="https://www.facebook.com/GeeksHacking/" className="social-icon facebook" target="_blank" rel="noopener noreferrer" style={{ marginBottom: "5px" }}>
          <FaFacebookF />
        </a>
        <a href="https://www.instagram.com/geekshacking/" className="social-icon instagram" target="_blank" rel="noopener noreferrer">
          <FaInstagram />
        </a>
        <a href="https://t.me/joinchat/B5fU10aB8z_6tAf1YV8q7Q" className="social-icon telegram" target="_blank" rel="noopener noreferrer">
          <FaTelegramPlane />
        </a>
        <a href="https://github.com/geekshacking" className="social-icon github" target="_blank" rel="noopener noreferrer">
          <FaGithub />
        </a>
      </div>
    </div>
  );
}

export default Home;
