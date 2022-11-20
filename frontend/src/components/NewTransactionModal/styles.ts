import styled from 'styled-components'
import * as Dialog from '@radix-ui/react-dialog'

export const Overlay = styled(Dialog.Overlay)`
  position: fixed;
  width: 100vw;
  height: 100vh;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
`

export const CloseButton = styled(Dialog.Close)`
  position: absolute;
  background: transparent;
  border: 0;
  top: 1.5rem;
  right: 1.5rem;
  line-height: 0;
  cursor: pointer;
  color: ${(props) => props.theme['gray-500']};
`

export const Content = styled(Dialog.Content)`
  min-width: 35rem;
  max-height: 80%;
  overflow: auto;
  border-radius: 6px;
  padding: 2.5rem 3rem;
  background: ${(props) => props.theme['gray-800']};
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  @media (max-width: 481px) {
    min-width: 20rem;
    padding: 2rem 1.1rem;
    justify-content: center;
    align-items: center;
  }

  h1{
    font-size: 25px;
    text-align: center;
    padding: 0;
  }

  form {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem; 
  }

  button[type='submit'] {
    height: 50px;
    width: 50%;
    border: 0;
    background: ${(props) => props.theme['green-500']};
    color: ${(props) => props.theme.white};
    font-weight: bold;
    padding: 0 1.25rem;
    border-radius: 6px;
    margin: 0 auto;
    margin-top: 0.8rem;
    cursor: pointer;
    text-align: center;

    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }

    &:not(:disabled):hover {
      background: ${(props) => props.theme['green-700']};
      transition: background-color 0.2s;
    }
  } 
`

export const ContainerInput = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.3rem;

  p{
    width: 15%;
  }

  input{
    border-radius: 6px;
    border: 0;
    background: ${(props) => props.theme['gray-900']};
    color: ${(props) => props.theme['gray-300']};
    padding: 1rem;
    margin-left: 15px;
    width: 90%;

    &::placeholder {
      color: ${(props) => props.theme['gray-500']};
    }
  }
`

export const ContentForm = styled.div`
  margin-top: 20px;
`

export const ContentLoading = styled.div`
  display: flex;
  font-size: 20px;
  text-align: center;
  justify-content: center;
  padding-left: 5px;

  i {
    color: ${(props) => props.theme['green-300']};
  }

  p {
    padding-top: 5px;
    padding-right: 5px;
  }
`