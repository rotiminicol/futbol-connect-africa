
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
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

interface PlayerWithProfile {
  id: string;
  full_name: string;
  email: string;
  is_verified: boolean;
  avatar_url?: string;
  created_at: string;
  age?: number;
  position?: string;
  secondary_position?: string;
  current_club?: string;
  available_for_transfer: boolean;
  is_admin_created?: boolean;
  preferred_foot?: string;
  height?: number;
  weight?: number;
}

const PlayersManagementPage: React.FC = () => {
  const { user, profile } = useAuth();
  const { toast } = useToast();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [players, setPlayers] = useState<PlayerWithProfile[]>([]);
  const [filteredPlayers, setFilteredPlayers] = useState<PlayerWithProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [positionFilter, setPositionFilter] = useState<string | null>(null);
  const [transferFilter, setTransferFilter] = useState<boolean | null>(null);

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
        fetchPlayers();
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

  // Fetch all players
  const fetchPlayers = async () => {
    try {
      // First get all profiles that have the role 'player'
      const { data: playerProfiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'player');

      if (profilesError) throw profilesError;

      // For each player, get their player_profile data
      const playersWithDetails: PlayerWithProfile[] = [];
      
      for (const playerProfile of playerProfiles) {
        const { data: playerDetails, error: playerError } = await supabase
          .from('player_profiles')
          .select('*')
          .eq('id', playerProfile.id)
          .single();

        if (playerError && playerError.code !== 'PGRST116') {
          // PGRST116 is "no rows returned" - not an error if player has no details yet
          console.error('Error fetching player details:', playerError);
        }

        playersWithDetails.push({
          ...playerProfile,
          age: playerDetails?.age,
          position: playerDetails?.position,
          secondary_position: playerDetails?.secondary_position,
          current_club: playerDetails?.current_club,
          available_for_transfer: playerDetails?.available_for_transfer || false,
          is_admin_created: playerDetails?.is_admin_created || false,
          preferred_foot: playerDetails?.preferred_foot,
          height: playerDetails?.height,
          weight: playerDetails?.weight,
        });
      }
      
      setPlayers(playersWithDetails);
      setFilteredPlayers(playersWithDetails);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching players:', error);
      toast({
        title: "Error",
        description: "Failed to load player data",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  // Filter players based on search term and selected filters
  useEffect(() => {
    let results = players;
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(
        player => 
          (player.full_name && player.full_name.toLowerCase().includes(term)) || 
          (player.email && player.email.toLowerCase().includes(term)) ||
          (player.position && player.position.toLowerCase().includes(term)) ||
          (player.current_club && player.current_club.toLowerCase().includes(term))
      );
    }
    
    // Apply position filter
    if (positionFilter) {
      results = results.filter(player => 
        (player.position && player.position.toLowerCase() === positionFilter.toLowerCase()) || 
        (player.secondary_position && player.secondary_position.toLowerCase() === positionFilter.toLowerCase())
      );
    }
    
    // Apply transfer availability filter
    if (transferFilter !== null) {
      results = results.filter(player => player.available_for_transfer === transferFilter);
    }
    
    setFilteredPlayers(results);
  }, [searchTerm, positionFilter, transferFilter, players]);

  // Toggle player verification status
  const toggleVerification = async (playerId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ is_verified: !currentStatus })
        .eq('id', playerId);
        
      if (error) throw error;
      
      // Update local state
      setPlayers(players.map(player => 
        player.id === playerId ? { ...player, is_verified: !currentStatus } : player
      ));
      
      toast({
        title: `Player ${!currentStatus ? 'Verified' : 'Unverified'}`,
        description: `Player has been ${!currentStatus ? 'verified' : 'unverified'} successfully`,
      });
    } catch (error) {
      console.error('Error updating player verification:', error);
      toast({
        title: "Error",
        description: "Failed to update player verification status",
        variant: "destructive",
      });
    }
  };

  // Toggle player transfer availability
  const toggleTransferAvailability = async (playerId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('player_profiles')
        .update({ available_for_transfer: !currentStatus })
        .eq('id', playerId);
        
      if (error) throw error;
      
      // Update local state
      setPlayers(players.map(player => 
        player.id === playerId ? { ...player, available_for_transfer: !currentStatus } : player
      ));
      
      toast({
        title: `Player ${!currentStatus ? 'Available' : 'Unavailable'} for Transfer`,
        description: `Player transfer status updated successfully`,
      });
    } catch (error) {
      console.error('Error updating transfer status:', error);
      toast({
        title: "Error",
        description: "Failed to update player transfer status",
        variant: "destructive",
      });
    }
  };

  // Delete player
  const deletePlayer = async (playerId: string) => {
    if (window.confirm('Are you sure you want to delete this player? This action cannot be undone.')) {
      try {
        // First delete player profile
        const { error: playerProfileError } = await supabase
          .from('player_profiles')
          .delete()
          .eq('id', playerId);
          
        if (playerProfileError) throw playerProfileError;
        
        // Then delete user profile
        const { error: profileError } = await supabase
          .from('profiles')
          .delete()
          .eq('id', playerId);
            
        if (profileError) throw profileError;
        
        // Update local state
        setPlayers(players.filter(player => player.id !== playerId));
        
        toast({
          title: "Player Deleted",
          description: "Player has been deleted successfully",
        });
      } catch (error) {
        console.error('Error deleting player:', error);
        toast({
          title: "Error",
          description: "Failed to delete player",
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

  // Get common positions for filtering
  const getUniquePositions = () => {
    const positions = new Set<string>();
    
    players.forEach(player => {
      if (player.position) positions.add(player.position);
      if (player.secondary_position) positions.add(player.secondary_position);
    });
    
    return Array.from(positions);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-t-2 border-b-2 border-nigerian-green-500 rounded-full mx-auto mb-4"></div>
          <p className="text-gray-500">Loading player data...</p>
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
          <h1 className="text-3xl font-bold">Players Management</h1>
          <Button onClick={() => window.location.href = '/admin/players/add'}>Add New Player</Button>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4 mb-6">
            <div className="lg:flex-1">
              <Input
                type="text"
                placeholder="Search by name, club, position..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              <div className="flex flex-wrap gap-2 mr-4">
                <Button
                  onClick={() => setPositionFilter(null)}
                  variant={positionFilter === null ? "default" : "outline"}
                  size="sm"
                >
                  All Positions
                </Button>
                {getUniquePositions().map((pos) => (
                  <Button
                    key={pos}
                    onClick={() => setPositionFilter(pos)}
                    variant={positionFilter === pos ? "default" : "outline"}
                    size="sm"
                  >
                    {pos}
                  </Button>
                ))}
              </div>
              
              <div className="flex gap-2">
                <Button
                  onClick={() => setTransferFilter(null)}
                  variant={transferFilter === null ? "default" : "outline"}
                  size="sm"
                >
                  All
                </Button>
                <Button
                  onClick={() => setTransferFilter(true)}
                  variant={transferFilter === true ? "default" : "outline"}
                  size="sm"
                >
                  Available
                </Button>
                <Button
                  onClick={() => setTransferFilter(false)}
                  variant={transferFilter === false ? "default" : "outline"}
                  size="sm"
                >
                  Not Available
                </Button>
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <Table>
              <TableCaption>A list of all players on Futbol Connect.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Player</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Age</TableHead>
                  <TableHead>Club</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPlayers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4">
                      {players.length === 0 
                        ? "No players found." 
                        : "No players match your filters."
                      }
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredPlayers.map((player) => (
                    <TableRow key={player.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          {player.avatar_url ? (
                            <img 
                              src={player.avatar_url} 
                              alt={player.full_name}
                              className="h-10 w-10 rounded-full object-cover"
                            />
                          ) : (
                            <div className="h-10 w-10 rounded-full bg-nigerian-green-100 flex items-center justify-center text-nigerian-green-700">
                              {player.full_name ? player.full_name.charAt(0).toUpperCase() : 'P'}
                            </div>
                          )}
                          <div>
                            <div className="font-medium flex items-center">
                              {player.full_name || 'Unnamed Player'}
                              {player.is_admin_created && (
                                <span className="ml-2 px-1.5 py-0.5 rounded text-xs bg-blue-100 text-blue-800">
                                  Admin Added
                                </span>
                              )}
                            </div>
                            <div className="text-sm text-gray-500">{player.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div>{player.position || 'Not specified'}</div>
                          {player.secondary_position && (
                            <div className="text-xs text-gray-500 mt-1">{player.secondary_position}</div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{player.age || 'N/A'}</TableCell>
                      <TableCell>{player.current_club || 'No club'}</TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          <span className={`px-2 py-1 rounded-full text-xs ${player.is_verified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                            {player.is_verified ? 'Verified' : 'Unverified'}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs ${player.available_for_transfer ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
                            {player.available_for_transfer ? 'Available for Transfer' : 'Not Available'}
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
                            <DropdownMenuLabel>Player Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => toggleVerification(player.id, player.is_verified || false)}>
                              {player.is_verified ? 'Remove Verification' : 'Verify Player'}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => toggleTransferAvailability(player.id, player.available_for_transfer)}>
                              {player.available_for_transfer ? 'Mark as Not Available' : 'Mark as Available'}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => window.location.href = `/admin/players/edit/${player.id}`}>
                              Edit Player
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              className="text-red-600 focus:text-white focus:bg-red-600"
                              onClick={() => deletePlayer(player.id)}
                            >
                              Delete Player
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

export default PlayersManagementPage;
