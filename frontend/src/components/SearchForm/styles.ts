import styled from "styled-components";

export const SearchFormContainer = styled.main`
    display: flex;
    flex-direction: row;
    max-width: 1120px;
    margin: 0 auto;
    gap: 1rem;
    width: 100%;
    padding: 0 1.5rem;
    margin-top: 20px;

    @media (max-width: 441px) {
      display: flex;
      margin: 0 auto;
      margin-top: 20px;
    }

    button {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    border: 0;
    padding: 1rem;
    background: transparent;
    border: 1px solid ${(props) => props.theme['green-300']};
    color: ${(props) => props.theme['green-300']};
    font-weight: bold;
    border-radius: 6px;
    cursor: pointer;

    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }

    &:not(:disabled):hover {
      background: ${(props) => props.theme['green-500']};
      border-color: 1px solid ${(props) => props.theme['green-500']};
      color: ${(props) => props.theme.white};
      transition: background-color 0.2s, color 0, 2s, border-color 0, 2s;
    }
  }
`

export const SearchFormButtons = styled.button`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  border: 0;
  padding: 1rem;
  background: transparent;
  color: ${(props) => props.theme['red-300']};
  font-weight: bold;
  cursor: pointer;
 
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    background: ${(props) => props.theme['green-500']};
    border-color: 1px solid ${(props) => props.theme['green-500']};
    color: ${(props) => props.theme.white};
    transition: background-color 0.2s, color 0, 2s;
  }

  @media (max-width: 441px) {
    font-size: 14px;
  }
`