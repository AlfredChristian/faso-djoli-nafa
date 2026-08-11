import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import DonorRegister from './pages/DonorRegister'
import HospitalNeed from './pages/HospitalNeed'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inscription" element={<DonorRegister />} />
        <Route path="/hopital" element={<HospitalNeed />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App