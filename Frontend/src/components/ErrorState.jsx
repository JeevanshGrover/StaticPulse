export default function ErrorState({ message, onRetry }) {
  return (
    <div className="page-center">
      <div className="icon-badge icon-badge--danger mb-5">
        <i className="ti ti-alert-triangle text-xl" />
      </div>

      <h2 className="page-title sm:text-2xl mb-2">
        Something went wrong
      </h2>
      <p className="page-subtitle mb-7 max-w-sm">
        {message || "We couldn't analyze that repository. Please try again."}
      </p>

      <button onClick={onRetry} className="btn-primary">
        <i className="ti ti-refresh text-sm align-[-2px]" />
        Try again
      </button>
    </div>
  );
}
