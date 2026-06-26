import {
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { formatCurrency, formatCurrencyCompact } from '../../utils/formatCurrency';

const RevenueChart = ({ data = [] }) => {
  const formatDateTick = (tickItem) => {
    if (!tickItem) return '';
    try {
      const parts = tickItem.split('-');
      if (parts.length >= 3) {
        return `${parts[2]}/${parts[1]}`; // e.g. "15/01"
      }
    } catch {
      // ignore
    }
    return tickItem;
  };

  const formatTooltipDate = (label) => {
    if (!label) return '';
    try {
      const date = new Date(label);
      return date.toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
    } catch {
      return label;
    }
  };

  return (
    <div
      className="revenue-chart"
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
        Doanh thu & Số chuyến đi theo ngày
      </h3>
      <div style={{ width: '100%', height: 320 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--accent-primary)" stopOpacity={0.2} />
                <stop offset="95%" stopColor="var(--accent-primary)" stopOpacity={0.01} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-light)" />
            <XAxis
              dataKey="date"
              tickFormatter={formatDateTick}
              style={{ fontSize: '12px', fill: 'var(--text-secondary)' }}
              tickLine={false}
              axisLine={false}
              dy={10}
            />
            <YAxis
              yAxisId="left"
              tickFormatter={(val) => formatCurrencyCompact(val)}
              style={{ fontSize: '12px', fill: 'var(--text-secondary)' }}
              tickLine={false}
              axisLine={false}
              dx={-5}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              style={{ fontSize: '12px', fill: 'var(--text-secondary)' }}
              tickLine={false}
              axisLine={false}
              dx={5}
            />
            <Tooltip
              labelFormatter={formatTooltipDate}
              formatter={(value, name) => {
                if (name === 'Doanh thu') return [formatCurrency(value), name];
                return [value, name];
              }}
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
              verticalAlign="top"
              height={36}
              iconType="circle"
              wrapperStyle={{ fontSize: '13px', color: 'var(--text-secondary)' }}
            />
            <Area
              yAxisId="left"
              type="monotone"
              dataKey="revenue"
              name="Doanh thu"
              stroke="var(--accent-primary)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorRevenue)"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="trips"
              name="Số chuyến đi"
              stroke="var(--accent-purple)"
              strokeWidth={2}
              dot={{ r: 2 }}
              activeDot={{ r: 4 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueChart;
