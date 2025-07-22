import { Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';
import FeedBackPage from './pages/FeedbackPage';
import HomePage from './pages/HomePage';
import QRCodeExamplesPage from './pages/QRCodeExamplesPage';
import QRCodeReaderPage from './pages/QRCodeReaderPage';
import StudentListPage from './pages/StudentListPage';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/listas" element={<QRCodeExamplesPage />} />
        <Route path="/escoteiros/cadastro" element={<QRCodeReaderPage />} />
        <Route path="/listas/presenca" element={<StudentListPage />} />
        <Route path="/feedback" element={<FeedBackPage />} />
      </Route>
    </Routes>
  );
}

export default App;
