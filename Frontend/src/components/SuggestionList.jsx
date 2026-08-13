export default function SuggestionList({ suggestions }) {
  if (!suggestions?.length) return null;

  return (
    <div className="mb-6">
      <h3 className="section-title sm:text-lg">Suggestions</h3>
      <div className="flex flex-col gap-2">
        {suggestions.map((suggestion, i) => (
          <div key={i} className="list-item">
            <i className="ti ti-bulb text-(--text-secondary) text-base mt-0.5 shrink-0" />
            <p className="text-sm text-(--text-primary)">{suggestion}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
