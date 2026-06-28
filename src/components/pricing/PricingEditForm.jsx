import { useState } from 'react';
import Button from '../common/Button';

const PricingEditForm = ({ config, onSubmit, onCancel, loading = false }) => {
  const [baseFare, setBaseFare] = useState(config?.baseFare || 0);
  const [perKmRate, setPerKmRate] = useState(config?.perKmRate || 0);
  const [perMinuteRate, setPerMinuteRate] = useState(config?.perMinuteRate || 0);
  const [minimumFare, setMinimumFare] = useState(config?.minimumFare || 0);
  const [surgeMultiplier, setSurgeMultiplier] = useState(config?.surgeMultiplier || 1.0);
  const [isActive, setIsActive] = useState(config?.isActive !== false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const tempErrors = {};
    if (baseFare <= 0) tempErrors.baseFare = 'Giá mở cửa phải lớn hơn 0';
    if (perKmRate <= 0) tempErrors.perKmRate = 'Giá cước theo km phải lớn hơn 0';
    if (perMinuteRate < 0) tempErrors.perMinuteRate = 'Giá cước theo phút không được âm';
    if (minimumFare <= 0) tempErrors.minimumFare = 'Cước tối thiểu phải lớn hơn 0';
    if (surgeMultiplier <= 0) tempErrors.surgeMultiplier = 'Hệ số cao điểm phải lớn hơn 0';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit?.({
      baseFare: Number(baseFare),
      perKmRate: Number(perKmRate),
      perMinuteRate: Number(perMinuteRate),
      minimumFare: Number(minimumFare),
      surgeMultiplier: Number(surgeMultiplier),
      isActive: Boolean(isActive),
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <label htmlFor="baseFare" style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>
          Giá cước mở cửa (2km đầu - VND)
        </label>
        <input
          id="baseFare"
          type="number"
          value={baseFare}
          onChange={(e) => setBaseFare(e.target.value)}
          required
          style={{
            padding: '10px 12px',
            borderRadius: 'var(--radius-sm)',
            border: errors.baseFare ? '1px solid var(--accent-red)' : '1px solid var(--border-color)',
            background: 'var(--bg-secondary)',
            color: 'var(--text-primary)',
            fontSize: '14px',
            outline: 'none',
          }}
        />
        {errors.baseFare && <span style={{ fontSize: '12px', color: 'var(--accent-red)' }}>{errors.baseFare}</span>}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <label htmlFor="perKmRate" style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>
          Giá cước mỗi Km tiếp theo (VND)
        </label>
        <input
          id="perKmRate"
          type="number"
          value={perKmRate}
          onChange={(e) => setPerKmRate(e.target.value)}
          required
          style={{
            padding: '10px 12px',
            borderRadius: 'var(--radius-sm)',
            border: errors.perKmRate ? '1px solid var(--accent-red)' : '1px solid var(--border-color)',
            background: 'var(--bg-secondary)',
            color: 'var(--text-primary)',
            fontSize: '14px',
            outline: 'none',
          }}
        />
        {errors.perKmRate && <span style={{ fontSize: '12px', color: 'var(--accent-red)' }}>{errors.perKmRate}</span>}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <label htmlFor="perMinuteRate" style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>
          Giá cước mỗi phút di chuyển (VND)
        </label>
        <input
          id="perMinuteRate"
          type="number"
          value={perMinuteRate}
          onChange={(e) => setPerMinuteRate(e.target.value)}
          required
          style={{
            padding: '10px 12px',
            borderRadius: 'var(--radius-sm)',
            border: errors.perMinuteRate ? '1px solid var(--accent-red)' : '1px solid var(--border-color)',
            background: 'var(--bg-secondary)',
            color: 'var(--text-primary)',
            fontSize: '14px',
            outline: 'none',
          }}
        />
        {errors.perMinuteRate && (
          <span style={{ fontSize: '12px', color: 'var(--accent-red)' }}>{errors.perMinuteRate}</span>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <label htmlFor="minimumFare" style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>
          Cước phí tối thiểu (VND)
        </label>
        <input
          id="minimumFare"
          type="number"
          value={minimumFare}
          onChange={(e) => setMinimumFare(e.target.value)}
          required
          style={{
            padding: '10px 12px',
            borderRadius: 'var(--radius-sm)',
            border: errors.minimumFare ? '1px solid var(--accent-red)' : '1px solid var(--border-color)',
            background: 'var(--bg-secondary)',
            color: 'var(--text-primary)',
            fontSize: '14px',
            outline: 'none',
          }}
        />
        {errors.minimumFare && (
          <span style={{ fontSize: '12px', color: 'var(--accent-red)' }}>{errors.minimumFare}</span>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <label htmlFor="surgeMultiplier" style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>
          Hệ số nhân giờ cao điểm (Surge Multiplier)
        </label>
        <input
          id="surgeMultiplier"
          type="number"
          step="0.1"
          value={surgeMultiplier}
          onChange={(e) => setSurgeMultiplier(e.target.value)}
          required
          style={{
            padding: '10px 12px',
            borderRadius: 'var(--radius-sm)',
            border: errors.surgeMultiplier ? '1px solid var(--accent-red)' : '1px solid var(--border-color)',
            background: 'var(--bg-secondary)',
            color: 'var(--text-primary)',
            fontSize: '14px',
            outline: 'none',
          }}
        />
        {errors.surgeMultiplier && (
          <span style={{ fontSize: '12px', color: 'var(--accent-red)' }}>{errors.surgeMultiplier}</span>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <input
          id="isActive"
          type="checkbox"
          checked={isActive}
          onChange={(e) => setIsActive(e.target.checked)}
          style={{ width: '16px', height: '16px', cursor: 'pointer' }}
        />
        <label htmlFor="isActive" style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', cursor: 'pointer' }}>
          Kích hoạt hoạt động dịch vụ này
        </label>
      </div>

      <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '12px', borderTop: '1px solid var(--border-light)', paddingTop: '20px' }}>
        <Button variant="secondary" type="button" onClick={onCancel} disabled={loading}>
          Hủy
        </Button>
        <Button variant="primary" type="submit" loading={loading}>
          Lưu cấu hình
        </Button>
      </div>
    </form>
  );
};

export default PricingEditForm;
