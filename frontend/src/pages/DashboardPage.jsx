import { useEffect, useState } from "react";
import api from "../api/axios";
import StatsCard from "../components/StatsCard";

const DashboardPage = () => {
  const [stats, setStats] = useState({});

  const fetchStats = async () => {
    const res = await api.get("/dashboard/stats");

    setStats(res.data);
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          title="Total Leads"
          value={stats.total_leads}
        />

        <StatsCard
          title="New Leads"
          value={stats.new_leads}
        />

        <StatsCard
          title="Qualified Leads"
          value={stats.qualified_leads}
        />

        <StatsCard
          title="Won Leads"
          value={stats.won_leads}
        />

        <StatsCard
          title="Lost Leads"
          value={stats.lost_leads}
        />

        <StatsCard
          title="Total Deal Value"
          value={`$${stats.total_deal_value || 0}`}
        />
      </div>
    </div>
  );
};

export default DashboardPage;