import styled from 'styled-components'

const LoaderOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.5);
`

const LdsDualRing = styled.div`
    display: inline-block;
    width: 80px;
    height: 80px;

    &::after {
        content: ' ';
        display: block;
        width: 64px;
        height: 64px;
        margin: 8px;
        border-radius: 50%;
        color: var(--color-blue);
        border: 6px solid var(--color-blue);
        border-color: var(--color-blue) transparent var(--color-blue) transparent;
        animation: lds-dual-ring 1.2s linear infinite;
    }

    @keyframes lds-dual-ring {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`

export const Loader = () => {
    return (
        <LoaderOverlay>
            <LdsDualRing />
        </LoaderOverlay>
    )
}
