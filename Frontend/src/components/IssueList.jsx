export default function IssueList({ issues }) {
  if (!issues?.length) return null;

  return (
    <div className="mb-6">
      <h3 className="section-title sm:text-lg">Issues</h3>
      <div className="flex flex-col gap-2">
        {issues.map((issue, i) => (
          <div key={i} className="list-item">
            <i className="ti ti-alert-triangle text-(--text-danger) text-base mt-0.5 shrink-0" />
            <p className="text-sm text-(--text-primary)">{issue}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
