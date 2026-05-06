import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import LeadsPage from "../pages/LeadsPage";
import LeadDetailsPage from "../pages/LeadDetailsPage";
import EditLeadPage from "../pages/EditLeadPage";

import ProtectedRoute from "../components/ProtectedRoute";

import AppLayout from "../layouts/AppLayout";

const AppRoutes = () => {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<LoginPage />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <AppLayout>
                <DashboardPage />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/leads"
          element={
            <ProtectedRoute>
              <AppLayout>
                <LeadsPage />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/leads/:id"
          element={
            <ProtectedRoute>
              <AppLayout>
                <LeadDetailsPage />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/leads/edit/:id"
          element={
            <ProtectedRoute>
              <AppLayout>
                <EditLeadPage />
              </AppLayout>
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
};

export default AppRoutes;