const TripHistoryPage = () => {
  return (
    <div className="trip-history-page" style={{ padding: '24px' }}>
      <div className="page-header">
        <h1 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>Lịch sử Chuyến đi</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Toàn bộ chuyến đi trong hệ thống</p>
      </div>
      <div className="page-content">
        {/* TODO: TripFilters, TripTable */}
        <div className="content-placeholder" style={{ background: 'var(--glass-bg)', backdropFilter: 'var(--glass-blur)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-md)', padding: '48px', textAlign: 'center', color: 'var(--text-secondary)' }}>
          Bảng chuyến đi sẽ hiển thị ở đây
        </div>
      </div>
    </div>
  );
};

export default TripHistoryPage;
