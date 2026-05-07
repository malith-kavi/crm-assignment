import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ui, cx } from "../constants/uiClasses";

const navItems = [
  {
    label: "Dashboard",
    to: "/dashboard",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={ui.icon.sm}
      >
        <rect x="4" y="4" width="6" height="6" rx="1.5" />
        <rect x="14" y="4" width="6" height="6" rx="1.5" />
        <rect x="4" y="14" width="6" height="6" rx="1.5" />
        <rect x="14" y="14" width="6" height="6" rx="1.5" />
      </svg>
    ),
  },
  {
    label: "Leads",
    to: "/leads",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={ui.icon.sm}
      >
        <path d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" />
        <path d="M4 21a8 8 0 0 1 16 0" />
      </svg>
    ),
  },
];

const Sidebar = ({ collapsed, onToggleCollapse }) => {
  const { logout, user } = useAuth();

  const initials = (user?.name || "User")
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <aside
      className={cx(
        ui.sidebar.aside,
        collapsed ? ui.sidebar.asideCollapsed : ui.sidebar.asideExpanded
      )}
    >
      <div className={cx(ui.sidebar.brandRow, collapsed && ui.sidebar.collapsedCenter)}>
          <div className={ui.sidebar.profileAvatar}>
            {initials}
          </div>
          {!collapsed ? (
            <div className={ui.layout.flex1}>
            <p className={ui.text.labelStrong}>
              {user?.name}
            </p>
            <p className={ui.text.mutedXs}>
              {user?.email}
            </p>
          </div>
          ) : null}
        </div>

      <nav className={ui.sidebar.nav}>
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cx(
                ui.nav.linkBase,
                isActive ? ui.nav.linkActive : ui.nav.linkInactive
              )
            }
          >
            <span className={ui.nav.icon}>{item.icon}</span>
            {!collapsed ? <span>{item.label}</span> : null}
          </NavLink>
        ))}
      </nav>

      <div className={ui.sidebar.footer}>
        <div className={collapsed ? ui.sidebar.collapsedCenter : undefined}>
          <button
            onClick={onToggleCollapse}
            className={collapsed ? ui.sidebar.iconButton : ui.button.secondaryOutline}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={ui.icon.sm}
            >
              {collapsed ? (
                <>
                  <path d="M9 18l6-6-6-6" />
                  <path d="M4 4v16" />
                </>
              ) : (
                <>
                  <path d="M15 18l-6-6 6-6" />
                  <path d="M20 4v16" />
                </>
              )}
            </svg>
          </button>
        </div>

        <div className={collapsed ? cx(ui.sidebar.logoutButtonWrap, ui.sidebar.collapsedCenter) : undefined}>
          <button
            onClick={logout}
            className={collapsed ? ui.sidebar.iconButton : cx(ui.sidebar.logoutButtonWrap, ui.button.secondaryOutline)}
            aria-label="Sign out"
            title="Sign out"
          >
            {collapsed ? (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={ui.icon.sm}
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <path d="M16 17l5-5-5-5" />
                <path d="M21 12H9" />
              </svg>
            ) : (
              "Sign out"
            )}
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
