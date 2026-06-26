import { useState, useEffect, useCallback } from 'react';
import { useFetch } from '../hooks/useFetch';
import { useDebounce } from '../hooks/useDebounce';
import { userService } from '../services/userService';
import UserFilters from '../components/users/UserFilters';
import UserTable from '../components/users/UserTable';
import Pagination from '../components/common/Pagination';
import ConfirmDialog from '../components/common/ConfirmDialog';
import LoadingSkeleton from '../components/common/LoadingSkeleton';
import toast from 'react-hot-toast';
import './UserManagementPage.css';

const UserManagementPage = () => {
  // Filter states
  const [search, setSearch] = useState('');
  const [role, setRole] = useState(null);
  const [status, setStatus] = useState(null);

  // Pagination states
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);

  // Sorting states
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');

  // Dialog state for Lock/Unlock confirmation
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [dialogLoading, setDialogLoading] = useState(false);

  // Debounce search value
  const debouncedSearch = useDebounce(search, 300);

  // Fetch Users
  const fetchUsersFn = useCallback((p) => userService.getUsers(p), []);
  const {
    data,
    loading,
    error,
    execute: executeFetchUsers,
  } = useFetch(
    fetchUsersFn,
    { page, size, search: debouncedSearch, role, status, sortField, sortDirection },
    true
  );

  // Re-run search/filter fetch
  useEffect(() => {
    executeFetchUsers({ page, size, search: debouncedSearch, role, status, sortField, sortDirection });
  }, [page, size, debouncedSearch, role, status, sortField, sortDirection, executeFetchUsers]);

  // Handlers for filters (resets page to 0)
  const handleSearch = (val) => {
    setSearch(val);
    setPage(0);
  };

  const handleRoleFilter = (val) => {
    setRole(val);
    setPage(0);
  };

  const handleStatusFilter = (val) => {
    setStatus(val);
    setPage(0);
  };

  const handleSort = (field) => {
    const isAsc = sortField === field && sortDirection === 'asc';
    setSortField(field);
    setSortDirection(isAsc ? 'desc' : 'asc');
    setPage(0);
  };

  // Open status change confirmation dialog
  const handleToggleStatus = (user) => {
    setSelectedUser(user);
    setDialogOpen(true);
  };

  const handleConfirmStatusChange = async () => {
    if (!selectedUser) return;
    setDialogLoading(true);
    const newStatus = selectedUser.status === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE';
    try {
      await userService.updateUserStatus(selectedUser.id, newStatus);
      toast.success(
        newStatus === 'ACTIVE'
          ? `Đã mở khóa tài khoản của ${selectedUser.name}`
          : `Đã khóa tài khoản của ${selectedUser.name}`
      );
      setDialogOpen(false);
      setSelectedUser(null);
      // Reload current page data
      executeFetchUsers({ page, size, search: debouncedSearch, role, status, sortField, sortDirection });
    } catch (err) {
      toast.error(err.message || 'Cập nhật trạng thái thất bại');
    } finally {
      setDialogLoading(false);
    }
  };

  return (
    <div className="user-management-page">
      <div className="page-header">
        <h1>Quản lý Người dùng</h1>
        <p>Danh sách và quản lý tài khoản hành khách, tài xế, quản trị viên</p>
      </div>

      <div
        className="page-content"
        style={{
          background: 'var(--bg-secondary)',
          borderRadius: 'var(--radius-md)',
          padding: '24px',
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--shadow-card)',
        }}
      >
        <UserFilters
          onSearch={handleSearch}
          onRoleFilter={handleRoleFilter}
          onStatusFilter={handleStatusFilter}
        />

        {error ? (
          <div className="content-placeholder" style={{ color: 'var(--accent-red)', padding: '40px' }}>
            Lỗi tải dữ liệu người dùng: {error.message || 'Đã có lỗi xảy ra'}
          </div>
        ) : loading && (!data || data.content.length === 0) ? (
          <LoadingSkeleton type="table" count={size} />
        ) : (
          <>
            <UserTable
              users={data?.content || []}
              loading={loading}
              onSort={handleSort}
              sortField={sortField}
              sortDirection={sortDirection}
              onToggleStatus={handleToggleStatus}
            />
            <Pagination
              page={page}
              totalPages={data?.totalPages || 0}
              totalElements={data?.totalElements || 0}
              size={size}
              onPageChange={setPage}
              onSizeChange={setSize}
            />
          </>
        )}
      </div>

      {/* Lock/Unlock Confirmation Dialog */}
      <ConfirmDialog
        isOpen={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onConfirm={handleConfirmStatusChange}
        title={selectedUser?.status === 'ACTIVE' ? 'Khóa tài khoản' : 'Mở khóa tài khoản'}
        message={
          selectedUser?.status === 'ACTIVE'
            ? `Bạn có chắc chắn muốn khóa tài khoản của "${selectedUser?.name}"? Người dùng này sẽ không thể đăng nhập hoặc đặt chuyến sau khi bị khóa.`
            : `Bạn có chắc chắn muốn mở khóa tài khoản cho "${selectedUser?.name}"?`
        }
        confirmText={selectedUser?.status === 'ACTIVE' ? 'Khóa' : 'Mở khóa'}
        variant={selectedUser?.status === 'ACTIVE' ? 'danger' : 'primary'}
        loading={dialogLoading}
      />
    </div>
  );
};

export default UserManagementPage;
