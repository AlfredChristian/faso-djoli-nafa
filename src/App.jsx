import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import DonorRegister from './pages/DonorRegister'
import HospitalNeed from './pages/HospitalNeed'
import NeedsList from './pages/NeedsList'
import Login from './pages/Login'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inscription" element={<DonorRegister />} />
        <Route path="/hopital" element={<HospitalNeed />} />
        <Route path="/besoins" element={<NeedsList />} />
        <Route path="/connexion" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App