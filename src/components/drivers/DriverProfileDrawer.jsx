import Drawer from '../common/Drawer';
import Avatar from '../common/Avatar';
import ApprovalActions from './ApprovalActions';

const DriverProfileDrawer = ({ isOpen, onClose, driver, onApprove, onReject, loading = false }) => {
  if (!driver) return null;

  const { driverProfile } = driver;

  const getVehicleTypeLabel = (type) => {
    if (type === 'MOTORBIKE') return 'Xe máy';
    if (type === 'CAR_4_SEAT') return 'Ô tô 4 chỗ';
    if (type === 'CAR_7_SEAT') return 'Ô tô 7 chỗ';
    return type || '—';
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose} title="Hồ sơ tài xế chờ duyệt">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', paddingBottom: '24px' }}>
        {/* Personal Details Section */}
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '20px' }}>
          <Avatar src={driver.avatar} name={driver.name} size={64} />
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-heading)', margin: '0 0 4px 0' }}>
              {driver.name}
            </h3>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <span>📞 {driver.phone}</span>
              <span>✉️ {driver.email || '—'}</span>
            </div>
          </div>
        </div>

        {/* Vehicle Information Section */}
        <div>
          <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-heading)', margin: '0 0 12px 0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Thông tin phương tiện
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div style={{ background: 'var(--bg-primary)', padding: '10px 12px', borderRadius: 'var(--radius-sm)' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-secondary)', display: 'block', marginBottom: '2px' }}>Loại dịch vụ</span>
              <span style={{ fontSize: '13px', color: 'var(--text-heading)', fontWeight: 600 }}>{getVehicleTypeLabel(driverProfile?.vehicleType)}</span>
            </div>
            <div style={{ background: 'var(--bg-primary)', padding: '10px 12px', borderRadius: 'var(--radius-sm)' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-secondary)', display: 'block', marginBottom: '2px' }}>Biển số xe</span>
              <span style={{ fontSize: '13px', color: 'var(--accent-primary)', fontWeight: 700 }}>{driverProfile?.licensePlate}</span>
            </div>
            <div style={{ background: 'var(--bg-primary)', padding: '10px 12px', borderRadius: 'var(--radius-sm)' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-secondary)', display: 'block', marginBottom: '2px' }}>Hãng xe / Dòng xe</span>
              <span style={{ fontSize: '13px', color: 'var(--text-heading)', fontWeight: 500 }}>{driverProfile?.brand} {driverProfile?.model}</span>
            </div>
            <div style={{ background: 'var(--bg-primary)', padding: '10px 12px', borderRadius: 'var(--radius-sm)' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-secondary)', display: 'block', marginBottom: '2px' }}>Màu sắc / Năm sản xuất</span>
              <span style={{ fontSize: '13px', color: 'var(--text-heading)', fontWeight: 500 }}>{driverProfile?.color} - {driverProfile?.year || '—'}</span>
            </div>
          </div>
        </div>

        {/* Legal Documents Section */}
        <div>
          <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-heading)', margin: '0 0 12px 0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Giấy tờ pháp lý
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ background: 'var(--bg-primary)', padding: '12px', borderRadius: 'var(--radius-sm)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)', display: 'block' }}>Số CCCD</span>
                <span style={{ fontSize: '13px', color: 'var(--text-heading)', fontWeight: 600 }}>{driverProfile?.cccd || '—'}</span>
              </div>
              <span style={{ fontSize: '20px' }}>🪪</span>
            </div>
            <div style={{ background: 'var(--bg-primary)', padding: '12px', borderRadius: 'var(--radius-sm)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)', display: 'block' }}>Số GPLX</span>
                <span style={{ fontSize: '13px', color: 'var(--text-heading)', fontWeight: 600 }}>{driverProfile?.driverLicense || '—'}</span>
              </div>
              <div>
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)', display: 'block', textAlign: 'right' }}>Ngày hết hạn</span>
                <span style={{ fontSize: '12px', color: 'var(--accent-red)', fontWeight: 500 }}>{driverProfile?.licenseExpiry || '—'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Drawer Actions Footer */}
        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '20px', display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
          <ApprovalActions
            onApprove={() => onApprove?.(driver)}
            onReject={() => onReject?.(driver)}
            loading={loading}
          />
        </div>
      </div>
    </Drawer>
  );
};

export default DriverProfileDrawer;
