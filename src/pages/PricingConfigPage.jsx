const PricingConfigPage = () => {
  return (
    <div className="pricing-config-page" style={{ padding: '24px' }}>
      <div className="page-header">
        <h1 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-heading)', marginBottom: '4px' }}>Cấu hình Giá cước</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Quản lý giá cước theo loại xe</p>
      </div>
      <div className="page-content">
        {/* TODO: PricingCards grid */}
        <div className="content-placeholder" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '48px', textAlign: 'center', color: 'var(--text-secondary)', boxShadow: 'var(--shadow-card)' }}>
          Cấu hình giá sẽ hiển thị ở đây
        </div>
      </div>
    </div>
  );
};

export default PricingConfigPage;
