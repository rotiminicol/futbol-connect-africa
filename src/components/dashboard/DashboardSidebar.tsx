
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { cn } from '@/lib/utils';

interface MenuItemProps {
  href: string;
  icon: React.ReactNode;
  text: string;
  isActive: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({ href, icon, text, isActive }) => {
  return (
    <Link
      to={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
        isActive 
          ? "bg-nigerian-green-500 text-white" 
          : "text-gray-700 dark:text-gray-300 hover:text-nigerian-green-500 hover:bg-gray-100 dark:hover:bg-gray-800"
      )}
    >
      {icon}
      <span className="text-sm font-medium">{text}</span>
    </Link>
  );
};

const DashboardSidebar: React.FC = () => {
  const location = useLocation();
  const { user } = useAuth();
  
  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  const renderRoleSpecificItems = () => {
    if (!user?.role) return null;

    switch (user.role) {
      case 'player':
        return (
          <>
            <MenuItem 
              href="/dashboard/profile-stats" 
              icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>} 
              text="Profile Stats" 
              isActive={isActive('/dashboard/profile-stats')} 
            />
            <MenuItem 
              href="/dashboard/videos" 
              icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" /></svg>} 
              text="My Videos" 
              isActive={isActive('/dashboard/videos')} 
            />
            <MenuItem 
              href="/dashboard/offers" 
              icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>} 
              text="Offers & Trials" 
              isActive={isActive('/dashboard/offers')} 
            />
          </>
        );
      case 'coach':
      case 'manager':
        return (
          <>
            <MenuItem 
              href="/dashboard/scout" 
              icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>} 
              text="Scout Players" 
              isActive={isActive('/dashboard/scout')} 
            />
            <MenuItem 
              href="/dashboard/shortlist" 
              icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><rect x="8" y="2" width="8" height="4" rx="1" ry="1" /></svg>} 
              text="My Shortlist" 
              isActive={isActive('/dashboard/shortlist')} 
            />
            <MenuItem 
              href="/dashboard/team" 
              icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>} 
              text="Team Management" 
              isActive={isActive('/dashboard/team')} 
            />
          </>
        );
      case 'agent':
        return (
          <>
            <MenuItem 
              href="/dashboard/clients" 
              icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>} 
              text="My Clients" 
              isActive={isActive('/dashboard/clients')} 
            />
            <MenuItem 
              href="/dashboard/scout" 
              icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>} 
              text="Scout Players" 
              isActive={isActive('/dashboard/scout')} 
            />
            <MenuItem 
              href="/dashboard/opportunities" 
              icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="9" y1="9" x2="15" y2="15" /><line x1="15" y1="9" x2="9" y2="15" /></svg>}
              text="Opportunities" 
              isActive={isActive('/dashboard/opportunities')} 
            />
          </>
        );
      case 'club_staff':
        return (
          <>
            <MenuItem 
              href="/dashboard/recruitment" 
              icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>} 
              text="Recruitment" 
              isActive={isActive('/dashboard/recruitment')} 
            />
            <MenuItem 
              href="/dashboard/club-profile" 
              icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>} 
              text="Club Profile" 
              isActive={isActive('/dashboard/club-profile')} 
            />
            <MenuItem 
              href="/dashboard/post-opportunity" 
              icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3h18v18H3zM8 12h8" /><path d="M12 8v8" /></svg>} 
              text="Post Opportunity" 
              isActive={isActive('/dashboard/post-opportunity')} 
            />
          </>
        );
      case 'admin':
        return (
          <>
            <MenuItem 
              href="/dashboard/users" 
              icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>} 
              text="User Management" 
              isActive={isActive('/dashboard/users')} 
            />
            <MenuItem 
              href="/dashboard/analytics" 
              icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>} 
              text="Analytics" 
              isActive={isActive('/dashboard/analytics')} 
            />
            <MenuItem 
              href="/dashboard/content" 
              icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>} 
              text="Content Management" 
              isActive={isActive('/dashboard/content')} 
            />
            <MenuItem 
              href="/dashboard/payments" 
              icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2" /><line x1="1" y1="10" x2="23" y2="10" /></svg>} 
              text="Payments" 
              isActive={isActive('/dashboard/payments')} 
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <nav className="h-full flex flex-col border-r bg-white dark:bg-gray-800 w-72">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Dashboard</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">{user?.role} Account</p>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <div className="px-3 py-2">
          <h3 className="mb-2 px-4 text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
            General
          </h3>
          <div className="space-y-1">
            <MenuItem 
              href="/dashboard" 
              icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="9" /><rect x="14" y="3" width="7" height="5" /><rect x="14" y="12" width="7" height="9" /><rect x="3" y="16" width="7" height="5" /></svg>} 
              text="Overview" 
              isActive={location.pathname === '/dashboard'} 
            />
            <MenuItem 
              href="/dashboard/messages" 
              icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>} 
              text="Messages" 
              isActive={isActive('/dashboard/messages')} 
            />
            <MenuItem 
              href="/dashboard/profile" 
              icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>} 
              text="Profile" 
              isActive={isActive('/dashboard/profile')} 
            />
          </div>
        </div>

        {user?.role && (
          <div className="px-3 py-2">
            <h3 className="mb-2 px-4 text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
              {user?.role === 'player' ? 'Player Tools' : 
               user?.role === 'coach' || user?.role === 'manager' ? 'Coaching Tools' :
               user?.role === 'agent' ? 'Agent Tools' :
               user?.role === 'club_staff' ? 'Club Tools' : 
               'Admin Tools'}
            </h3>
            <div className="space-y-1">
              {renderRoleSpecificItems()}
            </div>
          </div>
        )}
        
        <div className="px-3 py-2">
          <h3 className="mb-2 px-4 text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
            Settings
          </h3>
          <div className="space-y-1">
            <MenuItem 
              href="/dashboard/account" 
              icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>} 
              text="Account Settings" 
              isActive={isActive('/dashboard/account')} 
            />
            <MenuItem 
              href="/dashboard/subscription" 
              icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18" /><path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" /></svg>} 
              text="Subscription" 
              isActive={isActive('/dashboard/subscription')} 
            />
          </div>
        </div>
      </div>
      <div className="p-4 border-t mt-auto">
        <div className="flex items-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-nigerian-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" /></svg>
          <span className="text-sm font-medium">Help & Support</span>
        </div>
      </div>
    </nav>
  );
};

export default DashboardSidebar;
