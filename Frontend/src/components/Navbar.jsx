import { useTheme } from "../hooks/useTheme";
import Logo from "./Logo";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="navbar-wrapper">
    <nav className="navbar">
      <div className="navbar-brand-group">
        <Logo className="navbar-logo" size={28} />
        <span className="navbar-brand">
          Static<span className="navbar-brand-accent">Pulse</span>
        </span>
      </div>
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