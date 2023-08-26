import "./App.css";
import ErrorPage from "./components/ErrorPage";
import Home from "./components/Home";
import LoginPage from "./components/LoginRegister/LoginPage";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
};

export default App;
