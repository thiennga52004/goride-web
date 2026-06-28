import Button from '../common/Button';
import { formatCurrency } from '../../utils/formatCurrency';

const PricingCard = ({ config, onEdit }) => {
  if (!config) return null;

  const getVehicleTypeLabel = (type) => {
    if (type === 'MOTORBIKE') return 'Xe máy (GoRide)';
    if (type === 'CAR_4_SEAT') return 'Ô tô 4 chỗ (GoCar 4)';
    if (type === 'CAR_7_SEAT') return 'Ô tô 7 chỗ (GoCar 7)';
    return type || '—';
  };

  const getVehicleIcon = (type) => {
    if (type === 'MOTORBIKE') return '🛵';
    if (type === 'CAR_4_SEAT') return '🚗';
    if (type === 'CAR_7_SEAT') return '🚙';
    return '🚙';
  };

  return (
    <div
      className="pricing-card"
      style={{
        background: 'var(--bg-secondary)',
        borderRadius: 'var(--radius-md)',
        padding: '24px',
        border: '1px solid var(--border-color)',
        boxShadow: 'var(--shadow-card)',
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
        transition: 'all var(--transition-normal)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '26px' }}>{getVehicleIcon(config.vehicleType)}</span>
          <h3 style={{ color: 'var(--text-heading)', fontSize: '16px', fontWeight: 700, margin: 0 }}>
            {getVehicleTypeLabel(config.vehicleType)}
          </h3>
        </div>
        <span
          style={{
            padding: '4px 10px',
            borderRadius: '20px',
            fontSize: '11px',
            fontWeight: 600,
            background: config.isActive ? 'rgba(25, 135, 84, 0.1)' : 'rgba(108, 117, 125, 0.1)',
            color: config.isActive ? 'var(--accent-green)' : 'var(--text-secondary)',
          }}
        >
          {config.isActive ? 'Hoạt động' : 'Tạm dừng'}
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1, margin: '16px 0' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '13px',
            borderBottom: '1px solid var(--border-light)',
            paddingBottom: '8px',
          }}
        >
          <span style={{ color: 'var(--text-secondary)' }}>Giá mở cửa (2km đầu):</span>
          <span style={{ fontWeight: 600, color: 'var(--text-heading)' }}>{formatCurrency(config.baseFare)}</span>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '13px',
            borderBottom: '1px solid var(--border-light)',
            paddingBottom: '8px',
          }}
        >
          <span style={{ color: 'var(--text-secondary)' }}>Giá mỗi km tiếp theo:</span>
          <span style={{ fontWeight: 600, color: 'var(--text-heading)' }}>{formatCurrency(config.perKmRate)}/km</span>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '13px',
            borderBottom: '1px solid var(--border-light)',
            paddingBottom: '8px',
          }}
        >
          <span style={{ color: 'var(--text-secondary)' }}>Giá mỗi phút di chuyển:</span>
          <span style={{ fontWeight: 600, color: 'var(--text-heading)' }}>
            {formatCurrency(config.perMinuteRate)}/phút
          </span>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '13px',
            borderBottom: '1px solid var(--border-light)',
            paddingBottom: '8px',
          }}
        >
          <span style={{ color: 'var(--text-secondary)' }}>Cước phí tối thiểu:</span>
          <span style={{ fontWeight: 600, color: 'var(--text-heading)' }}>{formatCurrency(config.minimumFare)}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
          <span style={{ color: 'var(--text-secondary)' }}>Hệ số giờ cao điểm:</span>
          <span
            style={{
              fontWeight: 700,
              color: config.surgeMultiplier > 1.0 ? 'var(--accent-purple)' : 'var(--text-heading)',
            }}
          >
            x{config.surgeMultiplier?.toFixed(1) || '1.0'}
          </span>
        </div>
      </div>

      <Button variant="primary" style={{ width: '100%', marginTop: '12px' }} onClick={() => onEdit?.(config)}>
        Chỉnh sửa cước phí
      </Button>
    </div>
  );
};

export default PricingCard;
