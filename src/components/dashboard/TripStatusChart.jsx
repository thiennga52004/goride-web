import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { getStatusConfig } from '../../utils/statusHelpers';

const TripStatusChart = ({ data = [] }) => {
  const chartData = data.map((item) => {
    const config = getStatusConfig(item.status);
    return {
      name: config.label,
      value: item.count,
      color: config.color,
    };
  });

  return (
    <div
      className="trip-status-chart"
      style={{
        background: 'var(--bg-secondary)',
        borderRadius: 'var(--radius-md)',
        padding: '24px',
        border: '1px solid var(--border-color)',
        boxShadow: 'var(--shadow-card)',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      <h3
        style={{
          color: 'var(--text-heading)',
          fontSize: '16px',
          fontWeight: 600,
          margin: '0 0 20px 0',
        }}
      >
        Trạng thái chuyến đi
      </h3>
      <div style={{ width: '100%', height: 320 }}>
        {chartData.length === 0 ? (
          <div
            style={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-secondary)',
              fontSize: '14px',
            }}
          >
            Không có dữ liệu
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={4}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => [`${value} chuyến`, 'Số lượng']}
                contentStyle={{
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  color: 'var(--text-primary)',
                  fontSize: '13px',
                  boxShadow: 'var(--shadow-dropdown)',
                }}
              />
              <Legend
                verticalAlign="bottom"
                iconType="circle"
                wrapperStyle={{ fontSize: '13px', color: 'var(--text-secondary)', paddingTop: '10px' }}
              />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default TripStatusChart;
