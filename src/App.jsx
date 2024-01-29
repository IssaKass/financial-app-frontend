import { Toaster } from "@/components/ui/toaster";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import AnalyticsPage from "./pages/AnalyticsPage";
import AppearanceSettingsPage from "./pages/AppearanceSettingsPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProfileSettingsPage from "./pages/ProfileSettingsPage";
import ProjectDetailsPage from "./pages/ProjectDetailsPage";
import ProjectsListPage from "./pages/ProjectsListPage";
import RegistrationPage from "./pages/RegistrationPage";
import SubscriptionsListPage from "./pages/SubscriptionsListPage";

function App() {
  return (
    <div className="h-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/projects" element={<ProjectsListPage />} />
            <Route
              path="/projects/:projectId"
              element={<ProjectDetailsPage />}
            />
            <Route path="/subscriptions" element={<SubscriptionsListPage />} />
            <Route path="/settings" element={<ProfileSettingsPage />} />
            <Route
              path="/settings/appearance"
              element={<AppearanceSettingsPage />}
            />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;
