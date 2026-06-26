const StatCard = ({ icon, label, value, trend, trendUp, className = '' }) => {
  return (
    <div className={`stat-card ${className}`} style={{
      background: 'var(--bg-secondary)',
      border: '1px solid var(--border-color)',
      borderRadius: 'var(--radius-md)',
      padding: '20px',
      boxShadow: 'var(--shadow-card)',
      transition: 'all var(--transition-normal)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <span style={{ fontSize: '20px' }}>{icon}</span>
        {trend && (
          <span style={{ fontSize: '12px', color: trendUp ? 'var(--accent-green)' : 'var(--accent-red)' }}>
            {trendUp ? '↑' : '↓'} {trend}
          </span>
        )}
      </div>
      <div style={{ fontSize: '28px', fontWeight: 700, color: 'var(--text-heading)', marginBottom: '4px' }}>{value}</div>
      <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{label}</div>
    </div>
  );
};

export default StatCard;
