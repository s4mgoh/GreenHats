import React, {useState} from "react";

function Login({setScreen}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const handleLoginClick = () => {
        setScreen("landing");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add authentication logic here
        console.log("Email:", email);
        console.log("Password:", password);
    };

    return (
        <div className = "login-page">
            <div className="wrapper">
                <form onSubmit={handleSubmit}>
                    <h2>Login</h2>
                    <div className="input-field">
                        <input
                            type="text"
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
                    <button type="submit">Log In</button>
                    <button type="button" onClick={handleLoginClick}>Go to Home</button>
                    <div className="register">
                        <p>Don't have an account? <a href="#">Register</a></p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
