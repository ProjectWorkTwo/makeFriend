import styled from "styled-components";

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
export default FormMainWrapper