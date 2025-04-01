
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

const App = () => {
  return (
    <div className="p-6 text-center">
      <img src="/logo.png" alt="Tilt Nation Logo" className="mx-auto w-32 h-32" />
      <h1 className="text-2xl font-bold mt-4">Tilt Nation</h1>
      <p className="text-gray-600 mt-2">Bienvenue sur la plateforme de suivi de vos soirées poker.</p>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
