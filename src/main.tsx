import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'
import { Analytics } from '@vercel/analytics/react'
import './index.css'
import { TRPCProvider } from "@/providers/trpc"
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleReCaptchaProvider
      reCaptchaKey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
      scriptProps={{ async: true, defer: true }}
    >
      <BrowserRouter>
        <TRPCProvider>
          <App />
          <Analytics />
        </TRPCProvider>
      </BrowserRouter>
    </GoogleReCaptchaProvider>
  </StrictMode>,
)
