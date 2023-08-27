import React from 'react'
import { BiSolidErrorCircle } from 'react-icons/bi';
import styled from 'styled-components'

const ErrorMessage = ({message}) => {
  return (
    <ErrorMessageStyle>
      <BiSolidErrorCircle /> <span>{message}</span>
    </ErrorMessageStyle>
  )
}

export default ErrorMessage

const ErrorMessageStyle = styled.div`
    width: 100%;
    display: flex;
    gap: 10px;
    justify-content: center;
    align-items: center;
    font-size: 17px;
    user-select: none;
    color: var(--errorColor);
    font-weight: 400;

    svg{
        font-size: 25px;
    }
`