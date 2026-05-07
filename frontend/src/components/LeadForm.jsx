import { ui, cx } from "../constants/uiClasses";

const statuses = [
  "New",
  "Contacted",
  "Qualified",
  "Proposal Sent",
  "Won",
  "Lost",
];

const LeadForm = ({
  form,
  setForm,
  handleSubmit,
  loading,
  leadSources = [],
  salespersons = [],
}) => {
  const sourceOptions =
    form.lead_source && !leadSources.includes(form.lead_source)
      ? [...leadSources, form.lead_source]
      : leadSources;

  const salespersonOptions =
    form.assigned_salesperson &&
    !salespersons.includes(form.assigned_salesperson)
      ? [...salespersons, form.assigned_salesperson]
      : salespersons;

  return (
    <form onSubmit={handleSubmit} className={ui.leadForm.form}>
      <div>
        <h3 className={ui.text.labelStrong}>Lead details</h3>
      </div>

      <div className={ui.leadForm.sectionGrid}>
        <div className="space-y-2">
          <label htmlFor="lead_name" className={ui.text.mutedXs}>
            Lead name
          </label>
          <input
            id="lead_name"
            className={ui.input.base}
            value={form.lead_name}
            onChange={(e) =>
              setForm({ ...form, lead_name: e.target.value })
            }
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="company_name" className={ui.text.mutedXs}>
            Company name
          </label>
          <input
            id="company_name"
            className={ui.input.base}
            value={form.company_name}
            onChange={(e) =>
              setForm({ ...form, company_name: e.target.value })
            }
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className={ui.text.mutedXs}>
            Email address
          </label>
          <input
            id="email"
            type="email"
            className={ui.input.base}
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="phone" className={ui.text.mutedXs}>
            Phone number
          </label>
          <input
            id="phone"
            className={ui.input.base}
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            required
          />
        </div>
      </div>

      <div>
        <h3 className={ui.text.labelStrong}>Sales context</h3>
      </div>

      <div className={ui.leadForm.sectionGrid}>
        <div className="space-y-2">
          <label htmlFor="lead_source" className={ui.text.mutedXs}>
            Lead source
          </label>
          <select
            id="lead_source"
            className={ui.select.base}
            value={form.lead_source}
            onChange={(e) =>
              setForm({ ...form, lead_source: e.target.value })
            }
            required
          >
            <option value="">Select lead source</option>
            {sourceOptions.map((source) => (
              <option key={source} value={source}>
                {source}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="assigned_salesperson"
            className={ui.text.mutedXs}
          >
            Assigned salesperson
          </label>
          <select
            id="assigned_salesperson"
            className={ui.select.base}
            value={form.assigned_salesperson}
            onChange={(e) =>
              setForm({
                ...form,
                assigned_salesperson: e.target.value,
              })
            }
            required
          >
            <option value="">Select salesperson</option>
            {salespersonOptions.map((salesperson) => (
              <option key={salesperson} value={salesperson}>
                {salesperson}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="status" className={ui.text.mutedXs}>
            Status
          </label>
          <select
            id="status"
            className={ui.select.base}
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            required
          >
            {statuses.map((status) => (
              <option key={status}>{status}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="estimated_deal_value" className={ui.text.mutedXs}>
            Estimated deal value
          </label>
          <input
            id="estimated_deal_value"
            type="number"
            className={ui.input.base}
            value={form.estimated_deal_value}
            onChange={(e) =>
              setForm({
                ...form,
                estimated_deal_value: e.target.value,
              })
            }
            required
          />
        </div>
      </div>

      <div className={ui.form.stickyBar}>
        <div className={ui.leadForm.actionsRow}>
          <p className={ui.text.mutedXs}>
          </p>
          <button className={cx(ui.button.primaryWide)} disabled={loading}>
            {loading ? "Saving..." : "Save lead"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default LeadForm;