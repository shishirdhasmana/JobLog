import "./App.css";
import NavBar from "./components/navBar/Navbar";
import { useState, useEffect } from "react";
import Jobs from "./pages/Jobs";
import About from "./pages/About";
import LogIn from "./pages/LogIn";
import Register from "./pages/Register";
import { Routes, Route } from "react-router-dom";
function App() {
  const [logedIn, setLogIn] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setLogIn(true);
    }
  }, []);
  return (
    <>
      <div>
        <NavBar logedIn={logedIn} setLogIn={setLogIn} />
        <Routes>
          <Route path="/" element={<Jobs />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/login"
            element={<LogIn logedIn={logedIn} setLogIn={setLogIn} />}
          />
          <Route
            path="/register"
            element={<Register logedIn={logedIn} setLogIn={setLogIn} />}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
