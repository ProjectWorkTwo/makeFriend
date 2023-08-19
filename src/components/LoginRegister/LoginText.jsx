import React from 'react'
import styled from 'styled-components'

import textBg from '../../assets/loginTextBg.jpg'

const LoginText = () => {
  return (
    <LoginTextStyle>
      <div className='content'>
        <h1>MakeFriend</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita nostrum voluptates, ducimus numquam fugiat officiis quaerat nemo, sit, aliquid repellat voluptatum doloremque deserunt sunt explicabo!</p>
      </div>
    </LoginTextStyle>
  )
}

export default LoginText

const LoginTextStyle = styled.div`
  width: 100%;
  background: var(--primaryColor);
  color: var(--secondaryColor);
  border-radius: 5px;
  overflow: hidden;
  height: 100%;
  background: url(${textBg});
  background-size: cover;
  background-position: center center;
  background-attachment: fixed;
  
  @media (max-width: 991px) {
    order : 2;
  }

  .content{
    background: rgba(0, 0, 0, 0.8);
    padding: 25px;
    height: 100%;
    display: grid;
    align-content: center;

    h1{
      font-size: 30px;
      padding-bottom: 15px;
    }
  }

`