# GoRide Web Admin — Implementation Log

> Ghi chép chi tiết mỗi commit/task đã hoàn thành.

---

## Entry #1 — Foundation Scaffold

| Field | Value |
|---|---|
| **Date** | 2026-06-22 |
| **Branch** | `main` |
| **Phase** | Phase 1 — Foundation |
| **Task** | Tạo cấu trúc bộ khung (scaffold) cho toàn bộ dự án |

### Files Created

**Config & Entry:**
- `.env.development`, `.env.production`
- `src/main.jsx`, `src/App.jsx`, `src/index.css`

**Constants:**
- `src/constants/routes.js`, `src/constants/enums.js`, `src/constants/apiEndpoints.js`

**Stores:**
- `src/stores/authStore.js`, `src/stores/filterStore.js`, `src/stores/uiStore.js`

**Hooks:**
- `src/hooks/useAuth.js`, `src/hooks/usePagination.js`, `src/hooks/useDebounce.js`, `src/hooks/useFetch.js`, `src/hooks/useURLParams.js`

**Services:**
- `src/services/api.js`, `src/services/authService.js`, `src/services/userService.js`, `src/services/driverService.js`, `src/services/tripService.js`, `src/services/statsService.js`, `src/services/pricingService.js`, `src/services/mockData.js`

**Utils:**
- `src/utils/formatCurrency.js`, `src/utils/formatDate.js`, `src/utils/formatPhone.js`, `src/utils/validators.js`, `src/utils/statusHelpers.js`

**Layout:**
- `src/components/layout/Layout.jsx` + CSS
- `src/components/layout/Sidebar.jsx` + CSS
- `src/components/layout/Topbar.jsx` + CSS

**Common Components (16):**
- Button, Input, Select, DataTable, Pagination, StatusBadge, StatCard, DateRangePicker, SearchInput, Modal, Drawer, ConfirmDialog, Toast, EmptyState, LoadingSkeleton, Avatar

**Feature Components (15):**
- Dashboard: StatsOverview, RevenueChart, TripStatusChart, RecentTrips
- Users: UserTable, UserFilters, UserStatusToggle
- Drivers: DriverApprovalCard, DriverProfileDrawer, ApprovalActions
- Trips: TripTable, TripFilters, TripDetailModal, TripTimeline, TripStatusHistory
- Pricing: PricingCard, PricingEditForm

**Pages (9):**
- LoginPage, DashboardPage, UserManagementPage, UserDetailPage, DriverApprovalPage, TripHistoryPage, TripDetailPage, PricingConfigPage, NotFoundPage

**Router:**
- `src/router/index.jsx`, `src/router/ProtectedRoute.jsx`

### Behavior Implemented
- Toàn bộ cấu trúc thư mục theo Section 4 của plan
- CSS design system hoàn chỉnh (dark mode, glassmorphism, animations)
- Routing với ProtectedRoute guard (check JWT + admin role)
- Layout responsive (sidebar collapse tại breakpoints)
- Zustand stores với persist middleware
- Axios interceptors (JWT auto-attach, 401 refresh)
- Mock data cho development offline
- Utility functions (format currency/date/phone, status helpers)

### Validation
- Pending: `npm run dev`, `npm run build`

### Known Risks
- Node.js version warnings (v20.16.0, cần >= v20.19.0) — không ảnh hưởng chức năng
- Feature components đang là skeleton — cần implement ở các giai đoạn tiếp theo

---

## Entry #2 — Admin UI Theme Refactor (Clean Light Mode)

| Field | Value |
|---|---|
| **Date** | 2026-06-26 |
| **Branch** | `refactor-admin-ui-theme` |
| **Phase** | Phase 1 — Foundation (Refactor Theme) |
| **Task** | Thay đổi giao diện của admin từ Dark Mode + Glassmorphism sang Clean Light Mode |

### Files Modified

**Docs & Configuration:**
- `docs/admin_implementation_plan_v2.md`
- `src/App.jsx`
- `src/index.css`

**Layout:**
- `src/components/layout/Sidebar.css`
- `src/components/layout/Topbar.css`

**Common Components:**
- `src/components/common/Button.css`
- `src/components/common/DataTable.jsx`
- `src/components/common/DateRangePicker.jsx`
- `src/components/common/Drawer.jsx`
- `src/components/common/EmptyState.jsx`
- `src/components/common/LoadingSkeleton.css`
- `src/components/common/Modal.jsx`
- `src/components/common/Pagination.jsx`
- `src/components/common/SearchInput.jsx`
- `src/components/common/StatCard.jsx`

**Feature Components:**
- `src/components/dashboard/RecentTrips.jsx`
- `src/components/dashboard/RevenueChart.jsx`
- `src/components/dashboard/TripStatusChart.jsx`
- `src/components/drivers/DriverApprovalCard.jsx`
- `src/components/pricing/PricingCard.jsx`
- `src/components/users/UserStatusToggle.jsx`

**Pages:**
- `src/pages/LoginPage.css`
- `src/pages/DashboardPage.css`
- `src/pages/UserManagementPage.css`
- `src/pages/NotFoundPage.jsx`
- `src/pages/DriverApprovalPage.jsx`
- `src/pages/PricingConfigPage.jsx`
- `src/pages/TripDetailPage.jsx`
- `src/pages/TripHistoryPage.jsx`
- `src/pages/UserDetailPage.jsx`

**Utils:**
- `src/utils/statusHelpers.js`

### Behavior Implemented
- Chuyển đổi toàn bộ layout sang Clean Light Mode (Background `#F8F9FA`, surfaces/cards `#FFFFFF`).
- Sidebar đổi sang dark navy `#343A40` với chữ màu trắng và active highlight màu vibrant blue `#0D6EFD`.
- Headings đổi sang dark slate `#212529`, body text đổi sang medium gray `#6C757D`.
- Buttons và primary actions sử dụng vibrant blue `#0D6EFD`.
- Loại bỏ hoàn toàn hiệu ứng kính (glassmorphism), thay bằng flat card, border mỏng `#DEE2E6` và shadow nhẹ (`--shadow-card`).
- Cập nhật bảng màu cho các badge trạng thái (status badges) trong hệ thống để hài hòa với tone màu sáng mới.

### Validation
- `npm run build` chạy thành công (built in 3.02s).
- Không còn bất kỳ tham chiếu nào đến CSS variables cũ như `glass-bg`, `glass-border`, `glass-blur`, `accent-blue`, `shadow-glow` trong code.

### Known Risks
- Cần chạy lại ứng dụng trên dev server (`npm run dev`) để kiểm tra lại trực quan giao diện (contrast, spacing) khi hiển thị thực tế các components.

---

## Entry #3 — Phase 2: Auth + Dashboard Complete

| Field | Value |
|---|---|
| **Date** | 2026-06-26 |
| **Branch** | `refactor-admin-ui-theme` |
| **Phase** | Phase 2 — Auth + Dashboard |
| **Task** | Triển khai hoàn thiện logic LoginPage và DashboardPage với các biểu đồ, số liệu thống kê và bảng chuyến đi gần đây |

### Files Modified

**Pages:**
- `src/pages/LoginPage.jsx`
- `src/pages/DashboardPage.jsx`
- `src/pages/DashboardPage.css`

**Dashboard Components:**
- `src/components/dashboard/StatsOverview.jsx`
- `src/components/dashboard/RevenueChart.jsx`
- `src/components/dashboard/TripStatusChart.jsx`
- `src/components/dashboard/RecentTrips.jsx`

**Hooks:**
- `src/hooks/useFetch.js`

### Behavior Implemented
- **Đăng nhập**: LoginPage tích hợp hook `useAuth`, quản lý trạng thái loading/submit và xử lý thông báo lỗi từ API.
- **Trang tổng quan**: DashboardPage hiển thị số liệu động. Tích hợp bộ lọc ngày `DateRangePicker` tự động trigger tải lại dữ liệu (refetch) thông qua hook `useFetch`. Hiển thị skeleton loaders trong khi fetch dữ liệu.
- **Thống kê**: StatsOverview hiển thị 6 thẻ tổng hợp (Doanh thu, Chuyến đi, Khách hàng, Tài xế, Trạng thái).
- **Biểu đồ**: 
  - RevenueChart hiển thị xu hướng Doanh thu (vùng diện tích Area màu xanh) & Số chuyến đi (đường Line màu tím) dùng trục Y kép.
  - TripStatusChart hiển thị tỉ lệ phần trăm các trạng thái chuyến đi dưới dạng Donut PieChart, cell màu lấy từ `statusHelpers.js`.
- **Chuyến đi gần đây**: RecentTrips hiển thị 5 chuyến đi mới nhất bằng DataTable kết hợp StatusBadge.

### Validation
- `npm run lint` kiểm tra đạt chuẩn, 0 lỗi trong các file sửa đổi.
- `npm run build` tạo gói production thành công (built in 10.26s).
- Đã kiểm tra hoạt động trên dev server local tại cổng `5173`.

### Known Risks
- Mock data hoạt động tốt; cần test tích hợp thực tế khi bật kết nối API thật (`VITE_USE_MOCK=false`) để đảm bảo không lỗi format ngày hoặc kiểu dữ liệu số.

