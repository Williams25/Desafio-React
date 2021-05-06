import styled from "styled-components";

export const Header = styled.header`
  position: relative;
  display: flex;
  flex-direction: column;

  button {
    position: absolute;
    right: 0;
    top: 0;
    margin: 0;
    width: 2rem;
    height: 2rem;

    display: flex;
    justify-content: center;
    align-items: center;

    background-color: transparent;
    outline: none;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      background-color: #f4f7f7;
    }
  }

  h1 {
    font-family: Inter, sans-serif;
    font-size: 2rem;
    color: #666666;
  }
`;
