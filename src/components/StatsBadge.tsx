interface StatsBadgeProps {
  label: string;
  value: number;
  color?: string;
}

export const StatsBadge = ({ label, value, color }: StatsBadgeProps) => {
  return (
    <div
      style={{
        border: `2px solid ${color || "#ccc"}`,
        borderRadius: "8px",
        padding: "10px",
        textAlign: "center",
        width: "150px",
      }}
    >
      <h2 style={{ color }}>{value}</h2>
      <p>{label}</p>
    </div>
  );
};
