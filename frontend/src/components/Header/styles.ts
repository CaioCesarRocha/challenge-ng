import styled from 'styled-components'

export const HeaderContainer = styled.header`
  background: ${(props) => props.theme['gray-900']};
  padding: 2.5rem 0 7.5rem;
`

export const HeaderContent = styled.div`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  align-items: center;

  img {
    max-height: 75px;
  }
`

export const SecundaryHeaderContent = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  justify-content: flex-end;

  p{
    margin-right: 20px;
    font-size: 25px;
    justify-content: flex-end;

    @media (max-width: 441px) {
      display: flex;
      justify-content: flex-end;
      margin-right: 0;
    }
  }

  @media (max-width: 441px) {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }
`

export const NewDeliveryButton = styled.button`
  height: 50px;
  border: 0;
  background: ${(props) => props.theme['green-500']};
  color: ${(props) => props.theme.white};
  font-weight: bold;
  padding: 0 1.25rem;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background: ${(props) => props.theme['green-700']};
  }
`

export const LogoutButton = styled.button`
  height: 35px;
  border: 0;
  background: ${(props) => props.theme['red-500']};
  color: ${(props) => props.theme.white};
  font-weight: bold;
  padding: 0 1rem;
  border-radius: 15px;
  align-self: end;
  display: flex;
  text-align: center;
  align-items: center;
  cursor: pointer;

  @media (max-width: 441px) {
    font-size: 13px;
    margin-top: 10px;
  }

  &:hover {
    background: ${(props) => props.theme['red-700']};
  }
`
