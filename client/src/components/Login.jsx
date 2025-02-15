import React from "react";

function Login({setScreen}) {
  const handleLoginClick = () => {
    setScreen("Login");

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
  };
  return (
    // <div>
    //   <h1>Login Test Page</h1>

    //   <button onClick={handleLoginClick}>Login</button>
    // </div>
    
    
  );
}}

export default Login;
