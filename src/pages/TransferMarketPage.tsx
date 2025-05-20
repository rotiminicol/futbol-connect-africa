
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, ArrowRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from 'react-router-dom';

// Temporary mock data
const transferListings = [
  {
    id: "1",
    playerName: "Emmanuel Okocha",
    age: 22,
    position: "Striker",
    currentClub: "Lagos United FC",
    valuation: "€750,000",
    image: "/placeholder.svg",
    nationality: "Nigeria",
    transferType: "Permanent",
    transferFee: "€400,000",
    contractLength: "4 years"
  },
  {
    id: "2",
    playerName: "Chijioke Nwakaeme",
    age: 19,
    position: "Midfielder",
    currentClub: "Abuja City FC",
    valuation: "€350,000",
    image: "/placeholder.svg",
    nationality: "Nigeria",
    transferType: "Loan",
    transferFee: "€50,000",
    contractLength: "1 year"
  },
  {
    id: "3",
    playerName: "Victor Osimhen",
    age: 24,
    position: "Forward",
    currentClub: "Enugu Rangers",
    valuation: "€1,200,000",
    image: "/placeholder.svg",
    nationality: "Nigeria",
    transferType: "Permanent",
    transferFee: "€800,000",
    contractLength: "3 years"
  },
  {
    id: "4",
    playerName: "Joshua Akpan",
    age: 21,
    position: "Defender",
    currentClub: "Kano Pillars",
    valuation: "€500,000",
    image: "/placeholder.svg",
    nationality: "Nigeria",
    transferType: "Permanent",
    transferFee: "€350,000",
    contractLength: "3 years"
  },
  {
    id: "5",
    playerName: "Tunde Adeleke",
    age: 23,
    position: "Goalkeeper",
    currentClub: "Sunshine Stars",
    valuation: "€450,000",
    image: "/placeholder.svg",
    nationality: "Nigeria",
    transferType: "Loan",
    transferFee: "€75,000",
    contractLength: "2 years"
  }
];

const TransferMarketPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="bg-gray-50 dark:bg-gray-900 py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-blue-theme-700 dark:text-blue-theme-400 mb-4">Transfer Market</h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-3xl">
              Browse the latest transfer listings and opportunities in the Nigerian football scene. 
              Connect with clubs and agents to facilitate player transfers.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-6 mb-6">
            <div className="relative w-full md:w-1/2 lg:w-1/3">
              <Search className="absolute left-3 top-3 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search players, clubs, or positions..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2 overflow-x-auto pb-2">
              <Badge variant="outline" className="cursor-pointer hover:bg-blue-theme-50">Striker</Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-blue-theme-50">Midfielder</Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-blue-theme-50">Defender</Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-blue-theme-50">Goalkeeper</Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-blue-theme-50">Under 21</Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-blue-theme-50">Loan</Badge>
            </div>
          </div>

          <Tabs defaultValue="available" className="mb-8">
            <TabsList>
              <TabsTrigger value="available">Available Players</TabsTrigger>
              <TabsTrigger value="completed">Completed Transfers</TabsTrigger>
              <TabsTrigger value="negotiations">In Negotiations</TabsTrigger>
            </TabsList>
            <TabsContent value="available" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {transferListings.map((listing) => (
                  <Card key={listing.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <div className="relative">
                      <img 
                        src={listing.image} 
                        alt={listing.playerName} 
                        className="w-full h-48 object-cover"
                      />
                      <Badge className={`absolute top-2 right-2 ${listing.transferType === 'Loan' ? 'bg-orange-500' : 'bg-blue-theme-600'}`}>
                        {listing.transferType}
                      </Badge>
                    </div>
                    <CardContent className="pt-4">
                      <h3 className="text-xl font-semibold mb-1">{listing.playerName}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                        <span>{listing.age} years</span>
                        <span>•</span>
                        <span>{listing.position}</span>
                        <span>•</span>
                        <span>{listing.nationality}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">Current club: {listing.currentClub}</p>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-xs text-gray-500">Valuation</p>
                          <p className="font-semibold text-blue-theme-700">{listing.valuation}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Transfer Fee</p>
                          <p className="font-semibold text-blue-theme-700">{listing.transferFee}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Contract</p>
                          <p className="font-semibold text-blue-theme-700">{listing.contractLength}</p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-0">
                      <Button 
                        className="w-full bg-blue-theme-600 hover:bg-blue-theme-700 text-white"
                        onClick={() => navigate(`/transfer-market/${listing.id}`)}
                      >
                        View Details
                        <ArrowRight size={16} />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="completed" className="mt-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <p className="text-center text-gray-600 dark:text-gray-400">Completed transfers will be shown here.</p>
              </div>
            </TabsContent>
            <TabsContent value="negotiations" className="mt-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <p className="text-center text-gray-600 dark:text-gray-400">Transfers currently in negotiation will be shown here.</p>
              </div>
            </TabsContent>
          </Tabs>

          <div className="bg-blue-theme-50 dark:bg-blue-theme-900/30 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-blue-theme-700 dark:text-blue-theme-400 mb-4">List a Player for Transfer</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Are you a club representative or an agent? List your players on the transfer market to reach potential buyers.
            </p>
            <Button 
              className="bg-blue-theme-600 hover:bg-blue-theme-700 text-white"
              onClick={() => navigate('/dashboard/list-transfer')}
            >
              List Player
              <ArrowRight size={16} />
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TransferMarketPage;
