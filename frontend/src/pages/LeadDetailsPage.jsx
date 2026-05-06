import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../api/axios";
import toast from "react-hot-toast";
import StatusBadge from "../components/StatusBadge";
import { ui, cx } from "../constants/uiClasses";

const statusOptions = [
  "New",
  "Contacted",
  "Qualified",
  "Proposal Sent",
  "Won",
  "Lost",
];

const LeadDetailsPage = () => {
  const { id } = useParams();

  const [lead, setLead] = useState(null);
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(true);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  const formatDate = (value) => {
    if (!value) return "N/A";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "N/A";
    return date.toLocaleString();
  };

  const fetchLead = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/leads/${id}`);
      setLead(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLead();
  }, []);

  const addNote = async () => {
    if (!note.trim()) return;

    await api.post(`/leads/${id}/notes`, {
      content: note,
    });

    toast.success("Note added");

    setNote("");
    fetchLead();
  };

  const handleStatusChange = async (event) => {
    if (!lead) return;

    const nextStatus = event.target.value;

    try {
      setUpdatingStatus(true);
      await api.put(`/leads/${id}`, {
        lead_name: lead.lead_name,
        company_name: lead.company_name,
        email: lead.email,
        phone: lead.phone,
        lead_source: lead.lead_source,
        assigned_salesperson: lead.assigned_salesperson,
        status: nextStatus,
        estimated_deal_value: lead.estimated_deal_value,
      });
      setLead((prev) => ({ ...prev, status: nextStatus }));
      toast.success("Status updated");
    } catch {
      toast.error("Unable to update status");
    } finally {
      setUpdatingStatus(false);
    }
  };

  if (loading) {
    return (
      <div className={ui.card.lg}>
        <div className={ui.leadDetails.skeletonTitle} />
        <div className={ui.leadDetails.notesList}>
          <div className={ui.leadDetails.skeletonLine} />
          <div className={ui.leadDetails.skeletonLineLg} />
        </div>
      </div>
    );
  }

  if (!lead) return <div className={ui.text.mutedSm}>Lead not found.</div>;

  const notes = lead.notes || [];
  const initials = (lead.lead_name || "Lead")
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className={ui.layout.page}>
      <div className={ui.leadDetails.headerCard}>
        <div className={ui.leadDetails.headerRow}>
          <div className={ui.leadDetails.avatar}>
            {initials}
          </div>
          <div>
            <p className={ui.text.eyebrow}>
              Lead profile
            </p>
            <h1 className={ui.text.titleLg}>{lead.lead_name}</h1>
            <div className={ui.leadDetails.headerMeta}>
              <StatusBadge status={lead.status} />
              <span className={ui.text.mutedSm}>
                {lead.company_name}
              </span>
            </div>
          </div>
        </div>
        <div className={ui.layout.actionsRow}>
          <select
            className={ui.input.compact}
            value={lead.status}
            onChange={handleStatusChange}
            disabled={updatingStatus}
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          <Link
            to={`/leads/edit/${lead.id}`}
            className={ui.button.secondaryOutline}
          >
            Edit lead
          </Link>
        </div>
      </div>

      <div className={ui.leadDetails.grid}>
        <div className={ui.layout.colGap6}>
          <div className={ui.card.md}>
            <h2 className={ui.text.titleSm}>Contact details</h2>
            <div className={ui.leadDetails.infoGrid}>
              <div>
                <p className={ui.text.eyebrow}>Email</p>
                <p className={ui.leadDetails.infoValue}>
                  {lead.email}
                </p>
              </div>
              <div>
                <p className={ui.text.eyebrow}>Phone</p>
                <p className={ui.leadDetails.infoValue}>
                  {lead.phone}
                </p>
              </div>
              <div>
                <p className={ui.text.eyebrow}>Lead source</p>
                <p className={ui.leadDetails.infoValue}>
                  {lead.lead_source}
                </p>
              </div>
              <div>
                <p className={ui.text.eyebrow}>Assigned to</p>
                <p className={ui.leadDetails.infoValue}>
                  {lead.assigned_salesperson}
                </p>
              </div>
            </div>
          </div>

          <div className={ui.card.md}>
            <div className={ui.layout.rowBetween}>
              <h2 className={ui.text.titleSm}>Activity timeline</h2>
              <span className={ui.text.mutedXs}>Last 14 days</span>
            </div>
            <div className={ui.leadDetails.activityList}>
              {[
                {
                  title: "Intro call completed",
                  detail: "Discovery call with decision maker",
                  time: "Today",
                },
                {
                  title: "Proposal sent",
                  detail: "Shared pricing and rollout plan",
                  time: "2 days ago",
                },
                {
                  title: "Lead qualified",
                  detail: "BANT confirmed",
                  time: "1 week ago",
                },
              ].map((item) => (
                <div key={item.title} className={ui.leadDetails.activityItem}>
                  <div className={ui.leadDetails.activityDot} />
                  <div>
                    <p className={ui.text.label}>{item.title}</p>
                    <p className={ui.text.mutedXs}>
                      {item.detail}
                    </p>
                    <p className={ui.leadDetails.activityMeta}>
                      {item.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={ui.card.md}>
            <div className={ui.layout.rowBetween}>
              <h2 className={ui.text.titleSm}>Notes</h2>
              <span className={ui.text.mutedXs}>
                {notes.length} notes
              </span>
            </div>

            <div className={ui.leadDetails.notesMeta}>
              <textarea
                className={ui.textarea.base}
                rows="4"
                placeholder="Add a note for the team..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />

              <button
                onClick={addNote}
                className={ui.leadDetails.noteButton}
              >
                Add note
              </button>
            </div>

            <div className={ui.leadDetails.notesList}>
              {notes.length === 0 ? (
                <div className={ui.card.empty}>
                  No notes yet. Capture the next step to keep everyone aligned.
                </div>
              ) : (
                notes.map((n) => (
                  <div
                    key={n.id}
                    className={ui.card.panelMuted}
                  >
                    <p className={ui.text.bodySm}>{n.content}</p>
                    <p className={ui.leadDetails.noteMeta}>
                      {n.user?.name || "Unknown"} - {formatDate(n.created_at)}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <aside className={ui.layout.colGap6}>
          <div className={ui.card.md}>
            <p className={ui.text.eyebrow}>
              Deal value
            </p>
            <p className={ui.leadDetails.dealValue}>
              ${lead.estimated_deal_value || 0}
            </p>
            <p className={ui.leadDetails.dealSubtext}>
              Last updated {formatDate(lead.updated_at)}
            </p>
            <div className={ui.leadDetails.progressTrack}>
              <div className={ui.leadDetails.progressFill} />
            </div>
          </div>

          <div className={ui.card.md}>
            <p className={ui.text.eyebrow}>
              Snapshot
            </p>
            <div className={ui.leadDetails.snapshotList}>
              <div className={ui.leadDetails.snapshotRow}>
                <span className={ui.text.muted}>Assigned</span>
                <span className={ui.text.label}>{lead.assigned_salesperson}</span>
              </div>
              <div className={ui.leadDetails.snapshotRow}>
                <span className={ui.text.muted}>Source</span>
                <span className={ui.text.label}>{lead.lead_source}</span>
              </div>
              <div className={ui.leadDetails.snapshotRow}>
                <span className={ui.text.muted}>Created</span>
                <span className={ui.text.label}>{formatDate(lead.created_at)}</span>
              </div>
              <div className={ui.leadDetails.snapshotRow}>
                <span className={ui.text.muted}>Updated</span>
                <span className={ui.text.label}>{formatDate(lead.updated_at)}</span>
              </div>
            </div>
          </div>

          <div className={ui.card.md}>
            <p className={ui.text.eyebrow}>
              Recent communication
            </p>
            <div className={ui.leadDetails.communicationList}>
              {[
                {
                  channel: "Email",
                  detail: "Pricing follow-up sent",
                  time: "2 days ago",
                },
                {
                  channel: "Call",
                  detail: "Follow-up scheduled",
                  time: "Next Monday",
                },
              ].map((item) => (
                <div key={item.channel} className={ui.card.panelMutedSm}>
                  <p className={ui.text.label}>{item.channel}</p>
                  <p className={ui.text.mutedXs}>
                    {item.detail}
                  </p>
                  <p className={ui.leadDetails.activityMeta}>
                    {item.time}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default LeadDetailsPage;