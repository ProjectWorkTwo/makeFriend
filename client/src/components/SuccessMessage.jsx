import React from "react";
import { FaCheck } from "react-icons/fa6";
import styled from "styled-components";

import PropTypes from "prop-types";

const SuccessMessage = ({ message }) => {
  return (
    <SuccessMessageStyle>
      <FaCheck /> <span>{message}</span>
    </SuccessMessageStyle>
  );
};

SuccessMessage.propTypes = {
  message: PropTypes.string,
};

export default SuccessMessage;

const SuccessMessageStyle = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
  font-size: 17px;
  user-select: none;
  color: var(--successColor);
  font-weight: 400;

  svg {
    font-size: 25px;
  }
`;
