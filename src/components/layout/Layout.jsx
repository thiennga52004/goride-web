import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import useUIStore from '../../stores/uiStore';
import './Layout.css';

const Layout = () => {
  const { sidebarCollapsed, sidebarMobileOpen, closeMobileSidebar } = useUIStore();

  return (
    <div className={`layout ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      <Sidebar />
      
      {/* Mobile Sidebar Overlay */}
      <div 
        className={`sidebar-overlay ${sidebarMobileOpen ? 'active' : ''}`} 
        onClick={closeMobileSidebar} 
      />

      <div className="layout-main">
        <Topbar />
        <main className="layout-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
