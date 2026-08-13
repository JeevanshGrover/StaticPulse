import { useState } from "react";
import Logo from "./Logo";

const GITHUB_URL_PATTERN = /^https?:\/\/github\.com\/[\w.-]+\/[\w.-]+(\.git)?\/?$/;

export default function LandingForm({ onSubmit }) {
  const [repoUrl, setRepoUrl] = useState("");
  const [validationError, setValidationError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = repoUrl.trim();

    if (!trimmed) {
      setValidationError("Please enter a repository URL");
      return;
    }

    if (!GITHUB_URL_PATTERN.test(trimmed)) {
      setValidationError("Please enter a valid public GitHub repository URL");
      return;
    }

    setValidationError("");
    onSubmit(trimmed);
  };

  return (
    <div className="page-center">
      <div className="landing-logo mb-5">
        <Logo size={44} />
      </div>

      <h1 className="page-title sm:text-3xl mb-2">
        Project Auditor
      </h1>
      <p className="page-subtitle mb-7 max-w-sm">
        Instant hygiene and structure audit for your GitHub repo
      </p>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md flex flex-col sm:flex-row gap-2"
      >
        <input
          type="text"
          value={repoUrl}
          onChange={(e) => {
            setRepoUrl(e.target.value);
            if (validationError) setValidationError("");
          }}
          placeholder="github.com/user/repo"
          className={`input-field ${validationError ? "input-field--error" : ""}`}
        />
        <button type="submit" className="btn-primary shrink-0">
          Analyze
        </button>
      </form>

      {validationError && (
        <p className="text-xs text-(--text-danger) mt-2">{validationError}</p>
      )}
    </div>
  );
}
