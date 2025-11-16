import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthPage from './Pages/AuthPage'
import './App.css'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AuthPage />} />
      </Routes >

    </BrowserRouter>
  )
}

export default App
