
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Profile } from '@/types/supabase';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { 
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const UsersManagementPage: React.FC = () => {
  const { user, profile } = useAuth();
  const { toast } = useToast();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [users, setUsers] = useState<Profile[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string | null>(null);

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
        fetchUsers();
      } else {
        setIsAdmin(false);
        toast({
          title: "Access Denied",
          description: "You don't have permission to access the admin portal",
          variant: "destructive",
        });
      }
    };

    checkAdminStatus();
  }, [user, profile, toast]);

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      setUsers(data || []);
      setFilteredUsers(data || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: "Error",
        description: "Failed to load user data",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  // Filter users based on search term and selected role
  useEffect(() => {
    let results = users;
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(
        user => 
          (user.full_name && user.full_name.toLowerCase().includes(term)) || 
          (user.email && user.email.toLowerCase().includes(term)) ||
          (user.username && user.username.toLowerCase().includes(term))
      );
    }
    
    // Apply role filter
    if (roleFilter) {
      results = results.filter(user => user.role === roleFilter);
    }
    
    setFilteredUsers(results);
  }, [searchTerm, roleFilter, users]);

  // Toggle user verification status
  const toggleVerification = async (userId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ is_verified: !currentStatus })
        .eq('id', userId);
        
      if (error) throw error;
      
      // Update local state
      setUsers(users.map(user => 
        user.id === userId ? { ...user, is_verified: !currentStatus } : user
      ));
      
      toast({
        title: `User ${!currentStatus ? 'Verified' : 'Unverified'}`,
        description: `User has been ${!currentStatus ? 'verified' : 'unverified'} successfully`,
      });
    } catch (error) {
      console.error('Error updating user verification:', error);
      toast({
        title: "Error",
        description: "Failed to update user verification status",
        variant: "destructive",
      });
    }
  };

  // Toggle user payment status
  const togglePaymentStatus = async (userId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ is_premium: !currentStatus })
        .eq('id', userId);
        
      if (error) throw error;
      
      // Update local state
      setUsers(users.map(user => 
        user.id === userId ? { ...user, is_premium: !currentStatus } : user
      ));
      
      toast({
        title: `Payment Status Updated`,
        description: `User is now ${!currentStatus ? 'premium' : 'non-premium'}`,
      });
    } catch (error) {
      console.error('Error updating payment status:', error);
      toast({
        title: "Error",
        description: "Failed to update user payment status",
        variant: "destructive",
      });
    }
  };

  // Delete user
  const deleteUser = async (userId: string) => {
    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      try {
        // First try to delete from auth users (which will cascade to profiles due to FK)
        const { error: authError } = await supabase.auth.admin.deleteUser(userId);
        
        if (authError) {
          // If that fails, try to delete just from profiles
          const { error: profileError } = await supabase
            .from('profiles')
            .delete()
            .eq('id', userId);
            
          if (profileError) throw profileError;
        }
        
        // Update local state
        setUsers(users.filter(user => user.id !== userId));
        
        toast({
          title: "User Deleted",
          description: "User has been deleted successfully",
        });
      } catch (error) {
        console.error('Error deleting user:', error);
        toast({
          title: "Error",
          description: "Failed to delete user. You may not have sufficient permissions.",
          variant: "destructive",
        });
      }
    }
  };

  // Format date
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-t-2 border-b-2 border-nigerian-green-500 rounded-full mx-auto mb-4"></div>
          <p className="text-gray-500">Loading user data...</p>
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
          <h1 className="text-3xl font-bold">Users Management</h1>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            
            <div className="flex space-x-2">
              <Button
                onClick={() => setRoleFilter(null)}
                variant={roleFilter === null ? "default" : "outline"}
                size="sm"
              >
                All
              </Button>
              <Button
                onClick={() => setRoleFilter('player')}
                variant={roleFilter === 'player' ? "default" : "outline"}
                size="sm"
              >
                Players
              </Button>
              <Button
                onClick={() => setRoleFilter('coach')}
                variant={roleFilter === 'coach' ? "default" : "outline"}
                size="sm"
              >
                Coaches
              </Button>
              <Button
                onClick={() => setRoleFilter('agent')}
                variant={roleFilter === 'agent' ? "default" : "outline"}
                size="sm"
              >
                Agents
              </Button>
              <Button
                onClick={() => setRoleFilter('club_staff')}
                variant={roleFilter === 'club_staff' ? "default" : "outline"}
                size="sm"
              >
                Club Staff
              </Button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <Table>
              <TableCaption>A list of all users on Futbol Connect.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-4">
                      {users.length === 0 
                        ? "No users found." 
                        : "No users match your filters."
                      }
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="h-8 w-8 rounded-full bg-nigerian-green-100 flex items-center justify-center text-nigerian-green-700">
                            {user.full_name ? user.full_name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="font-medium">{user.full_name || 'Unnamed'}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800 capitalize">
                          {user.role || 'Unknown'}
                        </span>
                      </TableCell>
                      <TableCell>{formatDate(user.created_at)}</TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          <span className={`px-2 py-1 rounded-full text-xs ${user.is_verified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                            {user.is_verified ? 'Verified' : 'Unverified'}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs ${user.is_premium ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'}`}>
                            {user.is_premium ? 'Premium' : 'Free'}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                              Actions
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuLabel>User Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => toggleVerification(user.id, user.is_verified || false)}>
                              {user.is_verified ? 'Remove Verification' : 'Verify User'}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => togglePaymentStatus(user.id, user.is_premium || false)}>
                              {user.is_premium ? 'Set as Free User' : 'Set as Premium User'}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              className="text-red-600 focus:text-white focus:bg-red-600"
                              onClick={() => deleteUser(user.id)}
                            >
                              Delete User
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersManagementPage;
