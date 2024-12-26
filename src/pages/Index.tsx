import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from '@/contexts/UserAuthContext';

const Index = () => {
  const navigate = useNavigate();
  const { userId } = useUserAuth();

  useEffect(() => {
    if (userId) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  }, [userId, navigate]);

  return null;
};

export default Index;