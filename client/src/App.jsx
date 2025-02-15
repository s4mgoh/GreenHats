import { useState } from "react";

import "./App.css";
import Home from "./components/Home";
import Signup from "./components/Signup";


function App() {
  const [screen, setScreen] = useState("home");

  return (
    <>
      <div>
        {/* if screen is home, show home */}
        {screen === "home" && <Home setScreen={setScreen} />}

        {/* if screen is signup, show signup */}
        {screen === "signup" && <Signup />}
      </div>
    </>
  );
}

export default App;