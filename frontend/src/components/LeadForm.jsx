const statuses = [
  "New",
  "Contacted",
  "Qualified",
  "Proposal Sent",
  "Won",
  "Lost",
];

const LeadForm = ({ form, setForm, handleSubmit, loading }) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow"
    >
      <div className="grid grid-cols-2 gap-4">

        <input
          className="border p-3 rounded"
          placeholder="Lead Name"
          value={form.lead_name}
          onChange={(e) =>
            setForm({ ...form, lead_name: e.target.value })
          }
        />

        <input
          className="border p-3 rounded"
          placeholder="Company Name"
          value={form.company_name}
          onChange={(e) =>
            setForm({ ...form, company_name: e.target.value })
          }
        />

        <input
          className="border p-3 rounded"
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          className="border p-3 rounded"
          placeholder="Phone"
          value={form.phone}
          onChange={(e) =>
            setForm({ ...form, phone: e.target.value })
          }
        />

        <input
          className="border p-3 rounded"
          placeholder="Lead Source"
          value={form.lead_source}
          onChange={(e) =>
            setForm({ ...form, lead_source: e.target.value })
          }
        />

        <input
          className="border p-3 rounded"
          placeholder="Salesperson"
          value={form.assigned_salesperson}
          onChange={(e) =>
            setForm({
              ...form,
              assigned_salesperson: e.target.value,
            })
          }
        />

        <select
          className="border p-3 rounded"
          value={form.status}
          onChange={(e) =>
            setForm({ ...form, status: e.target.value })
          }
        >
          {statuses.map((status) => (
            <option key={status}>
              {status}
            </option>
          ))}
        </select>

        <input
          type="number"
          className="border p-3 rounded"
          placeholder="Deal Value"
          value={form.estimated_deal_value}
          onChange={(e) =>
            setForm({
              ...form,
              estimated_deal_value: e.target.value,
            })
          }
        />
      </div>

      <button className="mt-6 bg-black text-white px-6 py-3 rounded">
        {loading ? "Saving..." : "Save Lead"}
      </button>
    </form>
  );
};

export default LeadForm;