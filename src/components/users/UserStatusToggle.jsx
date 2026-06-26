import Button from '../common/Button';

const UserStatusToggle = ({ user, onToggle }) => {
  if (!user) return null;

  const isActive = user.status === 'ACTIVE';

  return (
    <Button
      variant={isActive ? 'danger' : 'success'}
      size="sm"
      onClick={() => onToggle?.(user)}
    >
      {isActive ? 'Khóa' : 'Mở khóa'}
    </Button>
  );
};

export default UserStatusToggle;
