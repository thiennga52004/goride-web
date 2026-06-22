import { getStatusConfig } from '../../utils/statusHelpers';

const StatusBadge = ({ status, className = '' }) => {
  const config = getStatusConfig(status);

  return (
    <span
      className={`status-badge ${className}`}
      style={{
        color: config.color,
        background: config.bgColor,
        padding: '4px 10px',
        borderRadius: '20px',
        fontSize: '12px',
        fontWeight: 600,
        display: 'inline-block',
      }}
    >
      {config.label}
    </span>
  );
};

export default StatusBadge;
