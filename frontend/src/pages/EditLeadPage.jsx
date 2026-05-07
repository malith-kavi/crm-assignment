import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";
import LeadForm from "../components/LeadForm";
import toast from "react-hot-toast";
import { ui } from "../constants/uiClasses";

const EditLeadPage = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [form, setForm] = useState(null);
  const [leadSources, setLeadSources] = useState([]);
  const [salespersons, setSalespersons] = useState([]);

  const [loading, setLoading] = useState(false);

  const fetchLead = async () => {
    const res = await api.get(`/leads/${id}`);

    setForm(res.data);
  };

  const fetchLookups = async () => {
    try {
      const [leadSourcesResponse, salespersonsResponse] = await Promise.all([
        api.get("/lead-sources"),
        api.get("/salespersons"),
      ]);

      setLeadSources(leadSourcesResponse.data);
      setSalespersons(salespersonsResponse.data);
    } catch {
      toast.error("Unable to load lead options");
    }
  };

  useEffect(() => {
    fetchLead();
    fetchLookups();
  }, []);

  const leadSourceOptions = useMemo(() => {
    const values = leadSources.map((source) => source.name);
    if (form?.lead_source && !values.includes(form.lead_source)) {
      return [...values, form.lead_source];
    }
    return values;
  }, [form?.lead_source, leadSources]);

  const salespersonOptions = useMemo(() => {
    const values = salespersons.map((salesperson) => salesperson.name);
    if (form?.assigned_salesperson && !values.includes(form.assigned_salesperson)) {
      return [...values, form.assigned_salesperson];
    }
    return values;
  }, [form?.assigned_salesperson, salespersons]);

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
        
      </div>

      <div className={ui.editLead.card}>
        <LeadForm
          form={form}
          setForm={setForm}
          handleSubmit={handleSubmit}
          loading={loading}
          leadSources={leadSourceOptions}
          salespersons={salespersonOptions}
        />
      </div>
    </div>
  );
};

export default EditLeadPage;
