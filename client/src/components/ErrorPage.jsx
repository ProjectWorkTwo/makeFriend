import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Button from "./styles/Button";

const ErrorPage = () => {
  return (
    <ErrorPageStyle>
      <div className="content">
        <h1>Error 404 Page Not found</h1>
        <Link to="/">
          <Button>Go to Home Page</Button>
        </Link>
      </div>
    </ErrorPageStyle>
  );
};

export default ErrorPage;

const ErrorPageStyle = styled.section`
  width: 100%;
  min-height: 100vh;
  display: grid;
  place-items: center;

  .content{
    display: flex;
    flex-direction: column;
    gap: 20px;
    text-align: center;

    h1{
      font-size: 40px;
      color: var(--primaryColor);
    }
  }
`;
