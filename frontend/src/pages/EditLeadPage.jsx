import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";
import LeadForm from "../components/LeadForm";
import toast from "react-hot-toast";

const EditLeadPage = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [form, setForm] = useState(null);

  const [loading, setLoading] = useState(false);

  const fetchLead = async () => {
    const res = await api.get(`/leads/${id}`);

    setForm(res.data);
  };

  useEffect(() => {
    fetchLead();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await api.put(`/leads/${id}`, form);

      toast.success("Lead updated");

      navigate("/leads");
    } finally {
      setLoading(false);
    }
  };

  if (!form) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Edit Lead
      </h1>

      <LeadForm
        form={form}
        setForm={setForm}
        handleSubmit={handleSubmit}
        loading={loading}
      />
    </div>
  );
};

export default EditLeadPage;