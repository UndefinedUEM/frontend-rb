import { Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import AttendanceListPage from './pages/AttendanceListPage';
import AttendanceSummaryPage from './pages/AttendanceSummaryPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import PasswordRecoveryPage from './pages/PasswordRecoveryPage';
import ScoutRegistrationPage from './pages/ScoutRegistrationPage';
import UserRegistrationPage from './pages/UserRegistrationPage';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/recuperar-senha" element={<PasswordRecoveryPage />} />
      <Route path="/cadastro/usuario" element={<UserRegistrationPage />} />

      <Route element={
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      }>
        <Route path="/" element={<HomePage />} />
        <Route path="/cadastro/escoteiros" element={<ScoutRegistrationPage />} />
        <Route path="/listas/presenca" element={<AttendanceListPage />} />
        <Route path="/listas/presenca/resumo" element={<AttendanceSummaryPage />} />
      </Route>
    </Routes>
  );
}

export default App;
