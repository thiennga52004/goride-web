import { Link } from 'react-router-dom';
import DataTable from '../common/DataTable';
import StatusBadge from '../common/StatusBadge';
import Avatar from '../common/Avatar';
import UserStatusToggle from './UserStatusToggle';
import { formatDateOnly } from '../../utils/formatDate';

const UserTable = ({ users = [], loading = false, onSort, sortField, sortDirection, onToggleStatus }) => {
  const columns = [
    {
      key: 'name',
      label: 'Người dùng',
      sortable: true,
      render: (name, row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Avatar src={row.avatar} name={name} size={36} />
          <div>
            <div style={{ fontWeight: 600, color: 'var(--text-heading)' }}>{name}</div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{row.email || '—'}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'phone',
      label: 'Số điện thoại',
      render: (val) => <span style={{ color: 'var(--text-primary)' }}>{val}</span>,
    },
    {
      key: 'role',
      label: 'Vai trò',
      render: (val) => {
        if (val === 'ADMIN') return 'Quản trị';
        if (val === 'DRIVER') return 'Tài xế';
        if (val === 'PASSENGER') return 'Hành khách';
        return val || '—';
      },
    },
    {
      key: 'createdAt',
      label: 'Ngày tạo',
      sortable: true,
      render: (val) => formatDateOnly(val),
    },
    {
      key: 'status',
      label: 'Trạng thái',
      render: (val) => <StatusBadge status={val} />,
    },
    {
      key: 'actions',
      label: 'Thao tác',
      render: (_, row) => (
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <Link
            to={`/users/${row.id}`}
            style={{
              padding: '6px 12px',
              fontSize: '13px',
              fontWeight: 500,
              textDecoration: 'none',
              color: 'var(--accent-primary)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--bg-secondary)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '30px',
              boxSizing: 'border-box',
            }}
          >
            Chi tiết
          </Link>
          {row.role !== 'ADMIN' && (
            <UserStatusToggle user={row} onToggle={onToggleStatus} />
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="user-table">
      <DataTable
        columns={columns}
        data={users}
        loading={loading}
        onSort={onSort}
        sortField={sortField}
        sortDirection={sortDirection}
        emptyMessage="Không tìm thấy người dùng nào phù hợp"
      />
    </div>
  );
};

export default UserTable;
