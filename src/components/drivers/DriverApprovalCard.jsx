import Avatar from '../common/Avatar';
import Button from '../common/Button';
import ApprovalActions from './ApprovalActions';

const DriverApprovalCard = ({ driver, onApprove, onReject, onViewDetail, loading = false }) => {
  if (!driver) return null;

  const { driverProfile } = driver;

  const getVehicleTypeLabel = (type) => {
    if (type === 'MOTORBIKE') return 'Xe máy';
    if (type === 'CAR_4_SEAT') return 'Ô tô 4 chỗ';
    if (type === 'CAR_7_SEAT') return 'Ô tô 7 chỗ';
    return type || '—';
  };

  return (
    <div
      className="driver-approval-card card card-hover"
      style={{
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
      }}
    >
      {/* Header Info */}
      <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '16px' }}>
        <Avatar src={driver.avatar} name={driver.name} size={44} />
        <div>
          <h4 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-heading)', margin: '0 0 2px 0' }}>
            {driver.name}
          </h4>
          <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{driver.phone}</span>
        </div>
      </div>

      {/* Vehicle Info */}
      <div
        style={{
          background: 'var(--bg-primary)',
          borderRadius: 'var(--radius-sm)',
          padding: '12px',
          fontSize: '13px',
          color: 'var(--text-primary)',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
        }}
      >
        <div>
          <span style={{ color: 'var(--text-secondary)' }}>Loại xe: </span>
          <span style={{ fontWeight: 500 }}>{getVehicleTypeLabel(driverProfile?.vehicleType)}</span>
        </div>
        <div>
          <span style={{ color: 'var(--text-secondary)' }}>Phương tiện: </span>
          <span style={{ fontWeight: 500 }}>
            {driverProfile?.brand} {driverProfile?.model} ({driverProfile?.color})
          </span>
        </div>
        <div>
          <span style={{ color: 'var(--text-secondary)' }}>Biển số: </span>
          <span style={{ fontWeight: 600, color: 'var(--accent-primary)' }}>{driverProfile?.licensePlate}</span>
        </div>
      </div>

      {/* Action Footer */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '16px',
          borderTop: '1px solid var(--border-color)',
          paddingTop: '16px',
          gap: '8px',
        }}
      >
        <Button variant="secondary" size="sm" onClick={() => onViewDetail?.(driver)}>
          Hồ sơ
        </Button>
        <ApprovalActions
          onApprove={() => onApprove?.(driver)}
          onReject={() => onReject?.(driver)}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default DriverApprovalCard;
