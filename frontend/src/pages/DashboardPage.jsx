import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import StatsCard from "../components/StatsCard";
import { ui, cx } from "../constants/uiClasses";

const DashboardPage = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({});
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const [statsRes, leadsRes] = await Promise.all([
        api.get("/dashboard/stats"),
        api.get("/leads"),
      ]);
      setStats(statsRes.data);
      setLeads(Array.isArray(leadsRes.data) ? leadsRes.data : []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const totals = useMemo(() => {
    const totalLeads = stats.total_leads || 0;
    const wonLeads = stats.won_leads || 0;
    const qualifiedLeads = stats.qualified_leads || 0;
    const newLeads = stats.new_leads || 0;
    const lostLeads = stats.lost_leads || 0;
    const conversionRate = totalLeads
      ? ((wonLeads / totalLeads) * 100).toFixed(1)
      : "0.0";

    return {
      totalLeads,
      wonLeads,
      qualifiedLeads,
      newLeads,
      lostLeads,
      conversionRate,
    };
  }, [stats]);

  const formatCurrency = (value) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "LKR",
      maximumFractionDigits: 0,
    }).format(value || 0);

  const pipelineStages = [
    { label: "New", value: totals.newLeads, tone: "blue" },
    { label: "Qualified", value: totals.qualifiedLeads, tone: "teal" },
    { label: "Won", value: totals.wonLeads, tone: "emerald" },
    { label: "Lost", value: totals.lostLeads, tone: "amber" },
  ];

  const leadSources = useMemo(() => {
    if (!leads.length) {
      return [
        { label: "No data", value: 100, tone: "slate" },
      ];
    }

    const toneOrder = ["blue", "teal", "amber", "slate"];
    const sourceCounts = leads.reduce((acc, lead) => {
      const source = (lead?.lead_source || "Unknown").trim() || "Unknown";
      acc[source] = (acc[source] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(sourceCounts)
      .sort((a, b) => b[1] - a[1])
      .map(([label, count], index) => ({
        label,
        value: Math.round((count / leads.length) * 100),
        tone: toneOrder[index % toneOrder.length],
      }));
  }, [leads]);

  const kpiCards = useMemo(() => {
    const qualificationRate = totals.totalLeads
      ? ((totals.qualifiedLeads / totals.totalLeads) * 100).toFixed(1)
      : "0.0";
    const lostRate = totals.totalLeads
      ? ((totals.lostLeads / totals.totalLeads) * 100).toFixed(1)
      : "0.0";
    const newLeadRate = totals.totalLeads
      ? ((totals.newLeads / totals.totalLeads) * 100).toFixed(1)
      : "0.0";

    return [
      {
        title: "Total leads",
        value: totals.totalLeads,
        change: "0%",
        trend: "in system",
        tone: "blue",
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
            <path d="M4 7h16" />
            <path d="M4 12h10" />
            <path d="M4 17h7" />
          </svg>
        ),
      },
      {
        title: "New leads",
        value: totals.newLeads,
        change: `${newLeadRate}%`,
        trend: "of total leads",
        tone: "teal",
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
            <path d="M12 5v14" />
            <path d="M5 12h14" />
          </svg>
        ),
      },
      {
        title: "Qualified leads",
        value: totals.qualifiedLeads,
        change: `${qualificationRate}%`,
        trend: "Progressed in pipeline",
        tone: "emerald",
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
            <path d="M20 7l-9 9-4-4" />
          </svg>
        ),
      },
      {
        title: "Won deals",
        value: totals.wonLeads,
        change: `${totals.conversionRate}%`,
        trend: "Conversion rate",
        tone: "emerald",
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
            <path d="M5 12l4 4L19 6" />
          </svg>
        ),
      },
      {
        title: "Lost leads",
        value: totals.lostLeads,
        change: `${lostRate}%`,
        trend: "Lost from pipeline",
        tone: "amber",
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
            <path d="M6 6l12 12" />
            <path d="M18 6l-12 12" />
          </svg>
        ),
      },
      {
        title: "Conversion rate",
        value: `${totals.conversionRate}%`,
        change: totals.totalLeads > 0 ? `${totals.wonLeads} won` : "0 won",
        trend: "of total leads",
        tone: "blue",
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
            <path d="M4 20h16" />
            <path d="M6 16l4-6 4 3 4-7" />
          </svg>
        ),
      },
      {
        title: "Total deal value",
        value: formatCurrency(stats.total_deal_value),
        change: stats.total_deal_value ? "Active" : "0",
        trend: "Pipeline outlook",
        tone: "amber",
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
            <path d="M12 1v22" />
            <path d="M17 5H9a4 4 0 0 0 0 8h6a4 4 0 0 1 0 8H6" />
          </svg>
        ),
      },
      {
        title: "Won deal value",
        value: formatCurrency(stats.won_deal_value),
        change: stats.won_deal_value ? "Completed" : "0",
        trend: "Closed deals",
        tone: "teal",
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
            <path d="M12 5v14" />
            <path d="M8 9h8" />
          </svg>
        ),
      },
    ];
  }, [stats, totals, formatCurrency]);

  const formatRelativeTime = (value) => {
    if (!value) return "Unknown time";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "Unknown time";

    const diffMs = Date.now() - date.getTime();
    const minutes = Math.floor(diffMs / 60000);
    const hours = Math.floor(diffMs / 3600000);
    const days = Math.floor(diffMs / 86400000);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
    if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
    if (days < 7) return `${days} day${days === 1 ? "" : "s"} ago`;

    return date.toLocaleDateString();
  };

  const activity = useMemo(
    () =>
      leads
        .slice(0, 8)
        .map((lead) => {
          const createdAt = lead?.created_at ? new Date(lead.created_at) : null;
          const updatedAt = lead?.updated_at ? new Date(lead.updated_at) : null;
          const isStatusUpdate =
            createdAt &&
            updatedAt &&
            !Number.isNaN(createdAt.getTime()) &&
            !Number.isNaN(updatedAt.getTime()) &&
            updatedAt.getTime() - createdAt.getTime() > 60000;

          return {
            title: isStatusUpdate
              ? `Status changed to ${lead.status || "Updated"}`
              : "New lead added",
            detail: `${lead.lead_name || "Unknown lead"} • ${lead.company_name || "Unknown company"}`,
            time: formatRelativeTime(isStatusUpdate ? lead.updated_at : lead.created_at),
          };
        })
        .slice(0, 4),
    [leads]
  );

  return (
    <div className={ui.dashboard.page}>
      <div className={ui.layout.headerRow}>
        <div>
          <p className={ui.text.eyebrow}>
            Dashboard
          </p>
          <h2 className={ui.text.titleXl}>Sales overview</h2>
          
        </div>
        <div className={ui.layout.actionsRow}>
          <button
            className={ui.button.primary}
            onClick={() => navigate("/leads", { state: { openCreateLead: true } })}
          >
            Create lead
          </button>
        </div>
      </div>

      <div className={ui.dashboard.kpiGrid}>
        {loading
          ? Array.from({ length: 8 }).map((_, index) => (
              <div
                key={`kpi-skeleton-${index}`}
                className={ui.card.skeleton}
              >
                <div className={ui.dashboard.kpiSkeletonIcon} />
                <div className={ui.dashboard.kpiSkeletonLineSm} />
                <div className={ui.dashboard.kpiSkeletonLineLg} />
              </div>
            ))
          : null}

        {!loading
          ? kpiCards.map((card) => (
              <StatsCard key={card.title} {...card} />
            ))
          : null}
      </div>

      <div className={ui.dashboard.mainGrid}>
        <div className={ui.dashboard.mainLeftCol}>
          <div className={ui.dashboard.pipelineCard}>
            <div className={ui.dashboard.panelHeader}>
              <div>
                <p className={ui.text.eyebrow}>
                  Pipeline
                </p>
                <h3 className={ui.text.titleMd}>Sales pipeline overview</h3>
              </div>
            </div>

            <div className={ui.dashboard.pipelineList}>
              {pipelineStages.map((stage) => {
                const total = totals.totalLeads || 1;
                const width = Math.max(8, Math.round((stage.value / total) * 100));
                return (
                  <div key={stage.label} className={ui.dashboard.pipelineItem}>
                    <div className={ui.dashboard.pipelineRow}>
                      <span className={ui.text.label}>{stage.label}</span>
                      <span className={ui.text.muted}>{stage.value}</span>
                    </div>
                    <div className={ui.dashboard.pipelineTrack}>
                      <div
                        className={cx(
                          ui.dashboard.pipelineFill,
                          ui.tone.pipeline[stage.tone]
                        )}
                        style={{ width: `${width}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className={ui.dashboard.activityCard}>
            <p className={ui.text.labelStrong}>Recent activity</p>
            <div className={ui.dashboard.activityList}>
              {activity.length === 0 ? (
                <p className={ui.text.mutedSm}>No recent activity yet.</p>
              ) : (
                activity.map((item) => (
                  <div key={`${item.title}-${item.detail}`} className={ui.dashboard.activityItem}>
                    <div className={ui.dashboard.activityDot} />
                    <div>
                      <p className={ui.text.label}>{item.title}</p>
                      <p className={ui.text.mutedXs}>
                        {item.detail}
                      </p>
                      <p className={ui.dashboard.activityMeta}>
                        {item.time}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className={ui.dashboard.sideCol}>
          <div className={ui.card.panel}>
            <div className={ui.dashboard.panelHeader}>
              <div>
                <p className={ui.text.eyebrow}>
                  Analytics
                </p>
                <h3 className={ui.text.titleMd}>Lead source mix</h3>
                <p className={ui.dashboard.sectionDescription}>
                  A quick snapshot of where new leads are coming from.
                </p>
              </div>
            </div>

            <div className={ui.dashboard.pipelineList}>
              <div className={ui.dashboard.analyticsBar}>
                <div className={ui.dashboard.analyticsBarInner}>
                  {leadSources.map((source) => (
                    <div
                      key={source.label}
                      className={cx(
                        ui.dashboard.analyticsBarSegment,
                        ui.tone.leadSource[source.tone]
                      )}
                      style={{ width: `${source.value}%` }}
                    />
                  ))}
                </div>
              </div>
              <div className={ui.dashboard.analyticsLegend}>
                {leadSources.map((source) => (
                  <div key={source.label} className={ui.dashboard.analyticsLegendRow}>
                    <div className={ui.dashboard.analyticsLegendLabel}>
                      <span className={cx(ui.icon.dotMd, ui.tone.leadSource[source.tone])} />
                      <span>{source.label}</span>
                    </div>
                    <span className={ui.text.muted}>
                      {source.value}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
