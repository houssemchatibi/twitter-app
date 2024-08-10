import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SocketContextProvider } from './context/SocketContext.jsx'
import { NotificationContextProvider } from './context/NotificationContext.jsx'

// Create a client
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <SocketContextProvider>
        <NotificationContextProvider>
          <App />
          </NotificationContextProvider>
        </SocketContextProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
