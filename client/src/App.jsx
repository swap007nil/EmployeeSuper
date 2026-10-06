import { useState } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';

function App() {
  const [session, setSession] = useState(() => {
    const token = localStorage.getItem('token');
    if (!token) return null;
    return {
      username: localStorage.getItem('username'),
      role: localStorage.getItem('role'),
    };
  });

  const handleLogin = (token, username, role) => {
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
    localStorage.setItem('role', role);
    setSession({ username, role });
  };

  const handleLogout = () => {
    localStorage.clear();
    setSession(null);
  };

  if (!session) return <Login onLogin={handleLogin} />;

  return (
    <>
      <Navbar username={session.username} role={session.role} onLogout={handleLogout} />
      <Dashboard isAdmin={session.role === 'admin'} />
    </>
  );
}

export default App;