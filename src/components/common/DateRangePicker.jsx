const DateRangePicker = ({ from, to, onFromChange, onToChange }) => {
  return (
    <div className="date-range-picker" style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <input type="date" value={from || ''} onChange={(e) => onFromChange?.(e.target.value)} style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-sm)', padding: '8px 12px', color: 'var(--text-primary)', fontSize: '13px' }} />
      <span style={{ color: 'var(--text-secondary)' }}>→</span>
      <input type="date" value={to || ''} onChange={(e) => onToChange?.(e.target.value)} style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-sm)', padding: '8px 12px', color: 'var(--text-primary)', fontSize: '13px' }} />
    </div>
  );
};

export default DateRangePicker;
