import styled from 'styled-components'
import { containerStyles } from './Container'

export const Header = styled.header`
    ${containerStyles}
    margin-bottom: 4rem;
    font-family: 'Montserrat', 'Poppins', var(--font-family);

    @media (max-width: 756px) {
        margin-bottom: 2rem;
    }
`
