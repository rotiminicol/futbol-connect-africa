
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminStats from '@/components/admin/AdminStats';

// Define an interface for system settings
interface SystemSetting {
  key: string;
  value: string;
  description?: string;
}

const AdminDashboardPage: React.FC = () => {
  const { user, profile } = useAuth();
  const { toast } = useToast();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPlayers: 0,
    totalCoaches: 0,
    totalAgents: 0,
    totalClubStaff: 0,
    availablePlayers: 0,
    recentlyAdded: 0,
  });
  const [loading, setLoading] = useState(true);
  const [testMode, setTestMode] = useState(false);

  // Check if the current user is an admin
  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!user || !profile) {
        setIsAdmin(false);
        return;
      }

      // Check if the user has admin role
      if (profile.role === 'admin') {
        setIsAdmin(true);
        
        // Load admin dashboard stats
        fetchDashboardStats();
        
        // Check test mode status
        const { data, error } = await supabase
          .from('system_settings')
          .select('*')
          .eq('key', 'test_mode')
          .single();
          
        if (data && !error) {
          setTestMode(data.value === 'true');
        }
      } else {
        setIsAdmin(false);
        toast({
          title: "Access Denied",
          description: "You don't have permission to access the admin portal",
          variant: "destructive",
        });
      }
      
      setLoading(false);
    };

    checkAdminStatus();
  }, [user, profile, toast]);

  // Fetch dashboard statistics
  const fetchDashboardStats = async () => {
    try {
      // Get total users count by role
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('role');
        
      if (profilesError) throw profilesError;
        
      // Count roles manually
      const roleCounts: Record<string, number> = {};
      let totalUsers = 0;
        
      profiles.forEach(profile => {
        const role = profile.role;
        if (role) {
          roleCounts[role] = (roleCounts[role] || 0) + 1;
          totalUsers++;
        }
      });
      
      // Get available players count
      const { count: availablePlayers, error: availableError } = await supabase
        .from('player_profiles')
        .select('id', { count: 'exact', head: true })
        .eq('available_for_transfer', true);
        
      if (availableError) throw availableError;
        
      // Get recently added profiles count (last 7 days)
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      
      const { count: recentlyAdded, error: recentError } = await supabase
        .from('profiles')
        .select('id', { count: 'exact', head: true })
        .gte('created_at', oneWeekAgo.toISOString());

      if (recentError) throw recentError;

      // Update stats
      setStats({
        totalUsers: totalUsers || 0,
        totalPlayers: roleCounts['player'] || 0,
        totalCoaches: roleCounts['coach'] || 0,
        totalAgents: roleCounts['agent'] || 0,
        totalClubStaff: roleCounts['club_staff'] || 0,
        availablePlayers: availablePlayers || 0,
        recentlyAdded: recentlyAdded || 0,
      });
    } catch (error) {
      console.error('Error fetching admin stats:', error);
      toast({
        title: "Error Loading Dashboard",
        description: "Failed to load admin statistics",
        variant: "destructive",
      });
    }
  };

  // Toggle test mode
  const toggleTestMode = async () => {
    try {
      const newValue = !testMode;
      
      const { error } = await supabase
        .from('system_settings')
        .update({ value: newValue.toString() })
        .eq('key', 'test_mode');
        
      if (error) throw error;
      
      setTestMode(newValue);
      toast({
        title: `Test Mode ${newValue ? 'Enabled' : 'Disabled'}`,
        description: `Payment requirement is now ${newValue ? 'bypassed' : 'enforced'} for all users`,
        variant: newValue ? "default" : "destructive",
      });
    } catch (error) {
      console.error('Error toggling test mode:', error);
      toast({
        title: "Error",
        description: "Failed to update test mode setting",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-t-2 border-b-2 border-nigerian-green-500 rounded-full mx-auto mb-4"></div>
          <p className="text-gray-500">Verifying admin credentials...</p>
        </div>
      </div>
    );
  }

  if (isAdmin === false) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <AdminSidebar />
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          
          <div className="flex items-center space-x-2">
            <span className={`px-3 py-1 rounded-full text-sm ${testMode ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'}`}>
              {testMode ? 'Test Mode' : 'Live Mode'}
            </span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={testMode} 
                onChange={toggleTestMode}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-nigerian-green-300 dark:peer-focus:ring-nigerian-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-nigerian-green-600"></div>
              <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                Toggle Test Mode
              </span>
            </label>
          </div>
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Welcome to the Admin Portal. Manage users, players, and system settings from here.
        </p>
        
        <AdminStats stats={stats} />
        
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <p className="text-gray-500 dark:text-gray-400 italic">
              Implement recent activity log here...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
