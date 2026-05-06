import { ui, cx } from "../constants/uiClasses";

const StatsCard = ({ title, value, change, trend, icon, tone = "blue" }) => {
  const toneStyles = ui.tone.kpi;

  return (
    <div className={ui.card.kpi}>
      <div className={ui.statsCard.header}>
        <div
          className={cx(
            ui.statsCard.iconWrap,
            toneStyles[tone] || toneStyles.blue
          )}
        >
          {icon}
        </div>
        {change ? (
          <span
            className={cx(
              ui.statsCard.change,
              change.startsWith("-")
                ? ui.tone.changeNegative
                : ui.tone.changePositive
            )}
          >
            {change}
          </span>
        ) : null}
      </div>

      <p className={ui.statsCard.title}>{title}</p>
      <p className={ui.statsCard.value}>{value}</p>

      {trend ? (
        <p className={ui.statsCard.trend}>{trend}</p>
      ) : null}
    </div>
  );
};

export default StatsCard;