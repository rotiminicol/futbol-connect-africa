import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';

const DashboardPage: React.FC = () => {
  const { user, profile } = useAuth();
  
  // Get display name from profile or email
  const displayName = profile?.full_name || user?.email?.split('@')[0] || 'User';

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Welcome, {displayName}!</h2>
          <p className="text-gray-600 dark:text-gray-300">
            This is your dashboard where you can manage your profile, view statistics, and more.
          </p>
          {/* Add dashboard content here */}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
