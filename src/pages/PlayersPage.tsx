
import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import PlayerCard from '@/components/players/PlayerCard';
import PlayerFilters from '@/components/players/PlayerFilters';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { mockPlayers, Player } from '@/data/mockData';

const PlayersPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    position: '',
    ageRange: [16, 40],
    nationality: '',
    availableForTransfer: false,
    openToTrials: false,
    preferredFoot: '',
    valueRange: [0, 1000000],
  });
  const [filteredPlayers, setFilteredPlayers] = useState<Player[]>(mockPlayers);
  const [isLoading, setIsLoading] = useState(false);

  // Apply filters when they change
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate API request delay
    const timer = setTimeout(() => {
      const filtered = mockPlayers.filter(player => {
        // Apply name search
        if (searchTerm && !player.name.toLowerCase().includes(searchTerm.toLowerCase())) {
          return false;
        }
        
        // Apply position filter
        if (filters.position && player.position !== filters.position) {
          return false;
        }
        
        // Apply age range
        if (player.age < filters.ageRange[0] || player.age > filters.ageRange[1]) {
          return false;
        }
        
        // Apply nationality filter
        if (filters.nationality && !player.nationality.toLowerCase().includes(filters.nationality.toLowerCase())) {
          return false;
        }
        
        // Apply availability filters
        if (filters.availableForTransfer && !player.availableForTransfer) {
          return false;
        }
        
        if (filters.openToTrials && !player.openToTrials) {
          return false;
        }
        
        // Apply preferred foot filter
        if (filters.preferredFoot && player.preferredFoot !== filters.preferredFoot) {
          return false;
        }
        
        // Apply value range
        if (player.valueInEuros < filters.valueRange[0] || player.valueInEuros > filters.valueRange[1]) {
          return false;
        }
        
        return true;
      });
      
      setFilteredPlayers(filtered);
      setIsLoading(false);
    }, 500); // Simulate a delay
    
    return () => clearTimeout(timer);
  }, [searchTerm, filters]);

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  return (
    <Layout>
      <div className="bg-gray-50 dark:bg-gray-900 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Players Directory</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Discover football talent from across Nigeria
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6">
            {/* Filters Sidebar */}
            <div className="w-full md:w-72 flex-shrink-0">
              <PlayerFilters onFilterChange={handleFilterChange} />
            </div>
            
            {/* Main Content */}
            <div className="flex-grow">
              {/* Search Bar */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
                <div className="flex gap-2">
                  <Input
                    placeholder="Search players by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-grow"
                  />
                  <Button className="bg-nigerian-green-500 hover:bg-nigerian-green-600">
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Button>
                </div>
              </div>
              
              {/* Results */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
                <div className="mb-4 flex justify-between items-center">
                  <p className="text-gray-600 dark:text-gray-400">
                    Showing <span className="font-semibold">{filteredPlayers.length}</span> players
                  </p>
                  <div className="flex gap-2">
                    <select className="border rounded px-2 py-1 text-sm bg-white dark:bg-gray-800">
                      <option value="name">Sort by Name</option>
                      <option value="age">Sort by Age</option>
                      <option value="value">Sort by Value</option>
                    </select>
                  </div>
                </div>
                
                {isLoading ? (
                  <div className="py-20 text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-nigerian-green-500 mx-auto"></div>
                    <p className="mt-4 text-gray-600 dark:text-gray-400">Loading players...</p>
                  </div>
                ) : filteredPlayers.length === 0 ? (
                  <div className="py-20 text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">No players found</h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Try adjusting your search or filter criteria.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPlayers.map(player => (
                      <PlayerCard key={player.id} player={player} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PlayersPage;
