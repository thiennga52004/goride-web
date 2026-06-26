const DataTable = ({ columns = [], data = [], loading = false, emptyMessage = 'Không có dữ liệu', onSort, sortField, sortDirection }) => {
  if (loading) return <div className="data-table-loading">Đang tải...</div>;
  if (!data.length) return <div className="data-table-empty">{emptyMessage}</div>;

  return (
    <div className="data-table-wrapper" style={{ overflowX: 'auto' }}>
      <table className="data-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                onClick={() => col.sortable && onSort?.(col.key)}
                style={{
                  padding: '12px 16px',
                  textAlign: 'left',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: 'var(--text-secondary)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  borderBottom: '2px solid var(--border-color)',
                  background: 'var(--bg-tertiary)',
                  cursor: col.sortable ? 'pointer' : 'default',
                  whiteSpace: 'nowrap',
                }}
              >
                {col.label}
                {col.sortable && sortField === col.key && (sortDirection === 'asc' ? ' ↑' : ' ↓')}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={row.id || rowIndex} style={{ borderBottom: '1px solid var(--border-color)' }}>
              {columns.map((col) => (
                <td
                  key={col.key}
                  style={{
                    padding: '12px 16px',
                    fontSize: '14px',
                    color: 'var(--text-primary)',
                  }}
                >
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
