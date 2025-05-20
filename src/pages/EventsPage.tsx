
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import EventCard from '@/components/events/EventCard';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Calendar, Calendar as CalendarIcon } from "lucide-react";
import { Event } from '@/data/mockData';
import { useNavigate } from 'react-router-dom';

// Temporary mock data
const events: Event[] = [
  {
    id: "1",
    title: "Lagos Talent Scout Camp 2025",
    description: "A three-day scouting camp for young talents aged 16-20. Top performers will be offered trials with professional clubs.",
    date: "2025-07-15",
    location: "Teslim Balogun Stadium, Lagos",
    organizer: "Lagos State Football Association",
    type: "trial",
    image: "/placeholder.svg"
  },
  {
    id: "2",
    title: "Nigeria Youth Championship",
    description: "Annual championship for U-17 teams across Nigeria, showcasing the future stars of Nigerian football.",
    date: "2025-08-05",
    location: "National Stadium, Abuja",
    organizer: "Nigerian Football Federation",
    type: "tournament",
    image: "/placeholder.svg"
  },
  {
    id: "3",
    title: "Football Skills Masterclass",
    description: "A one-day workshop led by former national team players to improve technical skills and tactical understanding.",
    date: "2025-06-20",
    location: "Godswill Akpabio Stadium, Uyo",
    organizer: "Football Development Initiative",
    type: "workshop",
    image: "/placeholder.svg"
  },
  {
    id: "4",
    title: "Agent Connection Day",
    description: "Meet top football agents and representatives from European clubs in this networking event for promising players.",
    date: "2025-09-12",
    location: "Eko Hotel, Lagos",
    organizer: "African Talent Agency",
    type: "showcase",
    image: "/placeholder.svg"
  },
  {
    id: "5",
    title: "Goalkeeper Specialized Camp",
    description: "Intensive training camp specifically for goalkeepers, featuring coaching from Premier League goalkeeping coaches.",
    date: "2025-07-29",
    location: "U.J Esuene Stadium, Calabar",
    organizer: "Goalkeepers Union Nigeria",
    type: "trial",
    image: "/placeholder.svg"
  },
  {
    id: "6",
    title: "University Scouting Tournament",
    description: "Tournament for university teams with scouts from local and international clubs in attendance.",
    date: "2025-10-05",
    location: "University of Lagos Sports Complex",
    organizer: "Nigerian University Games Association",
    type: "tournament",
    image: "/placeholder.svg"
  }
];

const EventsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const navigate = useNavigate();
  
  const filteredEvents = events.filter(event => {
    // Filter by search query
    const matchesQuery = 
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by type
    const matchesType = selectedType ? event.type === selectedType : true;
    
    return matchesQuery && matchesType;
  });

  return (
    <Layout>
      <div className="bg-gray-50 dark:bg-gray-900 py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-blue-theme-700 dark:text-blue-theme-400 mb-4">Football Events</h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-3xl">
              Discover upcoming football events in Nigeria including trials, tournaments, workshops, and 
              player showcases. Find opportunities to advance your career or scout new talent.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <div className="relative w-full md:w-1/2 lg:w-1/3">
              <Search className="absolute left-3 top-3 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search events, locations..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2 overflow-x-auto pb-2">
              <Badge 
                variant={selectedType === null ? "default" : "outline"} 
                className="cursor-pointer"
                onClick={() => setSelectedType(null)}
              >
                All
              </Badge>
              <Badge 
                variant={selectedType === "trial" ? "default" : "outline"} 
                className="cursor-pointer"
                onClick={() => setSelectedType("trial")}
              >
                Trials
              </Badge>
              <Badge 
                variant={selectedType === "tournament" ? "default" : "outline"} 
                className="cursor-pointer"
                onClick={() => setSelectedType("tournament")}
              >
                Tournaments
              </Badge>
              <Badge 
                variant={selectedType === "showcase" ? "default" : "outline"} 
                className="cursor-pointer"
                onClick={() => setSelectedType("showcase")}
              >
                Showcases
              </Badge>
              <Badge 
                variant={selectedType === "workshop" ? "default" : "outline"} 
                className="cursor-pointer"
                onClick={() => setSelectedType("workshop")}
              >
                Workshops
              </Badge>
            </div>

            <Button 
              variant="outline" 
              className="flex items-center gap-2 ml-auto whitespace-nowrap"
              onClick={() => navigate('/calendar')}
            >
              <Calendar className="h-4 w-4" />
              View Calendar
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {filteredEvents.length > 0 ? (
              filteredEvents.map(event => (
                <EventCard key={event.id} event={event} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500">No events match your search criteria.</p>
              </div>
            )}
          </div>

          <div className="bg-blue-theme-50 dark:bg-blue-theme-900/30 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-blue-theme-700 dark:text-blue-theme-400 mb-4">Organize an Event</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Are you organizing a football event? List your event on Futbol Connect to reach a wider audience of players, coaches, and scouts.
            </p>
            <Button 
              className="bg-blue-theme-600 hover:bg-blue-theme-700 text-white"
              onClick={() => navigate('/dashboard/create-event')}
            >
              Submit Event
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EventsPage;
