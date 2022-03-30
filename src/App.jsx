import "./App.css";
import Home from "./pages/Home";
import Tables from "./pages/Tables";
import Login from "./pages/Login";
import { Route, Routes } from "react-router";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tables" element={<Tables />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
