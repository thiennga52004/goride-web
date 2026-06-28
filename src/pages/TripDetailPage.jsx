import { useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { tripService } from '../services/tripService';
import Button from '../components/common/Button';
import StatusBadge from '../components/common/StatusBadge';
import LoadingSkeleton from '../components/common/LoadingSkeleton';
import TripTimeline from '../components/trips/TripTimeline';
import TripStatusHistory from '../components/trips/TripStatusHistory';
import { formatCurrency } from '../utils/formatCurrency';

const TripDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch Trip Details
  const fetchTripFn = useCallback(() => tripService.getTripDetail(Number(id)), [id]);
  const {
    data: trip,
    loading,
    error,
  } = useFetch(fetchTripFn, null, true);

  const getVehicleTypeLabel = (type) => {
    if (type === 'MOTORBIKE') return 'Xe máy (GoRide)';
    if (type === 'CAR_4_SEAT') return 'Ô tô 4 chỗ (GoCar 4)';
    if (type === 'CAR_7_SEAT') return 'Ô tô 7 chỗ (GoCar 7)';
    return type || '—';
  };

  const getPaymentMethodLabel = (method) => {
    if (method === 'CASH') return 'Tiền mặt';
    if (method === 'MOMO') return 'Ví MoMo';
    if (method === 'BANK_TRANSFER') return 'Chuyển khoản';
    return method || '—';
  };

  if (error) {
    return (
      <div style={{ padding: '24px', textAlign: 'center' }}>
        <h2 style={{ color: 'var(--accent-red)' }}>Lỗi tải thông tin chuyến đi</h2>
        <p style={{ color: 'var(--text-secondary)' }}>{error.message || 'Không tìm thấy chuyến đi'}</p>
        <Button variant="secondary" onClick={() => navigate('/trips')}>Quay lại danh sách</Button>
      </div>
    );
  }

  return (
    <div className="trip-detail-page" style={{ padding: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-heading)', margin: '0 0 4px 0' }}>
            Chi tiết Chuyến đi
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: 0 }}>
            Xem hành trình, cước phí và thông tin đối tác
          </p>
        </div>
        <Button variant="secondary" size="sm" onClick={() => navigate('/trips')}>
          ← Quay lại
        </Button>
      </div>

      {loading && !trip ? (
        <div style={{ background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', padding: '24px', border: '1px solid var(--border-color)' }}>
          <LoadingSkeleton count={5} />
        </div>
      ) : !trip ? null : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', alignItems: 'start' }}>
          {/* LEFT COLUMN: Profile info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* GENERAL TRIP CARD */}
            <div
              style={{
                background: 'var(--bg-secondary)',
                borderRadius: 'var(--radius-md)',
                padding: '24px',
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--shadow-card)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px', marginBottom: '16px' }}>
                <span style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-heading)' }}>Mã chuyến #{trip.id}</span>
                <StatusBadge status={trip.status} />
              </div>

              {/* Journey Details */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <span style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Điểm đón</span>
                  <span style={{ fontSize: '14px', color: 'var(--text-primary)', fontWeight: 500 }}>📍 {trip.pickupAddress}</span>
                </div>
                <div>
                  <span style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Điểm đến</span>
                  <span style={{ fontSize: '14px', color: 'var(--text-primary)', fontWeight: 500 }}>🏁 {trip.dropoffAddress}</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', borderTop: '1px solid var(--border-light)', paddingTop: '16px' }}>
                  <div>
                    <span style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'block', marginBottom: '2px' }}>Dịch vụ</span>
                    <span style={{ fontSize: '14px', color: 'var(--text-heading)', fontWeight: 600 }}>{getVehicleTypeLabel(trip.vehicleType)}</span>
                  </div>
                  <div>
                    <span style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'block', marginBottom: '2px' }}>Thanh toán</span>
                    <span style={{ fontSize: '14px', color: 'var(--text-heading)', fontWeight: 600 }}>{getPaymentMethodLabel(trip.paymentMethod)}</span>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', borderTop: '1px solid var(--border-light)', paddingTop: '16px' }}>
                  <div>
                    <span style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'block', marginBottom: '2px' }}>Khoảng cách dự kiến</span>
                    <span style={{ fontSize: '14px', color: 'var(--text-heading)', fontWeight: 600 }}>{trip.estimatedDistance} km</span>
                  </div>
                  <div>
                    <span style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'block', marginBottom: '2px' }}>Khoảng cách thực tế</span>
                    <span style={{ fontSize: '14px', color: 'var(--text-heading)', fontWeight: 600 }}>{trip.actualDistance ? `${trip.actualDistance} km` : '—'}</span>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', borderTop: '1px solid var(--border-light)', paddingTop: '16px' }}>
                  <div>
                    <span style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'block', marginBottom: '2px' }}>Cước tính toán</span>
                    <span style={{ fontSize: '14px', color: 'var(--text-heading)', fontWeight: 600 }}>{formatCurrency(trip.estimatedFare)}</span>
                  </div>
                  <div>
                    <span style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'block', marginBottom: '2px' }}>Cước thực nhận</span>
                    <span style={{ fontSize: '15px', color: 'var(--accent-primary)', fontWeight: 700 }}>{formatCurrency(trip.actualFare || trip.estimatedFare)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* PASSENGER & DRIVER PROFILE CARDS */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
              {/* Passenger Info */}
              <div style={{ background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', padding: '20px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-card)' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-heading)', margin: '0 0 12px 0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Hành khách
                </h4>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 600, color: 'var(--text-heading)', fontSize: '15px' }}>{trip.passenger?.name}</div>
                    <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>📞 {trip.passenger?.phone}</div>
                  </div>
                  <Link
                    to={`/users/${trip.passenger?.id}`}
                    style={{
                      padding: '4px 10px',
                      fontSize: '12px',
                      color: 'var(--accent-primary)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-sm)',
                      textDecoration: 'none',
                      background: 'var(--bg-secondary)',
                    }}
                  >
                    Xem hồ sơ
                  </Link>
                </div>
              </div>

              {/* Driver Info */}
              <div style={{ background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', padding: '20px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-card)' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-heading)', margin: '0 0 12px 0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Tài xế đối tác
                </h4>
                {trip.driver ? (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontWeight: 600, color: 'var(--text-heading)', fontSize: '15px' }}>{trip.driver.name}</div>
                      <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>📞 {trip.driver.phone}</div>
                      <div style={{ fontSize: '12px', color: 'var(--accent-primary)', fontWeight: 600, marginTop: '2px' }}>🚗 Biển số: {trip.driver.licensePlate}</div>
                    </div>
                    <Link
                      to={`/users/${trip.driver.id}`}
                      style={{
                        padding: '4px 10px',
                        fontSize: '12px',
                        color: 'var(--accent-primary)',
                        border: '1px solid var(--border-color)',
                        borderRadius: 'var(--radius-sm)',
                        textDecoration: 'none',
                        background: 'var(--bg-secondary)',
                      }}
                    >
                      Xem hồ sơ
                    </Link>
                  </div>
                ) : (
                  <div style={{ color: 'var(--text-tertiary)', fontStyle: 'italic', fontSize: '13px' }}>
                    Chưa có tài xế nhận chuyến đi này.
                  </div>
                )}
              </div>
            </div>

            {/* RATING & REVIEW CARD */}
            {trip.rating && (
              <div style={{ background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', padding: '20px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-card)' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-heading)', margin: '0 0 12px 0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Đánh giá & Nhận xét
                </h4>
                <div style={{ fontSize: '15px', color: 'var(--accent-yellow)', fontWeight: 700, marginBottom: '6px' }}>
                  ⭐ {trip.rating} / 5.0
                </div>
                <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-primary)', fontStyle: trip.review ? 'normal' : 'italic' }}>
                  {trip.review || 'Khách hàng không để lại nhận xét bằng lời.'}
                </p>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: Journey timeline & audit log */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div
              style={{
                background: 'var(--bg-secondary)',
                borderRadius: 'var(--radius-md)',
                padding: '24px',
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--shadow-card)',
              }}
            >
              <TripTimeline statusHistory={trip.statusHistory || []} />
              <div style={{ height: '1px', background: 'var(--border-light)', margin: '24px 0' }} />
              <TripStatusHistory history={trip.statusHistory || []} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TripDetailPage;
