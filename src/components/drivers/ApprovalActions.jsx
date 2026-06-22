import Button from '../common/Button';

const ApprovalActions = ({ onApprove, onReject, loading }) => {
  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      <Button variant="success" onClick={onApprove} loading={loading}>Duyệt</Button>
      <Button variant="danger" onClick={onReject} loading={loading}>Từ chối</Button>
    </div>
  );
};

export default ApprovalActions;
