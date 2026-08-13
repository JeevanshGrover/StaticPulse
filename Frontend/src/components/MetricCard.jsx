export default function MetricCard({ label, value }) {
  return (
    <div className="metric-card">
      <p className="text-xs sm:text-sm text-(--text-secondary) mb-1.5">{label}</p>
      <p className="text-lg sm:text-xl font-semibold text-(--text-primary)">{value}</p>
    </div>
  );
}
