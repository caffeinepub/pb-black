import { useEffect, useState } from 'react';
import PBBlackLandingPage from './pages/PBBlackLandingPage';
import AdminPage from './pages/AdminPage';
import MemberDashboardPage from './pages/MemberDashboardPage';

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  if (currentPath === '/admin') {
    return <AdminPage />;
  }

  if (currentPath === '/member') {
    return <MemberDashboardPage />;
  }

  return <PBBlackLandingPage />;
}

export default App;
