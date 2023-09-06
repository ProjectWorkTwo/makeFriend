import styled from "styled-components";

const UploadImgLabel = styled.label`
  width: 100%;
  padding: 12px 20px;
  background: var(--primaryColor);
  color: var(--secondaryColor);
  text-transform: capitalize;
  font-size: 16px;
  letter-spacing: 1.4px;
  cursor: pointer;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: 0.3s ease;

  svg {
    font-size: 25px;
  }

  &:hover {
    background: var(--primaryColor500);
  }
`;
export default UploadImgLabel;