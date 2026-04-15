import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthContext, AuthProvider } from "./AuthContext.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import ProgramsPage from "./pages/ProgramsPage.jsx";
import AnalyticsPage from "./pages/AnalyticsPage.jsx";
import SurveysPage from "./pages/SurveysPage.jsx";
import SurveyForm from "./pages/SurveyForm.jsx";

function AppRoutes() {
  const { token } = useContext(AuthContext);

  if (!token) {
    return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/survey-form" element={<SurveyForm />} />
        <Route path="*" element={<Navigate replace to="/login" />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/programs" element={<ProgramsPage />} />
      <Route path="/analytics" element={<AnalyticsPage />} />
      <Route path="/surveys" element={<SurveysPage />} />
      <Route path="/survey-form" element={<SurveyForm />} />
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-slate-950 text-slate-100">
        <AppRoutes />
      </div>
    </AuthProvider>
  );
}

export default App;
