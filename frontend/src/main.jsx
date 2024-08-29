import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Routes from './routes'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Routes />
  </StrictMode>,
)