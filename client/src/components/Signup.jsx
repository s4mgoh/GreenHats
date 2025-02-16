import React, { useState } from "react";

function Signup({ setScreen, supabase }) {
  const handleHome = () => {
    setScreen("home");
  };

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password: password, // Send plain text password to Supabase
        options: {
          data: {
            username: username,
            telegram_handle: telegramHandle, // Add Telegram handle here
          },
        },
      });

      if (error) {
        console.error("Supabase sign-up error:", error);
        alert(error.message); // Alert Supabase error message
      } else {
        console.log("Signup successful:", data);
        setScreen("login");
        alert(
          "Signup successful! You must verify your email before you can log in."
        );
      }
    } catch (err) {
      console.error("Signup error:", err);
      alert("An unexpected error occurred."); // Alert general error
    }
  };

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [telegramHandle, setTelegramHandle] = useState(""); // New state for Telegram handle

  return (
    <div className="signup-page">
      <div className="wrapper">
        <h2>Sign Up</h2>
        <form>
          <div className="input-field">
            <input
              type="email"
              required
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Email</label>
          </div>

          <div className="input-field">
            <input
              type="text"
              required
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label>Username</label>
          </div>

          <div className="input-field">
            <input
              type="password"
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>Password</label>
          </div>

          <div className="input-field">
            <input
              type="password"
              required
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <label>Confirm Password</label>
          </div>

          {/* New input field for Telegram handle */}
          <div className="input-field">
            <input
              type="text"
              placeholder="Telegram Handle"
              value={telegramHandle}
              onChange={(e) => setTelegramHandle(e.target.value)}
            />
            <label>Telegram Handle</label>
          </div>

          <button type="button" onClick={handleRegister}>
            Register
          </button>

          <div className="register">
            <p>
              Already have an account?{" "}
              <a href="#" onClick={() => setScreen("login")}>
                Login
              </a>
            </p>
          </div>

          <button type="button" onClick={handleHome}>
            Back to Home
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
