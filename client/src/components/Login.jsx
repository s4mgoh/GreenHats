import React, { useState } from "react";
function Login({ setScreen, setUser, supabase }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Supabase login error:", error);
        alert(error.message); // Use alert for errors
      } else {
        console.log("Login successful:", data.user);
        setUser(data.user); // Set the user state in App.jsx
        setScreen("landing"); // Redirect to home or another appropriate page
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("An unexpected error occurred."); // Use alert for general errors
    }
  };

  return (
    <div className="login-page">
      <div className="wrapper">
        <h2>Login</h2>
        <form>
          <div className="input-field">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className="input-field">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label htmlFor="password">Password</label>
          </div>
          <button type="button" onClick={handleLogin}>Login</button>
        </form>
        <div className="register">
          <p>Don't have an account?</p>
          <a href="#" onClick={() => setScreen("signup")}>Sign up</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
