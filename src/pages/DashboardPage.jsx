import './DashboardPage.css';

const DashboardPage = () => {
  return (
    <div className="dashboard-page">
      <div className="page-header">
        <h1>Dashboard</h1>
        <p>Tổng quan hệ thống GoRide</p>
      </div>
      <div className="dashboard-content">
        {/* TODO: StatsOverview, RevenueChart, TripStatusChart, RecentTrips */}
        <div className="stats-placeholder">Thống kê sẽ hiển thị ở đây</div>
      </div>
    </div>
  );
};

export default DashboardPage;
