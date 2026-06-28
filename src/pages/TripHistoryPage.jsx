import { useState, useEffect, useCallback } from 'react';
import { useFetch } from '../hooks/useFetch';
import { useDebounce } from '../hooks/useDebounce';
import { tripService } from '../services/tripService';
import TripFilters from '../components/trips/TripFilters';
import TripTable from '../components/trips/TripTable';
import Pagination from '../components/common/Pagination';
import LoadingSkeleton from '../components/common/LoadingSkeleton';
import './TripHistoryPage.css'; // wait, does it exist? If not, we will create/edit it

const TripHistoryPage = () => {
  // Filters
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState(null);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  // Pagination
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);

  // Sorting
  const [sortField, setSortField] = useState('requestedAt');
  const [sortDirection, setSortDirection] = useState('desc');

  // Debounced search
  const debouncedSearch = useDebounce(search, 300);

  // Fetch Trips
  const fetchTripsFn = useCallback((p) => tripService.getTrips(p), []);
  const {
    data,
    loading,
    error,
    execute: executeFetchTrips,
  } = useFetch(
    fetchTripsFn,
    { page, size, search: debouncedSearch, status, from, to, sortField, sortDirection },
    true
  );

  // Trigger search/filter fetch
  useEffect(() => {
    executeFetchTrips({ page, size, search: debouncedSearch, status, from, to, sortField, sortDirection });
  }, [page, size, debouncedSearch, status, from, to, sortField, sortDirection, executeFetchTrips]);

  const handleSearch = (val) => {
    setSearch(val);
    setPage(0);
  };

  const handleStatusFilter = (val) => {
    setStatus(val);
    setPage(0);
  };

  const handleFromChange = (val) => {
    setFrom(val);
    setPage(0);
  };

  const handleToChange = (val) => {
    setTo(val);
    setPage(0);
  };

  const handleSort = (field) => {
    const isAsc = sortField === field && sortDirection === 'asc';
    setSortField(field);
    setSortDirection(isAsc ? 'desc' : 'asc');
    setPage(0);
  };

  return (
    <div className="trip-history-page" style={{ padding: '24px' }}>
      <div className="page-header" style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-heading)', marginBottom: '4px' }}>
          Lịch sử Chuyến đi
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: 0 }}>
          Danh sách toàn bộ chuyến đi trên hệ thống GoRide
        </p>
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
        <TripFilters
          onSearch={handleSearch}
          onStatusFilter={handleStatusFilter}
          from={from}
          to={to}
          onFromChange={handleFromChange}
          onToChange={handleToChange}
        />

        {error ? (
          <div className="content-placeholder" style={{ color: 'var(--accent-red)', padding: '40px' }}>
            Lỗi tải dữ liệu chuyến đi: {error.message || 'Đã có lỗi xảy ra'}
          </div>
        ) : loading && (!data || data.content.length === 0) ? (
          <LoadingSkeleton type="table" count={size} />
        ) : (
          <>
            <TripTable
              trips={data?.content || []}
              loading={loading}
              onSort={handleSort}
              sortField={sortField}
              sortDirection={sortDirection}
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
    </div>
  );
};

export default TripHistoryPage;
