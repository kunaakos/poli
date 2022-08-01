import { GlobalStyles } from '@pol/ui'
import { StrictMode } from 'react'
import * as ReactDOM from 'react-dom/client'

import { App } from './App'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <StrictMode>
        <GlobalStyles />
        <App />
    </StrictMode>,
)
