import { MainContainer } from './Container'
import { Header } from './Header'

type DefaultLayoutProps = {
    children: React.ReactNode
}

export const DefaultLayout = ({ children }: DefaultLayoutProps) => (
    <>
        <Header>
            <h1>Expenses</h1>
        </Header>
        <MainContainer>{children}</MainContainer>
    </>
)
