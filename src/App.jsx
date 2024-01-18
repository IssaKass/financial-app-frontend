import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import AnalyticsPage from "./pages/AnalyticsPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import Page from "./pages/Page";
import ProjectsPage from "./pages/ProjectsPage";
import RegistrationPage from "./pages/RegistrationPage";
import SubscriptionsPage from "./pages/SubscriptionsPage";

function App() {
  return (
    <div className="">
      <div className="h-screen bg-white dark:bg-neutral-900">
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <Page title="Financial | Home">
                  <HomePage />
                </Page>
              }
            />
            <Route
              path="/login"
              element={
                <Page title="Financial | Login">
                  <LoginPage />
                </Page>
              }
            />
            <Route
              path="/register"
              element={
                <Page title="Financial | Register">
                  <RegistrationPage />
                </Page>
              }
            />
            <Route element={<ProtectedRoute />}>
              <Route
                path="/analytics"
                element={
                  <Page title="Financial | Analytics">
                    <AnalyticsPage />
                  </Page>
                }
              />
              <Route
                path="/projects"
                element={
                  <Page title="Financial | Projects">
                    <ProjectsPage />
                  </Page>
                }
              />
              <Route
                path="/subscriptions"
                element={
                  <Page title="Financial | Subscriptions">
                    <SubscriptionsPage />
                  </Page>
                }
              />
            </Route>
            <Route
              path="*"
              element={
                <Page title="Financial | 404: This page could not be found.">
                  <NotFoundPage />
                </Page>
              }
            />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
