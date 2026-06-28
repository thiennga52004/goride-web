import { getStatusConfig } from '../../utils/statusHelpers';
import { formatDate } from '../../utils/formatDate';

const TripTimeline = ({ statusHistory = [] }) => {
  return (
    <div className="trip-timeline" style={{ padding: '8px 0' }}>
      <h4 style={{ color: 'var(--text-heading)', fontSize: '15px', fontWeight: 600, marginBottom: '20px' }}>
        Nhật ký hành trình
      </h4>
      {statusHistory.length === 0 ? (
        <div style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Không có lịch sử hành trình</div>
      ) : (
        <div
          style={{
            position: 'relative',
            paddingLeft: '24px',
            borderLeft: '2px solid var(--border-light)',
            marginLeft: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
          }}
        >
          {statusHistory.map((item, idx) => {
            const config = getStatusConfig(item.status);
            const isLast = idx === statusHistory.length - 1;

            return (
              <div key={idx} style={{ position: 'relative' }}>
                {/* Node Circle */}
                <div
                  style={{
                    position: 'absolute',
                    left: '-31px',
                    top: '2px',
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: config.color,
                    border: '4px solid var(--bg-secondary)',
                    boxShadow: isLast ? `0 0 0 4px ${config.bgColor}` : 'none',
                  }}
                />
                {/* Content */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' }}>
                    <span style={{ fontWeight: 600, fontSize: '14px', color: 'var(--text-heading)' }}>
                      {config.label}
                    </span>
                    <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                      {formatDate(item.timestamp)}
                    </span>
                  </div>
                  <p style={{ fontSize: '13px', color: 'var(--text-primary)', margin: 0 }}>
                    {item.note || 'Không có ghi chú'}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TripTimeline;
