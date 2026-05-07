import { useEffect, useMemo, useState } from "react";
import api from "../api/axios";
import LeadForm from "../components/LeadForm";
import ConfirmDialog from "../components/ConfirmDialog";
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

const pageSize = 10;

const LeadsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [leadSources, setLeadSources] = useState([]);
  const [salespersons, setSalespersons] = useState([]);
  const [leads, setLeads] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [loadingLeads, setLoadingLeads] = useState(true);
  const [loadingLookups, setLoadingLookups] = useState(true);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    status: "",
    lead_source: "",
    assigned_salesperson: "",
  });
  const [selectedIds, setSelectedIds] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [activeLookupCard, setActiveLookupCard] = useState(null);
  const [newLeadSource, setNewLeadSource] = useState("");
  const [newSalesperson, setNewSalesperson] = useState("");
  const [savingLeadSource, setSavingLeadSource] = useState(false);
  const [savingSalesperson, setSavingSalesperson] = useState(false);
  const [sort, setSort] = useState("recent");
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteDialog, setDeleteDialog] = useState({
    isOpen: false,
    type: null,
    leadId: null,
    count: 0,
    isDeleting: false,
  });

  const fetchLookups = async () => {
    try {
      setLoadingLookups(true);
      const [leadSourcesResponse, salespersonsResponse] = await Promise.all([
        api.get("/lead-sources"),
        api.get("/salespersons"),
      ]);

      setLeadSources(leadSourcesResponse.data);
      setSalespersons(salespersonsResponse.data);
    } catch {
      toast.error("Unable to load lead options");
    } finally {
      setLoadingLookups(false);
    }
  };

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
    fetchLookups();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, filters.status, filters.lead_source, filters.assigned_salesperson, sort]);

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

  const handleAddLeadSource = async (e) => {
    e.preventDefault();

    if (!newLeadSource.trim()) {
      toast.error("Enter a source name");
      return;
    }

    try {
      setSavingLeadSource(true);
      await api.post("/lead-sources", { name: newLeadSource.trim() });
      toast.success("Lead source added");
      setNewLeadSource("");
      await fetchLookups();
    } catch {
      toast.error("Failed to add lead source");
    } finally {
      setSavingLeadSource(false);
    }
  };

  const handleAddSalesperson = async (e) => {
    e.preventDefault();

    if (!newSalesperson.trim()) {
      toast.error("Enter a salesperson name");
      return;
    }

    try {
      setSavingSalesperson(true);
      await api.post("/salespersons", { name: newSalesperson.trim() });
      toast.success("Salesperson added");
      setNewSalesperson("");
      await fetchLookups();
    } catch {
      toast.error("Failed to add salesperson");
    } finally {
      setSavingSalesperson(false);
    }
  };

  const deleteLead = (id) => {
    setDeleteDialog({
      isOpen: true,
      type: "single",
      leadId: id,
      count: 1,
      isDeleting: false,
    });
  };

  const deleteSelectedLeads = () => {
    if (selectedIds.length <= 2) return;
    setDeleteDialog({
      isOpen: true,
      type: "bulk",
      leadId: null,
      count: selectedIds.length,
      isDeleting: false,
    });
  };

  const handleConfirmDelete = async () => {
    setDeleteDialog((prev) => ({ ...prev, isDeleting: true }));
    try {
      if (deleteDialog.type === "single") {
        await api.delete(`/leads/${deleteDialog.leadId}`);
        toast.success("Lead deleted");
      } else {
        await Promise.all(selectedIds.map((id) => api.delete(`/leads/${id}`)));
        toast.success("Selected leads deleted");
        setSelectedIds([]);
      }
      fetchLeads();
    } catch {
      toast.error("Failed to delete leads");
    } finally {
      setDeleteDialog({
        isOpen: false,
        type: null,
        leadId: null,
        count: 0,
        isDeleting: false,
      });
    }
  };

  const handleCancelDelete = () => {
    setDeleteDialog({
      isOpen: false,
      type: null,
      leadId: null,
      count: 0,
      isDeleting: false,
    });
  };

  const toggleSelectAll = () => {
    const currentPageIds = paginatedLeads.map((lead) => lead.id);

    if (currentPageIds.every((id) => selectedIds.includes(id))) {
      setSelectedIds((prev) => prev.filter((id) => !currentPageIds.includes(id)));
    } else {
      setSelectedIds((prev) => Array.from(new Set([...prev, ...currentPageIds])));
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

  const totalPages = Math.max(1, Math.ceil(formattedLeads.length / pageSize));

  useEffect(() => {
    setCurrentPage((prev) => Math.min(prev, totalPages));
  }, [totalPages]);

  const paginatedLeads = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return formattedLeads.slice(startIndex, startIndex + pageSize);
  }, [currentPage, formattedLeads]);

  const totalSelected = selectedIds.length;
  const allSelected =
    paginatedLeads.length > 0 &&
    paginatedLeads.every((lead) => selectedIds.includes(lead.id));

  const getInitials = (name) =>
    (name || "Lead")
      .split(" ")
      .map((part) => part[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();

  const priorityTone = (priority) =>
    ui.tone.priority[priority] || ui.tone.priority.Medium;

  const leadSourceOptions = leadSources.map((source) => source.name);
  const salespersonOptions = salespersons.map((salesperson) => salesperson.name);

  const buildSelectOptions = (options, currentValue) =>
    currentValue && !options.includes(currentValue)
      ? [...options, currentValue]
      : options;

  const activeLookupTitle =
    activeLookupCard === "source" ? "Add a source" : "Add a salesperson";

  return (
    <div className={ui.layout.page}>
      <div className={ui.layout.headerRow}>
        <div>
          <p className={ui.text.eyebrow}>
            Leads
          </p>
          <h1 className={ui.text.titleXl}>Lead management</h1>
        </div>
        <div className={ui.layout.actionsRow}>
          <button
            onClick={() => setShowForm((prev) => !prev)}
            className={ui.button.primary}
          >
            {showForm ? "Close form" : "Create lead"}
          </button>
          <button
            onClick={() =>
              setActiveLookupCard((prev) => (prev === "source" ? null : "source"))
            }
            className={ui.button.secondary}
          >
            Add source
          </button>
          <button
            onClick={() =>
              setActiveLookupCard((prev) =>
                prev === "salesperson" ? null : "salesperson"
              )
            }
            className={ui.button.secondary}
          >
            Add salespersons
          </button>
        </div>
      </div>

      {activeLookupCard ? (
        <div className={ui.leads.formCard}>
          <div className={ui.leads.formHeader}>
            <div>
              <h2 className={ui.text.titleSm}>{activeLookupTitle}</h2>
            </div>
            <button
              onClick={() => setActiveLookupCard(null)}
              className={ui.text.mutedSm}
            >
              Dismiss
            </button>
          </div>

          {activeLookupCard === "source" ? (
            <form onSubmit={handleAddLeadSource} className={ui.leadForm.form}>
              <div className="space-y-2">
                <label htmlFor="lead_source_name" className={ui.text.labelStrong}>
                  Lead source name
                </label>
                <input
                  id="lead_source_name"
                  className={ui.input.base}
                  value={newLeadSource}
                  onChange={(e) => setNewLeadSource(e.target.value)}
                  placeholder="Source name"
                  autoComplete="off"
                />
              </div>

              <div className={ui.form.stickyBar}>
                <div className={ui.leadForm.actionsRow}>
                  <p className={ui.text.mutedXs}>
                  </p>
                  <button className={ui.button.primaryWide} disabled={savingLeadSource}>
                    {savingLeadSource ? "Saving..." : " Add "}
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <form onSubmit={handleAddSalesperson} className={ui.leadForm.form}>
              <div className="space-y-2">
                <label htmlFor="salesperson_name" className={ui.text.labelStrong}>
                  Salesperson name
                </label>
                <input
                  id="salesperson_name"
                  className={ui.input.base}
                  value={newSalesperson}
                  onChange={(e) => setNewSalesperson(e.target.value)}
                  placeholder="Name"
                  autoComplete="off"
                />
              </div>

              <div className={ui.form.stickyBar}>
                <div className={ui.leadForm.actionsRow}>
                  <p className={ui.text.mutedXs}>
                  </p>
                  <button className={ui.button.primaryWide} disabled={savingSalesperson}>
                    {savingSalesperson ? "Saving..." : " Add "}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      ) : null}

      {showForm ? (
        <div className={ui.leads.formCard}>
          <div className={ui.leads.formHeader}>
            <div>
              <h2 className={ui.text.titleSm}>New lead</h2>
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
            leadSources={buildSelectOptions(leadSourceOptions, form.lead_source)}
            salespersons={buildSelectOptions(
              salespersonOptions,
              form.assigned_salesperson
            )}
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
            className={ui.select.base}
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
          <select
            className={ui.select.base}
            value={filters.lead_source}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                lead_source: e.target.value,
              }))
            }
          >
            <option value="">All sources</option>
            {leadSourceOptions.map((source) => (
              <option key={source} value={source}>
                {source}
              </option>
            ))}
          </select>
          <select
            className={ui.select.base}
            value={filters.assigned_salesperson}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                assigned_salesperson: e.target.value,
              }))
            }
          >
            <option value="">All salespersons</option>
            {salespersonOptions.map((salesperson) => (
              <option key={salesperson} value={salesperson}>
                {salesperson}
              </option>
            ))}
          </select>
          <select
            className={ui.select.base}
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
            {totalSelected > 2 ? (
              <button
                onClick={deleteSelectedLeads}
                className={ui.button.dangerSm}
              >
                Delete selected
              </button>
            ) : null}
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
                {paginatedLeads.map((lead) => (
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
          <span>
            Showing {formattedLeads.length === 0 ? 0 : (currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, formattedLeads.length)} of {formattedLeads.length} leads
          </span>
          <div className={ui.leads.footerButtons}>
            <button
              className={ui.button.secondaryXs}
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1 || loadingLeads}
            >
              Previous
            </button>
            <button
              className={ui.button.secondaryXs}
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages || loadingLeads}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      <ConfirmDialog
        isOpen={deleteDialog.isOpen}
        title="Delete lead(s)"
        message={
          deleteDialog.type === "single"
            ? "This lead will be permanently deleted. This action cannot be undone."
            : `${deleteDialog.count} leads will be permanently deleted. This action cannot be undone.`
        }
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        isLoading={deleteDialog.isDeleting}
        isDanger={true}
      />
    </div>
  );
};

export default LeadsPage;
