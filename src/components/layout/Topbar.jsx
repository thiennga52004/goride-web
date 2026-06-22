import { useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import useUIStore from '../../stores/uiStore';
import { ROUTES } from '../../constants/routes';
import './Topbar.css';

const pageTitles = {
  [ROUTES.DASHBOARD]: 'Dashboard',
  [ROUTES.USERS]: 'Quản lý Người dùng',
  [ROUTES.DRIVERS_PENDING]: 'Duyệt Tài xế',
  [ROUTES.TRIPS]: 'Lịch sử Chuyến đi',
  [ROUTES.PRICING]: 'Cấu hình Giá cước',
};

const Topbar = () => {
  const location = useLocation();
  const { toggleSidebar } = useUIStore();

  // Match page title from current path
  const getPageTitle = () => {
    if (location.pathname.startsWith('/users/') && location.pathname !== '/users') {
      return 'Chi tiết Người dùng';
    }
    if (location.pathname.startsWith('/trips/') && location.pathname !== '/trips') {
      return 'Chi tiết Chuyến đi';
    }
    return pageTitles[location.pathname] || 'GoRide Admin';
  };

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button className="topbar-menu-btn" onClick={toggleSidebar} title="Menu">
          <Menu size={20} />
        </button>
        <h1 className="topbar-title">{getPageTitle()}</h1>
      </div>
      <div className="topbar-right">
        {/* Quick actions can be added here */}
      </div>
    </header>
  );
};

export default Topbar;
