import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing: 0;   
    }

    :focus{
        outline: 0;
        box-shadow: 0 0 0 2px '#7C7C8A';
    }

    body{
        background-color: #202024;
        color: #E1E1E6;
        -webkit-font-smoothing: antialised;
    }

    body, input, textarea, button{
        font: 400, 1rem Roboto, sans-serif; 
    } 
`

export { GlobalStyle };
