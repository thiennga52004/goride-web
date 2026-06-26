import { useState, useCallback } from 'react';
import { useFetch } from '../hooks/useFetch';
import { driverService } from '../services/driverService';
import DriverApprovalCard from '../components/drivers/DriverApprovalCard';
import DriverProfileDrawer from '../components/drivers/DriverProfileDrawer';
import ConfirmDialog from '../components/common/ConfirmDialog';
import LoadingSkeleton from '../components/common/LoadingSkeleton';
import EmptyState from '../components/common/EmptyState';
import toast from 'react-hot-toast';

const DriverApprovalPage = () => {
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [actionType, setActionType] = useState(null); // 'APPROVE' | 'REJECT'
  const [actionLoading, setActionLoading] = useState(false);

  // Fetch Pending Drivers
  const fetchPendingFn = useCallback(() => driverService.getPendingDrivers(), []);
  const {
    data,
    loading,
    error,
    refetch: refetchPending,
  } = useFetch(fetchPendingFn, null, true);

  // Quick Action Handlers
  const handleOpenDrawer = (driver) => {
    setSelectedDriver(driver);
    setDrawerOpen(true);
  };

  const handleTriggerAction = (driver, type) => {
    setSelectedDriver(driver);
    setActionType(type);
    setConfirmOpen(true);
  };

  const handleConfirmAction = async () => {
    if (!selectedDriver || !actionType) return;
    setActionLoading(true);

    try {
      if (actionType === 'APPROVE') {
        await driverService.approveDriver(selectedDriver.id);
        toast.success(`Đã duyệt thành công hồ sơ của tài xế ${selectedDriver.name}`);
      } else {
        await driverService.rejectDriver(selectedDriver.id);
        toast.error(`Đã từ chối hồ sơ của tài xế ${selectedDriver.name}`);
      }
      setConfirmOpen(false);
      setDrawerOpen(false);
      setSelectedDriver(null);
      refetchPending();
    } catch (err) {
      toast.error(err.message || 'Thao tác thất bại, vui lòng thử lại');
    } finally {
      setActionLoading(false);
    }
  };

  const pendingDrivers = data?.content || [];

  return (
    <div className="driver-approval-page" style={{ padding: '24px' }}>
      <div className="page-header" style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-heading)', marginBottom: '4px' }}>
          Duyệt Tài xế
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: 0 }}>
          Phê duyệt hoặc từ chối các yêu cầu đăng ký đối tác tài xế mới
        </p>
      </div>

      <div className="page-content">
        {error ? (
          <div
            style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              padding: '48px',
              textAlign: 'center',
              color: 'var(--accent-red)',
            }}
          >
            Lỗi tải danh sách tài xế: {error.message || 'Đã có lỗi xảy ra'}
          </div>
        ) : loading && pendingDrivers.length === 0 ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(285px, 1fr))',
              gap: '20px',
            }}
          >
            <LoadingSkeleton type="card" count={4} />
          </div>
        ) : pendingDrivers.length === 0 ? (
          <div
            style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              boxShadow: 'var(--shadow-card)',
            }}
          >
            <EmptyState
              icon="🚗"
              title="Không có tài xế chờ duyệt"
              description="Hiện tại tất cả hồ sơ đối tác đăng ký đã được xử lý hoàn tất."
            />
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(285px, 1fr))',
              gap: '20px',
            }}
          >
            {pendingDrivers.map((driver) => (
              <DriverApprovalCard
                key={driver.id}
                driver={driver}
                onApprove={(d) => handleTriggerAction(d, 'APPROVE')}
                onReject={(d) => handleTriggerAction(d, 'REJECT')}
                onViewDetail={handleOpenDrawer}
                loading={actionLoading && selectedDriver?.id === driver.id}
              />
            ))}
          </div>
        )}
      </div>

      {/* Driver Detail Drawer */}
      <DriverProfileDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        driver={selectedDriver}
        onApprove={(d) => handleTriggerAction(d, 'APPROVE')}
        onReject={(d) => handleTriggerAction(d, 'REJECT')}
        loading={actionLoading}
      />

      {/* Approve/Reject Confirmation Modal */}
      <ConfirmDialog
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleConfirmAction}
        title={actionType === 'APPROVE' ? 'Duyệt tài xế' : 'Từ chối tài xế'}
        message={
          actionType === 'APPROVE'
            ? `Bạn có chắc chắn muốn DUYỆT tài xế "${selectedDriver?.name}" vào hệ thống GoRide?`
            : `Bạn có chắc chắn muốn TỪ CHỐI hồ sơ của tài xế "${selectedDriver?.name}"?`
        }
        confirmText={actionType === 'APPROVE' ? 'Phê duyệt' : 'Từ chối'}
        variant={actionType === 'APPROVE' ? 'success' : 'danger'}
        loading={actionLoading}
      />
    </div>
  );
};

export default DriverApprovalPage;
