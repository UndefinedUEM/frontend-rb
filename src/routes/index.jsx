import { Routes, Route } from 'react-router-dom';
import Layout from '@/components/Layout';
import ProtectedRoute from '@/components/ProtectedRoute';
import HomePage from '@/pages/HomePage';
import LoginPage from '@/pages/auth/LoginPage';
import PasswordRecoveryPage from '@/pages/auth/PasswordRecoveryPage';
import UserRegistrationPage from '@/pages/auth/UserRegistrationPage';
import ScoutRegistrationPage from '@/pages/scouts/ScoutRegistrationPage';
import ScoutRegistrationSuccessPage from '@/pages/scouts/ScoutRegistrationSuccessPage';
import AttendanceListPage from '@/pages/attendance/AttendanceListPage';
import AttendanceSummaryPage from '@/pages/attendance/AttendanceSummaryPage';
import AttendanceSuccessPage from '@/pages/attendance/AttendanceSuccessPage';
import AttendanceHistoryPage from '@/pages/attendance/AttendanceHistoryPage';
import AttendanceDetailPage from '@/pages/attendance/AttendanceDetailPage';
import NotFoundPage from '@/pages/NotFoundPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/recuperar-senha" element={<PasswordRecoveryPage />} />
      <Route path="/cadastro/usuario" element={<UserRegistrationPage />} />

      <Route 
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<HomePage />} />
        <Route path="/cadastro/escoteiros" element={<ScoutRegistrationPage />} />
        <Route path="/cadastro/escoteiros/sucesso" element={<ScoutRegistrationSuccessPage />} />
        <Route path="/listas/presenca" element={<AttendanceListPage />} />
        <Route path="/listas/presenca/resumo" element={<AttendanceSummaryPage />} />
        <Route path="/listas/presenca/sucesso" element={<AttendanceSuccessPage />} />
        <Route path="/listas/historico" element={<AttendanceHistoryPage />} />
        <Route path="/listas/detalhes/:listId" element={<AttendanceDetailPage />} />
      </Route>
      
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;