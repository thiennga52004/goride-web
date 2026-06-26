import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { userService } from '../services/userService';
import { tripService } from '../services/tripService';
import Avatar from '../components/common/Avatar';
import Button from '../components/common/Button';
import DataTable from '../components/common/DataTable';
import StatusBadge from '../components/common/StatusBadge';
import Pagination from '../components/common/Pagination';
import LoadingSkeleton from '../components/common/LoadingSkeleton';
import ConfirmDialog from '../components/common/ConfirmDialog';
import { formatDate, formatDateOnly } from '../utils/formatDate';
import { formatCurrency } from '../utils/formatCurrency';
import toast from 'react-hot-toast';

const UserDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');

  // Pagination for Trip History
  const [tripPage, setTripPage] = useState(0);
  const [tripSize, setTripSize] = useState(5);

  // Dialog state for Locking
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogLoading, setDialogLoading] = useState(false);

  // Fetch User Details
  const fetchUserFn = useCallback(() => userService.getUserById(Number(id)), [id]);
  const {
    data: user,
    loading: userLoading,
    error: userError,
    refetch: refetchUser,
  } = useFetch(fetchUserFn, null, true);

  // Fetch User Trips
  const isDriver = user?.role === 'DRIVER';
  const fetchTripsFn = useCallback(
    (params) => tripService.getTrips(params),
    []
  );
  const {
    data: tripsData,
    loading: tripsLoading,
    execute: executeFetchTrips,
  } = useFetch(fetchTripsFn, { page: tripPage, size: tripSize, passengerId: !isDriver ? id : undefined, driverId: isDriver ? id : undefined }, false);

  // Trigger trips fetch when user is loaded or pagination changes
  useEffect(() => {
    if (user) {
      executeFetchTrips({
        page: tripPage,
        size: tripSize,
        passengerId: user.role === 'PASSENGER' ? user.id : undefined,
        driverId: user.role === 'DRIVER' ? user.id : undefined,
      });
    }
  }, [user, tripPage, tripSize, executeFetchTrips]);

  const handleToggleStatus = () => {
    setDialogOpen(true);
  };

  const handleConfirmStatusChange = async () => {
    if (!user) return;
    setDialogLoading(true);
    const newStatus = user.status === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE';
    try {
      await userService.updateUserStatus(user.id, newStatus);
      toast.success(
        newStatus === 'ACTIVE'
          ? `Đã mở khóa tài khoản của ${user.name}`
          : `Đã khóa tài khoản của ${user.name}`
      );
      setDialogOpen(false);
      refetchUser();
    } catch (err) {
      toast.error(err.message || 'Cập nhật trạng thái thất bại');
    } finally {
      setDialogLoading(false);
    }
  };

  // Define Trip Columns
  const tripColumns = [
    {
      key: 'id',
      label: 'Mã chuyến',
      render: (val) => <span style={{ fontWeight: 600, color: 'var(--accent-primary)' }}>#{val}</span>,
    },
    {
      key: 'pickupAddress',
      label: 'Điểm đón',
      render: (val) => <div style={{ fontSize: '13px', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={val}>{val}</div>,
    },
    {
      key: 'dropoffAddress',
      label: 'Điểm đến',
      render: (val) => <div style={{ fontSize: '13px', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={val}>{val}</div>,
    },
    {
      key: 'status',
      label: 'Trạng thái',
      render: (val) => <StatusBadge status={val} />,
    },
    {
      key: 'fare',
      label: 'Giá tiền',
      render: (_, row) => (
        <span style={{ fontWeight: 500, color: 'var(--text-heading)' }}>
          {formatCurrency(row.actualFare || row.estimatedFare)}
        </span>
      ),
    },
    {
      key: 'requestedAt',
      label: 'Thời gian',
      render: (val) => formatDate(val),
    },
  ];

  if (userError) {
    return (
      <div style={{ padding: '24px', textAlign: 'center' }}>
        <h2 style={{ color: 'var(--accent-red)' }}>Lỗi tải thông tin</h2>
        <p style={{ color: 'var(--text-secondary)' }}>{userError.message || 'Không tìm thấy người dùng'}</p>
        <Button variant="secondary" onClick={() => navigate('/users')}>Quay lại danh sách</Button>
      </div>
    );
  }

  return (
    <div className="user-detail-page" style={{ padding: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-heading)', margin: '0 0 4px 0' }}>
            Chi tiết Người dùng
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: 0 }}>
            Xem hồ sơ cá nhân và lịch sử hoạt động
          </p>
        </div>
        <Button variant="secondary" size="sm" onClick={() => navigate('/users')}>
          ← Quay lại
        </Button>
      </div>

      {userLoading && !user ? (
        <div style={{ background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', padding: '24px', border: '1px solid var(--border-color)' }}>
          <LoadingSkeleton count={4} />
        </div>
      ) : !user ? null : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px', alignItems: 'start' }}>
          {/* Main Container - Left Card (Profile details) & Right Details (Tabs info) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', alignItems: 'start' }}>
            {/* PROFILE CARD */}
            <div
              style={{
                background: 'var(--bg-secondary)',
                borderRadius: 'var(--radius-md)',
                padding: '24px',
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--shadow-card)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
              }}
            >
              <Avatar src={user.avatar} name={user.name} size={100} style={{ marginBottom: '16px' }} />
              <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-heading)', margin: '0 0 8px 0' }}>{user.name}</h2>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', justifyContent: 'center' }}>
                <StatusBadge status={user.status} />
                <span
                  style={{
                    background: 'var(--bg-tertiary)',
                    color: 'var(--text-primary)',
                    padding: '4px 10px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: 600,
                  }}
                >
                  {user.role === 'ADMIN' ? 'Quản trị' : user.role === 'DRIVER' ? 'Tài xế' : 'Hành khách'}
                </span>
              </div>

              {/* Attributes info */}
              <div style={{ width: '100%', borderTop: '1px solid var(--border-color)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px', textAlign: 'left' }}>
                <div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '2px' }}>Số điện thoại</div>
                  <div style={{ fontSize: '14px', color: 'var(--text-primary)', fontWeight: 500 }}>{user.phone}</div>
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '2px' }}>Email</div>
                  <div style={{ fontSize: '14px', color: 'var(--text-primary)', fontWeight: 500 }}>{user.email || '—'}</div>
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '2px' }}>Ngày tham gia</div>
                  <div style={{ fontSize: '14px', color: 'var(--text-primary)', fontWeight: 500 }}>{formatDateOnly(user.createdAt)}</div>
                </div>
              </div>

              {/* Action Button to Lock/Unlock */}
              {user.role !== 'ADMIN' && (
                <div style={{ width: '100%', marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--border-color)' }}>
                  <Button
                    variant={user.status === 'ACTIVE' ? 'danger' : 'success'}
                    style={{ width: '100%' }}
                    onClick={handleToggleStatus}
                  >
                    {user.status === 'ACTIVE' ? 'Khóa tài khoản' : 'Mở khóa tài khoản'}
                  </Button>
                </div>
              )}
            </div>

            {/* TAB CONTAINER */}
            <div
              style={{
                background: 'var(--bg-secondary)',
                borderRadius: 'var(--radius-md)',
                padding: '24px',
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--shadow-card)',
                minHeight: '400px',
              }}
            >
              {/* Tab Header */}
              <div style={{ display: 'flex', borderBottom: '1px solid var(--border-color)', marginBottom: '20px', gap: '24px' }}>
                <button
                  onClick={() => setActiveTab('profile')}
                  style={{
                    padding: '8px 0 12px 0',
                    border: 'none',
                    background: 'transparent',
                    borderBottom: activeTab === 'profile' ? '2px solid var(--accent-primary)' : '2px solid transparent',
                    color: activeTab === 'profile' ? 'var(--accent-primary)' : 'var(--text-secondary)',
                    fontWeight: 600,
                    fontSize: '14px',
                    cursor: 'pointer',
                  }}
                >
                  Thông tin hồ sơ
                </button>
                <button
                  onClick={() => setActiveTab('trips')}
                  style={{
                    padding: '8px 0 12px 0',
                    border: 'none',
                    background: 'transparent',
                    borderBottom: activeTab === 'trips' ? '2px solid var(--accent-primary)' : '2px solid transparent',
                    color: activeTab === 'trips' ? 'var(--accent-primary)' : 'var(--text-secondary)',
                    fontWeight: 600,
                    fontSize: '14px',
                    cursor: 'pointer',
                  }}
                >
                  Lịch sử chuyến đi
                </button>
              </div>

              {/* Tab Content */}
              {activeTab === 'profile' ? (
                <div>
                  {user.role === 'DRIVER' && user.driverProfile ? (
                    <div>
                      <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-heading)', marginBottom: '16px' }}>
                        Thông tin Phương tiện & Hoạt động
                      </h3>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                        <div style={{ background: 'var(--bg-primary)', padding: '12px 16px', borderRadius: 'var(--radius-sm)' }}>
                          <span style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Biển số xe</span>
                          <span style={{ fontSize: '15px', color: 'var(--text-heading)', fontWeight: 600 }}>{user.driverProfile.licensePlate}</span>
                        </div>
                        <div style={{ background: 'var(--bg-primary)', padding: '12px 16px', borderRadius: 'var(--radius-sm)' }}>
                          <span style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Dịch vụ</span>
                          <span style={{ fontSize: '15px', color: 'var(--text-heading)', fontWeight: 600 }}>
                            {user.driverProfile.vehicleType === 'MOTORBIKE'
                              ? 'Xe máy (GoRide)'
                              : user.driverProfile.vehicleType === 'CAR_4_SEAT'
                              ? 'Ô tô 4 chỗ (GoCar 4)'
                              : 'Ô tô 7 chỗ (GoCar 7)'}
                          </span>
                        </div>
                        <div style={{ background: 'var(--bg-primary)', padding: '12px 16px', borderRadius: 'var(--radius-sm)' }}>
                          <span style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Phương tiện</span>
                          <span style={{ fontSize: '15px', color: 'var(--text-heading)', fontWeight: 600 }}>
                            {user.driverProfile.brand} {user.driverProfile.model} ({user.driverProfile.color})
                          </span>
                        </div>
                        <div style={{ background: 'var(--bg-primary)', padding: '12px 16px', borderRadius: 'var(--radius-sm)' }}>
                          <span style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Năm sản xuất</span>
                          <span style={{ fontSize: '15px', color: 'var(--text-heading)', fontWeight: 600 }}>{user.driverProfile.year || '—'}</span>
                        </div>
                        <div style={{ background: 'var(--bg-primary)', padding: '12px 16px', borderRadius: 'var(--radius-sm)' }}>
                          <span style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Đánh giá trung bình</span>
                          <span style={{ fontSize: '15px', color: 'var(--text-heading)', fontWeight: 600 }}>⭐ {user.driverProfile.rating} / 5.0</span>
                        </div>
                        <div style={{ background: 'var(--bg-primary)', padding: '12px 16px', borderRadius: 'var(--radius-sm)' }}>
                          <span style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Tổng số chuyến đi</span>
                          <span style={{ fontSize: '15px', color: 'var(--text-heading)', fontWeight: 600 }}>{user.driverProfile.totalTrips} chuyến</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-secondary)' }}>
                      <div style={{ fontSize: '40px', marginBottom: '12px' }}>👤</div>
                      <h4 style={{ color: 'var(--text-heading)', margin: '0 0 4px 0' }}>Tài khoản Hành khách</h4>
                      <p style={{ margin: 0, fontSize: '13px' }}>Không có thêm thông tin phương tiện bổ sung.</p>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  {tripsLoading && (!tripsData || tripsData.content.length === 0) ? (
                    <LoadingSkeleton type="table" count={tripSize} />
                  ) : (
                    <>
                      <DataTable
                        columns={tripColumns}
                        data={tripsData?.content || []}
                        loading={tripsLoading}
                        emptyMessage="Người dùng này chưa thực hiện chuyến đi nào"
                      />
                      <Pagination
                        page={tripPage}
                        totalPages={tripsData?.totalPages || 0}
                        totalElements={tripsData?.totalElements || 0}
                        size={tripSize}
                        onPageChange={setTripPage}
                        onSizeChange={setTripSize}
                      />
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Status Confirm Dialog */}
      <ConfirmDialog
        isOpen={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onConfirm={handleConfirmStatusChange}
        title={user?.status === 'ACTIVE' ? 'Khóa tài khoản' : 'Mở khóa tài khoản'}
        message={
          user?.status === 'ACTIVE'
            ? `Bạn có chắc chắn muốn khóa tài khoản của "${user?.name}"? Người dùng này sẽ không thể đặt chuyến hoặc nhận chuyến.`
            : `Bạn có chắc chắn muốn mở khóa tài khoản cho "${user?.name}"?`
        }
        confirmText={user?.status === 'ACTIVE' ? 'Khóa' : 'Mở khóa'}
        variant={user?.status === 'ACTIVE' ? 'danger' : 'primary'}
        loading={dialogLoading}
      />
    </div>
  );
};

export default UserDetailPage;
