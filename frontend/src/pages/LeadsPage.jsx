import { useEffect, useMemo, useState } from "react";
import api from "../api/axios";
import LeadForm from "../components/LeadForm";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import StatusBadge from "../components/StatusBadge";
import { ui, cx } from "../constants/uiClasses";

const initialForm = {
  lead_name: "",
  company_name: "",
  email: "",
  phone: "",
  lead_source: "",
  assigned_salesperson: "",
  status: "New",
  estimated_deal_value: "",
};

const statuses = [
  "New",
  "Contacted",
  "Qualified",
  "Proposal Sent",
  "Won",
  "Lost",
];

const LeadsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [leads, setLeads] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [loadingLeads, setLoadingLeads] = useState(true);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    status: "",
    lead_source: "",
    assigned_salesperson: "",
  });
  const [selectedIds, setSelectedIds] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [sort, setSort] = useState("recent");

  const fetchLeads = async () => {
    const params = new URLSearchParams();

    if (search.trim()) {
      params.set("search", search.trim());
    }

    if (filters.status) {
      params.set("status", filters.status);
    }

    if (filters.lead_source.trim()) {
      params.set("lead_source", filters.lead_source.trim());
    }

    if (filters.assigned_salesperson.trim()) {
      params.set(
        "assigned_salesperson",
        filters.assigned_salesperson.trim()
      );
    }

    const query = params.toString();

    try {
      setLoadingLeads(true);
      const res = await api.get(query ? `/leads?${query}` : "/leads");
      setLeads(res.data);
      setSelectedIds([]);
    } catch {
      toast.error("Unable to load leads");
    } finally {
      setLoadingLeads(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [
    search,
    filters.status,
    filters.lead_source,
    filters.assigned_salesperson,
  ]);

  useEffect(() => {
    if (location.state?.openCreateLead) {
      setShowForm(true);
      navigate(location.pathname, { replace: true, state: null });
    }
  }, [location.pathname, location.state, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await api.post("/leads", form);
      toast.success("Lead created");
      setForm(initialForm);
      fetchLeads();
    } catch {
      toast.error("Failed");
    } finally {
      setLoading(false);
    }
  };

  const deleteLead = async (id) => {
    if (!confirm("Delete this lead?")) return;

    await api.delete(`/leads/${id}`);

    toast.success("Deleted");
    fetchLeads();
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === leads.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(leads.map((lead) => lead.id));
    }
  };

  const toggleSelectOne = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const formattedLeads = useMemo(() => {
    if (sort === "name") {
      return [...leads].sort((a, b) =>
        (a.lead_name || "").localeCompare(b.lead_name || "")
      );
    }
    if (sort === "value") {
      return [...leads].sort(
        (a, b) => (b.estimated_deal_value || 0) - (a.estimated_deal_value || 0)
      );
    }
    return leads;
  }, [leads, sort]);

  const totalSelected = selectedIds.length;
  const allSelected = leads.length > 0 && totalSelected === leads.length;

  const getInitials = (name) =>
    (name || "Lead")
      .split(" ")
      .map((part) => part[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();

  const priorityTone = (priority) =>
    ui.tone.priority[priority] || ui.tone.priority.Medium;

  return (
    <div className={ui.layout.page}>
      <div className={ui.layout.headerRow}>
        <div>
          <p className={ui.text.eyebrow}>
            Leads
          </p>
          <h1 className={ui.text.titleXl}>Lead management</h1>
          <p className={ui.leads.headerDescription}>
            Track prospects, manage priorities, and keep pipeline context in one place.
          </p>
        </div>
        <div className={ui.layout.actionsRow}>
          <button className={ui.button.secondary}>
            Import CSV
          </button>
          <button
            onClick={() => setShowForm((prev) => !prev)}
            className={ui.button.primary}
          >
            {showForm ? "Close form" : "Create lead"}
          </button>
        </div>
      </div>

      {showForm ? (
        <div className={ui.leads.formCard}>
          <div className={ui.leads.formHeader}>
            <div>
              <h2 className={ui.text.titleSm}>New lead</h2>
              <p className={ui.text.mutedSm}>
                Add a new prospect to your pipeline.
              </p>
            </div>
            <button
              onClick={() => setShowForm(false)}
              className={ui.text.mutedSm}
            >
              Dismiss
            </button>
          </div>
          <LeadForm
            form={form}
            setForm={setForm}
            handleSubmit={handleSubmit}
            loading={loading}
          />
        </div>
      ) : null}

      <div className={ui.leads.filterCard}>
        <div className={ui.leads.filterGrid}>
          <input
            placeholder="Search leads, companies, or email"
            className={ui.input.base}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className={ui.input.base}
            value={filters.status}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                status: e.target.value,
              }))
            }
          >
            <option value="">All statuses</option>
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          <input
            placeholder="Lead source"
            className={ui.input.base}
            value={filters.lead_source}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                lead_source: e.target.value,
              }))
            }
          />
          <input
            placeholder="Assigned to"
            className={ui.input.base}
            value={filters.assigned_salesperson}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                assigned_salesperson: e.target.value,
              }))
            }
          />
          <select
            className={ui.input.base}
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="recent">Sort: Recent</option>
            <option value="name">Sort: Name</option>
            <option value="value">Sort: Value</option>
          </select>
        </div>

        <div className={ui.leads.filterSummary}>
          <span>
            {loadingLeads
              ? "Loading leads..."
              : `${formattedLeads.length} leads found`}
          </span>
          <button
            onClick={() =>
              setFilters({
                status: "",
                lead_source: "",
                assigned_salesperson: "",
              })
            }
            className={ui.button.link}
          >
            Reset filters
          </button>
        </div>
      </div>

      <div className={ui.leads.tableShell}>
        <div className={ui.leads.tableHeader}>
          <div className={ui.layout.rowGap3}>
            <input
              type="checkbox"
              className={ui.checkbox}
              checked={allSelected}
              onChange={toggleSelectAll}
              disabled={loadingLeads || leads.length === 0}
            />
            <span className={ui.text.label}>
              {totalSelected > 0
                ? `${totalSelected} selected`
                : "All leads"}
            </span>
            {totalSelected > 0 ? (
              <button
                onClick={() => setSelectedIds([])}
                className={ui.button.linkXs}
              >
                Clear selection
              </button>
            ) : null}
          </div>
          <div className={ui.leads.tableActions}>
            <button
              className={ui.button.secondarySm}
              disabled={totalSelected === 0}
            >
              Assign
            </button>
            <button
              className={ui.button.secondarySm}
              disabled={totalSelected === 0}
            >
              Export
            </button>
            <button
              className={ui.button.dangerSm}
              disabled={totalSelected === 0}
            >
              Delete
            </button>
          </div>
        </div>

        {loadingLeads ? (
          <div className={ui.leads.loadingList}>
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={`lead-skeleton-${index}`}
                className={ui.leads.skeletonRow}
              />
            ))}
          </div>
        ) : formattedLeads.length === 0 ? (
          <div className={ui.leads.emptyState}>
            <div className={ui.leads.emptyIconWrap}>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={ui.icon.mutedMd}
              >
                <path d="M4 6h16" />
                <path d="M4 12h10" />
                <path d="M4 18h7" />
              </svg>
            </div>
            <p className={ui.text.titleSm}>No leads yet</p>
            <p className={ui.text.mutedSm}>
              Create your first lead to start tracking pipeline activity.
            </p>
            <button
              onClick={() => setShowForm(true)}
              className={ui.button.primary}
            >
              Create lead
            </button>
          </div>
        ) : (
          <div className={ui.leads.tableWrap}>
            <table className={ui.table.base}>
              <thead className={ui.table.header}>
                <tr>
                  <th className={ui.table.headCell}>Lead</th>
                  <th className={ui.table.headCell}>Company</th>
                  <th className={ui.table.headCell}>Status</th>
                  <th className={ui.table.headCell}>Priority</th>
                  <th className={ui.table.headCell}>Value</th>
                  <th className={ui.table.headCell}>Assigned</th>
                  <th className={ui.table.headCell}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {formattedLeads.map((lead) => (
                  <tr
                    key={lead.id}
                    className={ui.table.row}
                  >
                    <td className={ui.table.cell}>
                      <div className={ui.leads.leadCellInner}>
                        <input
                          type="checkbox"
                          className={ui.checkbox}
                          checked={selectedIds.includes(lead.id)}
                          onChange={() => toggleSelectOne(lead.id)}
                        />
                        <div className={ui.leads.leadAvatar}>
                          {getInitials(lead.lead_name)}
                        </div>
                        <div>
                          <p className={ui.text.value}>
                            {lead.lead_name}
                          </p>
                          <p className={ui.text.mutedXs}>
                            {lead.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className={ui.table.cell}>
                      <p className={ui.text.label}>{lead.company_name}</p>
                      <p className={ui.text.mutedXs}>
                        {lead.lead_source}
                      </p>
                    </td>
                    <td className={ui.table.cell}>
                      <StatusBadge status={lead.status} />
                    </td>
                    <td className={ui.table.cell}>
                      <span
                        className={cx(
                          ui.leads.priorityBadge,
                          priorityTone(lead.priority || "Medium")
                        )}
                      >
                        {lead.priority || "Medium"}
                      </span>
                    </td>
                    <td className={ui.leads.valueCell}>
                      ${lead.estimated_deal_value}
                    </td>
                    <td className={ui.table.cell}>
                      <p className={ui.text.label}>
                        {lead.assigned_salesperson}
                      </p>
                    </td>
                    <td className={ui.table.cell}>
                      <div className={ui.leads.tableActions}>
                        <Link
                          to={`/leads/${lead.id}`}
                          className={ui.button.secondaryXs}
                        >
                          View
                        </Link>
                        <Link
                          to={`/leads/edit/${lead.id}`}
                          className={ui.button.secondaryXs}
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => deleteLead(lead.id)}
                          className={ui.button.dangerXs}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className={ui.leads.footer}>
          <span>Showing 1 to {Math.min(10, formattedLeads.length)} of {formattedLeads.length} leads</span>
          <div className={ui.leads.footerButtons}>
            <button className={ui.button.secondaryXs}>
              Previous
            </button>
            <button className={ui.button.secondaryXs}>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadsPage;
