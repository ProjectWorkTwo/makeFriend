import React, { useState } from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import LoginText from "./LoginText";
import Login from "./Login";
import Register from "./Register";

const LoginPage = () => {
  const [formSelector, setFormSelector] = useState(true);
  return (
    <FormMainWrapper>
      <div className="container">
        <Router>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
        </Router>
      </div>
    </FormMainWrapper>
  );
};

export default LoginPage;

const FormMainWrapper = styled.section`
  padding: 30px 0;
  width: 100%;
  min-height: 100vh;
  background: var(--secondaryColor);
  display: grid;
  place-items: center;

  .container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px 30px;
    place-items: center;

    @media (max-width: 991px) {
      grid-template-columns: 1fr;
    }
  }
`;
