import styled, { css }  from "styled-components";


export const CardTransactionContainer = styled.main`
    display: flex;
    width: 100%;
    max-width: 1120px;
    margin: 0 auto;
    margin-top: 20px;
    padding: 0 1.5rem;
`
interface CardContentProps {
    variant?: 'green' | 'red'
}
  
export const CardContent = styled.div`
    display:  flex;
    flex-direction: row;
    justify-content: space-around;
    width: 90%;
    margin: 0 auto;
    padding: 0.8rem;
    border-radius: 6px;
    align-items: center;   
    background-color: ${(props) => props.theme['gray-900']}; 
    
    p{
        @media (max-width: 441px) {
            font-size: 13px;
        }
    }
`

export const ColoredContent = styled.p<CardContentProps>`
    ${(props) => props.variant === 'green' && css` color: ${props.theme['green-700']};`}
    ${(props) => props.variant === 'red' && css` color: ${props.theme['red-500']};`}
`