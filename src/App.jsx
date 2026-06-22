import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ROUTES } from './constants/routes';

// Layout
import Layout from './components/layout/Layout';

// Pages
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import UserManagementPage from './pages/UserManagementPage';
import UserDetailPage from './pages/UserDetailPage';
import DriverApprovalPage from './pages/DriverApprovalPage';
import TripHistoryPage from './pages/TripHistoryPage';
import TripDetailPage from './pages/TripDetailPage';
import PricingConfigPage from './pages/PricingConfigPage';
import NotFoundPage from './pages/NotFoundPage';

// Router
import ProtectedRoute from './router/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: 'var(--bg-secondary)',
            color: 'var(--text-primary)',
            border: '1px solid var(--glass-border)',
            borderRadius: 'var(--radius-sm)',
            fontSize: '14px',
          },
          success: {
            iconTheme: { primary: 'var(--accent-green)', secondary: 'var(--bg-secondary)' },
          },
          error: {
            iconTheme: { primary: 'var(--accent-red)', secondary: 'var(--bg-secondary)' },
          },
        }}
      />
      <Routes>
        {/* Public routes */}
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />

        {/* Protected routes with Layout */}
        <Route element={<ProtectedRoute requiredRole="ADMIN" />}>
          <Route element={<Layout />}>
            <Route path={ROUTES.HOME} element={<Navigate to={ROUTES.DASHBOARD} replace />} />
            <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
            <Route path={ROUTES.USERS} element={<UserManagementPage />} />
            <Route path={ROUTES.USER_DETAIL} element={<UserDetailPage />} />
            <Route path={ROUTES.DRIVERS_PENDING} element={<DriverApprovalPage />} />
            <Route path={ROUTES.TRIPS} element={<TripHistoryPage />} />
            <Route path={ROUTES.TRIP_DETAIL} element={<TripDetailPage />} />
            <Route path={ROUTES.PRICING} element={<PricingConfigPage />} />
          </Route>
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
