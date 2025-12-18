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
  const baseClasses = `fixed left-0 top-0 h-full bg-white border-r border-gray-200 w-64 transform transition-transform duration-300 z-50 ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static`;

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
      <div className="h-16 flex items-center justify-between px-6 border-b border-gray-200">
        <div className="flex items-center">
            <Dumbbell className="w-8 h-8 text-primary mr-2" />
            <span className="text-xl font-bold text-gray-800">GymPro</span>
        </div>
        <button 
          onClick={toggleSidebar}
          className="lg:hidden p-2 -mr-2 text-gray-500 hover:bg-gray-100 rounded-md"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100%-4rem)] flex flex-col justify-between">
        <ul className="space-y-1">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to !== '/'} 
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-primary'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`
                }
              >
                <link.icon className="w-5 h-5" />
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="pt-4 border-t border-gray-200">
           <button 
             onClick={onLogout}
             className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-danger hover:bg-red-50 transition-colors"
           >
             <LogOut className="w-5 h-5" />
             Logout
           </button>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;