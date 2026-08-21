import type { FC } from 'react';

interface StatsBadgeProps {
  label: string;
  value: number;
  color?: string;
}

const StatsBadge: FC<StatsBadgeProps> = ({ label, value, color = '#3b82f6' }) => {
  return (
    <div
      style={{
        border: `3px solid ${color}`,
        borderRadius: '12px',
        padding: '24px 16px',
        minWidth: '180px',
        textAlign: 'center',
        backgroundColor: 'white',
      }}
    >
      <p style={{ margin: '0 0 8px 0', fontSize: '32px', fontWeight: 'bold', color }}>
        {value}
      </p>
      <p style={{ margin: 0, fontSize: '14px', color: '#9ca3af' }}>
        {label}
      </p>
    </div>
  );
};

export default StatsBadge;