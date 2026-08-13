import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import AdminRoute from './components/AdminRoute'
import Home from './pages/Home'
import DonorRegister from './pages/DonorRegister'
import HospitalNeed from './pages/HospitalNeed'
import NeedsList from './pages/NeedsList'
import Login from './pages/Login'
import Profile from './pages/Profile'
import DonationHistory from './pages/DonationHistory'
import EditProfile from './pages/EditProfile'
import PrivacyPolicy from './pages/PrivacyPolicy'
import Admin from './pages/Admin'
import AdminLogin from './pages/AdminLogin'
import NotFound from './pages/NotFound'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/connexion" element={<AdminLogin />} />
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/inscription" element={<DonorRegister />} />
          <Route path="/hopital" element={<HospitalNeed />} />
          <Route path="/besoins" element={<NeedsList />} />
          <Route path="/connexion" element={<Login />} />
          <Route path="/profil" element={<Profile />} />
          <Route path="/profil/dons" element={<DonationHistory />} />
          <Route path="/profil/modifier" element={<EditProfile />} />
          <Route path="/confidentialite" element={<PrivacyPolicy />} />
          <Route path="/admin" element={<AdminRoute><Admin /></AdminRoute>} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App