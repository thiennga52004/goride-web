const DriverApprovalCard = ({ driver, onApprove, onReject, onViewDetail }) => {
  return (
    <div className="driver-approval-card" style={{ background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', padding: '20px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-card)' }}>
      <h3 style={{ color: 'var(--text-primary)' }}>{driver?.name || 'Driver'}</h3>
      <p style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Driver Approval Card — chờ implement</p>
    </div>
  );
};

export default DriverApprovalCard;
