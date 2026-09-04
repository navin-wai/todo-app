import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Home";
import Signup from "./Signup";
import Signin from "./Signin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Signin" element={<Signin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
