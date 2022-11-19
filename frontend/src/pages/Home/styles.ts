import styled from "styled-components";

export const CardContent = styled.div`
    display:  flex;
    flex-direction: row;
    justify-content: space-around;
    width: 100%;
    max-width: 1020px;
    margin: 0 auto;
    margin-top: 20px;
    padding: 0.8rem;
    border-radius: 6px;
    align-items: center;   
    background-color: ${(props) => props.theme['gray-900']};  
`