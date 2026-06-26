import StatCard from '../common/StatCard';
import { formatCurrency } from '../../utils/formatCurrency';

const StatsOverview = ({ stats }) => {
  if (!stats) return null;

  return (
    <div className="stats-overview" style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
      gap: '20px',
      marginBottom: '24px'
    }}>
      <StatCard
        icon="💰"
        label="Doanh thu"
        value={formatCurrency(stats.totalRevenue)}
        trend="12.5% vs tháng trước"
        trendUp={true}
      />
      <StatCard
        icon="🗺️"
        label="Tổng chuyến đi"
        value={stats.totalTrips?.toLocaleString('vi-VN') || '0'}
        trend="8.2% vs tuần trước"
        trendUp={true}
      />
      <StatCard
        icon="✅"
        label="Chuyến hoàn thành"
        value={stats.completedTrips?.toLocaleString('vi-VN') || '0'}
        trend="88.0% tỷ lệ thành công"
        trendUp={true}
      />
      <StatCard
        icon="❌"
        label="Chuyến bị hủy"
        value={stats.cancelledTrips?.toLocaleString('vi-VN') || '0'}
        trend="9.6% tỷ lệ hủy"
        trendUp={false}
      />
      <StatCard
        icon="🚗"
        label="Tài xế hoạt động"
        value={stats.activeDrivers?.toLocaleString('vi-VN') || '0'}
        trend="Tài xế sẵn sàng"
        trendUp={true}
      />
      <StatCard
        icon="👥"
        label="Khách hàng"
        value={stats.totalPassengers?.toLocaleString('vi-VN') || '0'}
        trend="Khách hàng đăng ký"
        trendUp={true}
      />
    </div>
  );
};

export default StatsOverview;
