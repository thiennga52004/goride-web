const UserStatusToggle = ({ user, onToggle }) => {
  return (
    <button style={{ padding: '6px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: 'var(--bg-tertiary)', color: 'var(--text-primary)', cursor: 'pointer', fontSize: '13px' }}>
      Toggle Status
    </button>
  );
};

export default UserStatusToggle;
