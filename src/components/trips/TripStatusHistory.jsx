import { formatDate } from '../../utils/formatDate';
import StatusBadge from '../common/StatusBadge';

const TripStatusHistory = ({ history = [] }) => {
  return (
    <div className="trip-status-history" style={{ padding: '8px 0' }}>
      <h4
        style={{
          color: 'var(--text-heading)',
          fontSize: '15px',
          fontWeight: 600,
          marginBottom: '16px',
        }}
      >
        Nhật ký hệ thống
      </h4>
      {history.length === 0 ? (
        <div style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Không có lịch sử thay đổi</div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr
                style={{
                  borderBottom: '1px solid var(--border-color)',
                  textAlign: 'left',
                }}
              >
                <th style={{ padding: '10px 8px', color: 'var(--text-secondary)', fontWeight: 600 }}>Trạng thái</th>
                <th style={{ padding: '10px 8px', color: 'var(--text-secondary)', fontWeight: 600 }}>Thời gian</th>
                <th style={{ padding: '10px 8px', color: 'var(--text-secondary)', fontWeight: 600 }}>Ghi chú</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid var(--border-light)' }}>
                  <td style={{ padding: '10px 8px' }}>
                    <StatusBadge status={item.status} />
                  </td>
                  <td style={{ padding: '10px 8px', color: 'var(--text-primary)' }}>{formatDate(item.timestamp)}</td>
                  <td style={{ padding: '10px 8px', color: 'var(--text-secondary)' }}>{item.note || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TripStatusHistory;
