import styled from 'styled-components'
import * as Dialog from '@radix-ui/react-dialog'
import * as RadioGroup from '@radix-ui/react-radio-group'

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

export const DialogTitle = styled(Dialog.Title)`
  font-size: 22px;
  padding: 0;
`

export const DialogDescription = styled(Dialog.Description)`
  font-size: 16px;
  margin-top: 10px;
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

  form {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  button[type='submit'] {
    height: 58px;
    width: 80%;
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

export const TransactionType = styled(RadioGroup.Root)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-top: 0.5rem;

  @media (max-width: 481px) {
    //grid-template-columns: repeat(2, 1fr);
  }
`

export const TransactionTypeButton = styled(RadioGroup.Item)`
  background: ${(props) => props.theme['gray-700']};
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  cursor: pointer;
  border-radius: 6px;
  border: 0;
  color: ${(props) => props.theme['gray-300']};

  @media (max-width: 769px) {
    padding: 0.8rem;
    gap: 0.2rem;
    font-size: 14px;
  }

  @media (max-width: 481px) {
    padding: 0.6rem;
    font-size: 12px;
  }

  svg {
    color: ${(props) => props.theme['gray-300']};
  }

  &[data-state='unchecked']:hover {
    background-color: ${(props) => props.theme['gray-600']};
  }

  &[data-state='checked'] {
    color: ${(props) => props.theme.white};
    background-color: ${(props) => props.theme['green-300']};
    svg {
      color: ${(props) => props.theme.white};
    }
  }
`

export const Input = styled.input`
  border-radius: 6px;
  border: 0;
  background: ${(props) => props.theme['gray-700']};
  color: ${(props) => props.theme['gray-300']};
  padding: 1rem;
  width: 100%;

  &::placeholder {
    color: ${(props) => props.theme['gray-500']};
  }

  &[data-state='checked'] {
    color: ${(props) => props.theme.white};
    background-color: ${(props) => props.theme['green-300']};
    svg {
      color: ${(props) => props.theme.white};
    }
  }
`