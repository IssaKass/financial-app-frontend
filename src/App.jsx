import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProjectsPage from "./pages/ProjectsPage";
import DashboardLayout from "./layouts/DashboardLayout";
import SubscriptionsPage from "./pages/SubscriptionsPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProtectedRoute from "./ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import AnalyticsPage from "./pages/AnalyticsPage";

function App() {
  return (
    <div className="">
      <div className="h-screen bg-white dark:bg-neutral-900">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<DashboardLayout></DashboardLayout>} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/subscriptions" element={<SubscriptionsPage />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
