import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";
import LeadForm from "../components/LeadForm";
import toast from "react-hot-toast";
import { ui } from "../constants/uiClasses";

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

  if (!form) {
    return (
      <div className={ui.card.lg}>
        <div className={ui.editLead.skeletonTitle} />
        <div className={ui.editLead.skeletonStack}>
          <div className={ui.editLead.skeletonLine} />
          <div className={ui.editLead.skeletonLineSm} />
        </div>
      </div>
    );
  }

  return (
    <div className={ui.editLead.page}>
      <div>
        <p className={ui.text.eyebrow}>
          Edit lead
        </p>
        <h1 className={ui.text.titleXl}>Update lead record</h1>
        <p className={ui.editLead.headerDescription}>
          Keep the opportunity aligned with the latest context.
        </p>
      </div>

      <div className={ui.editLead.card}>
        <LeadForm
          form={form}
          setForm={setForm}
          handleSubmit={handleSubmit}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default EditLeadPage;
