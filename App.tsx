import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar.tsx';
import Login from './pages/Login.tsx';
import SuperUserDashboard from './pages/SuperUserDashboard.tsx';
import GymsList from './pages/GymsList.tsx';
import CreateGym from './pages/CreateGym.tsx';
import AdminsList from './pages/AdminsList.tsx';
import CreateAdmin from './pages/CreateAdmin.tsx';
import AdminDashboard from './pages/AdminDashboard.tsx';
import MemberDashboard from './pages/MemberDashboard.tsx';
import MembersList from './pages/MembersList.tsx';
import AddMember from './pages/AddMember.tsx';
import PlansList from './pages/PlansList.tsx';
import AddPlan from './pages/AddPlan.tsx';
import MembershipsList from './pages/MembershipsList.tsx';
import AddMembership from './pages/AddMembership.tsx';
import PaymentsList from './pages/PaymentsList.tsx';
import AddPayment from './pages/AddPayment.tsx';
import { UserRole } from './types.ts';
import { Menu, Construction } from 'lucide-react';

const ProtectedRoute: React.FC<{ 
    children: React.ReactNode; 
    allowedRole: UserRole; 
    currentRole: UserRole | null 
}> = ({ children, allowedRole, currentRole }) => {
    if (!currentRole) {
        return <Navigate to="/login" replace />;
    }
    if (currentRole !== allowedRole) {
        if (currentRole === 'superuser') return <Navigate to="/superuser" replace />;
        if (currentRole === 'admin') return <Navigate to="/admin" replace />;
        return <Navigate to="/member" replace />;
    }
    return <>{children}</>;
};

const Layout: React.FC<{ role: UserRole; onLogout: () => void; children: React.ReactNode }> = ({ role, onLogout, children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();

    React.useEffect(() => {
        setSidebarOpen(false);
    }, [location]);

    return (
        <div className="flex h-screen bg-gray-50">
            {sidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <Sidebar 
                role={role} 
                onLogout={onLogout} 
                isOpen={sidebarOpen} 
                toggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
            />

            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="lg:hidden flex items-center justify-between p-4 bg-white border-b border-gray-200">
                    <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-md hover:bg-gray-100">
                        <Menu className="w-6 h-6 text-gray-600" />
                    </button>
                    <span className="font-bold text-gray-800">GymPro</span>
                    <div className="w-10" />
                </header>

                <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-6 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
};

const PlaceholderPage: React.FC<{ title: string }> = ({ title }) => (
    <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-blue-50 text-primary rounded-full flex items-center justify-center mb-4">
                <Construction className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Coming Soon</h2>
            <p className="text-gray-500 max-w-md">
                The <span className="font-medium text-gray-900">{title}</span> module is currently under development. Check back later for updates.
            </p>
        </div>
    </div>
);

const App: React.FC = () => {
  const [userRole, setUserRole] = useState<UserRole | null>(null);

  const handleLogin = (role: UserRole) => {
      setUserRole(role);
  };

  const handleLogout = () => {
      setUserRole(null);
  };

  return (
    <HashRouter>
      <Routes>
        <Route 
            path="/login" 
            element={userRole ? <Navigate to={`/${userRole}`} replace /> : <Login onLogin={handleLogin} />} 
        />

        <Route
          path="/superuser/*"
          element={
            <ProtectedRoute allowedRole="superuser" currentRole={userRole}>
              <Layout role="superuser" onLogout={handleLogout}>
                <Routes>
                    <Route path="/" element={<SuperUserDashboard />} />
                    <Route path="gyms" element={<GymsList />} />
                    <Route path="gyms/create" element={<CreateGym />} />
                    <Route path="admins" element={<AdminsList />} />
                    <Route path="admins/create" element={<CreateAdmin />} />
                    <Route path="reports" element={<PlaceholderPage title="System Reports" />} />
                    <Route path="settings" element={<PlaceholderPage title="System Settings" />} />
                    <Route path="*" element={<Navigate to="/superuser" replace />} />
                </Routes>
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/*"
          element={
            <ProtectedRoute allowedRole="admin" currentRole={userRole}>
              <Layout role="admin" onLogout={handleLogout}>
                 <Routes>
                    <Route path="/" element={<AdminDashboard />} />
                    <Route path="members" element={<MembersList />} />
                    <Route path="members/add" element={<AddMember />} />
                    <Route path="memberships" element={<MembershipsList />} />
                    <Route path="memberships/add" element={<AddMembership />} />
                    <Route path="plans" element={<PlansList />} />
                    <Route path="plans/add" element={<AddPlan />} />
                    <Route path="payments" element={<PaymentsList />} />
                    <Route path="payments/add" element={<AddPayment />} />
                    <Route path="attendance" element={<PlaceholderPage title="Attendance" />} />
                    <Route path="broadcasts" element={<PlaceholderPage title="Broadcasts" />} />
                    <Route path="*" element={<Navigate to="/admin" replace />} />
                 </Routes>
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/member/*"
          element={
            <ProtectedRoute allowedRole="member" currentRole={userRole}>
              <Layout role="member" onLogout={handleLogout}>
                <Routes>
                    <Route path="/" element={<MemberDashboard />} />
                    <Route path="profile" element={<PlaceholderPage title="My Profile" />} />
                    <Route path="attendance" element={<PlaceholderPage title="My Attendance History" />} />
                    <Route path="*" element={<Navigate to="/member" replace />} />
                </Routes>
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </HashRouter>
  );
};

export default App;