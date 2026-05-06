import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { ui, cx } from "../constants/uiClasses";

const AppLayout = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className={ui.appLayout.root}>
      <div
        className={ui.appLayout.overlay}
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(40% 25% at 20% 10%, rgba(37, 99, 235, 0.2), transparent 70%), radial-gradient(35% 25% at 90% 0%, rgba(20, 184, 166, 0.18), transparent 65%)",
        }}
      />

      <div className={ui.appLayout.shell}>
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed((prev) => !prev)}
        />

        <div
          className={cx(
            ui.appLayout.main,
            sidebarCollapsed ? ui.appLayout.mainCollapsed : ui.appLayout.mainExpanded
          )}
        >
          <Navbar collapsed={sidebarCollapsed} />

          <main className={ui.appLayout.mainArea}>
            <div className={ui.appLayout.content}>
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
