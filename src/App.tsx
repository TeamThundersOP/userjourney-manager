import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import UserDashboard from '@/pages/user/Dashboard';
import AdminDashboard from '@/pages/admin/Dashboard';
import { useUserAuth } from '@/contexts/UserAuthContext';

function App() {
  const { userId } = useUserAuth();

  return (
    <Router>
      <Routes>
        <Route path="/" element={userId ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;