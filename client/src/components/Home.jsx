import React from "react";
import { Link } from "react-router-dom";
import Button from "./styles/Button";

const Home = () => {
  return (
    <div style={{display: 'grid', placeContent: 'center', minHeight: '100vh', textAlign: 'center', gap: '20px'}}>
      <h1 style={{color: 'var(--primaryColor)'}}>Home Page</h1>
      <Link to="/login">
        <Button>Login Account</Button>
      </Link>
    </div>
  );
};

export default Home;
