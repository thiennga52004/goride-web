import './LoadingSkeleton.css';

const LoadingSkeleton = ({ type = 'text', count = 1, className = '' }) => {
  const items = Array.from({ length: count }, (_, i) => i);

  if (type === 'table') {
    return (
      <div className={`skeleton-table ${className}`}>
        {items.map((i) => (
          <div key={i} className="skeleton-row">
            <div className="skeleton-cell" style={{ width: '30%' }} />
            <div className="skeleton-cell" style={{ width: '20%' }} />
            <div className="skeleton-cell" style={{ width: '25%' }} />
            <div className="skeleton-cell" style={{ width: '15%' }} />
          </div>
        ))}
      </div>
    );
  }

  if (type === 'card') {
    return (
      <div className={`skeleton-cards ${className}`}>
        {items.map((i) => <div key={i} className="skeleton-card" />)}
      </div>
    );
  }

  return (
    <div className={className}>
      {items.map((i) => <div key={i} className="skeleton-line" />)}
    </div>
  );
};

export default LoadingSkeleton;
