import { ui, cx } from "../constants/uiClasses";

const StatusBadge = ({ status }) => {
  const styles = ui.tone.status[status] || ui.tone.status.fallback;

  return (
    <span
      className={cx(ui.badge.base, styles)}
    >
      {status || "Unknown"}
    </span>
  );
};

export default StatusBadge;
