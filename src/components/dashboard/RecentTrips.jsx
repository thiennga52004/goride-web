import DataTable from '../common/DataTable';
import StatusBadge from '../common/StatusBadge';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatDate } from '../../utils/formatDate';

const RecentTrips = ({ trips = [], loading = false }) => {
  const columns = [
    {
      key: 'id',
      label: 'Mã chuyến',
      render: (val) => <span style={{ fontWeight: 600, color: 'var(--accent-primary)' }}>#{val}</span>,
    },
    {
      key: 'passenger',
      label: 'Hành khách',
      render: (passenger) => (
        <div>
          <div style={{ fontWeight: 500, color: 'var(--text-heading)' }}>{passenger?.name || '—'}</div>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{passenger?.phone || '—'}</div>
        </div>
      ),
    },
    {
      key: 'driver',
      label: 'Tài xế',
      render: (driver) =>
        driver ? (
          <div>
            <div style={{ fontWeight: 500, color: 'var(--text-heading)' }}>{driver.name}</div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{driver.licensePlate}</div>
          </div>
        ) : (
          <span style={{ color: 'var(--text-tertiary)', fontStyle: 'italic' }}>Chưa nhận</span>
        ),
    },
    {
      key: 'vehicleType',
      label: 'Loại xe',
      render: (val) => {
        if (val === 'MOTORBIKE') return 'Xe máy';
        if (val === 'CAR_4_SEAT') return 'Ô tô 4 chỗ';
        if (val === 'CAR_7_SEAT') return 'Ô tô 7 chỗ';
        return val || '—';
      },
    },
    {
      key: 'status',
      label: 'Trạng thái',
      render: (val) => <StatusBadge status={val} />,
    },
    {
      key: 'fare',
      label: 'Giá tiền',
      render: (_, row) => (
        <span style={{ fontWeight: 500, color: 'var(--text-heading)' }}>
          {formatCurrency(row.actualFare || row.estimatedFare)}
        </span>
      ),
    },
    {
      key: 'requestedAt',
      label: 'Thời gian',
      render: (val) => formatDate(val),
    },
  ];

  return (
    <div
      className="recent-trips"
      style={{
        background: 'var(--bg-secondary)',
        borderRadius: 'var(--radius-md)',
        padding: '24px',
        border: '1px solid var(--border-color)',
        boxShadow: 'var(--shadow-card)',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      <h3
        style={{
          color: 'var(--text-heading)',
          fontSize: '16px',
          fontWeight: 600,
          margin: '0 0 20px 0',
        }}
      >
        Chuyến đi gần đây
      </h3>
      <DataTable
        columns={columns}
        data={trips}
        loading={loading}
        emptyMessage="Không có chuyến đi nào gần đây"
      />
    </div>
  );
};

export default RecentTrips;
