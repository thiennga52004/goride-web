import { useState, useCallback } from 'react';
import { useFetch } from '../hooks/useFetch';
import { pricingService } from '../services/pricingService';
import PricingCard from '../components/pricing/PricingCard';
import PricingEditForm from '../components/pricing/PricingEditForm';
import Drawer from '../components/common/Drawer';
import LoadingSkeleton from '../components/common/LoadingSkeleton';
import toast from 'react-hot-toast';

const PricingConfigPage = () => {
  const [selectedConfig, setSelectedConfig] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editLoading, setEditLoading] = useState(false);

  // Fetch Pricing configs
  const fetchConfigsFn = useCallback(() => pricingService.getPricingConfigs(), []);
  const {
    data: configs,
    loading,
    error,
    refetch: refetchConfigs,
  } = useFetch(fetchConfigsFn, null, true);

  const handleOpenEditDrawer = (config) => {
    setSelectedConfig(config);
    setDrawerOpen(true);
  };

  const handleCloseEditDrawer = () => {
    setDrawerOpen(false);
    setSelectedConfig(null);
  };

  const handleUpdateConfig = async (formData) => {
    if (!selectedConfig) return;
    setEditLoading(true);
    try {
      await pricingService.updatePricingConfig(selectedConfig.id, formData);
      toast.success('Đã cập nhật cấu hình giá cước thành công');
      handleCloseEditDrawer();
      refetchConfigs();
    } catch (err) {
      toast.error(err.message || 'Cập nhật thất bại, vui lòng thử lại');
    } finally {
      setEditLoading(false);
    }
  };

  const getVehicleTypeLabel = (type) => {
    if (type === 'MOTORBIKE') return 'Xe máy (GoRide)';
    if (type === 'CAR_4_SEAT') return 'Ô tô 4 chỗ (GoCar 4)';
    if (type === 'CAR_7_SEAT') return 'Ô tô 7 chỗ (GoCar 7)';
    return type || '';
  };

  return (
    <div className="pricing-config-page" style={{ padding: '24px' }}>
      <div className="page-header" style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-heading)', marginBottom: '4px' }}>
          Cấu hình Giá cước
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: 0 }}>
          Điều chỉnh mức giá mở cửa, cước phí di chuyển và hệ số giờ cao điểm cho từng loại dịch vụ
        </p>
      </div>

      <div className="page-content">
        {error ? (
          <div
            style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              padding: '48px',
              textAlign: 'center',
              color: 'var(--accent-red)',
              boxShadow: 'var(--shadow-card)',
            }}
          >
            Lỗi tải cấu hình cước phí: {error.message || 'Đã có lỗi xảy ra'}
          </div>
        ) : loading && (!configs || configs.length === 0) ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            <LoadingSkeleton type="card" count={3} />
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {configs?.map((config) => (
              <PricingCard
                key={config.id}
                config={config}
                onEdit={handleOpenEditDrawer}
              />
            ))}
          </div>
        )}
      </div>

      {/* Edit Pricing Drawer */}
      <Drawer
        isOpen={drawerOpen}
        onClose={handleCloseEditDrawer}
        title={selectedConfig ? `Chỉnh sửa cước: ${getVehicleTypeLabel(selectedConfig.vehicleType)}` : 'Chỉnh sửa cước'}
      >
        <PricingEditForm
          key={selectedConfig?.id || 'new'}
          config={selectedConfig}
          onSubmit={handleUpdateConfig}
          onCancel={handleCloseEditDrawer}
          loading={editLoading}
        />
      </Drawer>
    </div>
  );
};

export default PricingConfigPage;
