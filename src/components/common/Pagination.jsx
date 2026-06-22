const Pagination = ({ page = 0, totalPages = 0, totalElements = 0, size = 10, onPageChange, onSizeChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="pagination" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0', gap: '16px' }}>
      <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Tổng: {totalElements} kết quả</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <button onClick={() => onPageChange?.(page - 1)} disabled={page <= 0} style={{ padding: '6px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--glass-border)', background: 'var(--bg-tertiary)', color: 'var(--text-primary)', cursor: page <= 0 ? 'not-allowed' : 'pointer', opacity: page <= 0 ? 0.5 : 1 }}>←</button>
        <span style={{ fontSize: '13px', color: 'var(--text-primary)' }}>{page + 1} / {totalPages}</span>
        <button onClick={() => onPageChange?.(page + 1)} disabled={page >= totalPages - 1} style={{ padding: '6px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--glass-border)', background: 'var(--bg-tertiary)', color: 'var(--text-primary)', cursor: page >= totalPages - 1 ? 'not-allowed' : 'pointer', opacity: page >= totalPages - 1 ? 0.5 : 1 }}>→</button>
      </div>
    </div>
  );
};

export default Pagination;
