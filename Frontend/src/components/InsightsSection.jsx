import MetricCard from "./MetricCard";

export default function InsightsSection({ metrics }) {
  return (
    <div className="mb-6">
      <h3 className="section-title sm:text-lg">Insights</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <MetricCard label="Files" value={metrics.fileCount} />
        <MetricCard label="Folders" value={metrics.folderCount} />
        <MetricCard label="Lines of code" value={metrics.loc} />
        <MetricCard label="Dependencies" value={metrics.dependencyCount} />
        <MetricCard label="Console logs" value={metrics.consoleLogs} />
        <MetricCard label="TODOs" value={metrics.todos} />
      </div>
    </div>
  );
}
