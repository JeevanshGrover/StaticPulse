export default function StatusPills({ metrics }) {
  const pills = [
    { label: "README", ok: metrics.hasReadme },
    { label: "License", ok: metrics.hasLicense },
    { label: ".env.example", ok: metrics.hasEnvExample },
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {pills.map(({ label, ok }) => (
        <span
          key={label}
          className="status-pill text-xs sm:text-sm"
          style={{
            background: ok ? "var(--bg-success)" : "var(--bg-danger)",
            color: ok ? "var(--text-success)" : "var(--text-danger)",
          }}
        >
          <i className={ok ? "ti ti-check text-sm" : "ti ti-x text-sm"} />
          {label}
        </span>
      ))}
    </div>
  );
}
