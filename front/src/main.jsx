import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx'
import './index.css'
import {GoogleOAuthProvider} from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
        <GoogleOAuthProvider clientId="300401840037-rnfvf6ucua95aufhljvt5g5orlbkrp4m.apps.googleusercontent.com">
            <App />
        </GoogleOAuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)

// 300401840037-rnfvf6ucua95aufhljvt5g5orlbkrp4m.apps.googleusercontent.com
// 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