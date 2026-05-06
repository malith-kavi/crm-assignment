import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ui, cx } from "../constants/uiClasses";

const Navbar = ({ collapsed = false }) => {
  const { user } = useAuth();
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <header
      className={cx(
        ui.navbar.header,
        collapsed ? ui.navbar.headerCollapsed : ui.navbar.headerExpanded
      )}
    >
      <div className={ui.navbar.container}>
        <div>
          <h1 className={ui.text.titleSm}>CRM System</h1>
          <p className={ui.text.mutedSm}>
            Welcome back{user?.name ? `, ${user.name}` : ""}. 
          </p>
        </div>

        <div className={ui.layout.rowWrapGap3}>
          <div className={ui.navbar.searchWrap}>
            <input
              className={ui.input.baseText}
              placeholder="Search"
            />
          </div>

          <button
            onClick={toggleTheme}
            className={ui.navbar.themeWrap}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={cx(ui.icon.sm, ui.navbar.themeIcon)}
            >
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2" />
              <path d="M12 20v2" />
              <path d="m4.93 4.93 1.41 1.41" />
              <path d="m17.66 17.66 1.41 1.41" />
              <path d="M2 12h2" />
              <path d="M20 12h2" />
              <path d="m6.34 17.66-1.41 1.41" />
              <path d="m19.07 4.93-1.41 1.41" />
            </svg>
            <span className={ui.navbar.themeSwitch}>
              <span
                className={cx(
                  ui.navbar.themeKnob,
                  theme === "dark" ? ui.navbar.themeKnobDark : ui.navbar.themeKnobLight
                )}
              />
            </span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={cx(ui.icon.sm, ui.navbar.themeIcon)}
            >
              <path d="M12 3a7 7 0 1 0 9 9 9 9 0 1 1-9-9Z" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
