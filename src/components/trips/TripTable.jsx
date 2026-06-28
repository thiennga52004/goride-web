import { Link } from 'react-router-dom';
import DataTable from '../common/DataTable';
import StatusBadge from '../common/StatusBadge';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatDate } from '../../utils/formatDate';

const TripTable = ({ trips = [], loading = false, onSort, sortField, sortDirection }) => {
  const columns = [
    {
      key: 'id',
      label: 'Mã chuyến',
      sortable: true,
      render: (val) => <span style={{ fontWeight: 600, color: 'var(--accent-primary)' }}>#{val}</span>,
    },
    {
      key: 'passenger',
      label: 'Hành khách',
      render: (passenger) => (
        <div>
          <div style={{ fontWeight: 600, color: 'var(--text-heading)' }}>{passenger?.name || '—'}</div>
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
            <div style={{ fontWeight: 600, color: 'var(--text-heading)' }}>{driver.name}</div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{driver.licensePlate}</div>
          </div>
        ) : (
          <span style={{ color: 'var(--text-tertiary)', fontStyle: 'italic' }}>Chưa nhận</span>
        ),
    },
    {
      key: 'vehicleType',
      label: 'Dịch vụ',
      render: (val) => {
        if (val === 'MOTORBIKE') return 'Xe máy';
        if (val === 'CAR_4_SEAT') return 'Ô tô 4 chỗ';
        if (val === 'CAR_7_SEAT') return 'Ô tô 7 chỗ';
        return val || '—';
      },
    },
    {
      key: 'fare',
      label: 'Giá cước',
      sortable: true,
      render: (_, row) => (
        <span style={{ fontWeight: 500, color: 'var(--text-heading)' }}>
          {formatCurrency(row.actualFare || row.estimatedFare)}
        </span>
      ),
    },
    {
      key: 'status',
      label: 'Trạng thái',
      render: (val) => <StatusBadge status={val} />,
    },
    {
      key: 'requestedAt',
      label: 'Thời gian đặt',
      sortable: true,
      render: (val) => formatDate(val),
    },
    {
      key: 'actions',
      label: 'Hành động',
      render: (_, row) => (
        <Link
          to={`/trips/${row.id}`}
          style={{
            padding: '6px 12px',
            fontSize: '13px',
            fontWeight: 500,
            textDecoration: 'none',
            color: 'var(--accent-primary)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-sm)',
            background: 'var(--bg-secondary)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '30px',
            boxSizing: 'border-box',
          }}
        >
          Chi tiết
        </Link>
      ),
    },
  ];

  return (
    <div className="trip-table">
      <DataTable
        columns={columns}
        data={trips}
        loading={loading}
        onSort={onSort}
        sortField={sortField}
        sortDirection={sortDirection}
        emptyMessage="Không tìm thấy chuyến đi nào phù hợp"
      />
    </div>
  );
};

export default TripTable;
