// ==========================================
// Mock Data for GoRide Web Admin
// ==========================================

export const mockUsers = [
  // Admins
  { id: 1, name: 'Nguyễn Admin', phone: '0900000001', email: 'admin@goride.vn', role: 'ADMIN', status: 'ACTIVE', createdAt: '2024-01-01T00:00:00Z', avatar: null },
  { id: 2, name: 'Trần Admin', phone: '0900000002', email: 'admin2@goride.vn', role: 'ADMIN', status: 'ACTIVE', createdAt: '2024-01-01T00:00:00Z', avatar: null },
  // Passengers
  { id: 3, name: 'Lê Văn An', phone: '0911111001', email: 'an@gmail.com', role: 'PASSENGER', status: 'ACTIVE', createdAt: '2024-01-10T08:30:00Z', avatar: null },
  { id: 4, name: 'Phạm Thị Bình', phone: '0911111002', email: 'binh@gmail.com', role: 'PASSENGER', status: 'ACTIVE', createdAt: '2024-01-12T09:15:00Z', avatar: null },
  { id: 5, name: 'Hoàng Văn Cường', phone: '0911111003', email: 'cuong@gmail.com', role: 'PASSENGER', status: 'SUSPENDED', createdAt: '2024-01-15T10:00:00Z', avatar: null },
  { id: 6, name: 'Ngô Thị Dung', phone: '0911111004', email: 'dung@gmail.com', role: 'PASSENGER', status: 'ACTIVE', createdAt: '2024-01-18T11:00:00Z', avatar: null },
  { id: 7, name: 'Vũ Văn Em', phone: '0911111005', email: 'em@gmail.com', role: 'PASSENGER', status: 'ACTIVE', createdAt: '2024-01-20T12:00:00Z', avatar: null },
  { id: 8, name: 'Đặng Thị Phương', phone: '0911111006', email: 'phuong@gmail.com', role: 'PASSENGER', status: 'ACTIVE', createdAt: '2024-02-01T08:00:00Z', avatar: null },
  { id: 9, name: 'Bùi Văn Giang', phone: '0911111007', email: 'giang@gmail.com', role: 'PASSENGER', status: 'ACTIVE', createdAt: '2024-02-05T09:00:00Z', avatar: null },
  { id: 10, name: 'Trịnh Thị Hoa', phone: '0911111008', email: 'hoa@gmail.com', role: 'PASSENGER', status: 'ACTIVE', createdAt: '2024-02-10T10:00:00Z', avatar: null },
  { id: 11, name: 'Lý Văn Kiên', phone: '0911111009', email: 'kien@gmail.com', role: 'PASSENGER', status: 'ACTIVE', createdAt: '2024-02-15T11:00:00Z', avatar: null },
  { id: 12, name: 'Mai Thị Lan', phone: '0911111010', email: 'lan@gmail.com', role: 'PASSENGER', status: 'ACTIVE', createdAt: '2024-02-20T12:00:00Z', avatar: null },
  { id: 13, name: 'Cao Văn Minh', phone: '0911111011', email: 'minh@gmail.com', role: 'PASSENGER', status: 'SUSPENDED', createdAt: '2024-03-01T08:00:00Z', avatar: null },
  { id: 14, name: 'Tô Thị Ngọc', phone: '0911111012', email: 'ngoc@gmail.com', role: 'PASSENGER', status: 'ACTIVE', createdAt: '2024-03-05T09:00:00Z', avatar: null },
  // Drivers (Approved)
  { id: 15, name: 'Trần Văn Bảo', phone: '0922222001', email: 'bao.driver@gmail.com', role: 'DRIVER', status: 'ACTIVE', createdAt: '2024-01-05T08:00:00Z', avatar: null, driverProfile: { vehicleType: 'MOTORBIKE', licensePlate: '51A-123.45', rating: 4.8, totalTrips: 320, approvalStatus: 'APPROVED', brand: 'Honda', model: 'Wave Alpha', color: 'Đỏ', year: 2022 } },
  { id: 16, name: 'Nguyễn Thị Cẩm', phone: '0922222002', email: 'cam.driver@gmail.com', role: 'DRIVER', status: 'ACTIVE', createdAt: '2024-01-08T09:00:00Z', avatar: null, driverProfile: { vehicleType: 'CAR_4_SEAT', licensePlate: '51B-456.78', rating: 4.6, totalTrips: 150, approvalStatus: 'APPROVED', brand: 'Toyota', model: 'Vios', color: 'Trắng', year: 2023 } },
  { id: 17, name: 'Lê Văn Đức', phone: '0922222003', email: 'duc.driver@gmail.com', role: 'DRIVER', status: 'ACTIVE', createdAt: '2024-01-12T10:00:00Z', avatar: null, driverProfile: { vehicleType: 'MOTORBIKE', licensePlate: '59C-789.01', rating: 4.9, totalTrips: 500, approvalStatus: 'APPROVED', brand: 'Yamaha', model: 'Exciter', color: 'Xanh', year: 2023 } },
  { id: 18, name: 'Phạm Văn Phúc', phone: '0922222004', email: 'phuc.driver@gmail.com', role: 'DRIVER', status: 'SUSPENDED', createdAt: '2024-01-15T11:00:00Z', avatar: null, driverProfile: { vehicleType: 'CAR_7_SEAT', licensePlate: '51D-012.34', rating: 4.3, totalTrips: 80, approvalStatus: 'APPROVED', brand: 'Toyota', model: 'Innova', color: 'Bạc', year: 2021 } },
  { id: 19, name: 'Hoàng Văn Gia', phone: '0922222005', email: 'gia.driver@gmail.com', role: 'DRIVER', status: 'ACTIVE', createdAt: '2024-02-01T08:00:00Z', avatar: null, driverProfile: { vehicleType: 'CAR_4_SEAT', licensePlate: '51E-345.67', rating: 4.7, totalTrips: 220, approvalStatus: 'APPROVED', brand: 'Hyundai', model: 'Accent', color: 'Đen', year: 2023 } },
  { id: 20, name: 'Võ Thị Hương', phone: '0922222006', email: 'huong.driver@gmail.com', role: 'DRIVER', status: 'ACTIVE', createdAt: '2024-02-10T09:00:00Z', avatar: null, driverProfile: { vehicleType: 'MOTORBIKE', licensePlate: '59F-678.90', rating: 4.5, totalTrips: 180, approvalStatus: 'APPROVED', brand: 'Honda', model: 'Air Blade', color: 'Đen', year: 2022 } },
];

export const mockPendingDrivers = [
  { id: 101, name: 'Đỗ Văn Khánh', phone: '0933333001', email: 'khanh@gmail.com', role: 'DRIVER', status: 'ACTIVE', createdAt: '2024-03-01T08:00:00Z', avatar: null, driverProfile: { vehicleType: 'MOTORBIKE', licensePlate: '51G-111.22', approvalStatus: 'PENDING', brand: 'Honda', model: 'SH 150i', color: 'Trắng', year: 2024, cccd: '012345678901', driverLicense: 'A1-123456', licenseExpiry: '2028-06-15' } },
  { id: 102, name: 'Bùi Thị Linh', phone: '0933333002', email: 'linh@gmail.com', role: 'DRIVER', status: 'ACTIVE', createdAt: '2024-03-05T09:00:00Z', avatar: null, driverProfile: { vehicleType: 'CAR_4_SEAT', licensePlate: '51H-333.44', approvalStatus: 'PENDING', brand: 'Kia', model: 'Morning', color: 'Đỏ', year: 2023, cccd: '012345678902', driverLicense: 'B2-234567', licenseExpiry: '2027-12-20' } },
  { id: 103, name: 'Nguyễn Văn Nam', phone: '0933333003', email: 'nam@gmail.com', role: 'DRIVER', status: 'ACTIVE', createdAt: '2024-03-08T10:00:00Z', avatar: null, driverProfile: { vehicleType: 'CAR_7_SEAT', licensePlate: '51K-555.66', approvalStatus: 'PENDING', brand: 'Toyota', model: 'Fortuner', color: 'Đen', year: 2022, cccd: '012345678903', driverLicense: 'B2-345678', licenseExpiry: '2029-03-10' } },
  { id: 104, name: 'Trần Thị Oanh', phone: '0933333004', email: 'oanh@gmail.com', role: 'DRIVER', status: 'ACTIVE', createdAt: '2024-03-10T11:00:00Z', avatar: null, driverProfile: { vehicleType: 'MOTORBIKE', licensePlate: '59L-777.88', approvalStatus: 'PENDING', brand: 'Yamaha', model: 'NVX 155', color: 'Xanh', year: 2023, cccd: '012345678904', driverLicense: 'A1-456789', licenseExpiry: '2028-09-25' } },
  { id: 105, name: 'Lê Văn Phong', phone: '0933333005', email: 'phong@gmail.com', role: 'DRIVER', status: 'ACTIVE', createdAt: '2024-03-12T12:00:00Z', avatar: null, driverProfile: { vehicleType: 'CAR_4_SEAT', licensePlate: '51M-999.00', approvalStatus: 'PENDING', brand: 'Mazda', model: '3', color: 'Xám', year: 2024, cccd: '012345678905', driverLicense: 'B2-567890', licenseExpiry: '2030-01-15' } },
];

export const mockTrips = Array.from({ length: 50 }, (_, i) => {
  const statuses = ['SEARCHING', 'ACCEPTED', 'ARRIVED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'NO_DRIVER'];
  const status = statuses[i % statuses.length];
  const passenger = mockUsers.filter((u) => u.role === 'PASSENGER')[i % 12];
  const driver = i % 7 === 6 ? null : mockUsers.filter((u) => u.role === 'DRIVER')[i % 6];
  const estimatedFare = 15000 + Math.floor(Math.random() * 200000);

  return {
    id: i + 1,
    passenger: { id: passenger.id, name: passenger.name, phone: passenger.phone },
    driver: driver ? { id: driver.id, name: driver.name, phone: driver.phone, licensePlate: driver.driverProfile.licensePlate } : null,
    vehicleType: ['MOTORBIKE', 'CAR_4_SEAT', 'CAR_7_SEAT'][i % 3],
    status,
    pickupAddress: `${100 + i} Nguyễn Huệ, Quận 1, TP.HCM`,
    dropoffAddress: `${200 + i} Lê Lợi, Quận 3, TP.HCM`,
    pickupLat: 10.7769 + (Math.random() * 0.01),
    pickupLng: 106.7009 + (Math.random() * 0.01),
    dropoffLat: 10.7800 + (Math.random() * 0.01),
    dropoffLng: 106.6900 + (Math.random() * 0.01),
    estimatedDistance: (2 + Math.random() * 15).toFixed(1),
    actualDistance: status === 'COMPLETED' ? (2 + Math.random() * 15).toFixed(1) : null,
    estimatedFare,
    actualFare: status === 'COMPLETED' ? estimatedFare + Math.floor(Math.random() * 10000) : null,
    paymentMethod: ['CASH', 'MOMO', 'BANK_TRANSFER'][i % 3],
    paymentStatus: status === 'COMPLETED' ? 'COMPLETED' : 'PENDING',
    requestedAt: new Date(2024, 0, 15 + Math.floor(i / 3), 8 + (i % 12), i * 7 % 60).toISOString(),
    completedAt: status === 'COMPLETED' ? new Date(2024, 0, 15 + Math.floor(i / 3), 9 + (i % 12), i * 3 % 60).toISOString() : null,
    rating: status === 'COMPLETED' ? (3 + Math.random() * 2).toFixed(1) : null,
    review: status === 'COMPLETED' && i % 3 === 0 ? 'Tài xế lịch sự, đi đúng đường' : null,
    statusHistory: [
      { status: 'SEARCHING', timestamp: new Date(2024, 0, 15, 10, 30, 0).toISOString(), note: 'Passenger đặt xe' },
      ...(status !== 'SEARCHING' && status !== 'NO_DRIVER' ? [{ status: 'ACCEPTED', timestamp: new Date(2024, 0, 15, 10, 31, 0).toISOString(), note: `Driver ${driver?.name}` }] : []),
      ...(status === 'ARRIVED' || status === 'IN_PROGRESS' || status === 'COMPLETED' ? [{ status: 'ARRIVED', timestamp: new Date(2024, 0, 15, 10, 38, 0).toISOString(), note: 'Tài xế đến điểm đón' }] : []),
      ...(status === 'IN_PROGRESS' || status === 'COMPLETED' ? [{ status: 'IN_PROGRESS', timestamp: new Date(2024, 0, 15, 10, 40, 0).toISOString(), note: 'Bắt đầu chuyến' }] : []),
      ...(status === 'COMPLETED' ? [{ status: 'COMPLETED', timestamp: new Date(2024, 0, 15, 10, 55, 0).toISOString(), note: 'Hoàn thành' }] : []),
      ...(status === 'CANCELLED' ? [{ status: 'CANCELLED', timestamp: new Date(2024, 0, 15, 10, 32, 0).toISOString(), note: 'Hành khách hủy chuyến' }] : []),
      ...(status === 'NO_DRIVER' ? [{ status: 'NO_DRIVER', timestamp: new Date(2024, 0, 15, 10, 35, 0).toISOString(), note: 'Không tìm được tài xế' }] : []),
    ],
  };
});

export const mockStats = {
  totalTrips: 1250,
  completedTrips: 1100,
  cancelledTrips: 120,
  totalRevenue: 85000000,
  activeDrivers: 45,
  totalPassengers: 320,
  dailyRevenue: Array.from({ length: 30 }, (_, i) => ({
    date: new Date(2024, 0, i + 1).toISOString().split('T')[0],
    revenue: 2000000 + Math.floor(Math.random() * 3000000),
    trips: 30 + Math.floor(Math.random() * 20),
  })),
  tripsByStatus: [
    { status: 'COMPLETED', count: 1100 },
    { status: 'CANCELLED', count: 120 },
    { status: 'NO_DRIVER', count: 30 },
  ],
};

export const mockPricingConfigs = [
  { id: 1, vehicleType: 'MOTORBIKE', baseFare: 10000, perKmRate: 4000, perMinuteRate: 300, minimumFare: 15000, surgeMultiplier: 1.0, isActive: true, createdAt: '2024-01-01T00:00:00Z' },
  { id: 2, vehicleType: 'CAR_4_SEAT', baseFare: 20000, perKmRate: 8000, perMinuteRate: 500, minimumFare: 25000, surgeMultiplier: 1.0, isActive: true, createdAt: '2024-01-01T00:00:00Z' },
  { id: 3, vehicleType: 'CAR_7_SEAT', baseFare: 25000, perKmRate: 10000, perMinuteRate: 600, minimumFare: 30000, surgeMultiplier: 1.0, isActive: true, createdAt: '2024-01-01T00:00:00Z' },
];
