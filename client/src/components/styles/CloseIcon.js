import styled from "styled-components";
const CloseIcon = styled.div`
  position: absolute;
  right: 20px;
  top: 20px;
  background: rgba(0, 0, 0, 0);
  display: grid;
  place-items: center;
  height: 35px;
  width: 35px;
  border-radius: 50%;
  transition: 0.15s ease-in-out;

  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }

  svg {
    width: 25px;
    height: 25px;
    color: var(--primaryColor);
    cursor: pointer;
  }
`;

export default CloseIcon;
