import React from "react";

import { Link } from "react-router-dom";
import styled from "styled-components";
import CloseIcon from "./styles/CloseIcon";
import { FaXmark } from "react-icons/fa6";
import ButtonStyle from "./styles/Button";

const GoToLogin = ({setShowGoToLogin}) => {
  return (
    <GoToLoginWrapper>
      <div className="wrapper">
        <CloseIcon onClick={()=>{
          setShowGoToLogin(prev => false)
        }}>
          <FaXmark />
        </CloseIcon>
        <div className="content">
          <h2>You are not logged in</h2>
          <p>
            I think you are not logged in. Login your account or create an
            account to get access of all features
          </p>
          <div className="actions">
            <Link to="/login">
              <ButtonStyle>Login now</ButtonStyle>
            </Link>
            <Link to="/register">
              <ButtonStyle>Register now</ButtonStyle>
            </Link>
          </div>
        </div>
      </div>
    </GoToLoginWrapper>
  );
};

export default GoToLogin;

const GoToLoginWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  display: grid;
  place-items: center;
  position: fixed;
  top: 0;
  left: 0;

  .wrapper {
    position: relative;
    width: 90%;
    max-width: 500px;
    border-radius: 8px;
    background: #fff;
    padding: 40px 25px;
    text-align: center;
    display: grid;
    place-items: center;

    .content {
      padding: 20px 0;
      max-width: 400px;
      display: flex;
      flex-direction: column;
      gap: 20px;
      justify-content: space-around;
      align-items: center;

      p{
        max-width: 300px;
      }

      h2 {
        color: var(--primaryColor);
      }

      .actions{
        display: flex;
        justify-content: space-around;
        align-items: center;
        gap: 10px;
      }
    }
  }
`;
