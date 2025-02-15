import React, { useState } from "react";

function Signup({ setScreen }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);
        // Authentication logic would go here
        setLoading(false);
        alert("Signup successful! Check your email to verify your account.");
        setScreen("login"); // Redirect to Login after signing up
    };

    return (
        <div className="signup-page">
            <div className="wrapper">
                <form onSubmit={handleSignup}>
                    <h2>Sign Up</h2>
                    <div className="input-field">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <label>Enter your email</label>
                    </div>
                    <div className="input-field">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <label>Enter your password</label>
                    </div>
                    <div className="forget">
                        <label htmlFor="remember">
                            <input
                                type="checkbox"
                                id="remember"
                                checked={rememberMe}
                                onChange={() => setRememberMe(!rememberMe)}
                            />
                            <p>Remember me</p>
                        </label>
                        <a href="#">Forgot password?</a>
                    </div>
                    <button type="submit" disabled={loading}>
                        {loading ? "Signing up..." : "Sign Up"}
                    </button>
                    <button type="button" onClick={() => setScreen("landing")}>Go to Home</button>
                    <div className="register">
                        <p>Already have an account? <a href="#" onClick={() => setScreen("login")}>Login</a></p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;
