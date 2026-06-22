const TripStatusChart = ({ data }) => {
  return (
    <div className="trip-status-chart" style={{ background: 'var(--glass-bg)', borderRadius: 'var(--radius-md)', padding: '24px', border: '1px solid var(--glass-border)' }}>
      <h3 style={{ color: 'var(--text-primary)', fontSize: '16px', marginBottom: '16px' }}>Chuyến đi theo trạng thái</h3>
      <p style={{ color: 'var(--text-secondary)' }}>Recharts Bar Chart — chờ implement</p>
    </div>
  );
};

export default TripStatusChart;
