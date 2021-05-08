import styled from "styled-components";

export const ContainerModal = styled.div`
  background-color: rgba(242, 245, 245, 0.8);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 20000;

  .content {
    background-color: #fff;
    width: 100%;
    max-width: 400px;
    padding: 2rem 3rem;
    border-radius: 5px;
    box-shadow: 0 0 60px rgba(0, 0, 0, 0.05);
    text-align: center;
    position: relative;
  }
  .close-modal {
    position: absolute;
    top: 0;
    right: 0;
    margin: 0.5rem;
  }
  .wrapper-delete {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 2rem;
  }
  .wrapper-delete h3 {
    color: #666666;
    font-family: Inter, sans-serif;
    font-size: 1.1rem;
  }
  .wrapper-delete .content-button {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  .wrapper-delete .content-button button {
    margin: 1rem;
  }
`;
