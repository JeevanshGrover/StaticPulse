import { useTheme } from "../hooks/useTheme";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="navbar-wrapper">
    <nav className="navbar">
      <span className="navbar-brand">Project Auditor</span>

      <div className="navbar-actions">
        <a href="mailto:groverjeevansh0243@gmail.com" title="Contact" className="navbar-link">
          <i className="ti ti-mail" />
        </a>

        <a
          href="https://github.com/JeevanshGrover/StaticPulse"
          target="_blank"
          rel="noreferrer"
          title="GitHub repo"
          className="navbar-link"
        >
          <i className="ti ti-brand-github" />
        </a>

        <button
          onClick={toggleTheme}
          title="Toggle theme"
          className="navbar-icon-btn"
        >
          <i className={theme === "dark" ? "ti ti-sun" : "ti ti-moon"} />
        </button>
      </div>
    </nav>
    </header>
  );
}