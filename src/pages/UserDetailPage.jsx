import { useParams } from 'react-router-dom';

const UserDetailPage = () => {
  const { id } = useParams();

  return (
    <div className="user-detail-page" style={{ padding: '24px' }}>
      <div className="page-header">
        <h1 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-heading)', marginBottom: '4px' }}>Chi tiết Người dùng</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>ID: {id}</p>
      </div>
      <div className="page-content">
        {/* TODO: User profile card, driver profile (if driver), trip history tab */}
        <div className="content-placeholder" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '48px', textAlign: 'center', color: 'var(--text-secondary)', boxShadow: 'var(--shadow-card)' }}>
          Chi tiết người dùng sẽ hiển thị ở đây
        </div>
      </div>
    </div>
  );
};

export default UserDetailPage;
