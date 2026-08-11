import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import DonorRegister from './pages/DonorRegister'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inscription" element={<DonorRegister />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App