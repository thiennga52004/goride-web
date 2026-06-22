const RecentTrips = ({ trips }) => {
  return (
    <div className="recent-trips" style={{ background: 'var(--glass-bg)', borderRadius: 'var(--radius-md)', padding: '24px', border: '1px solid var(--glass-border)' }}>
      <h3 style={{ color: 'var(--text-primary)', fontSize: '16px', marginBottom: '16px' }}>Chuyến đi gần đây</h3>
      <p style={{ color: 'var(--text-secondary)' }}>Mini table — chờ implement</p>
    </div>
  );
};

export default RecentTrips;
