# Kế hoạch Triển khai Cải tiến: GoRide Web Admin

> **Phiên bản:** 2.0 — Cải tiến từ bản đánh giá [admin_implementation_plan.md](file:///d:/hoc/Project/LVTN/goride-web/docs/admin_implementation_plan.md)
> **Tham chiếu:** [TDD.md](file:///d:/hoc/Project/LVTN/goride-web/docs/TDD.md)

Ứng dụng **Web Admin** cho hệ thống GoRide, sử dụng **React + Vite**, giao tiếp hoàn toàn qua REST API với backend Spring Boot. Admin quản lý người dùng, phê duyệt tài xế, giám sát chuyến đi, xem thống kê hệ thống và điều chỉnh giá cước.

---

## 1. Tech Stack

| Thành phần | Công nghệ | Lý do |
|---|---|---|
| **Framework** | React 19 + Vite | Nhanh, HMR tốt, đúng spec TDD |
| **Routing** | React Router v7 | Nested routes, loader, route guards |
| **State Management** | Zustand | Lightweight, không boilerplate, đủ cho admin app |
| **HTTP Client** | Axios | Interceptor cho auto-refresh token, request/response transform |
| **Biểu đồ** | Recharts | React-native, responsive, animation built-in |
| **Date Picker** | react-datepicker | Nhẹ, customizable, hỗ trợ range |
| **Icons** | Lucide React | Tree-shakeable, consistent design, nhẹ |
| **Notifications** | React Hot Toast | Nhẹ, đẹp, dễ customize |
| **Font** | Inter (Google Fonts) | Modern, excellent readability |
| **CSS** | Vanilla CSS + CSS Variables | Kiểm soát hoàn toàn, không dependency thừa |

---

## 2. Kiến trúc Frontend

### 2.1 State Management — Zustand Stores

```
stores/
├── authStore.js        ← user info, tokens, login/logout actions
├── filterStore.js      ← shared filter state (dateRange, search, status)
└── uiStore.js          ← sidebar collapse, theme, toast queue
```

**Tại sao Zustand:**
- Không cần Provider wrapper (khác Context)
- API đơn giản: `const user = useAuthStore(s => s.user)`
- Persist middleware cho token storage
- Devtools support

### 2.2 Custom Hooks

```
hooks/
├── useAuth.js          ← login, logout, isAuthenticated, refreshToken
├── usePagination.js    ← page, size, sort, direction, handlers
├── useDebounce.js      ← debounce search input (300ms)
├── useFetch.js         ← generic data fetching with loading/error state
└── useURLParams.js     ← sync filter/pagination state với URL search params
```

### 2.3 API Layer — Axios Interceptor

```javascript
// services/api.js
const api = axios.create({ baseURL: import.meta.env.VITE_API_BASE_URL });

// Request: tự động đính kèm JWT
api.interceptors.request.use(config => {
  const token = useAuthStore.getState().accessToken;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Response: tự động refresh token khi 401
api.interceptors.response.use(
  response => response.data,  // unwrap envelope {success, data, message}
  async error => {
    if (error.response?.status === 401 && !error.config._retry) {
      error.config._retry = true;
      try {
        const newToken = await refreshAccessToken();
        error.config.headers.Authorization = `Bearer ${newToken}`;
        return api(error.config);
      } catch {
        // Refresh cũng fail → redirect login
        useAuthStore.getState().logout();
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);
```

> **QUAN TRỌNG:** Access token sống 15 phút (TDD Section 5.1). Interceptor này đảm bảo admin không bị logout giữa chừng khi đang làm việc.

---

## 3. Route Map

| Path | Page | Guard | Mô tả |
|---|---|---|---|
| `/login` | LoginPage | Public | Đăng nhập admin |
| `/` | Dashboard | 🔒 Admin | Redirect → `/dashboard` |
| `/dashboard` | DashboardPage | 🔒 Admin | Thống kê tổng quan + biểu đồ |
| `/users` | UserManagementPage | 🔒 Admin | Danh sách passengers & drivers |
| `/users/:id` | UserDetailPage | 🔒 Admin | Chi tiết user + trip history |
| `/drivers/pending` | DriverApprovalPage | 🔒 Admin | Danh sách tài xế chờ duyệt |
| `/trips` | TripHistoryPage | 🔒 Admin | Toàn bộ chuyến đi + filters |
| `/trips/:id` | TripDetailPage | 🔒 Admin | Chi tiết chuyến + audit log |
| `/pricing` | PricingConfigPage | 🔒 Admin | Cấu hình giá cước |
| `*` | NotFoundPage | Public | 404 |

### Route Guard — ProtectedRoute

```jsx
// Kiểm tra: có token? → token hợp lệ? → role === ADMIN?
// Nếu không → redirect /login với return URL
<Route element={<ProtectedRoute requiredRole="ADMIN" />}>
  <Route path="/dashboard" element={<DashboardPage />} />
  {/* ... */}
</Route>
```

---

## 4. Cấu trúc Thư mục

```
goride-web/
├── docs/
│   ├── TDD.md
│   ├── admin_implementation_plan.md
│   └── admin_implementation_plan_v2.md   ← [Tài liệu này]
├── .env.development                ← VITE_API_BASE_URL=http://localhost:8080/api/v1
├── .env.production                 ← VITE_API_BASE_URL=https://api.ridesharing.app/api/v1
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx                    ← Entry point, render <App />
    ├── App.jsx                     ← Router setup, global providers
    ├── index.css                   ← CSS reset, variables, glassmorphism, animations
    │
    ├── assets/
    │   ├── logo.svg
    │   └── images/
    │
    ├── constants/
    │   ├── routes.js               ← Route path constants
    │   ├── enums.js                ← TripStatus, UserRole, VehicleType, ApprovalStatus, PaymentStatus
    │   └── apiEndpoints.js         ← API endpoint constants
    │
    ├── hooks/
    │   ├── useAuth.js
    │   ├── usePagination.js
    │   ├── useDebounce.js
    │   ├── useFetch.js
    │   └── useURLParams.js
    │
    ├── stores/
    │   ├── authStore.js
    │   ├── filterStore.js
    │   └── uiStore.js
    │
    ├── services/
    │   ├── api.js                  ← Axios instance + interceptors
    │   ├── authService.js          ← login, logout, refresh
    │   ├── userService.js          ← getUsers, updateStatus
    │   ├── driverService.js        ← getPending, approve, reject
    │   ├── tripService.js          ← getTrips, getTripDetail
    │   ├── statsService.js         ← getStats
    │   ├── pricingService.js       ← getPricing, updatePricing
    │   └── mockData.js             ← Dữ liệu giả lập offline
    │
    ├── utils/
    │   ├── formatCurrency.js       ← 49600 → "49.600 ₫"
    │   ├── formatDate.js           ← ISO string → "15/01/2024 10:30"
    │   ├── formatPhone.js          ← "0901234567" → "090 123 4567"
    │   ├── validators.js           ← Validate form inputs
    │   └── statusHelpers.js        ← getStatusColor(), getStatusLabel()
    │
    ├── components/
    │   ├── layout/
    │   │   ├── Layout.jsx          ← Shell: Sidebar + Topbar + Content area
    │   │   ├── Sidebar.jsx         ← Navigation menu, collapse toggle, user info
    │   │   └── Topbar.jsx          ← Page title, breadcrumb, quick actions
    │   │
    │   ├── common/
    │   │   ├── Button.jsx          ← Primary, secondary, danger, ghost variants
    │   │   ├── Input.jsx           ← Text input with label, error, icon support
    │   │   ├── Select.jsx          ← Dropdown select
    │   │   ├── DataTable.jsx       ← Sortable columns, pagination, empty state, loading skeleton
    │   │   ├── StatusBadge.jsx     ← Color-coded badge (ACTIVE=green, SUSPENDED=red, PENDING=yellow)
    │   │   ├── StatCard.jsx        ← Metric card (icon, value, label, trend indicator)
    │   │   ├── DateRangePicker.jsx ← From/To date filter
    │   │   ├── SearchInput.jsx     ← Debounced search với icon
    │   │   ├── Modal.jsx           ← Generic modal overlay
    │   │   ├── Drawer.jsx          ← Slide-in panel từ phải
    │   │   ├── ConfirmDialog.jsx   ← "Bạn có chắc muốn khóa tài khoản này?"
    │   │   ├── Toast.jsx           ← Success/error notification
    │   │   ├── EmptyState.jsx      ← "Không có dữ liệu" illustration
    │   │   ├── LoadingSkeleton.jsx ← Shimmer loading cho tables và cards
    │   │   ├── Pagination.jsx      ← Page numbers, prev/next, page size selector
    │   │   └── Avatar.jsx          ← User avatar with fallback initials
    │   │
    │   ├── dashboard/
    │   │   ├── StatsOverview.jsx   ← Grid 6 StatCards
    │   │   ├── RevenueChart.jsx    ← Biểu đồ đường doanh thu theo ngày
    │   │   ├── TripStatusChart.jsx ← Biểu đồ cột: completed vs cancelled
    │   │   └── RecentTrips.jsx     ← Mini table 5 chuyến gần nhất
    │   │
    │   ├── users/
    │   │   ├── UserTable.jsx       ← DataTable cho danh sách users
    │   │   ├── UserFilters.jsx     ← Role + Status + Search filters
    │   │   └── UserStatusToggle.jsx← Toggle ACTIVE/SUSPENDED + ConfirmDialog
    │   │
    │   ├── drivers/
    │   │   ├── DriverApprovalCard.jsx  ← Card hiển thị hồ sơ tài xế pending
    │   │   ├── DriverProfileDrawer.jsx ← Drawer chi tiết: CCCD, bằng lái, xe, ảnh
    │   │   └── ApprovalActions.jsx     ← Approve/Reject buttons + note input
    │   │
    │   ├── trips/
    │   │   ├── TripTable.jsx           ← DataTable cho danh sách trips
    │   │   ├── TripFilters.jsx         ← Status + DateRange + Passenger/Driver search
    │   │   ├── TripDetailModal.jsx     ← Modal chi tiết chuyến đi
    │   │   ├── TripTimeline.jsx        ← Visual timeline: SEARCHING → ... → COMPLETED
    │   │   └── TripStatusHistory.jsx   ← Audit log từ trip_status_history
    │   │
    │   └── pricing/
    │       ├── PricingCard.jsx         ← Card hiển thị giá cho 1 vehicle type
    │       └── PricingEditForm.jsx     ← Form chỉnh base_fare, per_km_rate...
    │
    ├── pages/
    │   ├── LoginPage.jsx
    │   ├── DashboardPage.jsx
    │   ├── UserManagementPage.jsx
    │   ├── UserDetailPage.jsx
    │   ├── DriverApprovalPage.jsx
    │   ├── TripHistoryPage.jsx
    │   ├── TripDetailPage.jsx
    │   ├── PricingConfigPage.jsx
    │   └── NotFoundPage.jsx
    │
    └── router/
        ├── index.jsx               ← Route definitions
        └── ProtectedRoute.jsx      ← Auth + role guard
```

---

## 5. Thiết kế Giao diện

### 5.1 Design System — CSS Variables

```css
:root {
  /* Background */
  --bg-primary: #0f1117;          /* Main background - Deep dark */
  --bg-secondary: #1a1d2e;       /* Cards, sidebar */
  --bg-tertiary: #242842;        /* Elevated surfaces */
  --bg-glass: rgba(26, 29, 46, 0.7); /* Glassmorphism */

  /* Text */
  --text-primary: #f0f0f5;       /* Main text */
  --text-secondary: #8b8fa3;     /* Muted text */
  --text-tertiary: #5a5f7a;      /* Disabled text */

  /* Accent - Neon palette */
  --accent-green: #00e5a0;       /* Success, active, completed */
  --accent-blue: #3b82f6;        /* Primary actions, links */
  --accent-red: #ef4444;         /* Danger, cancelled, suspended */
  --accent-yellow: #f59e0b;      /* Warning, pending */
  --accent-purple: #8b5cf6;      /* Info, stats highlight */

  /* Glassmorphism */
  --glass-bg: rgba(26, 29, 46, 0.6);
  --glass-border: rgba(255, 255, 255, 0.08);
  --glass-blur: blur(16px);

  /* Spacing, radius, shadows */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --shadow-card: 0 4px 24px rgba(0, 0, 0, 0.3);
  --shadow-glow-green: 0 0 20px rgba(0, 229, 160, 0.15);

  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-normal: 250ms ease;
  --transition-slow: 400ms cubic-bezier(0.4, 0, 0.2, 1);

  /* Layout */
  --sidebar-width: 260px;
  --sidebar-collapsed: 72px;
  --topbar-height: 64px;
}
```

### 5.2 Phong cách thiết kế

- **Dark Mode Premium**: Nền tối sâu, chữ sáng, accent neon
- **Glassmorphism**: Cards, sidebar, modals có `backdrop-filter: blur(16px)` + viền subtle
- **Micro-animations**: Hover scale trên buttons, fade-in khi load data, smooth sidebar collapse
- **Typography**: Inter font, font-weight 400/500/600/700
- **Consistent spacing**: Dùng `8px` grid system (8, 16, 24, 32, 48px)

### 5.3 Responsive Strategy

| Breakpoint | Hành vi |
|---|---|
| ≥ 1280px | Full layout: Sidebar mở rộng + content area |
| 1024–1279px | Sidebar tự động collapse (chỉ icon) |
| < 1024px | Sidebar overlay + hamburger menu |

> Admin app ưu tiên desktop. Tablet hỗ trợ cơ bản, mobile chỉ cần đọc được.

---

## 6. Tính năng Chi tiết

### 6.1 Đăng nhập (LoginPage)

**Luồng:**
1. Admin nhập số điện thoại + mật khẩu
2. Gọi `POST /auth/login` → nhận `accessToken` + `refreshToken`
3. Kiểm tra `role === ADMIN` → nếu không phải admin, hiển thị lỗi "Tài khoản không có quyền admin"
4. Lưu tokens vào Zustand store (persist to localStorage)
5. Redirect về trang đã yêu cầu trước đó hoặc `/dashboard`

**UI:**
- Centered card trên nền dark gradient
- Logo GoRide phía trên form
- Input fields: Phone, Password
- Button "Đăng nhập" với loading spinner
- Error message inline dưới form

**API:** `POST /auth/login` (TDD Section 4.5)

---

### 6.2 Dashboard (DashboardPage)

**Layout:**
```
┌─────────────────────────────────────────────────────┐
│  Date Range Picker: [01/01/2024] → [31/01/2024]     │
├─────────────────────────────────────────────────────┤
│ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐
│ │Total │ │Done  │ │Cancel│ │Rev   │ │Drivers│ │Pass  │
│ │Trips │ │Trips │ │Trips │ │enue  │ │Active │ │enger │
│ │ 1250 │ │ 1100 │ │  120 │ │ 85M  │ │  45   │ │ 320  │
│ └──────┘ └──────┘ └──────┘ └──────┘ └──────┘ └──────┘
├───────────────────────┬─────────────────────────────┤
│  Revenue Chart (Line) │   Trip Status Chart (Bar)   │
│  Doanh thu theo ngày  │   Completed vs Cancelled    │
├───────────────────────┴─────────────────────────────┤
│  Recent Trips — 5 chuyến gần nhất (mini table)      │
└─────────────────────────────────────────────────────┘
```

**API:** `GET /admin/stats?from={from}&to={to}` (TDD Section 4.12)

**Biểu đồ (Recharts):**
- **Revenue Line Chart**: Trục X = ngày, Trục Y = doanh thu VND, gradient fill
- **Trip Status Bar Chart**: Stacked bar — Completed (green) vs Cancelled (red)
- Tooltip on hover, smooth animation khi load

---

### 6.3 Quản lý Người dùng (UserManagementPage)

**Filters:**
- Search: tên / số điện thoại / email (debounce 300ms)
- Role: Tất cả | PASSENGER | DRIVER
- Status: Tất cả | ACTIVE | SUSPENDED
- Tất cả filter sync với URL search params

**DataTable columns:**

| Column | Sortable | Mô tả |
|---|---|---|
| Avatar + Tên | ✅ | Avatar fallback → initials |
| Số điện thoại | ❌ | Formatted: 090 123 4567 |
| Email | ❌ | — |
| Vai trò | ❌ | Badge: PASSENGER (blue), DRIVER (purple) |
| Trạng thái | ❌ | Badge: ACTIVE (green), SUSPENDED (red) |
| Ngày tạo | ✅ | Format: 15/01/2024 |
| Hành động | ❌ | Xem chi tiết \| Khóa/Mở khóa |

**Hành động Khóa/Mở khóa:**
1. Click button → ConfirmDialog: "Bạn có chắc muốn khóa tài khoản {name}?"
2. Gọi `PATCH /admin/users/{userId}/status` body `{ status: "SUSPENDED", reason: "..." }`
3. Toast success: "Đã khóa tài khoản {name}"
4. Refresh table row

**API:**
- `GET /admin/users?page={p}&size={s}&role={r}&status={st}` (TDD Section 4.12)
- `PATCH /admin/users/{userId}/status` (TDD Section 4.12)

---

### 6.4 Chi tiết Người dùng (UserDetailPage)

**Hiển thị:**
- Profile card: Avatar, tên, phone, email, role, status, ngày tạo
- Nếu DRIVER: hiển thị thêm driver profile (loại xe, biển số, rating, tổng trips, approval status)
- Tab "Lịch sử chuyến đi": DataTable các trips liên quan đến user
- Button hành động: Khóa/Mở khóa tài khoản

**API:**
- `GET /admin/users` (filter by userId)
- `GET /admin/trips?passengerId={id}` hoặc `GET /admin/trips?driverId={id}`

---

### 6.5 Duyệt Tài xế (DriverApprovalPage)

**Layout:** Grid cards các tài xế `approval_status = PENDING`

**DriverApprovalCard:**
```
┌──────────────────────────────┐
│  [Ảnh chân dung]  Tran Van B │
│  📱 091 234 5678              │
│  🏍️ MOTORBIKE — 51A-123.45   │
│  📋 CCCD: 012345678901       │
│  🪪 Bằng lái: A1-123456     │
│  📅 Hết hạn: 15/06/2028     │
│                              │
│  [✅ Duyệt]    [❌ Từ chối]   │
└──────────────────────────────┘
```

**Xem chi tiết:** Click card → DriverProfileDrawer slide in từ phải
- Hiển thị đầy đủ: ảnh phóng to, thông tin xe (brand, model, color, year)
- Nút Approve / Reject + input ghi chú lý do

**API:**
- `GET /admin/users?role=DRIVER&approvalStatus=PENDING`
- `PATCH /admin/drivers/{driverId}/approval` body `{ status: "APPROVED" | "REJECTED", note: "..." }` (TDD Section 4.12)

---

### 6.6 Lịch sử Chuyến đi (TripHistoryPage)

**Filters (sync URL):**
- Trạng thái: Tất cả | SEARCHING | ACCEPTED | ARRIVED | IN_PROGRESS | COMPLETED | CANCELLED | NO_DRIVER
- Khoảng thời gian: DateRangePicker
- Tìm kiếm: Tên/SĐT hành khách hoặc tài xế

**DataTable columns:**

| Column | Sortable | Mô tả |
|---|---|---|
| ID | ✅ | Trip ID |
| Hành khách | ❌ | Tên + phone |
| Tài xế | ❌ | Tên + phone (hoặc "—" nếu chưa match) |
| Điểm đón | ❌ | Truncated address |
| Điểm trả | ❌ | Truncated address |
| Trạng thái | ❌ | StatusBadge color-coded |
| Giá ước tính | ✅ | Format VND |
| Giá thực tế | ✅ | Format VND (hoặc "—") |
| Thời gian | ✅ | requested_at |
| Hành động | ❌ | Xem chi tiết |

**API:** `GET /admin/trips?page={p}&size={s}&status={st}&from={f}&to={t}` (TDD Section 4.12)

---

### 6.7 Chi tiết Chuyến đi (TripDetailPage hoặc TripDetailModal)

**Sections:**

**A. Thông tin chung:**
- ID, trạng thái (StatusBadge lớn), loại xe
- Hành khách: avatar, tên, phone
- Tài xế: avatar, tên, phone, biển số, rating

**B. Hành trình:**
- Điểm đón: địa chỉ + tọa độ
- Điểm trả: địa chỉ + tọa độ
- Khoảng cách: ước tính vs thực tế
- Thời gian: ước tính vs thực tế

**C. Tài chính:**
- Giá ước tính, giá thực tế, phương thức thanh toán, trạng thái thanh toán
- Pricing config áp dụng (base_fare, per_km_rate...)

**D. Timeline trạng thái (TripTimeline):**
```
● SEARCHING     15/01/2024  10:30:00   Passenger đặt xe
│
● ACCEPTED      15/01/2024  10:31:00   Driver Tran Van B
│
● ARRIVED       15/01/2024  10:38:00   Tài xế đến điểm đón
│
● IN_PROGRESS   15/01/2024  10:40:00   Bắt đầu chuyến
│
● COMPLETED     15/01/2024  10:55:00   Hoàn thành
```
Dữ liệu từ bảng `trip_status_history` (TDD Section 3.6)

**E. Đánh giá (nếu có):**
- Số sao (★★★★★), nhận xét

**API:**
- `GET /bookings/{tripId}` (TDD Section 4.6)
- Trip status history từ API trip detail

---

### 6.8 Cấu hình Giá (PricingConfigPage)

**Layout:** 3 PricingCards — MOTORBIKE, CAR_4_SEAT, CAR_7_SEAT

**PricingCard:**
```
┌──────────────────────────┐
│  🏍️ Xe máy (MOTORBIKE)   │
│                          │
│  Phí mở cửa:    10.000₫ │
│  Mỗi km:         4.000₫ │
│  Mỗi phút:        300₫  │
│  Giá tối thiểu: 15.000₫ │
│  Hệ số cao điểm:   1.0x │
│                          │
│  [✏️ Chỉnh sửa]          │
└──────────────────────────┘
```

**Chỉnh sửa:** Click → PricingEditForm mở trong modal
- Validate: tất cả giá trị > 0, surge_multiplier ≥ 1.0
- Submit → `PUT /admin/pricing/{pricingConfigId}`
- Toast success: "Đã cập nhật giá cước xe máy"

> **Lưu ý:** TDD Section 5.7 — Backend tạo bản ghi pricing_config mới (không sửa bản cũ), set `is_active = FALSE` cho config cũ. Frontend chỉ cần gọi PUT, backend xử lý logic.

**API:**
- `GET /pricing` (TDD Section 4.10)
- `PUT /admin/pricing/{pricingConfigId}` (TDD Section 4.12)

---

## 7. Error Handling Strategy

### 7.1 Phân loại lỗi

| Loại | Cách xử lý | Ví dụ |
|---|---|---|
| **Network error** | Toast error + retry button | Mất kết nối internet |
| **401 Unauthorized** | Auto refresh token → nếu fail → redirect login | Token hết hạn |
| **403 Forbidden** | Toast error "Không có quyền" | Không phải admin |
| **404 Not Found** | EmptyState trong page | User/Trip không tồn tại |
| **422 Validation** | Inline error dưới form field | Giá trị pricing không hợp lệ |
| **500 Server Error** | Toast error "Lỗi hệ thống, vui lòng thử lại" | Backend lỗi |

### 7.2 Loading States

| Trạng thái | Component |
|---|---|
| Đang tải bảng dữ liệu | `LoadingSkeleton` — shimmer animation dạng table rows |
| Đang tải stats | `LoadingSkeleton` — shimmer animation dạng cards |
| Đang submit form | Button disabled + spinner icon |
| Không có dữ liệu | `EmptyState` — illustration + message |

---

## 8. Mock Data Strategy

File `services/mockData.js` chứa dữ liệu giả lập cho toàn bộ API responses:

```javascript
// Toggle mock mode qua env variable
const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

// Mỗi service function check:
export const getStats = async (from, to) => {
  if (USE_MOCK) return mockStatsResponse;
  return api.get('/admin/stats', { params: { from, to } });
};
```

Mock data bao gồm:
- 20 users (12 passengers, 6 drivers, 2 admins)
- 5 drivers pending approval
- 50 trips với đủ trạng thái
- Stats tổng hợp
- 3 pricing configs

> Cho phép phát triển toàn bộ frontend khi backend chưa sẵn sàng. Chỉ cần toggle `VITE_USE_MOCK=false` khi tích hợp thật.

---

## 9. Environment Configuration

```env
# .env.development
VITE_API_BASE_URL=http://localhost:8080/api/v1
VITE_USE_MOCK=true

# .env.production
VITE_API_BASE_URL=https://api.ridesharing.app/api/v1
VITE_USE_MOCK=false
```

---

## 10. Kế hoạch Phát triển

### Giai đoạn 1: Foundation (1 tuần)
- Khởi tạo React + Vite project
- Setup CSS design system (variables, reset, glassmorphism, animations)
- Cài đặt dependencies (react-router, zustand, axios, recharts, lucide-react, react-datepicker, react-hot-toast)
- Cấu hình routing + ProtectedRoute
- Xây dựng Layout (Sidebar + Topbar) với collapse behavior
- Setup Axios instance + interceptors (request auth + response refresh)
- Setup Zustand stores (auth, filter, ui)
- Tạo mock data file
- Setup .env files

### Giai đoạn 2: Auth + Dashboard (1.5 tuần)
- LoginPage — form, validation, API integration, error handling
- useAuth hook — login, logout, token management
- DashboardPage — StatsOverview (6 StatCards)
- RevenueChart — Recharts Line chart
- TripStatusChart — Recharts Bar chart
- RecentTrips — mini table
- DateRangePicker cho filter
- Common components: Button, Input, StatCard, StatusBadge, Toast

### Giai đoạn 3: User Management + Driver Approval (2 tuần)
- DataTable component (sort, pagination, loading skeleton, empty state)
- SearchInput + useDebounce
- Pagination component
- UserManagementPage — table + filters + khóa/mở khóa
- UserDetailPage — profile + trip history tab
- DriverApprovalPage — grid cards
- DriverProfileDrawer — slide-in panel chi tiết + approve/reject
- ConfirmDialog component
- Avatar component

### Giai đoạn 4: Trip History + Pricing (1.5 tuần)
- TripHistoryPage — table + multi-filter
- TripDetailModal hoặc TripDetailPage
- TripTimeline component — visual audit log
- TripStatusHistory component
- PricingConfigPage — 3 cards + edit form
- PricingEditForm — validation + submit
- Modal/Drawer generic components
- EmptyState component

### Giai đoạn 5: Polish + Test + Deploy (1 tuần)
- Responsive: sidebar collapse, table scroll, card stacking
- Micro-animations: page transitions, hover effects, chart animations
- Error boundary cho unexpected errors
- Kiểm tra toàn bộ API integration (tắt mock mode)
- Cross-browser test (Chrome, Firefox, Edge)
- Build production: `npm run build`
- Deploy static files
- Final review UI/UX

---

## 11. Verification Plan

### Automated
```bash
# Lint check
npm run lint

# Build check — đảm bảo không có lỗi compile
npm run build

# Preview production build locally
npm run preview
```

### Manual Verification
- Login flow: đăng nhập → dashboard → đăng xuất → redirect login
- Token refresh: chờ > 15 phút, xác nhận vẫn hoạt động bình thường
- User management: search, filter, lock/unlock account
- Driver approval: duyệt/từ chối tài xế, xem hồ sơ chi tiết
- Trip history: filter theo status/date, xem chi tiết, audit log
- Pricing: xem giá, chỉnh giá, xác nhận giá mới áp dụng
- Edge cases: empty state khi không có data, error toast khi API fail
- Responsive: collapse sidebar, table scroll horizontal
