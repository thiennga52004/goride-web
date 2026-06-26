const RevenueChart = ({ data }) => {
  return (
    <div className="revenue-chart" style={{ background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', padding: '24px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-card)' }}>
      <h3 style={{ color: 'var(--text-heading)', fontSize: '16px', marginBottom: '16px' }}>Doanh thu theo ngày</h3>
      <p style={{ color: 'var(--text-secondary)' }}>Recharts Line Chart — chờ implement</p>
    </div>
  );
};

export default RevenueChart;
