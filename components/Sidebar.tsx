import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Dumbbell, 
  Users, 
  CreditCard, 
  FileText, 
  Settings, 
  ShieldCheck, 
  CalendarCheck,
  Bell,
  LogOut,
  UserCircle,
  X,
  IdCard
} from 'lucide-react';
import { UserRole } from '../types.ts';

interface SidebarProps {
  role: UserRole;
  onLogout: () => void;
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ role, onLogout, isOpen, toggleSidebar }) => {
  // Increased width from w-64 to w-80
  const baseClasses = `fixed left-0 top-0 h-full bg-white border-r border-gray-200 w-80 transform transition-transform duration-300 z-50 ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static`;

  const getLinks = () => {
    switch (role) {
      case 'superuser':
        return [
          { to: '/superuser', icon: LayoutDashboard, label: 'Overview' },
          { to: '/superuser/gyms', icon: Dumbbell, label: 'Gyms' },
          { to: '/superuser/admins', icon: ShieldCheck, label: 'Admins' },
          { to: '/superuser/reports', icon: FileText, label: 'System Reports' },
          { to: '/superuser/settings', icon: Settings, label: 'Settings' },
        ];
      case 'admin':
        return [
          { to: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
          { to: '/admin/members', icon: Users, label: 'Members' },
          { to: '/admin/memberships', icon: IdCard, label: 'Memberships' },
          { to: '/admin/plans', icon: FileText, label: 'Plans' },
          { to: '/admin/payments', icon: CreditCard, label: 'Payments' },
          { to: '/admin/attendance', icon: CalendarCheck, label: 'Attendance' },
          { to: '/admin/broadcasts', icon: Bell, label: 'Broadcasts' },
        ];
      case 'member':
        return [
          { to: '/member', icon: LayoutDashboard, label: 'My Dashboard' },
          { to: '/member/profile', icon: UserCircle, label: 'My Profile' },
          { to: '/member/attendance', icon: CalendarCheck, label: 'My Attendance' },
        ];
      default:
        return [];
    }
  };

  const links = getLinks();

  return (
    <aside className={baseClasses}>
      <div className="h-20 flex items-center justify-between px-8 border-b border-gray-200">
        <div className="flex items-center">
            <Dumbbell className="w-10 h-10 text-primary mr-3" />
            <span className="text-2xl font-black text-gray-800 tracking-tight">GymPro</span>
        </div>
        <button 
          onClick={toggleSidebar}
          className="lg:hidden p-2 -mr-2 text-gray-500 hover:bg-gray-100 rounded-md"
        >
          <X className="w-8 h-8" />
        </button>
      </div>

      <nav className="p-6 space-y-2 overflow-y-auto h-[calc(100%-5rem)] flex flex-col justify-between">
        <ul className="space-y-2">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to !== '/'} 
                className={({ isActive }) =>
                  `flex items-center gap-4 px-5 py-4 rounded-xl text-lg font-bold transition-all ${
                    isActive
                      ? 'bg-blue-50 text-primary shadow-sm'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`
                }
              >
                <link.icon className="w-6 h-6" />
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="pt-6 border-t border-gray-200">
           <button 
             onClick={onLogout}
             className="w-full flex items-center gap-4 px-5 py-4 rounded-xl text-lg font-bold text-danger hover:bg-red-50 transition-colors"
           >
             <LogOut className="w-6 h-6" />
             Logout
           </button>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;