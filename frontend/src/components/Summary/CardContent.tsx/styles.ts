import styled from "styled-components";

export const CardContainer = styled.main`
    header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: ${(props) => props.theme['gray-300']};

        @media (max-width: 481px) {
        font-size: 1rem;
        }

        i {
        @media (max-width: 481px) {
            font-size: 0.2rem;
        }
        }
    }

  strong {
    display: block;
    margin-top: 1rem;
    font-size: 2rem;

    @media (max-width: 481px) {
      font-size: 1.2rem;
    }
  }
`