import { useState } from "react";

import "./App.css";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";


function App() {
  const [screen, setScreen] = useState("home");

  return (
    <>
      <div>
        {/* if screen is home, show home */}
        {screen === "home" && <Home setScreen={setScreen} />}

        {/* if screen is signup, show signup */}
        {screen === "signup" && <Signup />}

        {/* if screen is login, show login */}
        {screen === "login" && <Login setScreen={setScreen}/>}
      </div>
    </>
  );
}

export default App;