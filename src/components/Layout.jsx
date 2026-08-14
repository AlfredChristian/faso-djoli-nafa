import { Outlet, useLocation } from 'react-router-dom'
import BottomNav from './BottomNav'
import SideNav from './SideNav'

function Layout() {
  const location = useLocation()
  const isAdmin = location.pathname.startsWith('/admin')

  return (
    <div className="min-h-screen bg-paper md:flex">
      {!isAdmin && <SideNav />}
      <div className={`flex-1 ${isAdmin ? '' : 'pb-24 md:pb-10'}`}>
        <Outlet />
      </div>
      {!isAdmin && <BottomNav />}
    </div>
  )
}

export default Layout