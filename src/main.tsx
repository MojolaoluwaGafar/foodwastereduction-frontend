import { StrictMode, type ReactNode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { GoogleOAuthProvider } from '@react-oauth/google'
import App from './App.tsx'
import { AuthProvider } from './Context/AuthContext.tsx'

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID

// Google's script only loads when a client ID is configured.
const WithGoogle = ({ children }: { children: ReactNode }) =>
  googleClientId ? <GoogleOAuthProvider clientId={googleClientId}>{children}</GoogleOAuthProvider> : <>{children}</>

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WithGoogle>
      <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </WithGoogle>
  </StrictMode>,
)
