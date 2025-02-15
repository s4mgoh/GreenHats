// import React from "react";

// class Login extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       email: "",
//       password: "",
//     };
//   }

//   handleLogin = async () => {
//     const { email, password } = this.state;
//     const { setScreen, setUser, supabase } = this.props;

//     try {
//       const { data, error } = await supabase.auth.signInWithPassword({
//         email,
//         password,
//       });

//       if (error) {
//         console.error("Supabase login error:", error);
//         alert(error.message);
//       } else {
//         console.log("Login successful:", data.user);
//         setUser(data.user);

//         // Retrieve user details from USERS table
//         const { data: userData, error: userError } = await supabase
//           .from("USERS")
//           .select("USER_ID, USERNAME, EMAIL")
//           .eq("EMAIL", email)
//           .single();

//         if (userError) {
//           console.error("Database fetch error:", userError);
//         } else {
//           console.log("User details retrieved:", userData);
//         }

//         setScreen("landing");
//       }
//     } catch (err) {
//       console.error("Login error:", err);
//       alert("An unexpected error occurred.");
//     }
//   };

//   render() {
//     const containerStyle = {
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center",
//       height: "100vh",
//       backgroundColor: "#f0f2f5",
//     };

//     const formStyle = {
//       backgroundColor: "white",
//       padding: "20px",
//       borderRadius: "8px",
//       boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//       width: "300px",
//       textAlign: "center",
//     };

//     const inputStyle = {
//       width: "100%",
//       padding: "10px",
//       margin: "10px 0",
//       border: "1px solid #ccc",
//       borderRadius: "4px",
//     };

//     const buttonStyle = {
//       width: "100%",
//       padding: "10px",
//       margin: "10px 0",
//       border: "none",
//       borderRadius: "4px",
//       cursor: "pointer",
//     };

//     const loginButtonStyle = {
//       ...buttonStyle,
//       backgroundColor: "#007bff",
//       color: "white",
//     };

//     const signupButtonStyle = {
//       ...buttonStyle,
//       backgroundColor: "#6c757d",
//       color: "white",
//     };

//     return (
//       <div style={containerStyle}>
//         <div style={formStyle}>
//           <h2>Login</h2>
//           <input
//             type="email"
//             placeholder="Email"
//             value={this.state.email}
//             onChange={(e) => this.setState({ email: e.target.value })}
//             style={inputStyle}
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={this.state.password}
//             onChange={(e) => this.setState({ password: e.target.value })}
//             style={inputStyle}
//           />
//           <button onClick={this.handleLogin} style={loginButtonStyle}>
//             Login
//           </button>
//           <button
//             onClick={() => this.props.setScreen("signup")}
//             style={signupButtonStyle}
//           >
//             Go to Signup
//           </button>
//         </div>
//       </div>
//     );
//   }
// }

// export default Login;



import React from "react";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  handleLogin = async () => {
    const { email, password } = this.state;
    const { setScreen, setUser, supabase } = this.props;

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Supabase login error:", error);
        alert(error.message);
      } else {
        console.log("Login successful:", data.user);
        setUser(data.user);

        // Retrieve user details from USERS table
        const { data: userData, error: userError } = await supabase
          .from("USERS")
          .select("USER_ID, USERNAME, EMAIL")
          .eq("EMAIL", email)
          .single();

        if (userError) {
          console.error("Database fetch error:", userError);
        } else {
          console.log("User details retrieved:", userData);
        }

        setScreen("landing");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("An unexpected error occurred."); 
    }
  };

  render() {
    return (
      <div className="login-page">
      <div className="wrapper">
        <form action="#">
          <h2>Login</h2>
          <div className="input-field">
            <input
              type="email"
              required
              value={this.state.email}
              onChange={(e) => this.setState({ email: e.target.value })}
            />
            <label>Enter your email</label>
          </div>
          <div className="input-field">
            <input
              type="password"
              required
              value={this.state.password}
              onChange={(e) => this.setState({ password: e.target.value })}
            />
            <label>Enter your password</label>
          </div>
          <div className="forget">
            <label htmlFor="remember">
              <input type="checkbox" id="remember" />
              <p>Remember me</p>
            </label>
            <a href="#">Forgot password?</a>
          </div>
          <button type="button" onClick={this.handleLogin}>
            Log In
          </button>
          <div className="register">
            <p>
              Don't have an account? <a onClick={() => this.props.setScreen("signup")}>Register</a>
            </p>
          </div>
        </form>
      </div>
      </div>
    );
  }
}

export default Login;
