import InsightsSection from "./InsightsSection";
import StatusPills from "./StatusPills";
import IssueList from "./IssueList";
import SuggestionList from "./SuggestionList";

export default function Dashboard({ data, onReset }) {
  const { metrics, score, issues, suggestions, strengths, weaknesses, repoUrl } = data;
  const repoHref = repoUrl?.startsWith("http") ? repoUrl : `https://${repoUrl}`;

  return (
    <div className="max-w-2xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-6">
        <div>
          <h2 className="page-title sm:text-2xl m-0">Audit report</h2>
          {repoUrl && (
            <p className="repo-url">
              <a href={repoHref} target="_blank" rel="noreferrer">
                {repoUrl}
              </a>
            </p>
          )}
        </div>
        <div className="score-card self-start">
          <p className="text-[11px] uppercase tracking-wide text-(--text-muted) mb-0.5">score</p>
          <p className="text-2xl sm:text-3xl font-semibold text-(--text-success)">{score}</p>
        </div>
      </div>

      <InsightsSection metrics={metrics} />
      <StatusPills metrics={metrics} />
      <IssueList issues={issues} />
      <SuggestionList suggestions={suggestions} />

      {strengths?.length > 0 && (
        <div className="mb-6">
          <h3 className="section-title sm:text-lg">Strengths</h3>
          <ul className="list-disc pl-5 text-sm text-(--text-secondary) space-y-1.5">
            {strengths.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
        </div>
      )}

      {weaknesses?.length > 0 && (
        <div className="mb-6">
          <h3 className="section-title sm:text-lg">Weaknesses</h3>
          <ul className="list-disc pl-5 text-sm text-(--text-secondary) space-y-1.5">
            {weaknesses.map((w, i) => <li key={i}>{w}</li>)}
          </ul>
        </div>
      )}

      <button onClick={onReset} className="btn-secondary">
        <i className="ti ti-refresh text-sm align-[-2px]" />
        Analyze another
      </button>
    </div>
  );
}
