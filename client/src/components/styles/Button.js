import styled from 'styled-components';

const ButtonStyle = styled.button`
    padding: 8px 20px;
    background: var(--primaryColor);
    color: var(--secondaryColor);
    text-transform: capitalize;
    font-size: 16px;
    letter-spacing: 1.4px;
    cursor: pointer;
    border-radius: 5px;
    transition: 0.3s ease;

    &:hover{
        background: var(--primaryColor500);
    }
`

export default ButtonStyle;