import "./App.css";
import ErrorPage from "./components/ErrorPage";
import Home from "./components/Home";
import LoginPage from "./components/LoginRegister/LoginPage";
import { Routes, Route } from "react-router-dom";
import Register from "./components/LoginRegister/Register";
import Login from "./components/LoginRegister/Login";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
};

export default App;
