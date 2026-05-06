import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import toast from "react-hot-toast";

const LeadDetailsPage = () => {
  const { id } = useParams();

  const [lead, setLead] = useState(null);
  const [note, setNote] = useState("");

  const fetchLead = async () => {
    const res = await api.get(`/leads/${id}`);

    setLead(res.data);
  };

  useEffect(() => {
    fetchLead();
  }, []);

  const addNote = async () => {
    await api.post(`/leads/${id}/notes`, {
      content: note,
    });

    toast.success("Note added");

    setNote("");

    fetchLead();
  };

  if (!lead) return <div>Loading...</div>;

  return (
    <div>

      <h1 className="text-3xl font-bold mb-6">
        {lead.lead_name}
      </h1>

      <div className="bg-white p-6 rounded-xl shadow">

        <p>
          <strong>Company:</strong> {lead.company_name}
        </p>

        <p>
          <strong>Email:</strong> {lead.email}
        </p>

        <p>
          <strong>Status:</strong> {lead.status}
        </p>

      </div>

      <div className="mt-8 bg-white p-6 rounded-xl shadow">

        <h2 className="text-xl font-bold mb-4">
          Notes
        </h2>

        <textarea
          className="w-full border p-3 rounded"
          rows="4"
          placeholder="Add note..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />

        <button
          onClick={addNote}
          className="mt-4 bg-black text-white px-4 py-2 rounded"
        >
          Add Note
        </button>

        <div className="mt-6 space-y-4">

          {lead.notes.map((n) => (
            <div
              key={n.id}
              className="border p-4 rounded"
            >
              <p>{n.content}</p>

              <small className="text-gray-500">
                {n.user?.name}
              </small>
            </div>
          ))}

        </div>

      </div>

    </div>
  );
};

export default LeadDetailsPage;