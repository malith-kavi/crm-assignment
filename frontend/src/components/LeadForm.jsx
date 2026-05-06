const statuses = [
  "New",
  "Contacted",
  "Qualified",
  "Proposal Sent",
  "Won",
  "Lost",
];

import { ui, cx } from "../constants/uiClasses";

const LeadForm = ({ form, setForm, handleSubmit, loading }) => {
  const fieldClass = ui.form.floatingField;
  const labelClass = ui.form.floatingLabel;

  return (
    <form onSubmit={handleSubmit} className={ui.leadForm.form}>
      <div>
        <h3 className={ui.text.labelStrong}>Lead details</h3>
        <p className={ui.text.mutedXs}>
          Capture the core information for this opportunity.
        </p>
      </div>

      <div className={ui.leadForm.sectionGrid}>
        <div className={ui.leadForm.fieldWrap}>
          <input
            id="lead_name"
            className={fieldClass}
            placeholder=" "
            value={form.lead_name}
            onChange={(e) =>
              setForm({ ...form, lead_name: e.target.value })
            }
            required
          />
          <label htmlFor="lead_name" className={labelClass}>
            Lead name
          </label>
        </div>

        <div className={ui.leadForm.fieldWrap}>
          <input
            id="company_name"
            className={fieldClass}
            placeholder=" "
            value={form.company_name}
            onChange={(e) =>
              setForm({ ...form, company_name: e.target.value })
            }
            required
          />
          <label htmlFor="company_name" className={labelClass}>
            Company name
          </label>
        </div>

        <div className={ui.leadForm.fieldWrap}>
          <input
            id="email"
            type="email"
            className={fieldClass}
            placeholder=" "
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <label htmlFor="email" className={labelClass}>
            Email address
          </label>
        </div>

        <div className={ui.leadForm.fieldWrap}>
          <input
            id="phone"
            className={fieldClass}
            placeholder=" "
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            required
          />
          <label htmlFor="phone" className={labelClass}>
            Phone number
          </label>
        </div>
      </div>

      <div>
        <h3 className={ui.text.labelStrong}>Sales context</h3>
        <p className={ui.text.mutedXs}>
          Assign ownership, source, and expected deal value.
        </p>
      </div>

      <div className={ui.leadForm.sectionGrid}>
        <div className={ui.leadForm.fieldWrap}>
          <input
            id="lead_source"
            className={fieldClass}
            placeholder=" "
            value={form.lead_source}
            onChange={(e) =>
              setForm({ ...form, lead_source: e.target.value })
            }
            required
          />
          <label htmlFor="lead_source" className={labelClass}>
            Lead source
          </label>
        </div>

        <div className={ui.leadForm.fieldWrap}>
          <input
            id="assigned_salesperson"
            className={fieldClass}
            placeholder=" "
            value={form.assigned_salesperson}
            onChange={(e) =>
              setForm({
                ...form,
                assigned_salesperson: e.target.value,
              })
            }
            required
          />
          <label htmlFor="assigned_salesperson" className={labelClass}>
            Assigned salesperson
          </label>
        </div>

        <div className={ui.leadForm.fieldWrap}>
          <select
            id="status"
            className={fieldClass}
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            required
          >
            {statuses.map((status) => (
              <option key={status}>{status}</option>
            ))}
          </select>
          <label htmlFor="status" className={labelClass}>
            Status
          </label>
        </div>

        <div className={ui.leadForm.fieldWrap}>
          <input
            id="estimated_deal_value"
            type="number"
            className={fieldClass}
            placeholder=" "
            value={form.estimated_deal_value}
            onChange={(e) =>
              setForm({
                ...form,
                estimated_deal_value: e.target.value,
              })
            }
            required
          />
          <label htmlFor="estimated_deal_value" className={labelClass}>
            Estimated deal value
          </label>
        </div>
      </div>

      <div className={ui.form.stickyBar}>
        <div className={ui.leadForm.actionsRow}>
          <p className={ui.text.mutedXs}>
            All changes save directly to your pipeline.
          </p>
          <button
            className={cx(ui.button.primaryWide)}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save lead"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default LeadForm;