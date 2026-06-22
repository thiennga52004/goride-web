const TripTimeline = ({ statusHistory = [] }) => {
  return (
    <div className="trip-timeline">
      <h4 style={{ color: 'var(--text-primary)', marginBottom: '16px' }}>Lịch sử trạng thái</h4>
      {/* TODO: Visual timeline */}
      <p style={{ color: 'var(--text-secondary)' }}>Timeline — chờ implement</p>
    </div>
  );
};

export default TripTimeline;
