import "./App.css";
import NavBar from "./components/navBar/Navbar";
import { useState } from "react";
import Jobs from "./pages/Jobs";
import About from "./pages/About";
import LogIn from "./pages/LogIn";
import { Routes,Route } from "react-router-dom";
function App() {
  const [logedIn, setLogIn] = useState(false);
  return (
    <>
      <div>
        <NavBar logedIn={logedIn} setLogIn={setLogIn}/>
        <Routes>
          <Route path="/" element={
            // <NavBar logedIn={logedIn} setLogIn={setLogIn} />,
            <Jobs />}
          />
          <Route path="/about" element={
            // <NavBar logedIn={logedIn} setLogIn={setLogIn} />,
            <About />}
          />
          <Route path="/login" element={
            // <NavBar logedIn={logedIn} setLogIn={setLogIn}/>,
            <LogIn/>} />
        </Routes>
      </div>
    </>
  );
}

export default App;
