# Backend API — Danh sách Endpoints cần bổ sung

Tài liệu này mô tả chi tiết tất cả các API endpoint mà backend Spring Boot cần phát triển để tích hợp đầy đủ với trang quản trị Admin GoRide Web.

> **Base URL**: `http://localhost:8080/api/v1`
>
> **Giao thức Authentication**: Tất cả các endpoint dưới đây (trừ `/auth/*`) đều yêu cầu header `Authorization: Bearer <accessToken>` và tài khoản có Role **ADMIN**.

> **Cấu trúc Response bắt buộc**: Frontend đang được cấu hình để tự động unwrap envelope sau. **Mọi response thành công đều phải trả về đúng định dạng này**:
> ```json
> {
>   "success": true,
>   "message": "Thông báo trạng thái",
>   "data": { }
> }
> ```

---

## 📋 Tóm tắt danh sách Endpoints

| STT | Method | Endpoint | Mô tả | Trạng thái |
|---|---|---|---|---|
| 1 | `GET` | `/api/v1/admin/stats` | Thống kê tổng quan hệ thống | ❌ Chưa có |
| 2 | `GET` | `/api/v1/admin/users` | Danh sách người dùng (filter/sort/page) | ❌ Chưa có |
| 3 | `GET` | `/api/v1/admin/users/{userId}` | Chi tiết một người dùng | ❌ Chưa có |
| 4 | `PATCH` | `/api/v1/admin/users/{userId}/status` | Khóa / Mở khóa tài khoản | ❌ Chưa có |
| 5 | `PATCH` | `/api/v1/admin/drivers/{driverId}/approval` | Duyệt / Từ chối tài xế | ❌ Chưa có |
| 6 | `GET` | `/api/v1/admin/trips` | Danh sách chuyến đi (filter/sort/page) | ❌ Chưa có |
| 7 | `GET` | `/api/v1/bookings/{tripId}` | Chi tiết chuyến đi *(cần thêm statusHistory)* | ⚠️ Đã có, cần bổ sung |
| 8 | `GET` | `/api/v1/pricing` | Danh sách cấu hình giá | ❌ Chưa có |
| 9 | `PUT` | `/api/v1/admin/pricing/{pricingConfigId}` | Cập nhật giá cước | ❌ Chưa có |

---

## 📊 Module 1: Thống kê Hệ thống

### `GET /api/v1/admin/stats`

**Query Parameters:**

| Tên | Kiểu | Bắt buộc | Mô tả |
|---|---|---|---|
| `from` | String | ✅ | Ngày bắt đầu định dạng `YYYY-MM-DD` |
| `to` | String | ✅ | Ngày kết thúc định dạng `YYYY-MM-DD` |

**Response `data`:**
```json
{
  "totalTrips": 1250,
  "completedTrips": 1100,
  "cancelledTrips": 120,
  "totalRevenue": 85000000.0,
  "activeDrivers": 45,
  "totalPassengers": 320,
  "dailyRevenue": [
    { "date": "2026-06-01", "revenue": 2500000.0, "trips": 35 },
    { "date": "2026-06-02", "revenue": 3100000.0, "trips": 42 }
  ],
  "tripsByStatus": [
    { "status": "COMPLETED", "count": 1100 },
    { "status": "CANCELLED", "count": 120 },
    { "status": "NO_DRIVER", "count": 30 }
  ]
}
```

---

## 👥 Module 2: Quản lý Người dùng

### `GET /api/v1/admin/users`

**Query Parameters:**

| Tên | Kiểu | Bắt buộc | Mô tả |
|---|---|---|---|
| `page` | int | ❌ | Trang hiện tại, bắt đầu từ `0` (mặc định: `0`) |
| `size` | int | ❌ | Số bản ghi mỗi trang (mặc định: `10`) |
| `search` | String | ❌ | Tìm kiếm theo tên hoặc số điện thoại |
| `role` | String | ❌ | `PASSENGER` hay `DRIVER` hay `ADMIN` |
| `status` | String | ❌ | `ACTIVE` hay `SUSPENDED` |
| `sortField` | String | ❌ | Tên cột sắp xếp (ví dụ: `name`, `createdAt`) |
| `sortDirection` | String | ❌ | `asc` hay `desc` |
| `approvalStatus` | String | ❌ | `PENDING` hay `APPROVED` hay `REJECTED` |

**Response `data`** (Spring Boot Page):
```json
{
  "content": [
    {
      "id": 15,
      "name": "Trần Văn Bảo",
      "phone": "0922222001",
      "email": "bao.driver@gmail.com",
      "role": "DRIVER",
      "status": "ACTIVE",
      "createdAt": "2024-01-05T08:00:00Z",
      "avatarUrl": null,
      "driverProfile": {
        "vehicleType": "MOTORBIKE",
        "licensePlate": "51A-123.45",
        "rating": 4.8,
        "totalTrips": 320,
        "approvalStatus": "APPROVED",
        "brand": "Honda",
        "model": "Wave Alpha",
        "color": "Đỏ",
        "year": 2022
      }
    }
  ],
  "totalElements": 100,
  "totalPages": 10,
  "number": 0,
  "size": 10
}
```

---

### `GET /api/v1/admin/users/{userId}`
Lấy thông tin chi tiết một người dùng. **Response `data`** là một đối tượng `UserResponse` tương tự trong mảng `content` trên.

---

### `PATCH /api/v1/admin/users/{userId}/status`

**Request Body:**
```json
{
  "status": "SUSPENDED",
  "reason": "Vi phạm điều khoản sử dụng"
}
```

| Field | Kiểu | Bắt buộc | Giá trị hợp lệ |
|---|---|---|---|
| `status` | String | ✅ | `ACTIVE` hay `SUSPENDED` |
| `reason` | String | ❌ | Lý do thay đổi trạng thái |

**Response `data`:** Đối tượng `UserResponse` sau khi cập nhật.

---

## 🚗 Module 3: Phê duyệt Tài xế

### Lấy danh sách tài xế chờ duyệt
Dùng lại endpoint `GET /api/v1/admin/users` với params `role=DRIVER&approvalStatus=PENDING`.

Phần `driverProfile` cần bao gồm thêm các trường giấy tờ:
```json
{
  "driverProfile": {
    "vehicleType": "MOTORBIKE",
    "licensePlate": "51G-111.22",
    "approvalStatus": "PENDING",
    "brand": "Honda",
    "model": "SH 150i",
    "color": "Trắng",
    "year": 2024,
    "cccd": "012345678901",
    "driverLicense": "A1-123456",
    "licenseExpiry": "2028-06-15"
  }
}
```

---

### `PATCH /api/v1/admin/drivers/{driverId}/approval`

**Request Body:**
```json
{
  "status": "APPROVED",
  "note": "Giấy tờ hợp lệ, xe đạt tiêu chuẩn"
}
```

| Field | Kiểu | Bắt buộc | Giá trị hợp lệ |
|---|---|---|---|
| `status` | String | ✅ | `APPROVED` hay `REJECTED` |
| `note` | String | ❌ | Ghi chú cho tài xế |

---

## 🛣️ Module 4: Lịch sử Chuyến đi

### `GET /api/v1/admin/trips`

**Query Parameters:**

| Tên | Kiểu | Bắt buộc | Mô tả |
|---|---|---|---|
| `page` | int | ❌ | Trang hiện tại |
| `size` | int | ❌ | Số bản ghi mỗi trang |
| `status` | String | ❌ | `SEARCHING`, `ACCEPTED`, `ARRIVED`, `IN_PROGRESS`, `COMPLETED`, `CANCELLED`, `NO_DRIVER` |
| `from` | String | ❌ | Từ ngày (`YYYY-MM-DD`) |
| `to` | String | ❌ | Đến ngày (`YYYY-MM-DD`) |
| `search` | String | ❌ | Tên/SĐT hành khách hoặc tài xế |
| `sortField` | String | ❌ | `requestedAt` hay `fare` |
| `sortDirection` | String | ❌ | `asc` hay `desc` |
| `passengerId` | Long | ❌ | Lọc theo ID hành khách |
| `driverId` | Long | ❌ | Lọc theo ID tài xế |

**Response `data`** (Spring Boot Page):
```json
{
  "content": [
    {
      "id": 1,
      "passenger": { "id": 3, "name": "Lê Văn An", "phone": "0911111001" },
      "driver": { "id": 15, "name": "Trần Văn Bảo", "phone": "0922222001", "licensePlate": "51A-123.45" },
      "vehicleType": "MOTORBIKE",
      "status": "COMPLETED",
      "pickupAddress": "100 Nguyễn Huệ, Quận 1, TP.HCM",
      "dropoffAddress": "200 Lê Lợi, Quận 3, TP.HCM",
      "pickupLat": 10.7769,
      "pickupLng": 106.7009,
      "dropoffLat": 10.78,
      "dropoffLng": 106.69,
      "estimatedDistance": "5.3",
      "actualDistance": "5.7",
      "estimatedFare": 35000,
      "actualFare": 38000,
      "paymentMethod": "CASH",
      "paymentStatus": "COMPLETED",
      "requestedAt": "2026-06-01T08:30:00Z",
      "completedAt": "2026-06-01T09:10:00Z",
      "rating": "4.5",
      "review": "Tài xế lịch sự, đi đúng đường"
    }
  ],
  "totalElements": 1250,
  "totalPages": 125,
  "number": 0,
  "size": 10
}
```

---

### `GET /api/v1/bookings/{tripId}` ⚠️ Cần bổ sung

Endpoint đã có nhưng cần thêm mảng `statusHistory` vào response để Frontend hiển thị trục timeline tiến trình chuyến đi:

```json
{
  "id": 1,
  "passenger": { "..." },
  "driver": { "..." },
  "status": "COMPLETED",
  "pickupAddress": "...",
  "dropoffAddress": "...",
  "estimatedFare": 35000,
  "actualFare": 38000,
  "requestedAt": "2026-06-01T08:30:00Z",
  "completedAt": "2026-06-01T09:10:00Z",
  "statusHistory": [
    { "status": "SEARCHING",   "timestamp": "2026-06-01T08:30:00Z", "note": "Hành khách đặt xe" },
    { "status": "ACCEPTED",    "timestamp": "2026-06-01T08:31:00Z", "note": "Tài xế Trần Văn Bảo nhận chuyến" },
    { "status": "ARRIVED",     "timestamp": "2026-06-01T08:38:00Z", "note": "Tài xế đến điểm đón" },
    { "status": "IN_PROGRESS", "timestamp": "2026-06-01T08:40:00Z", "note": "Bắt đầu chuyến đi" },
    { "status": "COMPLETED",   "timestamp": "2026-06-01T09:10:00Z", "note": "Hoàn thành chuyến đi" }
  ]
}
```

---

## 💰 Module 5: Cấu hình Giá cước

### `GET /api/v1/pricing`

**Response `data`** (mảng):
```json
[
  { "id": 1, "vehicleType": "MOTORBIKE",  "baseFare": 10000, "perKmRate": 4000,  "perMinuteRate": 300, "minimumFare": 15000, "surgeMultiplier": 1.0, "isActive": true, "createdAt": "2024-01-01T00:00:00Z" },
  { "id": 2, "vehicleType": "CAR_4_SEAT", "baseFare": 20000, "perKmRate": 8000,  "perMinuteRate": 500, "minimumFare": 25000, "surgeMultiplier": 1.0, "isActive": true, "createdAt": "2024-01-01T00:00:00Z" },
  { "id": 3, "vehicleType": "CAR_7_SEAT", "baseFare": 25000, "perKmRate": 10000, "perMinuteRate": 600, "minimumFare": 30000, "surgeMultiplier": 1.0, "isActive": true, "createdAt": "2024-01-01T00:00:00Z" }
]
```

---

### `PUT /api/v1/admin/pricing/{pricingConfigId}`

**Request Body:**
```json
{
  "baseFare": 12000.0,
  "perKmRate": 4500.0,
  "perMinuteRate": 300.0,
  "minimumFare": 15000.0,
  "surgeMultiplier": 1.2
}
```

| Field | Kiểu | Bắt buộc | Mô tả |
|---|---|---|---|
| `baseFare` | Double | ✅ | Phí mở cửa/khởi đầu (VNĐ) |
| `perKmRate` | Double | ✅ | Giá mỗi km (VNĐ/km) |
| `perMinuteRate` | Double | ✅ | Giá mỗi phút (VNĐ/phút) |
| `minimumFare` | Double | ✅ | Cước tối thiểu (VNĐ) |
| `surgeMultiplier` | Double | ❌ | Hệ số giá cao điểm (mặc định: `1.0`) |

> **Lưu ý thiết kế**: Khuyến nghị tạo bản ghi `pricing_config` mới và deactivate bản cũ (`isActive = false`) thay vì ghi đè trực tiếp, để lưu lịch sử thay đổi giá.

**Response `data`:** Đối tượng `PricingConfigResponse` sau khi cập nhật.

---

## 🔑 Lưu ý kỹ thuật chung

1. **Chuẩn hóa prefix URL**: Hiện tại có 2 prefix không nhất quán trong api-docs.json: `/api/` và `/api/v1/`. Cần chuẩn hóa tất cả về `/api/v1/`.
2. **Token Refresh**: Frontend tự động gọi `POST /api/v1/auth/refresh` với `{ refreshToken }` khi gặp lỗi `401`. Endpoint này đã có — đảm bảo hoạt động đúng.
3. **Enum Values**: Dữ liệu `role`, `status`, `vehicleType`, `paymentMethod`, `paymentStatus` phải sử dụng đúng các giá trị enum đã liệt kê để Frontend map đúng nhãn hiển thị và màu sắc trạng thái.
