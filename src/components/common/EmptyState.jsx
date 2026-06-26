const EmptyState = ({ icon = '📭', title = 'Không có dữ liệu', description = '', action }) => {
  return (
    <div className="empty-state" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '48px 24px', textAlign: 'center' }}>
      <span style={{ fontSize: '48px', marginBottom: '16px' }}>{icon}</span>
      <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-heading)', marginBottom: '8px' }}>{title}</h3>
      {description && <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '16px' }}>{description}</p>}
      {action}
    </div>
  );
};

export default EmptyState;
