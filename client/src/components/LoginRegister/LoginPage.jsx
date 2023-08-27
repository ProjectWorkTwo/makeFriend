import React, { useState } from "react";
import styled from "styled-components";
import LoginText from "./LoginText";
import Login from "./Login";
import Register from "./Register";

const LoginPage = () => {
  const [formSelector, setFormSelector] = useState(true);
  return (
    <Wrapper>
      <div className="container">
        <LoginText />
        {formSelector ? (
          <Login setFormSelector={setFormSelector}/>
        ) : (
          <Register setFormSelector={setFormSelector}/>
        )}
      </div>
    </Wrapper>
  );
};

export default LoginPage;

const Wrapper = styled.section`
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
