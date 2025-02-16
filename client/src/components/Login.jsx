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
//     return (
//       <div className="login-page">
//       <div className="wrapper">
//         <form action="#">
//           <h2>Login</h2>
//           <div className="input-field">
//             <input
//               type="email"
//               required
//               value={this.state.email}
//               onChange={(e) => this.setState({ email: e.target.value })}
//             />
//             <label>Enter your email</label>
//           </div>
//           <div className="input-field">
//             <input
//               type="password"
//               required
//               value={this.state.password}
//               onChange={(e) => this.setState({ password: e.target.value })}
//             />
//             <label>Enter your password</label>
//           </div>
//           <div className="forget">
//             <label htmlFor="remember" >
//               <input type="checkbox" id="remember" />
//               <p>Remember me</p>
//             </label>
//             <a href="#">Forgot password?</a>
//           </div>
//           <button type="button" onClick={this.handleLogin}>
//             Log In
//           </button>
//           <div className="register">
//             <p>
//               Don't have an account? <a onClick={() => this.props.setScreen("signup")}>Register</a>
//             </p>
//           </div>
//         </form>
//       </div>
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
      rememberMe: false, // Added state for remember me checkbox
    };
  }

  handleLogin = async () => {
    const { email, password, rememberMe } = this.state;
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

  toggleRememberMe = () => {
    this.setState((prevState) => ({
      rememberMe: !prevState.rememberMe, // Toggle the rememberMe state
    }));
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
              <label htmlFor="remember" className="remember-label">
                <input
                  type="checkbox"
                  id="remember"
                  checked={this.state.rememberMe} // Bind checkbox state
                  onChange={this.toggleRememberMe} // Toggle state on checkbox change
                />
                <p 
                  style={{ cursor: 'pointer', display: 'inline' }} // Ensure cursor pointer on text
                >
                  Remember me
                </p>
              </label>
              <a href="#">Forgot password?</a>
            </div>
            <button type="button" onClick={this.handleLogin}>
              Log In
            </button>
            <div className="register">
              <p>
                Don't have an account?{" "}
                <a 
                  onClick={() => this.props.setScreen("signup")} 
                  style={{ cursor: 'pointer' }} // Ensure pointer cursor on text
                >
                  Register
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
