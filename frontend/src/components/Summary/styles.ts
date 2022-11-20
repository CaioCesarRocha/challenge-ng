import styled, { css } from 'styled-components'

export const SummaryContainer = styled.section`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  margin-top: -5rem;

  @media (max-width: 769px) {
    grid-template-columns: repeat(2, 1fr);
  }
`
interface SummaryCardProps {
  variant?: 'green' | 'red' | 'blue'
}

export const SummaryCard = styled.div<SummaryCardProps>`
  background: ${(props) => props.theme['gray-600']};
  border-radius: 6px;
  padding: 2rem;

  @media (max-width: 481px) {
    padding: 1rem;
  }

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

  ${(props) => props.variant === 'green' && css` background: ${props.theme['green-700']};`}
  ${(props) => props.variant === 'red' && css` background: #8a2730`}
  ${(props) => props.variant === 'blue' && css` background: #1453b8`}
`
