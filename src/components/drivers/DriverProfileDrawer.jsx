import Drawer from '../common/Drawer';

const DriverProfileDrawer = ({ isOpen, onClose, driver }) => {
  return (
    <Drawer isOpen={isOpen} onClose={onClose} title="Hồ sơ tài xế">
      <p style={{ color: 'var(--text-secondary)' }}>Driver Profile — chờ implement</p>
    </Drawer>
  );
};

export default DriverProfileDrawer;
