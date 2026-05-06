import { useEffect, useState } from "react";
import api from "../api/axios";
import LeadForm from "../components/LeadForm";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

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

const LeadsPage = () => {
  const [leads, setLeads] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const fetchLeads = async () => {
    const res = await api.get(`/leads?search=${search}`);

    setLeads(res.data);
  };

  useEffect(() => {
    fetchLeads();
  }, [search]);

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

  return (
    <div>

      <h1 className="text-3xl font-bold mb-6">
        Leads
      </h1>

      <LeadForm
        form={form}
        setForm={setForm}
        handleSubmit={handleSubmit}
        loading={loading}
      />

      <div className="mt-8">
        <input
          placeholder="Search leads..."
          className="border p-3 rounded w-full mb-4"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="bg-white rounded-xl shadow overflow-hidden">

          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4 text-left">Lead</th>
                <th className="p-4 text-left">Company</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Value</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="border-t">

                  <td className="p-4">
                    {lead.lead_name}
                  </td>

                  <td className="p-4">
                    {lead.company_name}
                  </td>

                  <td className="p-4">
                    {lead.status}
                  </td>

                  <td className="p-4">
                    ${lead.estimated_deal_value}
                  </td>

                  <td className="p-4 flex gap-2">

                    <Link
                      to={`/leads/${lead.id}`}
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      View
                    </Link>

                    <Link
                      to={`/leads/edit/${lead.id}`}
                      className="bg-yellow-500 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => deleteLead(lead.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>

                  </td>

                </tr>
              ))}
            </tbody>

          </table>

        </div>
      </div>

    </div>
  );
};

export default LeadsPage;