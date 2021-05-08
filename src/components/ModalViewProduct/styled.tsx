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
  .wrapper-view_product {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 2rem;
  }
  .wrapper-view_product h1 {
    color: #666666;
    font-family: Inter, sans-serif;
    font-size: 2rem;
  }
  .details {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 1rem;
  }
  .details span {
    color: #666666;
    font-family: Inter, sans-serif;
    font-size: 1rem;
    margin: 0.5rem;
  }
`;
