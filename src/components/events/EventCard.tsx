
import React from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { Event } from '@/data/mockData';

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const navigate = useNavigate();
  
  // Format the date to display nicely
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Function to determine the badge color based on event type
  const getBadgeColor = (type: string) => {
    switch (type) {
      case 'trial':
        return 'bg-blue-500 hover:bg-blue-600';
      case 'tournament':
        return 'bg-orange-500 hover:bg-orange-600';
      case 'showcase':
        return 'bg-purple-500 hover:bg-purple-600';
      case 'workshop':
        return 'bg-teal-500 hover:bg-teal-600';
      default:
        return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  return (
    <Card className="overflow-hidden flex flex-col h-full card-hover">
      <div className="relative">
        <img 
          src={event.image || '/placeholder.svg'} 
          alt={event.title} 
          className="w-full h-48 object-cover"
        />
        <Badge className={`absolute top-2 right-2 ${getBadgeColor(event.type)} capitalize`}>
          {event.type}
        </Badge>
      </div>
      <CardContent className="flex-grow py-4">
        <div className="flex items-center gap-2 text-sm text-nigerian-green-500 mb-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          <span>{formatDate(event.date)}</span>
        </div>
        <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span>{event.location}</span>
        </div>
        <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">
          {event.description}
        </p>
      </CardContent>
      <CardFooter className="pt-0">
        <div className="w-full flex justify-between items-center">
          <p className="text-sm text-gray-500">By {event.organizer}</p>
          <Button 
            variant="outline"
            onClick={() => navigate(`/events/${event.id}`)}
            className="border-nigerian-green-500 text-nigerian-green-500 hover:bg-nigerian-green-500 hover:text-white"
          >
            View Details
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default EventCard;
