import styled from "styled-components";
import CloseIcon from "./CloseIcon";
const CloseIcon2 = styled.div`
  position: absolute;
  right: 22px;
  top: 22px;
  display: grid;
  place-items: center;
  height: 35px;
  width: 35px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0);
  transition: 0.15s ease-in-out;

  &:hover {
    background: rgba(255, 255, 255, 0.7);
  }

  svg {
    width: 25px;
    height: 25px;
    color: var(--whiteColor);
    cursor: pointer;
  }
`;

export default CloseIcon2;
