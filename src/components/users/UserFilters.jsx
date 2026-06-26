import { useState, useEffect } from 'react';
import SearchInput from '../common/SearchInput';

const UserFilters = ({ onSearch, onRoleFilter, onStatusFilter }) => {
  const [searchValue, setSearchValue] = useState('');

  // Call onSearch when searchValue changes
  useEffect(() => {
    onSearch?.(searchValue);
  }, [searchValue, onSearch]);

  return (
    <div
      className="user-filters"
      style={{
        display: 'flex',
        gap: '12px',
        marginBottom: '20px',
        flexWrap: 'wrap',
        width: '100%',
        alignItems: 'center',
      }}
    >
      <div style={{ flex: 1, minWidth: '200px' }}>
        <SearchInput
          value={searchValue}
          onChange={setSearchValue}
          placeholder="Tìm tên, số điện thoại..."
        />
      </div>
      <select
        onChange={(e) => onRoleFilter?.(e.target.value || null)}
        style={{
          padding: '10px 12px',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--border-color)',
          background: 'var(--bg-secondary)',
          color: 'var(--text-primary)',
          fontSize: '14px',
          outline: 'none',
          cursor: 'pointer',
          minWidth: '150px',
        }}
      >
        <option value="">Tất cả vai trò</option>
        <option value="PASSENGER">Hành khách</option>
        <option value="DRIVER">Tài xế</option>
        <option value="ADMIN">Quản trị viên</option>
      </select>
      <select
        onChange={(e) => onStatusFilter?.(e.target.value || null)}
        style={{
          padding: '10px 12px',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--border-color)',
          background: 'var(--bg-secondary)',
          color: 'var(--text-primary)',
          fontSize: '14px',
          outline: 'none',
          cursor: 'pointer',
          minWidth: '150px',
        }}
      >
        <option value="">Tất cả trạng thái</option>
        <option value="ACTIVE">Đang hoạt động</option>
        <option value="SUSPENDED">Bị khóa</option>
      </select>
    </div>
  );
};

export default UserFilters;
