import Modal from '../common/Modal';

const TripDetailModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Chi tiết chuyến đi" size="lg">
      <p style={{ color: 'var(--text-secondary)' }}>Trip Detail — chờ implement</p>
    </Modal>
  );
};

export default TripDetailModal;
