import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import UserDashboard from '@/pages/user/Dashboard';
import AdminDashboard from '@/pages/admin/Dashboard';
import { UserAuthProvider } from '@/contexts/UserAuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <UserAuthProvider>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </UserAuthProvider>
      </Router>
    </QueryClientProvider>
  );
}

export default App;