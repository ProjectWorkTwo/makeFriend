import styled from "styled-components";

const Form = styled.div`
  width: 100%;
  max-width: 450px;
  text-align: center;

  h1 {
    font-size: 25px;
    padding-bottom: 15px;
    color: var(--primaryColor);
  }

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 15px;

    input,
    select {
      width: 100%;
      text-align: center;
      padding: 8px 15px;
      font-size: 16px;
      border-radius: 5px;
      background: transparent;
      border: 2px solid var(--primaryColor);
      color: var(--primaryColor);
    }

    .dobGender {
      display: flex;
      gap: 10px;

      .inputWrapper {
        display: flex;
        flex-direction: column;
        width: 100%;
        align-items: flex-start;
        gap: 5px;

        select {
          width: 100%;
          height: 100%;

          option {
            background: var(--secondaryColor);
            color: var(--primaryColor);

            &:active,
            &:hover {
              background: var(--primaryColor);
              color: var(--secondaryColor);
            }
          }
        }
      }
    }

    p {
      text-decoration: underline;
      cursor: pointer;
      color: var(--primaryColor);
    }
  }
`;


export default Form;