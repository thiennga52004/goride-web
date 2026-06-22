import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  UserCheck,
  MapPin,
  DollarSign,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from 'lucide-react';
import useUIStore from '../../stores/uiStore';
import useAuthStore from '../../stores/authStore';
import { ROUTES } from '../../constants/routes';
import './Sidebar.css';

const navItems = [
  { path: ROUTES.DASHBOARD, icon: LayoutDashboard, label: 'Dashboard' },
  { path: ROUTES.USERS, icon: Users, label: 'Người dùng' },
  { path: ROUTES.DRIVERS_PENDING, icon: UserCheck, label: 'Duyệt tài xế' },
  { path: ROUTES.TRIPS, icon: MapPin, label: 'Chuyến đi' },
  { path: ROUTES.PRICING, icon: DollarSign, label: 'Giá cước' },
];

const Sidebar = () => {
  const { sidebarCollapsed, toggleSidebar } = useUIStore();
  const { user, logout } = useAuthStore();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    window.location.href = ROUTES.LOGIN;
  };

  return (
    <aside className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
      {/* Logo */}
      <div className="sidebar-logo">
        <span className="logo-icon">🚗</span>
        {!sidebarCollapsed && <span className="logo-text">GoRide Admin</span>}
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path ||
            (item.path !== ROUTES.DASHBOARD && location.pathname.startsWith(item.path));

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`nav-item ${isActive ? 'active' : ''}`}
              title={sidebarCollapsed ? item.label : ''}
            >
              <Icon size={20} />
              {!sidebarCollapsed && <span>{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="sidebar-bottom">
        {/* User info */}
        {!sidebarCollapsed && user && (
          <div className="sidebar-user">
            <div className="user-avatar">
              {user.name ? user.name.charAt(0).toUpperCase() : 'A'}
            </div>
            <div className="user-info">
              <span className="user-name">{user.name || 'Admin'}</span>
              <span className="user-role">Quản trị viên</span>
            </div>
          </div>
        )}

        {/* Logout */}
        <button className="nav-item logout-btn" onClick={handleLogout} title="Đăng xuất">
          <LogOut size={20} />
          {!sidebarCollapsed && <span>Đăng xuất</span>}
        </button>

        {/* Collapse toggle */}
        <button className="collapse-toggle" onClick={toggleSidebar} title={sidebarCollapsed ? 'Mở rộng' : 'Thu gọn'}>
          {sidebarCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
