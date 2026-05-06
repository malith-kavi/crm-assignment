import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { ui, cx } from "../constants/uiClasses";

const LoginPage = () => {
  const { login } = useAuth();

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [remember, setRemember] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await login(form.email, form.password);

      toast.success("Login successful");

      navigate("/dashboard");
    } catch (error) {
      toast.error("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={ui.login.page}>
      <div className={ui.login.grid}>
        <div className={ui.login.leftPanel}>
          <div className={ui.login.leftGlowBlue} />
          <div className={ui.login.leftGlowTeal} />

          <div className={ui.login.brandWrap}>
            <div className={ui.login.brandRow}>
              <div className={ui.login.brandIcon}>CRM</div>
              <div>
                <p className={ui.text.titleSm}>Customer Relationship Management System</p>
              </div>
            </div>
          </div>
        </div>

        <div className={ui.login.formWrap}>
          <form
            onSubmit={handleSubmit}
            className={ui.login.form}
          >
            <div className={ui.card.lg}>
              <div className={ui.login.titleStack}>
                <p className={ui.text.eyebrowWide}>
                  Sign in
                </p>
                <h2 className={ui.text.titleLg}>Welcome back</h2>
              </div>

              <div className={ui.login.fields}>
                <div className={ui.login.fieldGroup}>
                  <label className={ui.text.label}>Email</label>
                  <input
                    type="email"
                    required
                    placeholder="you@company.com"
                    className={ui.input.base}
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                  />
                </div>

                <div className={ui.login.fieldGroup}>
                  <label className={ui.text.label}>Password</label>
                  <input
                    type="password"
                    required
                    placeholder="Enter your password"
                    className={ui.input.base}
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className={ui.login.metaRow}>
                <label className={cx(ui.layout.rowGap2, ui.text.muted)}>
                  <input
                    type="checkbox"
                    className={ui.checkbox}
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                  />
                  Remember me
                </label>
                <button
                  type="button"
                  className={ui.button.link}
                >
                  Forgot password
                </button>
              </div>

              <button
                disabled={loading}
                className={ui.login.submitButton}
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;