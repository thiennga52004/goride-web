import { useState, useEffect } from 'react';
import SearchInput from '../common/SearchInput';
import DateRangePicker from '../common/DateRangePicker';

const TripFilters = ({ onSearch, onStatusFilter, from, to, onFromChange, onToChange }) => {
  const [searchValue, setSearchValue] = useState('');

  // Debounce/trigger search on change
  useEffect(() => {
    onSearch?.(searchValue);
  }, [searchValue, onSearch]);

  return (
    <div
      className="trip-filters"
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
          placeholder="Tìm khách hàng, tài xế..."
        />
      </div>
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
          minWidth: '180px',
        }}
      >
        <option value="">Tất cả trạng thái</option>
        <option value="SEARCHING">Đang tìm tài xế</option>
        <option value="ACCEPTED">Đã nhận chuyến</option>
        <option value="ARRIVED">Tài xế đã đến</option>
        <option value="IN_PROGRESS">Đang di chuyển</option>
        <option value="COMPLETED">Đã hoàn thành</option>
        <option value="CANCELLED">Hành khách hủy</option>
        <option value="NO_DRIVER">Không tìm thấy tài xế</option>
      </select>
      <DateRangePicker
        from={from}
        to={to}
        onFromChange={onFromChange}
        onToChange={onToChange}
      />
    </div>
  );
};

export default TripFilters;
