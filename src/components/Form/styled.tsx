import styled from "styled-components";

export const FormContent = styled.form`
  display: flex;
  flex-direction: column;
  height: 50vh;
  label {
    width: 100%;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    margin-bottom: 1.5rem;
    color: #666666;
    font-family: Inter, sans-serif;
    font-size: 1.1rem;
  }
  input,
  select {
    width: 100%;
    margin-top: 0.3rem;
    padding: 0.4rem;
    padding-left: 0.6rem;
    padding-right: 0.6rem;
    box-sizing: border-box;
    color: #666666;
    font-size: 1rem;
    font-family: Inter, sans-serif;

    outline: none;
    border: 2px solid transparent;
    border-radius: 5px;
    background: linear-gradient(
      90deg,
      rgba(242, 245, 245, 0.8) 0%,
      rgba(242, 245, 245, 0.4) 100%
    );
    box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
    transition: border 0.2s;

    &:hover, &:focus {
      border: 2px solid #cea2fd;
    }
  }

  button {
    width: 100%;
    padding: 0.3rem;
    border: 2px solid transparent;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
    font-family: Inter, sans-serif;

    color: #ffffff;
    background-color: #2aa9e0;
    transition: filter 0.2s;

    &:hover {
      filter: brightness(0.9);
    }
  }
  span {
    margin: 1rem;
    font-size: 1rem;
    color: #FA4224;
    font-family: Inter, sans-serif;
  }
`;
