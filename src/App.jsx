import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import DonorRegister from './pages/DonorRegister'
import HospitalNeed from './pages/HospitalNeed'
import NeedsList from './pages/NeedsList'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Admin from './pages/Admin'
import NotFound from './pages/NotFound'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/inscription" element={<DonorRegister />} />
          <Route path="/hopital" element={<HospitalNeed />} />
          <Route path="/besoins" element={<NeedsList />} />
          <Route path="/connexion" element={<Login />} />
          <Route path="/profil" element={<Profile />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App