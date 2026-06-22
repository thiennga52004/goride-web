import { useParams } from 'react-router-dom';

const TripDetailPage = () => {
  const { id } = useParams();

  return (
    <div className="trip-detail-page" style={{ padding: '24px' }}>
      <div className="page-header">
        <h1 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>Chi tiết Chuyến đi</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Trip ID: {id}</p>
      </div>
      <div className="page-content">
        {/* TODO: Trip info, TripTimeline, TripStatusHistory, rating */}
        <div className="content-placeholder" style={{ background: 'var(--glass-bg)', backdropFilter: 'var(--glass-blur)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-md)', padding: '48px', textAlign: 'center', color: 'var(--text-secondary)' }}>
          Chi tiết chuyến đi sẽ hiển thị ở đây
        </div>
      </div>
    </div>
  );
};

export default TripDetailPage;
