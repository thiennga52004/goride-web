const Pagination = ({ page = 0, totalPages = 0, totalElements = 0, size = 10, onPageChange, onSizeChange }) => {
  if (totalElements === 0) return null;

  return (
    <div className="pagination" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0', gap: '16px', flexWrap: 'wrap' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Tổng: {totalElements} kết quả</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Hiển thị:</span>
          <select
            value={size}
            onChange={(e) => onSizeChange?.(Number(e.target.value))}
            style={{
              padding: '4px 8px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-color)',
              background: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              fontSize: '13px',
              outline: 'none',
              cursor: 'pointer',
            }}
          >
            {[5, 10, 20, 50].map((sz) => (
              <option key={sz} value={sz}>{sz}</option>
            ))}
          </select>
        </div>
      </div>
      {totalPages > 1 && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={() => onPageChange?.(page - 1)}
            disabled={page <= 0}
            style={{
              padding: '6px 12px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-color)',
              background: 'var(--bg-tertiary)',
              color: 'var(--text-primary)',
              cursor: page <= 0 ? 'not-allowed' : 'pointer',
              opacity: page <= 0 ? 0.5 : 1,
            }}
          >
            ←
          </button>
          <span style={{ fontSize: '13px', color: 'var(--text-primary)' }}>{page + 1} / {totalPages}</span>
          <button
            onClick={() => onPageChange?.(page + 1)}
            disabled={page >= totalPages - 1}
            style={{
              padding: '6px 12px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-color)',
              background: 'var(--bg-tertiary)',
              color: 'var(--text-primary)',
              cursor: page >= totalPages - 1 ? 'not-allowed' : 'pointer',
              opacity: page >= totalPages - 1 ? 0.5 : 1,
            }}
          >
            →
          </button>
        </div>
      )}
    </div>
  );
};

export default Pagination;
