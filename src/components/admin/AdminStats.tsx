
import React from 'react';

interface AdminStatsProps {
  stats: {
    totalUsers: number;
    totalPlayers: number;
    totalCoaches: number;
    totalAgents: number;
    totalClubStaff: number;
    availablePlayers: number;
    recentlyAdded: number;
  };
}

const StatCard: React.FC<{ title: string; value: number; icon: React.ReactNode; color: string }> = ({ 
  title, value, icon, color 
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex items-center">
        <div className={`flex items-center justify-center w-12 h-12 rounded-lg ${color}`}>
          {icon}
        </div>
        <div className="ml-4">
          <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">{title}</h3>
          <div className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">{value}</div>
        </div>
      </div>
    </div>
  );
};

const AdminStats: React.FC<AdminStatsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      <StatCard 
        title="Total Users" 
        value={stats.totalUsers} 
        color="bg-blue-100 text-blue-600"
        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>}
      />
      
      <StatCard 
        title="Total Players" 
        value={stats.totalPlayers} 
        color="bg-nigerian-green-100 text-nigerian-green-600"
        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" /></svg>}
      />
      
      <StatCard 
        title="Total Coaches" 
        value={stats.totalCoaches} 
        color="bg-amber-100 text-amber-600"
        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>}
      />
      
      <StatCard 
        title="Total Agents" 
        value={stats.totalAgents}
        color="bg-purple-100 text-purple-600" 
        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><path d="M21 12H3M12 3v18" /></svg>}
      />
      
      <StatCard 
        title="Available Players" 
        value={stats.availablePlayers}
        color="bg-emerald-100 text-emerald-600" 
        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" /></svg>}
      />
      
      <StatCard 
        title="Recently Added (7d)" 
        value={stats.recentlyAdded}
        color="bg-pink-100 text-pink-600" 
        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>}
      />
    </div>
  );
};

export default AdminStats;
