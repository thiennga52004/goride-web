const PricingCard = ({ config, onEdit }) => {
  return (
    <div className="pricing-card" style={{ background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', padding: '24px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-card)' }}>
      <h3 style={{ color: 'var(--text-heading)', marginBottom: '12px' }}>{config?.vehicleType || 'Vehicle'}</h3>
      <p style={{ color: 'var(--text-secondary)' }}>Pricing Card — chờ implement</p>
    </div>
  );
};

export default PricingCard;
