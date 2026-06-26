import { useState, useEffect, useCallback } from 'react';
import { useFetch } from '../hooks/useFetch';
import { statsService } from '../services/statsService';
import { tripService } from '../services/tripService';
import StatsOverview from '../components/dashboard/StatsOverview';
import RevenueChart from '../components/dashboard/RevenueChart';
import TripStatusChart from '../components/dashboard/TripStatusChart';
import RecentTrips from '../components/dashboard/RecentTrips';
import DateRangePicker from '../components/common/DateRangePicker';
import LoadingSkeleton from '../components/common/LoadingSkeleton';
import './DashboardPage.css';

const DashboardPage = () => {
  // Set default range to last 30 days
  const [from, setFrom] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() - 30);
    return d.toISOString().split('T')[0];
  });
  const [to, setTo] = useState(() => new Date().toISOString().split('T')[0]);

  // Fetch Stats data (runs immediately and re-runs on filter changes)
  const fetchStatsFn = useCallback((params) => statsService.getStats(params?.from, params?.to), []);
  const {
    data: stats,
    loading: statsLoading,
    error: statsError,
    execute: executeFetchStats,
  } = useFetch(fetchStatsFn, { from, to }, true);

  // Fetch Recent Trips (only page 0, size 5)
  const fetchTripsFn = useCallback((params) => tripService.getTrips(params), []);
  const {
    data: tripsData,
    loading: tripsLoading,
    error: tripsError,
  } = useFetch(fetchTripsFn, { page: 0, size: 5 }, true);

  // Trigger stats refetch when date filter changes
  useEffect(() => {
    executeFetchStats({ from, to });
  }, [from, to, executeFetchStats]);

  return (
    <div className="dashboard-page">
      <div className="page-header">
        <div>
          <h1>Dashboard</h1>
          <p>Tổng quan hệ thống GoRide</p>
        </div>
        <DateRangePicker
          from={from}
          to={to}
          onFromChange={setFrom}
          onToChange={setTo}
        />
      </div>

      <div className="dashboard-content">
        {/* Stats Overview */}
        {statsLoading && !stats ? (
          <LoadingSkeleton type="card" count={6} className="stats-skeleton-grid" />
        ) : statsError ? (
          <div className="stats-placeholder" style={{ color: 'var(--accent-red)' }}>
            Lỗi tải số liệu thống kê: {statsError.message || 'Đã có lỗi xảy ra'}
          </div>
        ) : (
          <StatsOverview stats={stats} />
        )}

        {/* Charts Section */}
        <div className="dashboard-charts-grid">
          {statsLoading && !stats ? (
            <>
              <div style={{ height: 320, background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '24px' }}>
                <LoadingSkeleton count={3} />
              </div>
              <div style={{ height: 320, background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '24px' }}>
                <LoadingSkeleton count={3} />
              </div>
            </>
          ) : (
            <>
              <RevenueChart data={stats?.dailyRevenue || []} />
              <TripStatusChart data={stats?.tripsByStatus || []} />
            </>
          )}
        </div>

        {/* Recent Trips Table */}
        {tripsError ? (
          <div className="stats-placeholder" style={{ color: 'var(--accent-red)' }}>
            Lỗi tải chuyến đi gần đây: {tripsError.message || 'Đã có lỗi xảy ra'}
          </div>
        ) : (
          <RecentTrips trips={tripsData?.content || []} loading={tripsLoading} />
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
