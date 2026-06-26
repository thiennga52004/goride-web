import { Link } from 'react-router-dom';
import { ROUTES } from '../constants/routes';

const NotFoundPage = () => {
  return (
    <div className="not-found-page" style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--bg-primary)',
      color: 'var(--text-primary)',
      textAlign: 'center',
      padding: '24px',
    }}>
      <h1 style={{ fontSize: '72px', fontWeight: 700, color: 'var(--accent-primary)', marginBottom: '16px' }}>404</h1>
      <h2 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '8px' }}>Trang không tồn tại</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>Xin lỗi, trang bạn tìm kiếm không tồn tại.</p>
      <Link
        to={ROUTES.DASHBOARD}
        style={{
          background: 'var(--accent-primary)',
          color: 'white',
          padding: '12px 24px',
          borderRadius: 'var(--radius-sm)',
          textDecoration: 'none',
          fontWeight: 600,
          transition: 'all var(--transition-fast)',
        }}
      >
        Về Dashboard
      </Link>
    </div>
  );
};

export default NotFoundPage;
