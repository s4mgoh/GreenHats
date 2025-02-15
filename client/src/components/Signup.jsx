// import React, { useState } from "react";

// function Signup({ setScreen, supabase }) {
//   const handleHome = () => {
//     setScreen("home");
//   };

//   const handleRegister = async () => {
//     if (password !== confirmPassword) {
//       alert("Passwords do not match");
//       return;
//     }

//     try {
//       const { data, error } = await supabase.auth.signUp({
//         email,
//         password,
//         options: {
//           data: {
//             username,
//           },
//         },
//       });

//       if (error) {
//         console.error("Supabase sign-up error:", error);
//         alert(error.message);
//       } else {
//         console.log("Signup successful:", data);
//         alert(
//           "Signup successful! You must verify your email before you can log in."
//         );

//         // Wait for email confirmation before inserting into USERS table
//         if (data.user) {
//           const { error: insertError } = await supabase.from("USERS").insert([
//             {
//               USERNAME: username,
//               PASSWORD: password, // Store hashed password in production!
//               EMAIL: email,
//               USER_ID: data.user.id, // Use the user ID from Supabase auth
//             },
//           ]);

//           if (insertError) {
//             console.error("Database insert error:", insertError);
//           } else {
//             console.log("User inserted into USERS table");
//           }
//         }
//         setScreen("login");
//       }
//     } catch (err) {
//       console.error("Signup error:", err);
//       alert("An unexpected error occurred.");
//     }
//   };

//   const [email, setEmail] = useState("");
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   return (
//     <div className="signup-page">
//       <div>
//         <h1>Greenhats welcome you!</h1>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Confirm Password"
//           value={confirmPassword}
//           onChange={(e) => setConfirmPassword(e.target.value)}
//         />
//         <button onClick={handleRegister}>Register</button>
//         <button onClick={handleHome}>Back</button>
//       </div>
//     </div>
//   );
// }

// export default Signup;




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
        password,
        options: {
          data: {
            username,
          },
        },
      });

      if (error) {
        console.error("Supabase sign-up error:", error);
        alert(error.message);
      } else {
        console.log("Signup successful:", data);
        alert(
          "Signup successful! You must verify your email before you can log in."
        );

        // Wait for email confirmation before inserting into USERS table
        if (data.user) {
          const { error: insertError } = await supabase.from("USERS").insert([
            {
              USERNAME: username,
              PASSWORD: password, // Store hashed password in production!
              EMAIL: email,
              USER_ID: data.user.id, // Use the user ID from Supabase auth
            },
          ]);

          if (insertError) {
            console.error("Database insert error:", insertError);
          } else {
            console.log("User inserted into USERS table");
          }
        }
        setScreen("login");
      }
    } catch (err) {
      console.error("Signup error:", err);
      alert("An unexpected error occurred.");
    }
  };

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div className="signup-page">
    <div className="wrapper">
      <form action="#">
        <h2>Signup</h2>
        <div className="input-field">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Enter your email</label>
        </div>
        <div className="input-field">
          <input
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Choose a username</label>
        </div>
        <div className="input-field">
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label>Enter your password</label>
        </div>
        <div className="input-field">
          <input
            type="password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <label>Confirm your password</label>
        </div>
        <button type="button" onClick={handleRegister}>
          Register
        </button>
        <div className="register">
          <p>
            Already have an account? <a onClick={() => setScreen("login")}>Login</a>
          </p>
        </div>
      </form>
    </div>
    </div>
  );
}

export default Signup;
